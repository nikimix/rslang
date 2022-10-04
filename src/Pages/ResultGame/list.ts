import BaseComponent from '../../Abstract/base-component';
import Services from '../../Interfaces/services';
import { Word } from '../../Interfaces/word-model';
import StatisticsListItem from './list-item';

interface IListStatisticsProps {
  words: Word[];
  className: string;
}

export default class ListStatistics extends BaseComponent {
  constructor(
    private readonly parent: HTMLElement,
    private readonly services: Services,
    private props: IListStatisticsProps
  ) {
    super('ul', props.className);
  }

  render = () => {
    this.props.words.forEach((item, idx) => {
      this.children.push(new StatisticsListItem(this.element, this.services, item));
      this.children[idx].render();
    });

    this.parent.appendChild(this.element);
  };
}
