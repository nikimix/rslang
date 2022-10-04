import { Word } from '../Interfaces/word-model';
import Services from '../Interfaces/services';
import BaseComponent from '../Abstract/base-component';
import { baseUrl, createDifficultUserWord, createEasyUserWord, deleteUserWord } from '../Model/getTextbook';
import ButtonAudioTextbook from './button-audio-textbook';

export default class TextBookCart extends BaseComponent {
  private addToDif: HTMLElement;

  private addToEasy: HTMLElement;

  private deleteWord: HTMLElement;

  constructor(
    private readonly parent: HTMLElement,
    private readonly services: Services,
    private readonly wordData: Word,
    isHard = false,
    isEasy = false
  ) {
    super('div', 'textbook__cart cart');
    this.addToDif = new BaseComponent('button', 'cart__dif button').element;
    this.addToEasy = new BaseComponent('button', 'cart__easy button').element;
    this.deleteWord = new BaseComponent('button', 'cart__del button').element;
    if (isHard) this.addToDif.classList.add('cart__dif--cheked');
    if (isEasy) this.addToEasy.classList.add('cart__easy--cheked');
  }

  render = () => {
    if (this.children.length) {
      console.log('got ya');
      super.destroy();
    }

    const img = new BaseComponent('img', 'cart__image').element as HTMLImageElement;
    img.src = baseUrl + this.wordData.image;
    img.alt = this.wordData.word;
    const info = new BaseComponent('div', 'cart__info').element;
    const word = new BaseComponent('p', 'cart__word').element;
    const level = new BaseComponent('span', `cart__level cart__level--${this.wordData.group + 1}`).element;
    level.title = `Уровень сложности: ${this.wordData.group + 1}`;
    word.textContent = `${this.wordData.word} – ${this.wordData.transcription}`;

    this.children.push(
      new ButtonAudioTextbook(
        word,
        this.services,
        [this.wordData.audio, this.wordData.audioExample, this.wordData.audioMeaning],
        this.wordData.id
      )
    );

    word.prepend(level);
    this.children.forEach((item) => {
      item.render();
    });

    const translate = new BaseComponent('p', 'cart__translate').element;
    translate.textContent = this.wordData.wordTranslate;
    const textMeaning = new BaseComponent('p', 'cart__english').element;
    textMeaning.innerHTML = this.wordData.textMeaning;
    const textMeaningTranslate = new BaseComponent('p', 'cart__translate').element;
    textMeaningTranslate.textContent = this.wordData.textMeaningTranslate;
    const textExample = new BaseComponent('p', 'cart__english').element;
    textExample.innerHTML = this.wordData.textExample;
    const textExampleTranslate = new BaseComponent('p', 'cart__translate').element;
    textExampleTranslate.textContent = this.wordData.textExampleTranslate;
    info.append(word, translate, textMeaning, textMeaningTranslate, textExample, textExampleTranslate);
    this.element.append(img, info);
    this.element.id = this.wordData.id;
    if (localStorage.getItem('userInfoTokken')) {
      const btnsWrapper = new BaseComponent('div', 'cart__btns').element;

      const { addToDif } = this;
      const { addToEasy } = this;
      addToDif.title = 'Пометить как сложное';
      addToEasy.title = 'Пометить как изученое';
      if (addToDif.classList.contains('cart__dif--cheked')) {
        addToDif.addEventListener('click', this.delete.bind(this));
      } else {
        addToDif.addEventListener('click', this.addWordToDif.bind(this));
      }
      if (addToEasy.classList.contains('cart__easy--cheked')) {
        addToEasy.addEventListener('click', this.delete.bind(this));
      } else {
        addToEasy.addEventListener('click', this.addWordToEasy.bind(this));
      }
      btnsWrapper.append(addToDif, addToEasy);
      // const { deleteWord } = this;
      // deleteWord.title = 'Удалить слово';
      // deleteWord.addEventListener('click', this.delete.bind(this));
      // btnsWrapper.append(deleteWord);

      this.element.append(btnsWrapper);
    }

    this.parent.appendChild(this.element);
  };

  addWordToDif(): void {
    this.addToDif = this.removeListeners(this.addToDif);
    this.addToEasy = this.removeListeners(this.addToEasy);
    this.addToDif.addEventListener('click', this.delete.bind(this));
    this.addToEasy.addEventListener('click', this.addWordToEasy.bind(this));

    if (this.addToEasy.classList.contains('cart__easy--cheked')) {
      createDifficultUserWord(this.wordData.id, true);
    } else {
      createDifficultUserWord(this.wordData.id);
    }
    this.addToDif.classList.add('cart__dif--cheked');
    this.addToEasy.classList.remove('cart__easy--cheked');
    this.addToDif.title = 'Убрать из сложного';
    this.addToEasy.title = 'Пометить как изученое';
  }

  addWordToEasy(): void {
    this.addToDif = this.removeListeners(this.addToDif);
    this.addToEasy = this.removeListeners(this.addToEasy);
    this.addToDif.addEventListener('click', this.addWordToDif.bind(this));
    this.addToEasy.addEventListener('click', this.delete.bind(this));

    if (this.addToDif.classList.contains('cart__dif--cheked')) {
      createEasyUserWord(this.wordData.id, true);
    } else {
      createEasyUserWord(this.wordData.id);
    }

    this.addToDif.classList.remove('cart__dif--cheked');
    this.addToEasy.classList.add('cart__easy--cheked');
    this.addToDif.title = 'Пометить как сложное';
    this.addToEasy.title = 'Убрать из изученного';
  }

  delete(): void {
    this.addToDif.classList.remove('cart__dif--cheked');
    this.addToEasy.classList.remove('cart__easy--cheked');
    this.addToDif = this.removeListeners(this.addToDif);
    this.addToEasy = this.removeListeners(this.addToEasy);
    this.addToDif.addEventListener('click', this.addWordToDif.bind(this));
    this.addToEasy.addEventListener('click', this.addWordToEasy.bind(this));
    this.addToDif.title = 'Пометить как сложное';
    this.addToEasy.title = 'Пометить как изученое';

    deleteUserWord(this.wordData.id);
  }

  removeListeners(element: HTMLElement): HTMLElement {
    const newElement = element.cloneNode(true) as HTMLElement;
    if (element.parentNode) element.parentNode.replaceChild(newElement, element);
    return newElement;
  }
}
