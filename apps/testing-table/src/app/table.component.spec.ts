import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatTableHarness } from '@angular/material/table/testing';
import { render } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { TableComponent } from './table.component';

describe('AppComponent', () => {
  // let loader: HarnessLoader;
  // let fixture: ComponentFixture<TableComponent>;
  // let loader: HarnessLoader;

  // beforeEach(async () => {
  //   const view = await render(TableComponent);
  //   fixture = view.fixture;
  //   loader = TestbedHarnessEnvironment.loader(fixture);
  // });
  it('error modal is displayed if you click on "Confirm" without inputing a name', async () => {
    userEvent.setup();
    const { fixture } = await render(TableComponent);
    const loader = TestbedHarnessEnvironment.loader(fixture);

    const tables = await loader.getAllHarnesses(MatTableHarness);
    expect(tables.length).toBe(1);

    // const confirmButton = await screen.findByRole('button', {
    //   name: /confirm/i,
    // });
    // await userEvent.click(confirmButton);

    // const dialogControl = await screen.findByRole('dialog');
    // expect(dialogControl).toBeInTheDocument();
    // const errorTitle = await screen.findByRole('heading', {
    //   name: /error/i,
    // });
    // expect(errorTitle).toBeInTheDocument();

    // const okButton = await screen.findByRole('button', {
    //   name: /ok/i,
    // });
    // await userEvent.click(okButton);
  });

  // test('error message is shown if you click "Cancel" in the confirmation modal after submitting a name', async () => {
  //   userEvent.setup();
  //   await render(AppComponent);

  //   const inputControl = await screen.getByRole('textbox');
  //   await userEvent.type(inputControl, 'toto');

  //   const confirmButton = await screen.findByRole('button', {
  //     name: /confirm/i,
  //   });
  //   await userEvent.click(confirmButton);

  //   const dialogControl = await screen.findByRole('dialog');
  //   expect(dialogControl).toBeInTheDocument();
  //   const profilTitle = await screen.findByRole('heading', {
  //     name: /profil/i,
  //   });
  //   expect(profilTitle).toBeInTheDocument();

  //   const cancelButton = await screen.findByRole('button', {
  //     name: /cancel/i,
  //   });
  //   await userEvent.click(cancelButton);

  //   const errorText = await screen.getByText('Name is invalid !!');
  //   expect(errorText).toBeInTheDocument();
  // });

  // test('confirm message is shown if you click "Confirm" in the confirmation modal after submitting a name', async () => {
  //   userEvent.setup();
  //   await render(AppComponent);

  //   const inputControl = await screen.getByRole('textbox');
  //   await userEvent.type(inputControl, 'toto');

  //   const confirmButton = await screen.findByRole('button', {
  //     name: /confirm/i,
  //   });
  //   await userEvent.click(confirmButton);

  //   const dialogControl = await screen.findByRole('dialog');
  //   expect(dialogControl).toBeInTheDocument();
  //   const profilTitle = await screen.findByRole('heading', {
  //     name: /profil/i,
  //   });
  //   expect(profilTitle).toBeInTheDocument();

  //   const confirmDialogButton = await screen.findByRole('button', {
  //     name: /confirm/i,
  //   });
  //   await userEvent.click(confirmDialogButton);

  //   const confirmText = await screen.getByText('Name has been submitted');
  //   expect(confirmText).toBeInTheDocument();
  // });
});
