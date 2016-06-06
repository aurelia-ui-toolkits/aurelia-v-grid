import * as components from './components.json!json';

export class ComponentService {
  constructor() {
    this.components = components;
  }

  getIterableComponents(hideEmptyCategories = false) {
    let categories = [];
    for (let cat of Object.keys(this.components)) {
      if (cat !== 'default') {
        let category = {
          title: cat,
          controls: []
        };
        let cfg = this.components[cat];
        for (let title of Object.keys(cfg)) {
          let ctrl = {
            title,
            status: cfg[title].status
          };
          if (cfg[title].status && cfg[title].nav !== false) {
            ctrl.link = `#/samples/${cfg[title].moduleId || title.toLowerCase()}`;
          }
          category.controls.push(ctrl);
        }
        if (!hideEmptyCategories || category.controls.some(c => !!c.link)) {
          categories.push(category);
        }
      }
    }
    return categories;
  }

  getRouterConfig() {
    let routes = [];
    for (let cat of Object.keys(this.components)) {
      let cfg = this.components[cat];
      for (let title of Object.keys(cfg)) {
        if (cfg[title].status && cfg[title].nav !== false) {
          let shortModuleId = cfg[title].moduleId || title.toLowerCase();
          let moduleId = `samples/${shortModuleId}/index`;
          routes.push({ name: shortModuleId, route: shortModuleId, moduleId, title });
        }
      }
    }
    return routes;
  }
}
