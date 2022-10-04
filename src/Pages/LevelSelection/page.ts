import BaseComponent from '../../Abstract/base-component';
import Services from '../../Interfaces/services';
import SelectionContainer from './selection-container';

export default class LevelSelection extends BaseComponent {
  private title?: BaseComponent;

  private text?: BaseComponent;

  private selectionContainer?: SelectionContainer;

  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('div', 'level-selection');
  }

  render = () => {
    this.destroy();

    this.parent.innerHTML = '';

    this.children = [
      (this.title = new BaseComponent('h1', 'level-selection__title')),
      (this.text = new BaseComponent('p', 'level-selection__text')),
      (this.selectionContainer = new SelectionContainer(this.element, this.services)),
    ];

    this.title.element.textContent = 'Выберите';

    this.element.appendChild(this.title.element);

    this.text.element.textContent = 'уровень игры';

    this.element.appendChild(this.text.element);

    this.selectionContainer.render();

    this.parent.appendChild(this.element);
  };
}
