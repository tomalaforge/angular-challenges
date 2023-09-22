export interface Schema {
  title: string;
  challengeNumber: number;
  challengeDifficulty: string;
  docRepository: string;
  name: string;
  directory?: string;
  addTest?: boolean;
  skipPackageJson?: boolean;
  rootProject?: boolean;
}
