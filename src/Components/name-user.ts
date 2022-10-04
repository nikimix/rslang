import BaseComponent from '../Abstract/base-component';
import Services from '../Interfaces/services';
//  import State from '../Model/state';

export default class NameUser extends BaseComponent {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('p', 'header__txt_name-user');
  }

  render = () => {
    this.element.textContent = localStorage.getItem('userInfoTokken')
      ? JSON.parse(localStorage.getItem('userInfoTokken') as string).name
      : this.services.form.user.name;

    // this.element.textContent = localStorage.getItem('userInfoEnter')
    //  ? JSON.parse(localStorage.getItem('userInfoEnter') as string).user.name
    //  : this.services.form.userInfoAutorise.name;

    this.services.form.add('show-user-name', this.showNameUser);
    this.parent.appendChild(this.element);
  };

  destroy = () => {
    this.services.form.remove('show-user-name', this.showNameUser);
    super.destroy();
  };

  showNameUser = () => {
    this.element.innerHTML = JSON.parse(localStorage.getItem('userInfoTokken') as string).name;
  };
}
