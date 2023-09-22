export interface Schema {
  title: string;
  challengeDifficulty: string;
  docRepository: string;
  name: string;
  directory?: string;
  addTest?: boolean;
  skipPackageJson?: boolean;
  rootProject?: boolean;
}
