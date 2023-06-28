export interface Schema {
  title: string;
  challengeNumber: number;
  name: string;
  directory?: string;
  addTest?: boolean;
  skipPackageJson?: boolean;
  rootProject?: boolean;
}
