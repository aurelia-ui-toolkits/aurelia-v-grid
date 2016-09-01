'use strict';

System.register(['aurelia-framework', './config-builder'], function (_export, _context) {
  "use strict";

  var Aurelia, ConfigBuilder;
  function configure(aurelia, configCallback) {
    var builder = new ConfigBuilder();

    if (configCallback !== undefined && typeof configCallback === 'function') {
      configCallback(builder);
    }

    aurelia.globalResources(builder.globalResources);
  }

  _export('configure', configure);

  return {
    setters: [function (_aureliaFramework) {
      Aurelia = _aureliaFramework.Aurelia;
    }, function (_configBuilder) {
      ConfigBuilder = _configBuilder.ConfigBuilder;
    }],
    execute: function () {}
  };
});