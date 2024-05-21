const USERS = [
  { id: 1, name: 'titi' },
  { id: 2, name: 'George' },
];
const TICKET_NOT_ASSIGNED = {
  id: 0,
  description: 'Install a monitor arm',
  assignee: 'unassigned',
  completed: false,
};

const TICKET_ASSIGNED = {
  id: 1,
  description: 'Install a monitor arm',
  assignee: 'titi',
  completed: false,
};

describe('RowComponent', () => {
  describe('Given an unassigned ticket', () => {
    describe('When we assign it to titi', () => {
      it('Then assign event is emitted with ticketId 0 and userId 1', async () => {
        //
      });
    });
  });

  describe('Given an assigned ticket', () => {
    describe('When we click the done button', () => {
      it('Then closeTicket event is emitted with ticketId 1 ', async () => {
        //
      });
    });
  });

  describe('When clicking on ticket', () => {
    it('Then navigation should be triggered with url detail/0', async () => {
      //
    });
  });
});
