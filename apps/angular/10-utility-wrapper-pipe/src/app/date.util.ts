const dateToString = (date: Date): string => {
  return `${date.toDateString()} ${date.toLocaleTimeString()}`;
};

export const DateUtils = {
  dateToString,
};
