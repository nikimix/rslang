import Observer from '../Abstract/observer';
import { Word } from '../Interfaces/word-model';
import State from '../Model/state';
import { getRandomInteger, shuffle } from '../Helper/utils';

export default class AudioСallService extends Observer {
  private baseUrl = 'https://rs-learn-words.herokuapp.com/';

  private readonly amountTranslateOptions = 3;

  private selectedAnswer = '';

  private words: Word[] = [];

  private readonly signalCorrect = new Audio('../assets/audio/correct.mp3');

  private readonly signalError = new Audio('../assets/audio/error.mp3');

  counter = 1;

  private word?: Word;

  private series = 0;

  getWord() {
    if (this.word) {
      return this.word;
    }
    throw new Error();
  }

  setWords() {
    this.words = [...State.words];
    this.word = this.words.pop();
  }

  setNameGame = () => {
    const { nameGame } = State.gamesData;
    if (nameGame !== 'audioCall') {
      State.gamesData.nameGame = 'audioCall';
    }
  };

  resetGameData = () => {
    State.gamesData.correctAnswers = [];
    State.gamesData.wrongAnswers = [];
    State.gamesData.series = 0;
    this.counter = 1;
  };

  nextWord = () => {
    this.word = this.words?.pop();
    if (this.word) {
      this.counter += 1;
      this.dispatch('next-word');
      this.playAudio(this.word.audio);
    } else {
      this.dispatch('stop-game');
    }
  };

  switchScreenMode = () => {
    if (!document.fullscreenElement) {
      this.dispatch('full-screen');
    } else {
      this.dispatch('default-screen');
    }
  };

  playAudio = (path = this.word?.audio) => {
    const audio = new Audio(`${this.baseUrl}${path}`);
    audio.addEventListener('ended', this.stopAudio);
    audio.play().catch((e) => console.log(e));
    this.dispatch('play-audio');
  };

  stopAudio = () => {
    this.dispatch('stop-audio');
  };

  showWordCard() {
    if (this.word) {
      this.dispatch('show-answer', this.word.wordTranslate, this.selectedAnswer);
    }
  }

  onClickShowOrNext = (state: string) => {
    if (state === 'dont-know') {
      this.checkAnswer();
    } else {
      this.nextWord();
    }
  };

  checkAnswer(answer = '') {
    if (this.word) {
      const isCorrect = this.word.wordTranslate === answer;
      this.selectedAnswer = answer;
      if (isCorrect) {
        State.gamesData.correctAnswers.push(this.word);
      } else {
        State.gamesData.wrongAnswers.push(this.word);
      }
      if (answer) {
        this.playSignal(isCorrect);
      }
      this.showWordCard();
      this.setCorrectAnswersSeries(isCorrect);
    }
  }

  setCorrectAnswersSeries = (answer: boolean) => {
    if (answer) {
      this.series += 1;
    } else {
      this.series = 0;
    }
    const bestSeries = State.gamesData.series;
    State.gamesData.series = this.series > bestSeries ? this.series : bestSeries;
  };

  playSignal(answer: boolean) {
    if (answer) {
      this.signalCorrect.play();
    } else {
      this.signalError.play();
    }
  }

  getTranslateOptions() {
    if (!this.word) {
      throw new Error();
    }
    const translateOptions: Set<string> = new Set([this.word.wordTranslate]);
    for (let i = 0; i < this.amountTranslateOptions; ) {
      const idx = getRandomInteger(0, State.words.length);
      if (!translateOptions.has(State.words[idx].wordTranslate)) {
        translateOptions.add(State.words[idx].wordTranslate);
        i += 1;
      }
    }
    return shuffle<string>(Array.from(translateOptions.values()));
  }

  exitGame = () => {
    this.dispatch('exit-game');
  };
}
