import BaseComponent from '../../Abstract/base-component';
import Services from '../../Interfaces/services';
import buttonLinkProps from '../../Settings/button-menu.json';
import ButtonLink from './button-main-link';

export default class RightContainerMain extends BaseComponent {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('div', 'main__right-container');
  }

  render = () => {
    const ContainerButtonLink = new BaseComponent('div', 'containerButton').element;
    buttonLinkProps.forEach((link) => new ButtonLink(ContainerButtonLink, this.services, link).render());
    this.element.append(ContainerButtonLink);
    this.parent.appendChild(this.element);
  };
}
