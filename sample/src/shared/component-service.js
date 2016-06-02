import * as components from './components.json!json';

export class ComponentService {
  constructor() {
    this.components = components;
  }

  getIterableComponents(hideEmptyCategories = false) {
    let categories = [];
    Object.keys(this.components).forEach(cat => {
      if (cat !== 'default') {
        let category = {
          title: cat,
          controls: []
        };
        let cfg = this.components[cat];
        Object.keys(cfg).forEach(title => {
          let ctrl = {
            title,
            status: cfg[title].status
          };
          if (cfg[title].status && cfg[title].nav !== false) {
            ctrl.link = `#/samples/${cfg[title].moduleId || title.toLowerCase()}`;
          }
          category.controls.push(ctrl);
        });
        if (!hideEmptyCategories || category.controls.some(c => !!c.link)) {
          categories.push(category);
        }
      }
    });
    return categories;
  }

  getRouterConfig() {
    let routes = [];
    Object.keys(this.components).forEach(cat => {
      let cfg = this.components[cat];
      Object.keys(cfg).forEach(title => {
        if (cfg[title].status && cfg[title].nav !== false) {
          let shortModuleId = cfg[title].moduleId || title.toLowerCase();
          let moduleId = `samples/${shortModuleId}/index`;
          routes.push({ name: shortModuleId, route: shortModuleId, moduleId, title });
        }
      });
    });
    return routes;
  }
}
