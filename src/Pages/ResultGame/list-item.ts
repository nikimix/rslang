import BaseComponent from '../../Abstract/base-component';
import Services from '../../Interfaces/services';
import { Word } from '../../Interfaces/word-model';
import ButtonAudio from '../AudioCall/btn-audio';

export default class StatisticsListItem extends BaseComponent {
  private btnAudion?: BaseComponent;

  private wordText?: BaseComponent;

  constructor(private readonly parent: HTMLElement, private readonly services: Services, private props: Word) {
    super('li', 'list__item');
  }

  render = () => {
    this.children = [
      (this.btnAudion = new ButtonAudio(this.element, this.services, {
        className: 'list-item__btn-audio',
        path: this.props.audio,
      })),
      (this.wordText = new BaseComponent('p', 'list-item__word')),
    ];

    this.wordText.element.innerHTML = `<span class="list-item__word--eng">${this.props.word} - </span>
    <span class="list-item__word--rus">${this.props.wordTranslate}</span>
      `;

    this.btnAudion.render();
    this.element.appendChild(this.wordText.element);
    this.parent.appendChild(this.element);
  };
}
