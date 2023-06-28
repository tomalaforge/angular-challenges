export interface FeatureComponentGeneratorSchema {
  name: string;
  project: string;
  path?: string;
  inlineTemplate?: boolean;
  createService?: boolean;
}
