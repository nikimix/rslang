import BaseComponent from '../../Abstract/base-component';
import { getUsersWords } from '../../Model/getTextbook';
import Services from '../../Interfaces/services';
import TextBookCart from '../../Components/textbook-cart';

export default class VocabularyPage extends BaseComponent {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('section', 'textbook');
  }

  render = () => {
    super.destroy();
    this.parent.innerHTML = '';
    this.element.innerHTML = '';
    const header = new BaseComponent('h2', 'textbook__title').element;
    const carts = new BaseComponent('div', 'textbook__carts').element;
    const settings = new BaseComponent('div', 'textbook__settings').element;
    const returnLink = new BaseComponent('a', 'settings__link').element as HTMLLinkElement;
    returnLink.textContent = 'Учебник';
    returnLink.href = '#/book';
    settings.append(returnLink);
    settings.style.textAlign = 'center';
    header.textContent = 'Сложные слова';
    this.drawWords(carts);
    this.element.append(header, settings, carts);
    this.parent.appendChild(this.element);
  };

  async drawWords(parent: HTMLElement): Promise<void> {
    const words = await getUsersWords();
    words.forEach((userWord) => {
      if (userWord.optional?.word && parent instanceof HTMLElement && userWord.difficulty === 'hard') {
        const word = userWord.optional?.word;
        new TextBookCart(parent, this.services, word, true).render();
      }
    });
  }
}
