import Services from '../Interfaces/services';
import BaseComponent from '../Abstract/base-component';
import { ILinkGitHub } from '../Interfaces/common';

export default class LinkGitHub extends BaseComponent {
  constructor(
    private readonly parent: HTMLElement,
    private readonly services: Services,
    private linkGitHub: ILinkGitHub,
    private classAnchor: string,
    private classImg: string,
    private colorImg: string
  ) {
    super('a', classAnchor);
  }

  render = () => {
    const { src, imgWhite, imgBlack } = this.linkGitHub;
    this.element.setAttribute('href', src);

    const logoGitHub = new BaseComponent('img', this.classImg).element;
    logoGitHub.setAttribute('src', this.colorImg === 'white' ? imgWhite : imgBlack);
    logoGitHub.setAttribute('alt', 'link gitHub');
    this.element.append(logoGitHub);
    this.parent.append(this.element);
  };
}
