import {useView, inject} from 'aurelia-framework';
import {Registry} from 'shared/registry';
import {SampleStateService, developmentStyle} from 'shared/sample-state-service';

@useView('shared/showcase.html')
@inject(Registry, SampleStateService)
export class Index {

  constructor(registry, sampleStateService) {
    this.registry = registry;
    this.sampleStateService = sampleStateService;
    this.styles = [];
    this.activeStyle = this.sampleStateService.getStyle();
    Object.keys(developmentStyle).forEach(key => {
      this.styles.push(developmentStyle[key]);
    });
  }

  configureRouter(config, router) {
    this.router = router;

    return this.registry.load(config, 'v-grid');
  }

  setStyle(style) {
    this.sampleStateService.setStyle(style);
    this.activeStyle = this.sampleStateService.getStyle();
  }
}
