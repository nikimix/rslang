/* eslint-disable prefer-destructuring */
import Services from '../../Interfaces/services';
import BaseComponent from '../../Abstract/base-component';
import ButtonWithCallback from '../../Components/button-component';
import AudioBtnGameSprint from './audio-btn';
import State from '../../Model/state';

export default class FieldGame extends BaseComponent {
  private wrapperWordAudio?: BaseComponent;

  private fieldWords?: BaseComponent;

  private audioBtnGameSprint?: AudioBtnGameSprint;

  private wordEnglish?: BaseComponent;

  private wordRus?: BaseComponent;

  private wrapperbutton?: BaseComponent;

  private buttonFalse?: ButtonWithCallback;

  private buttonTrue?: ButtonWithCallback;

  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('div', 'game__field');
  }

  render = () => {
    this.children = [
      (this.wrapperWordAudio = new BaseComponent('div', 'game__wrapper-word-audio')),
      (this.fieldWords = new BaseComponent('div', 'game__words words')),
      (this.audioBtnGameSprint = new AudioBtnGameSprint(this.wrapperWordAudio.element, this.services)),
      (this.wordEnglish = new BaseComponent('h6', 'words__eng')),
      (this.wordRus = new BaseComponent('h6', 'words__rus')),
      (this.wrapperbutton = new BaseComponent('div', 'game__wrapper-btn')),
      (this.buttonFalse = new ButtonWithCallback(
        this.wrapperbutton.element,
        this.services,
        'game__btn_false',
        'неверно ⇽',
        'button',
        this.services.sprint.btnFalseClick
      )),
      (this.buttonTrue = new ButtonWithCallback(
        this.wrapperbutton.element,
        this.services,
        'game__btn_true',
        'верно  ⇾',
        'button',
        this.services.sprint.btnTrueClick
      )),
    ];

    this.audioBtnGameSprint.render();
    this.wrapperWordAudio.element.prepend(this.fieldWords.element);

    this.wordEnglish.element.innerHTML = `${this.services.sprint.currentWord.word}`;
    this.wordRus.element.innerHTML = `${this.services.sprint.currentWord.wordTranslate}`;
    this.fieldWords.element.append(this.wordEnglish.element, this.wordRus.element);

    this.buttonFalse.render();

    this.buttonTrue.render();

    this.services.sprint.add('btn-true-active-style', this.btnTrueActiveStyle);
    this.services.sprint.add('btn-false-active-style', this.btnFalseActiveStyle);
    this.services.sprint.add('write-word-game', this.writeWordGame);
    this.services.sprint.add('show-filed-game', this.showFiledGame);
    this.services.sprint.add('hide-filed-game', this.hideFiledGame);
    this.element.prepend(this.wrapperWordAudio.element, this.wrapperbutton.element);
    this.parent.appendChild(this.element);
  };

  showFiledGame = () => {
    this.element.style.display = 'flex';
    this.services.sprint.resetSettingGame();
  };

  hideFiledGame = () => {
    this.element.style.display = 'none';
  };

  writeWordGame = () => {
    const englWordrusWord = this.services.sprint.getNewWord();

    if (englWordrusWord) {
      this.element.children[0].children[0].children[0].innerHTML = englWordrusWord[0];
      this.element.children[0].children[0].children[1].innerHTML = englWordrusWord[1];
    }
    if (this.services.sprint.currentArrayWordsGame.length === 0) {
      if (State.textbook.fromTextbook) {
        this.services.sprint.getNewPagesWordFromBook();
      } else {
        this.services.sprint.getNewPagesWordRandom();
      }
    }
  };

  destroy = () => {
    this.services.sprint.remove('btn-true-active-style', this.btnTrueActiveStyle);
    this.services.sprint.remove('btn-false-active-style', this.btnFalseActiveStyle);
    this.services.sprint.remove('write-word-game', this.writeWordGame);
    this.services.sprint.remove('show-filed-game', this.showFiledGame);
    this.services.sprint.remove('hide-filed-game', this.hideFiledGame);
    super.destroy();
  };

  btnTrueActiveStyle = () => {
    this.element.children[1].children[0].classList.remove('active');
    this.element.children[1].children[1].classList.add('active');
  };

  btnFalseActiveStyle = () => {
    this.element.children[1].children[0].classList.add('active');
    this.element.children[1].children[1].classList.remove('active');
  };
}
