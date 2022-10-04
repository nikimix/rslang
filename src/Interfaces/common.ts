import { IUserID, IUserToken } from './user-model';
import { Word } from './word-model';

export interface ILinkProps {
  content: string;
  path: string;
  game?: string;
}
export interface ILinkButtonProps {
  content: string;
  clas: string;
  path: string;
  game?: string;
}
export interface ILinkGitHub {
  src: string;
  imgWhite: string;
  imgBlack: string;
}
export interface IOptionsInput {
  title: string;
  type: string;
  id: string;
  name: string;
}

export interface ICallback {
  (): void;
}
export interface IState {
  userItem: IUserID;
  isAutorise: boolean;
  userInfoAutorise: IUserToken;
  deleteUser: string;
  textbook: ITextbook;
  vocabulary: IVocabulary;
  gamesData: IGameData;
  words: Word[];
  currentPage: number;
  currentLevel: number;
  statistics: IUserStatistic;
}

export interface IGameData {
  nameGame: 'audioCall' | 'sprint';
  correctAnswers: Word[];
  wrongAnswers: Word[];
  series: number;
}
export interface IMenuServise {
  openMenu(): void;
  closeMenu(): void;
  showDarkLayer(): void;
  removeDarkLayer(): void;
}

export interface IRouterService {
  router: string;
  setRouter(router: string): void;
}

export interface IDataBaseServices {
  isAutorise: boolean;
}

export interface IServices {
  menu: IMenuServise;
  router: IRouterService;
  form: IFormService;
}

export interface IFormService {
  userInfoAutorise: IUserToken;
  btnClickAutorise: boolean;
  btnClickEnter: boolean;
  fullAllInput: boolean;
  loadWindow(): void;
  clickAutorise(): void;
  clickEnter(): void;
  openAutoriseForm(): void;
  closeAutoriseForm(): void;
  showNameUser(): void;
  hideExitAutorise(): void;
  showExitAutorise(): void;
  disabledBtnAutorise(): void;
  unDisabledBtnAutorise(): void;
  hideBtnAutorise(): void;
  showBtnAutorise(): void;
  clearInput(): void;
  errorMessage(): void;
  removeErrorMessage(): void;
  showAutoriseError(): void;
  removeAutoriseError(): void;
  clear(): void;
  createNewUser(): void;
  getTokken(): void;
  checkAllInput(): boolean;
  checkInput(input: IFormInputConponent, value: string): void;
  checkPassword(input: IFormInputConponent, val: string): void;
  checkText(input: IFormInputConponent, val: string): void;
  checkEmail(input: IFormInputConponent, val: string): void;
}

export interface IFormInputConponent {
  messageElement?: HTMLElement;
  readonly type: string;
  readonly name: string;
  readonly title: string;
  readonly id: string;
  readonly parent: HTMLElement;
  readonly services: IServices;
  readonly options: IOptionsInput;
  render(): void;
  clear(): void;
  clearInput(): void;
  success(): void;
  error(message: string): void;
  removeErrorMessage(): void;
}

interface ITextbook {
  isPlayed: boolean;
  currentPage: number;
  currentLevel: number;
  fromTextbook: boolean;
}

export interface IGameStats {
  percent: number;
  correct: number;
  wrong: number;
  series: number;
  newWords: number;
}

export interface IStorageStats {
  oldWords: string[];
  learnedWords: string[];
}

export interface IUserStatistic {
  learnedWords: number;
  optional: {
    date: string;
    sprint: IGameStats;
    audioCall: IGameStats;
    words: {
      sumNewWords: number;
      percent: number;
    };
    storage: IStorageStats;
  };
}
interface IVocabulary {
  difficultWords: Word[];
  learningWords: Word[];
  deletedWords: Word[];
}
