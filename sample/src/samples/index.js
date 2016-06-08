export class MainIndex {
  configureRouter(config, router) {
    config.title = 'Samples';
    config.map([
      { name: 'simple-html-col', route: 'simple-html-col', moduleId: './simple-html-col/index', nav: true, title: 'Column config-> Simple Html' },
      { name: 'column-bind', route: 'column-bind', moduleId: './column-bind/index', nav: true, title: 'Column config-> "column.bind"' },
      { name: 'custom-html', route: 'custom-html', moduleId: './custom-html/index', nav: true, title: 'Column config-> Custom Html' },
      { name: 'row-repeat', route: 'row-repeat', moduleId: './row-repeat/index', nav: true, title: 'no column -> row repeat' },
      { name: 'other', route: 'other', moduleId: './other/index', nav: true, title: 'other' },
      { name: 'default', route: '', redirect: 'simple-html-col' }
    ]);
    this.router = router;
  }
}
