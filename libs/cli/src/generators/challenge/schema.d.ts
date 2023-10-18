export interface Schema {
  title: string;
  author: string;
  challengeDifficulty: string;
  category: string;
  name: string;
  addTest?: boolean;
  skipPackageJson?: boolean;
  rootProject?: boolean;
}
