import Services from '../../Interfaces/services';
import BaseComponent from '../../Abstract/base-component';
import ResultsWrapper from './game-results-wrapper';

export default class ResultsGameSprint extends BaseComponent<HTMLDivElement> {
  private title?: BaseComponent;

  private info?: BaseComponent;

  private results?: ResultsWrapper;

  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('div', 'game__results');
  }

  render = () => {
    this.services.sprint.add('hide-results-sprint', this.hideResult);
    this.services.sprint.add('upgrade-results-sprint', this.upgrade);
    this.services.sprint.add('show-results-sprint', this.showResult);
    this.children = [
      (this.title = new BaseComponent('h6', 'results__title')),
      (this.results = new ResultsWrapper(this.element, this.services)),
    ];

    this.title.element.innerHTML = 'Pезультаты игры';
    this.element.prepend(this.title.element);
    this.results.render();
    this.parent.appendChild(this.element);
  };

  destroy = () => {
    this.services.sprint.remove('hide-results-sprint', this.hideResult);
    this.services.sprint.remove('upgrade-results-sprint', this.upgrade);
    this.services.sprint.remove('show-results-sprint', this.showResult);
    super.destroy();
  };

  hideResult = () => {
    this.element.style.display = 'none';
  };

  showResult = () => {
    // if (this.element.previousElementSibling) {
    //   this.element.previousElementSibling.remove();
    // }
    this.element.style.display = 'block';
    this.services.statistic.updateStats();
  };

  upgrade = () => {
    this.destroy();
    this.render();
  };
}
