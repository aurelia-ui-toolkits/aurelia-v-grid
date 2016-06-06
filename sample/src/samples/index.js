import {inject} from 'aurelia-framework';
import {Registry} from 'shared/registry';
import { ComponentService } from '../shared/component-service';

@inject(Registry, ComponentService)
export class Index {

  constructor(registry, componentService) {
    this.registry = registry;
    this.componentService = componentService;
    this.routerConfig = componentService.getRouterConfig(true);
  }
  configureRouter(config, router) {
    config.title = 'Samples';

    // config.map([
    //   { name: 'default', route: '', redirect: 'click-counter' },
    //   { name: 'click-counter', route: 'click-counter', moduleId: './click-counter/index', title: 'Click-counter' },
    //   { name: 'navbar', route: 'navbar', moduleId: './navbar/index', title: 'Navbar' },
    //   { name: 'navs', route: 'navs', moduleId: './navs/index', title: 'Navs' },
    //   { name: 'button', route: 'button', moduleId: './button/index', title: 'Button' },
    //   { name: 'collapse', route: 'collapse', moduleId: './collapse/index', title: 'Collapse' },
    //   { name: 'panel', route: 'panel', moduleId: './panel/index', title: 'Panel' }
    // ]);
    this.routerConfig.unshift({ name: 'default', route: '', redirect: 'click-counter' });
    config.map(this.routerConfig);
    this.router = router;
  }
}
