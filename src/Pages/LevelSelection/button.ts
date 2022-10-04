import BaseComponent from '../../Abstract/base-component';
import Services from '../../Interfaces/services';

interface IButtonSelectProps {
  className: string;
  content: string;
  group: string;
}

export default class ButtonSelect extends BaseComponent<HTMLButtonElement> {
  constructor(
    private readonly parent: HTMLElement,
    private readonly services: Services,
    private props: IButtonSelectProps
  ) {
    super('button', `${props.className}`);
  }

  render = () => {
    this.element.textContent = this.props.content;
    this.element.setAttribute('data-group', this.props.group);
    this.element.classList.add('level-btn');
    this.element.addEventListener('click', this.selectLevel);
    this.parent.appendChild(this.element);
  };

  selectLevel = () => {
    const { group } = this.element.dataset;
    if (group) {
      this.services.levelSelection.getWordsByLevel(+group);
    } else {
      throw new Error('group is undefined');
    }
  };
}
