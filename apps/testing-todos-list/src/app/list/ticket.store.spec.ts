describe('TicketStore', () => {
  describe('When adding a new Ticket', () => {
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
    describe('Given a success answer from API', () => {
      it('Then array of tickets is of lenght 2', () => {});
    });

    describe('Given a failure answer from API', () => {
      it('Then array of tickets still of lenght 1 and error is set', () => {});
    });
  });
});
