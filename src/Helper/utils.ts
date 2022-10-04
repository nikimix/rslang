export function getRandomInteger(first: number, second: number): number {
  const min = Math.ceil(first < second ? first : second);
  const max = Math.floor(second > first ? second : first);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const getDate = () => {
  const day = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  return `${day}-${month}-${year}`;
};
