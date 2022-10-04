import Observer from '../Abstract/observer';
import { IRouterService } from '../Interfaces/common';

export default class RouterService extends Observer implements IRouterService {
  router = '';

  setRouter(router: string): void {
    this.router = router;
    this.dispatch('router', this.router);
  }
}
