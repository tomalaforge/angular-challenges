const rangeAge = (age: number) => {
  return age > 25 ? 'adult' : 'child';
};

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

export const PersonUtils = {
  showName,
  isAllowed,
  rangeAge,
} as const;
