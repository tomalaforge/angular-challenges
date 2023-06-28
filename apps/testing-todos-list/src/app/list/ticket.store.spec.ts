import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { of, throwError } from 'rxjs';
import { BackendService } from '../backend.service';
import { TicketStore } from './ticket.store';

describe('ticketStore', () => {
  let fixture: TicketStore;
  let service: BackendService;

  beforeEach(() => {
    service = new BackendService();
    fixture = new TicketStore(service);
  });

  describe('addTicket$', () => {
    const NEW_TICKET = {
      id: 1,
      description: 'test 2',
      assigneeId: 888,
      completed: false,
    };
    const tickets = [
      {
        id: 0,
        description: 'test',
        assigneeId: 888,
        completed: false,
      },
    ];
    it('should add ticket with SUCCESS', () => {
      spyOn(service, 'newTicket').and.returnValue(of(NEW_TICKET));
      fixture.patchState({ tickets });

      const expectedTicket = [...tickets, NEW_TICKET];

      fixture.addTicket('test');

      const state = subscribeSpyTo(fixture.state$).getFirstValue();
      expect(service.newTicket).toHaveBeenCalled();
      expect(state.loading).toEqual(false);
      expect(state.tickets).toEqual(expectedTicket);
    });

    it('should NOT add ticket because of service FAILURE', () => {
      const ERROR = 'error';
      spyOn(service, 'newTicket').and.returnValue(throwError(ERROR));
      fixture.patchState({ tickets });

      const expectedTicket = [...tickets];

      fixture.addTicket('test');

      const state = subscribeSpyTo(fixture.state$).getFirstValue();
      expect(service.newTicket).toHaveBeenCalled();
      expect(state.loading).toEqual(false);
      expect(state.tickets).toEqual(expectedTicket);
      expect(state.error).toEqual(ERROR);
    });
  });
});
