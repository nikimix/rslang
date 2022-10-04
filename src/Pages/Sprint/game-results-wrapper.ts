import BaseComponent from '../../Abstract/base-component';
import TableBodyResultsGame from './game-results-table-body';
import Services from '../../Interfaces/services';
import State from '../../Model/state';

export default class ResultsWrapper extends BaseComponent<HTMLDivElement> {
  private countWordTrue?: BaseComponent;

  private wordTrueTable?: TableBodyResultsGame;

  private countWordFalse?: BaseComponent;

  private wordFalseTable?: TableBodyResultsGame;

  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('div', 'result');
  }

  render = () => {
    this.services.sprint.add('write-results-sprint', this.writeResult);
    this.children = [
      (this.countWordTrue = new BaseComponent('h6', 'results__count')),
      (this.wordTrueTable = new TableBodyResultsGame(this.element, this.services, State.gamesData.correctAnswers)),
      (this.countWordFalse = new BaseComponent('h6', 'results__count')),
      (this.wordFalseTable = new TableBodyResultsGame(this.element, this.services, State.gamesData.wrongAnswers)),
    ];

    this.element.prepend(this.countWordTrue.element);
    this.wordTrueTable.render();
    this.element.append(this.countWordFalse.element);
    this.wordFalseTable.render();
    this.parent.appendChild(this.element);
  };

  destroy = () => {
    this.services.sprint.remove('write-results-sprint', this.writeResult);
    super.destroy();
  };

  writeResult = () => {
    const trueAnswe = State.gamesData.correctAnswers.length;
    const falseAnswe = State.gamesData.wrongAnswers.length;

    this.element.children[0].innerHTML = `Верно:  ${trueAnswe}`;
    this.element.children[2].innerHTML = `Неверно:  ${falseAnswe}`;
  };
}
