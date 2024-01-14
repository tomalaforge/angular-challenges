import { names } from '@nx/devkit';

export function normalizeDirectory(
  appName: string,
  directoryName: string,
): string {
  return directoryName
    ? `${names(directoryName).fileName}/${names(appName).fileName}`
    : names(appName).fileName;
}

export function normalizeProjectName(
  appName: string,
  directoryName: string,
): string {
  return normalizeDirectory(appName, directoryName).replace(/\//g, '-');
}

export function extractLayoutDirectory(directory: string): {
  layoutDirectory: string;
  projectDirectory: string;
} {
  if (directory) {
    directory = directory.startsWith('/') ? directory.substring(1) : directory;
    for (const dir of ['apps', 'libs', 'packages']) {
      if (directory.startsWith(dir + '/') || directory === dir) {
        return {
          layoutDirectory: dir,
          projectDirectory: directory.substring(dir.length + 1),
        };
      }
    }
  }
  return { layoutDirectory: null, projectDirectory: directory };
}

export function getProjectDir(name: string, directory: string) {
  const { projectDirectory } = extractLayoutDirectory(directory);
  return {
    appProjectName: normalizeProjectName(name, projectDirectory),
    appDirectory: 'apps/' + normalizeDirectory(name, projectDirectory),
  };
}
