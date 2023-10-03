import { BackendService, Ticket, User } from './backend.service';

// probably would export these from the service or another file
// and then import in this file
// less likely to have a mismatch if exported / imported
const storedTickets: Ticket[] = [
  {
    id: 0,
    description: 'Install a monitor arm',
    assigneeId: 111,
    completed: false,
  },
  {
    id: 1,
    description: 'Move the desk to the new location',
    assigneeId: 111,
    completed: false,
  },
];

const storedUsers: User[] = [
  { id: 111, name: 'Thomas' },
  { id: 222, name: 'Jack' },
];

describe('BackendService', () => {
  let service: BackendService;

  beforeEach(() => {
    service = new BackendService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('tickets()', (done) => {
    service.tickets().subscribe({
      next: (data) => {
        expect(data).toEqual(storedTickets);
        done();
      },
    });
  });

  it('users()', (done) => {
    service.users().subscribe({
      next: (data) => {
        expect(data).toEqual(storedUsers);
        done();
      },
    });
  });

  it('ticket()', (done) => {
    // ticket(id: number)
    // order of tests could be a problem here
    // could just check for the property changed vs whole object ?
    // useful to have more than 2 entries for the dummy data so you don't have to worry about
    // updates to one object affecting other tests
    service.ticket(0).subscribe({
      next: (data) => {
        expect(data).toEqual({
          id: 0,
          description: 'Install a monitor arm',
          assigneeId: 111,
          completed: false,
        });
        done();
      },
    });
  });

  it('user()', (done) => {
    // user(id: number)

    service.user(111).subscribe({
      next: (data) => {
        expect(data).toEqual({
          id: 111,
          name: 'Thomas',
        });
        done();
      },
    });
  });

  it('newTicket()', (done) => {
    service.newTicket({ description: 'AXSDASASA' }).subscribe({
      next: (data) => {
        expect(data).toEqual({
          id: 2, // storedTickets have ids [0,1]
          description: 'AXSDASASA',
          assigneeId: null,
          completed: false,
        });
        done();
      },
    });
  });

  it('assign()', (done) => {
    // assign(ticketId, userId)

    service.assign(1, 222).subscribe({
      next: (data) => {
        expect(data).toEqual({
          id: 1,
          description: 'Move the desk to the new location',
          assigneeId: 222,
          completed: false,
        });
        done();
      },
    });
  });

  it('complete()', (done) => {
    // complete(ticketId: number, completed: boolean)

    service.complete(0, true).subscribe({
      next: (data) => {
        expect(data).toEqual({
          id: 0,
          description: 'Install a monitor arm',
          assigneeId: 111,
          completed: true,
        });
        done();
      },
    });
  });

  it('update() error', (done) => {
    // update(ticketId: number, updates: Partial<Omit<Ticket, 'id'>>)

    service.update(55, { description: 'Not Found' }).subscribe({
      next: (data) => {}, // probably don't even need this as it will be skipped
      error: (e) => {
        expect(e.message).toEqual('ticket not found');
        done();
      },
    });
  });
});
