import Services from '../../Interfaces/services';
import BaseComponent from '../../Abstract/base-component';
import { Word } from '../../Interfaces/word-model';
import OneRowTable from './one-row-table-result';

export default class TableBodyResultsGame extends BaseComponent<HTMLTableElement> {
  constructor(
    private readonly parent: HTMLElement,
    private readonly services: Services,
    private arrayWordFull: Word[]
  ) {
    super('table', 'result__table');
  }

  render = () => {
    if (this.arrayWordFull) {
      this.arrayWordFull.forEach((word) => {
        new OneRowTable(this.element, this.services, word).render();
      });
    }
    this.parent.appendChild(this.element);
  };
}
