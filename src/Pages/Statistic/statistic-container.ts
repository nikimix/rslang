import Services from '../../Interfaces/services';
import BaseComponent from '../../Abstract/base-component';
import StatisticSprint from './statistic-sprint';
import StatisticAudioCall from './statistic-audio-call';
import StatisticBook from './statistic-book';

export default class StatisticContainer extends BaseComponent {
  private statisticSprint?: StatisticSprint;

  private statisticAudioCall?: StatisticAudioCall;

  private statisticBook?: StatisticBook;

  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('div', 'statistic-container');
  }

  render = () => {
    this.children = [
      (this.statisticSprint = new StatisticSprint(this.element, this.services)),
      (this.statisticAudioCall = new StatisticAudioCall(this.element, this.services)),
      (this.statisticBook = new StatisticBook(this.element, this.services)),
    ];
    this.statisticSprint.render();
    this.statisticAudioCall.render();
    this.statisticBook.render();

    this.parent.appendChild(this.element);
  };
}
