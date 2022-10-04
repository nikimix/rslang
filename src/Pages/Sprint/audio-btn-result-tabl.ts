import BaseComponent from '../../Abstract/base-component';
import Services from '../../Interfaces/services';

export default class AudioBtnResultTable extends BaseComponent<HTMLButtonElement> {
  constructor(private readonly parent: HTMLElement, private readonly services: Services, private src: string) {
    super('button', 'result-table__audio-btn');
  }

  render = () => {
    this.element.addEventListener('click', this.playAudioWord);
    this.element.textContent = '🔊';
    this.parent.prepend(this.element);
  };

  destroy = () => {
    this.element.removeEventListener('click', this.playAudioWord);
    super.destroy();
  };

  playAudioWord = () => {
    this.services.sprint.playWordResulTable(this.src);
  };
}
