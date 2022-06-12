export const generateRandomNumber = (start: number, end: number) => {
  return Math.floor(Math.random() * end) + start;
};
