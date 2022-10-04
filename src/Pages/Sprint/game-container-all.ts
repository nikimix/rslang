import Services from '../../Interfaces/services';
import BaseComponent from '../../Abstract/base-component';
import HeaderGame from './game-header';
import RuleGame from './game-rule';
import FieldGame from './game-field';
import ResultsGameSprint from './game-results';

export default class GameContainer extends BaseComponent<HTMLDivElement> {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('div', 'game-container');
  }

  render = () => {
    this.children = [
      new HeaderGame(this.element, this.services),
      new RuleGame(this.element, this.services),
      new FieldGame(this.element, this.services),
      new ResultsGameSprint(this.element, this.services),
    ];

    this.children.forEach((element) => {
      element.render();
    });
    this.parent.appendChild(this.element);
  };
}
