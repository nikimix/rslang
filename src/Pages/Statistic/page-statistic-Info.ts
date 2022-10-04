import Services from '../../Interfaces/services';
import BaseComponent from '../../Abstract/base-component';
import StatisticContainer from './statistic-container';
import State from '../../Model/state';

export default class StatisticInfoPage extends BaseComponent {
  private statisticContainer?: StatisticContainer;

  private title?: BaseComponent;

  private titleDay?: BaseComponent;

  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('section', 'statistic');
  }

  render = async () => {
    State.statistics = await this.services.statistic.getStats();
    this.destroy();
    this.parent.innerHTML = '';
    this.children = [
      (this.statisticContainer = new StatisticContainer(this.element, this.services)),
      (this.title = new BaseComponent('h6', 'statistic__title')),
      (this.titleDay = new BaseComponent('h6', 'statistic__title_day')),
    ];
    this.title.element.innerHTML = 'Статистика';
    this.titleDay.element.innerHTML = 'за день';
    this.statisticContainer.render();
    this.element.prepend(this.title.element, this.titleDay.element, this.statisticContainer.element);
    this.parent.appendChild(this.element);
  };
}
