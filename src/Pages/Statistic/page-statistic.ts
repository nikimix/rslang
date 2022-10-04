import Services from '../../Interfaces/services';
import BaseComponent from '../../Abstract/base-component';

export default class StatisticPage extends BaseComponent {
  private statisticContainer?: BaseComponent;

  private title?: BaseComponent;

  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('section', 'statistic-none');
  }

  render = () => {
    this.destroy();
    this.parent.innerHTML = '';
    this.children = [(this.title = new BaseComponent('h6', 'statistic-none__title'))];
    this.title.element.innerHTML = 'Доступ в раздел "Статистика" имеют только авторизированные пользователи';
    this.element.prepend(this.title.element);
    this.parent.appendChild(this.element);
  };
}
