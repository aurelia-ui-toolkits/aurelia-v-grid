'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  "use strict";

  var inject, noView, customElement, processContent, Container, TargetInstruction, bindable, ViewSlot, VGrid, _dec, _dec2, _dec3, _dec4, _class, VGridElementRowRepeat;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      noView = _aureliaFramework.noView;
      customElement = _aureliaFramework.customElement;
      processContent = _aureliaFramework.processContent;
      Container = _aureliaFramework.Container;
      TargetInstruction = _aureliaFramework.TargetInstruction;
      bindable = _aureliaFramework.bindable;
      ViewSlot = _aureliaFramework.ViewSlot;
    }, function (_vGrid) {
      VGrid = _vGrid.VGrid;
    }],
    execute: function () {
      _export('VGridElementRowRepeat', VGridElementRowRepeat = (_dec = noView(), _dec2 = customElement('v-grid-row-repeat'), _dec3 = processContent(function (compiler, resources, element, instruction) {

        var headerTemplateElement = element.getElementsByTagName("V-HEADER-TEMPLATE")[0];
        var headerTemplateHtml = headerTemplateElement ? headerTemplateElement.innerHTML : null;
        if (headerTemplateHtml !== '') {
          instruction.headerTemplate = headerTemplateHtml;
        }

        var rowTemplateElement = element.getElementsByTagName("V-ROW-TEMPLATE")[0];
        var rowTemplateHtml = rowTemplateElement ? rowTemplateElement.innerHTML : null;
        if (rowTemplateHtml !== '') {
          instruction.rowTemplate = rowTemplateHtml;
        }

        if (!rowTemplateHtml) {
          instruction.rowTemplate = element.innerHTML;
        }

        element.innerHTML = '';
      }), _dec4 = inject(Element, VGrid, TargetInstruction), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = function () {
        function VGridElementRowRepeat(element, vGrid, targetInstruction) {
          _classCallCheck(this, VGridElementRowRepeat);

          this.element = element;
          this.vGrid = vGrid;
          this.rowTemplate = targetInstruction.elementInstruction.rowTemplate;
          this.headerTemplate = targetInstruction.elementInstruction.headerTemplate;
        }

        VGridElementRowRepeat.prototype.bind = function bind(bindingContext) {
          this.bindingContext = bindingContext;
          this.vGrid.vGridConfig.repeater = true;
          this.vGrid.vGridConfig.repeatRowTemplate = this.rowTemplate;
          this.vGrid.vGridConfig.repeatRowHeaderTemplate = this.headerTemplate;
        };

        return VGridElementRowRepeat;
      }()) || _class) || _class) || _class) || _class));

      _export('VGridElementRowRepeat', VGridElementRowRepeat);
    }
  };
});