export default class BaseComponent<E extends HTMLElement = HTMLElement> {
  readonly element: HTMLElement;

  protected children: BaseComponent[] = [];

  constructor(tag: keyof HTMLElementTagNameMap = 'div', classes?: string) {
    const el = <E>document.createElement(tag);

    if (classes) {
      el.className = classes;
    }
    this.element = el;
  }

  render(): void {}

  destroy(): void {
    this.children.forEach((element) => {
      element.destroy();
    });
    this.children = [];
    this.element.remove();
  }
}
