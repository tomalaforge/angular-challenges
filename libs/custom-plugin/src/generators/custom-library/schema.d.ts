import type { UnitTestRunner } from '@nx/angular/src/utils/test-runners';
import type { ProjectNameAndRootFormat } from '@nx/devkit/src/generators/project-name-and-root-utils';
import type { Linter } from '@nx/eslint';

// copied from node_modules/@nx/angular/src/generators/library/schema.d.ts
export interface CustomLibraryGeneratorSchema {
  name: string;
  addTailwind?: boolean;
  skipFormat?: boolean;
  simpleName?: boolean;
  addModuleSpec?: boolean;
  directory?: string;
  projectNameAndRootFormat?: ProjectNameAndRootFormat;
  sourceDir?: string;
  buildable?: boolean;
  publishable?: boolean;
  importPath?: string;
  standaloneConfig?: boolean;
  spec?: boolean;
  flat?: boolean;
  commonModule?: boolean;
  prefix?: string;
  routing?: boolean;
  lazy?: boolean;
  parent?: string;
  tags?: string;
  strict?: boolean;
  linter?: Linter;
  unitTestRunner?: UnitTestRunner;
  compilationMode?: 'full' | 'partial';
  setParserOptionsProject?: boolean;
  skipModule?: boolean;
  skipPackageJson?: boolean;
  standalone?: boolean;
  displayBlock?: boolean;
  inlineStyle?: boolean;
  inlineTemplate?: boolean;
  viewEncapsulation?: 'Emulated' | 'None' | 'ShadowDom';
  changeDetection?: 'Default' | 'OnPush';
  style?: 'css' | 'scss' | 'sass' | 'less' | 'none';
  skipTests?: boolean;
  selector?: string;
  skipSelector?: boolean;
  addPlugin?: boolean;
}
