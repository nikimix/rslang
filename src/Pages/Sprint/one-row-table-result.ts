import Services from '../../Interfaces/services';
import BaseComponent from '../../Abstract/base-component';
import { Word } from '../../Interfaces/word-model';
import CellTableAudio from './cell-tabl-audio';

export default class OneRowTable extends BaseComponent {
  private audio?: CellTableAudio;

  private wordEngl?: BaseComponent;

  private transcription?: BaseComponent;

  private translate?: BaseComponent;

  constructor(private readonly parent: HTMLElement, private readonly services: Services, private wordFull: Word) {
    super('tr', 'result-table__row');
  }

  render = () => {
    this.children = [
      (this.audio = new CellTableAudio(this.element, this.services, this.wordFull.audio)),
      (this.wordEngl = new BaseComponent('td', 'table__word')),
      (this.transcription = new BaseComponent('td', 'table__word-transcription')),
      (this.translate = new BaseComponent('td', 'table__word')),
    ];
    this.audio.render();
    this.wordEngl.element.innerHTML = `${this.wordFull.word}`;
    this.transcription.element.innerHTML = `${this.wordFull.transcription}`;
    this.translate.element.innerHTML = `${this.wordFull.wordTranslate}`;

    this.element.append(this.wordEngl.element, this.transcription.element, this.translate.element);

    this.parent.appendChild(this.element);
  };
}
