import { Word } from '../Interfaces/word-model';

const BASE_URL = 'https://rs-learn-words.herokuapp.com';

export default async (level: number, page: number): Promise<Word[]> => {
  const response = await fetch(`${BASE_URL}/words/?level=${level}&page=${page}`);
  const words: Word[] = await response.json();
  return words;
};
