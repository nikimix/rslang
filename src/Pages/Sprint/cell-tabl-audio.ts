import BaseComponent from '../../Abstract/base-component';
import AudioBtnResultTable from './audio-btn-result-tabl';
import Services from '../../Interfaces/services';

export default class CellTableAudio extends BaseComponent {
  private audio?: AudioBtnResultTable;

  constructor(private readonly parent: HTMLElement, private readonly services: Services, private src: string) {
    super('td', 'table__audio');
  }

  render = () => {
    this.children = [(this.audio = new AudioBtnResultTable(this.element, this.services, this.src))];
    this.audio.render();
    this.parent.appendChild(this.element);
  };
}
