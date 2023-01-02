const showName = (name: string, index: number) => {
  // very heavy computation
  return `${name} - ${index}`;
};

const isAllowed = (age: number, isFirst: boolean, activityAge: number) => {
  if (isFirst) {
    return 'always allowed';
  } else {
    return age > activityAge ? 'allowed' : 'declined';
  }
};

export type IsAllowedParams = {
  age: number;
  isFirst: boolean;
  activityAge: number;
};
export type ShowNameParams = {
  name: string;
  index: number;
};

export const PersonUtils = {
  showName,
  isAllowed,
};
