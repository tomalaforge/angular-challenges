export interface Schema {
  title: string;
  author: string;
  challengeDifficulty: string;
  category: string;
  addTest?: boolean;
  skipPackageJson?: boolean;
  rootProject?: boolean;
  challengeNumber?: number;
}
