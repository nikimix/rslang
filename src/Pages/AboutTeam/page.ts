import Services from '../../Interfaces/services';
import Team from './team';

export default class TeamPage {
  constructor(private parent: HTMLElement, private services: Services) {}

  render = () => {
    this.parent.innerHTML = '';
    new Team(this.parent, this.services).render();
  };
}
