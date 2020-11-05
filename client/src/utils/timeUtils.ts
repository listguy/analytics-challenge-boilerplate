export const todayMs: () => number = () => new Date().getTime();

export const nowString: () => string = () => new Date().toISOString().slice(0, 10);

export const oneDayMs: number = 1000 * 24 * 60 * 60;

export const oneWeekMs: number = oneDayMs * 7;

export const convertToDate: (timeInMs: number) => string = (timeInMs) => {
  return `${new Date(timeInMs).getDate()}/${new Date(timeInMs).getMonth() + 1}/${new Date(
    timeInMs
  ).getFullYear()}`;
};
