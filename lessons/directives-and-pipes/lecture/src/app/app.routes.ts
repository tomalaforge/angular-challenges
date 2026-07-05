import { Routes } from '@angular/router';
import { DefaultAttributeDirective } from './default-attribute-directive/default-attribute-directive.component';
import { CustomAttributeDirectiveExample } from './custom-attribute-directive/custom-attribute-directive.component';
import { DefaultStructureDirective } from './default-structure-directive/default-structure-directive';
import { CustomStructureDirectiveExample } from './custom-structure-directive/custom-structure-directive.component';
import { DefaultPipes } from './default-pipes/default-pipes';
import {CustomPipe} from './custom-pipe/custom-pipe';

export const routes: Routes = [
  {
    path: 'default-attribute-directive',
    component: DefaultAttributeDirective
  },
  {
    path: 'custom-attribute-directive',
    component: CustomAttributeDirectiveExample
  },
  {
    path: 'default-structure-directive',
    component: DefaultStructureDirective
  },
  {
    path: 'custom-structure-directive',
    component: CustomStructureDirectiveExample
  },
  {
    path: 'default-pipes',
    component: DefaultPipes
  },
  {
    path: 'custom-pipe',
    component: CustomPipe
  }
];
