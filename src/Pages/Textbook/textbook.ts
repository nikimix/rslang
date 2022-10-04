import { Word } from '../../Interfaces/word-model';
import BaseComponent from '../../Abstract/base-component';
import { getUsersWords, getWords } from '../../Model/getTextbook';
import Services from '../../Interfaces/services';
import TextBookCart from '../../Components/textbook-cart';
import TextBookSettings from '../../Components/textbook-settings';
import State from '../../Model/state';

export default class TextbookPage extends BaseComponent {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('section', 'textbook');
  }

  render = () => {
    this.destroy();
    this.parent.innerHTML = ''; // clear the main section
    this.element.innerHTML = ''; // clear the main section
    const title = new BaseComponent<HTMLHeadElement>('h2', 'textbook__title').element;
    const settings = new BaseComponent('div', 'textbook__settings').element;
    this.children.push(new TextBookSettings(settings, this.services));
    title.textContent = 'Учебник';
    const carts = new BaseComponent('div', 'textbook__carts').element;
    this.element.append(title, settings, carts);
    this.parent.appendChild(this.element); // add our section to main
    this.drawWords();
  };

  async drawWords(): Promise<void> {
    this.children[0].render();

    const parent = document.querySelector('.textbook__carts');
    const page = State.textbook.currentPage;
    const group = State.textbook.currentLevel;
    const res = await getWords(page, group);
    const words = (await res.json()) as Word[];
    const userWords = localStorage.getItem('userInfoTokken') ? await getUsersWords() : [];
    const userWordsId = userWords.map((element) => (element.wordId ? element.wordId : ''));
    const container = parent;
    State.words = [...words];
    (this.children[0] as TextBookSettings).setLinks();

    if (container instanceof HTMLElement) container.innerHTML = '';
    words.forEach((word) => {
      if (parent instanceof HTMLElement) {
        const index = userWordsId.indexOf(word.id);
        if (index !== -1) {
          if (userWords[index].difficulty === 'hard')
            this.children.push(new TextBookCart(parent, this.services, word, true));
          if (userWords[index].difficulty === 'weak')
            this.children.push(new TextBookCart(parent, this.services, word, false, true));
        } else {
          this.children.push(new TextBookCart(parent, this.services, word));
        }
      }
    });
    this.children.forEach((elemet, index) => {
      if (index === 0) return;
      elemet.render();
    });
    const pageBox = document.querySelector('.settings__page');
    if (pageBox instanceof HTMLElement) pageBox.textContent = `${State.textbook.currentPage + 1}`;
  }
}
