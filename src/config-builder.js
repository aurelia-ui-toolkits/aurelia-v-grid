/**
* Plugin configuration builder
*/
export class ConfigBuilder {

  globalResources = [];

  useAll() : ConfigBuilder {
    return this.useClickCounter();
  }

  useClickCounter(): ConfigBuilder {
    this.globalResources.push('./click-counter');
    return this;
  }
}
