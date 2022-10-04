import Observer from '../Abstract/observer';
import getWords from '../Model/data-base';
import { getRandomInteger } from '../Helper/utils';
import State from '../Model/state';
import { Word } from '../Interfaces/word-model';

export default class LevelSelectionService extends Observer {
  firstPage = 0;

  lastPage = 29;

  gamePath = '';

  isAutorise = false;

  getWordsByLevel = async (level: number) => {
    const page = getRandomInteger(this.firstPage, this.lastPage);
    const words = await getWords(level, page);
    this.updateState(level, page, words);
    this.startSelectedGame();
  };

  updateState = (level: number, page: number, words: Word[]) => {
    State.currentPage = page;
    State.currentLevel = level;
    State.words = words;
    localStorage.setItem('state', JSON.stringify(State));
  };

  startSelectedGame = () => {
    document.location.href = this.gamePath;
  };
}
