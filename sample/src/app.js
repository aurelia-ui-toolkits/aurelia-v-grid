export class App {
  configureRouter(config, router) {
    config.title = 'v-grid';

    config.map([
      { name: 'about', route: ['', 'about'], moduleId: 'about/about', title: 'About', nav: true },
      { name: 'installation', route: 'installation', moduleId: 'installation/installation', title: 'Installation', nav: true },
      { name: 'samples', route: 'samples', moduleId: 'samples/samples', title: 'Samples', nav: true }
    ]);

    this.router = router;
  }
}
