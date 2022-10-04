import BaseComponent from '../../Abstract/base-component';
import Services from '../../Interfaces/services';
import State from '../../Model/state';
import ListStatistics from './list';

export default class ResultsGame extends BaseComponent {
  private title?: BaseComponent;

  private titleWrongAnswers?: BaseComponent;

  private listWrongAnswers?: BaseComponent;

  private titleCorrectAnswers?: BaseComponent;

  private listCorrectAnswers?: BaseComponent;

  private btnPlayAgain?: BaseComponent;

  private btnExit?: BaseComponent;

  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('div', 'game-results');
  }

  render = () => {
    if (this.children.length) {
      this.destroy();
    }

    this.services.statistic.updateStats();

    const { wrongAnswers, correctAnswers } = State.gamesData;

    this.children = [
      (this.btnPlayAgain = new BaseComponent<HTMLButtonElement>('button', 'game-results__btn-play-again btn')),
      (this.btnExit = new BaseComponent<HTMLButtonElement>('button', 'game-results__btn-exit btn')),
      (this.title = new BaseComponent('h1', 'game-results__title')),
      (this.titleWrongAnswers = new BaseComponent(
        'h2',
        'audio-call-statistic__title audio-call-statistic__title--wrong'
      )),
      (this.titleCorrectAnswers = new BaseComponent(
        'h2',
        'audio-call-statistic__title audio-call-statistic__title--correct'
      )),
      (this.listWrongAnswers = new ListStatistics(this.element, this.services, {
        words: wrongAnswers,
        className: 'list-answers list-answers--wrong',
      })),
      (this.listCorrectAnswers = new ListStatistics(this.element, this.services, {
        words: correctAnswers,
        className: 'list-answers list-answers--correct',
      })),
    ];

    this.btnExit.element.addEventListener('click', () => {
      this.destroy();
      document.location.hash = '#/main';
    });
    this.btnPlayAgain.element.addEventListener('click', () => {
      document.location.reload();
    });

    this.element.appendChild(this.btnPlayAgain.element);
    this.element.appendChild(this.btnExit.element);

    this.title.element.textContent = 'Результат';
    this.element.appendChild(this.title.element);

    this.titleCorrectAnswers.element.innerHTML = `Верно: <span>${correctAnswers.length}</span>`;
    this.element.appendChild(this.titleCorrectAnswers.element);
    this.listCorrectAnswers.render();

    this.titleWrongAnswers.element.innerHTML = `Ошибки: <span>${wrongAnswers.length}</span>`;
    this.element.appendChild(this.titleWrongAnswers.element);
    this.listWrongAnswers.render();

    this.parent.appendChild(this.element);
  };
}
