'use strict';

exports.__esModule = true;
exports.VGrid = exports.VGridSort = exports.VGridSelection = exports.VGridScrollEvents = exports.VGridObservables = exports.VGridMarkupGenerator = exports.VGridGenerator = exports.VGridFilter = exports.VGridElementRowRepeat = exports.VGridElementFooterPager = exports.VGridElementColConfig = exports.VGridCtx = exports.Contextmenu = exports.VGridConfig = exports.vGridAttributesSort = exports.vGridAttributesSelection = exports.vGridAttributesResizeCol = exports.vGridAttributesObserveField = exports.vGridAttributesKeyMove = exports.vGridAttributesImageFix = exports.vGridAttributesFilter = exports.vGridDragDropCol = exports.ContextRowMenu = exports.VGridHeaderMenu = exports.ConfigBuilder = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class2, _dec3, _dec4, _class4, _dec5, _dec6, _class6, _dec7, _dec8, _class7, _dec9, _dec10, _class8, _dec11, _dec12, _class9, _dec13, _dec14, _class10, _dec15, _dec16, _class11, _dec17, _dec18, _class12, _dec19, _dec20, _class13, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _class15, _desc, _value, _class16, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _dec35, _dec36, _class18, _dec37, _dec38, _dec39, _dec40, _class20, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _desc2, _value2, _class26, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _class27, _temp3;

exports.configure = configure;
exports.configure = configure;

var _aureliaFramework = require('aurelia-framework');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConfigBuilder = exports.ConfigBuilder = function ConfigBuilder() {
  _classCallCheck(this, ConfigBuilder);

  this.globalResources = ['./vGrid/v-grid-element-footer-pager', './vGrid/v-grid-element-row-repeat', './vGrid/v-grid-element-col-config', './vGrid/v-grid.js', './vGrid/v-grid-attributes-filter', './vGrid/v-grid-attributes-sort', './vGrid/v-grid-attributes-selection', './vGrid/v-grid-attributes-image', './vGrid/v-grid-attributes-key-move', './vGrid/v-grid-attributes-contextmenu', './vGrid/v-grid-attributes-observe-field', './vGrid/v-grid-attributes-dragDropCol', './vGrid/v-grid-attributes-resize-col'];
};

function configure(aurelia, configCallback) {
  var builder = new ConfigBuilder();

  if (configCallback !== undefined && typeof configCallback === 'function') {
    configCallback(builder);
  }

  aurelia.globalResources(builder.globalResources);
}

function configure(config) {
  config.globalResources('vGrid/v-grid-element-footer-pager', 'vGrid/v-grid-element-row-repeat', 'vGrid/v-grid-element-col-config', 'vGrid/v-grid', 'vGrid/v-grid-attributes-filter', 'vGrid/v-grid-attributes-sort', 'vGrid/v-grid-attributes-selection', 'vGrid/v-grid-attributes-image', 'vGrid/v-grid-attributes-key-move', 'vGrid/v-grid-attributes-contextmenu', 'vGrid/v-grid-attributes-observe-field', 'vGrid/v-grid-attributes-dragDropCol', 'vGrid/v-grid-attributes-resize-col');
}

var VGridHeaderMenu = exports.VGridHeaderMenu = (_dec = (0, _aureliaFramework.customAttribute)('v-header-menu'), _dec2 = (0, _aureliaFramework.inject)(Element, VGrid), _dec(_class2 = _dec2(_class2 = function (_Contextmenu) {
  _inherits(VGridHeaderMenu, _Contextmenu);

  function VGridHeaderMenu() {
    var _temp, _this, _ret;

    _classCallCheck(this, VGridHeaderMenu);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Contextmenu.call.apply(_Contextmenu, [this].concat(args))), _this), _this.classToOpenOn = "vGrid-header-menu", _this.altMenuLogic = null, _temp), _possibleConstructorReturn(_this, _ret);
  }

  VGridHeaderMenu.prototype.menuItemListener = function menuItemListener(link) {
    var value = link.getAttribute("data-action");

    if (this.altMenuLogic) {
      this.filterMenuLogic(value);
    } else {
      this.defaultMenu(value);
    }
  };

  VGridHeaderMenu.prototype.canOpen = function canOpen(e) {
    return true;
  };

  VGridHeaderMenu.prototype.menuHtmlMain = function menuHtmlMain() {
    return this.createMenuHTML([{
      action: "",
      value: "Options",
      isHeader: true
    }, {
      action: "clear-cell",
      value: "Clear cell"
    }, {
      action: "clear-all",
      value: "Clear All Cells"
    }, {
      action: "show-all",
      value: "Show all (keep filter text)"
    }, {
      action: "set-filter",
      value: "Set Filter"
    }]);
  };

  VGridHeaderMenu.prototype.menuHtmlSetFilter = function menuHtmlSetFilter() {
    return this.createMenuHTML([{
      action: "",
      value: "Set filter",
      isHeader: true
    }, {
      action: "set-filter-1",
      value: "equals"
    }, {
      action: "set-filter-2",
      value: "less than or eq"
    }, {
      action: "set-filter-3",
      value: "greater than or eq"
    }, {
      action: "set-filter-4",
      value: "less than"
    }, {
      action: "set-filter-5",
      value: "greater than"
    }, {
      action: "set-filter-6",
      value: "contains"
    }, {
      action: "set-filter-7",
      value: "not equal to"
    }, {
      action: "set-filter-8",
      value: "does not contain"
    }, {
      action: "set-filter-9",
      value: "begins with"
    }, {
      action: "set-filter-10",
      value: "ends with"
    }]);
  };

  VGridHeaderMenu.prototype.defaultMenu = function defaultMenu(value) {

    switch (value) {
      case "clear-cell":
        this.triggerEvent("filterClearCell", {
          attribute: this.value
        });
        this.vGrid.vGridConfig.onFilterRun(this.vGrid.vGridFilter.lastFilter);
        this.toggleMenuOff();
        break;
      case "clear-all":
        this.triggerEvent("filterClearAll", {
          attribute: this.value
        });
        this.vGrid.vGridConfig.onFilterRun(this.vGrid.vGridFilter.lastFilter);
        this.toggleMenuOff();
        break;
      case "show-all":
        this.vGrid.vGridConfig.onFilterRun([]);
        this.toggleMenuOff();
        break;
      case "set-filter":
        this.replaceMenu(this.menuHtmlSetFilter());
        this.altMenuLogic = this.filterMenuLogic;
        break;
      default:
        this.toggleMenuOff();
    }
  };

  VGridHeaderMenu.prototype.triggerEvent = function triggerEvent(name, data) {
    var event = new CustomEvent(name, {
      detail: data,
      bubbles: true
    });
    this.vGrid.element.dispatchEvent(event);
  };

  VGridHeaderMenu.prototype.filterMenuLogic = function filterMenuLogic(value) {
    var newOperator = null;
    switch (value) {
      case "set-filter-1":
        newOperator = "=";
        break;
      case "set-filter-2":
        newOperator = "<=";
        break;
      case "set-filter-3":
        newOperator = ">=";
        break;
      case "set-filter-4":
        newOperator = "<";
        break;
      case "set-filter-5":
        newOperator = ">";
        break;
      case "set-filter-6":
        newOperator = "*";
        break;
      case "set-filter-7":
        newOperator = "!=";
        break;
      case "set-filter-8":
        newOperator = "!*";
        break;
      case "set-filter-9":
        newOperator = "*=";
        break;
      case "set-filter-10":
        newOperator = "=*";
        this.toggleMenuOff();
        break;
      default:
        this.toggleMenuOff();
    }
    if (newOperator) {
      this.triggerEvent("filterUpdate", {
        attribute: this.value,
        operator: newOperator
      });
      this.toggleMenuOff();
    }

    this.altMenuLogic = null;
  };

  return VGridHeaderMenu;
}(Contextmenu)) || _class2) || _class2);
var ContextRowMenu = exports.ContextRowMenu = (_dec3 = (0, _aureliaFramework.customAttribute)('v-row-menu'), _dec4 = (0, _aureliaFramework.inject)(Element, VGrid), _dec3(_class4 = _dec4(_class4 = function (_Contextmenu2) {
  _inherits(ContextRowMenu, _Contextmenu2);

  function ContextRowMenu() {
    var _temp2, _this2, _ret2;

    _classCallCheck(this, ContextRowMenu);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, _Contextmenu2.call.apply(_Contextmenu2, [this].concat(args))), _this2), _this2.classToOpenOn = "vGrid-row-menu", _this2.altMenuLogic = null, _temp2), _possibleConstructorReturn(_this2, _ret2);
  }

  ContextRowMenu.prototype.menuItemListener = function menuItemListener(link) {
    var value = link.getAttribute("data-action");
    if (this.altMenuLogic) {
      this.filterMenuLogic(value);
    } else {
      this.defaultMenu(value);
    }
  };

  ContextRowMenu.prototype.canOpen = function canOpen(e) {
    return true;
  };

  ContextRowMenu.prototype.menuHtmlMain = function menuHtmlMain() {
    return this.createMenuHTML([{
      action: "",
      value: "Options",
      isHeader: true
    }, {
      action: "copy-cell",
      value: "Copy cell value",
      isHeader: false
    }, {
      action: "paste-cell",
      value: "Paste into cell/selected rows",
      isHeader: false
    }]);
  };

  ContextRowMenu.prototype.defaultMenu = function defaultMenu(value) {
    var _this3 = this;

    switch (value) {
      case "copy-cell":
        this.vGrid.vGridConfig.cellValue = this.bindingContext.rowRef[this.value];
        this.toggleMenuOff();
        break;
      case "paste-cell":
        if (this.vGrid.vGridConfig.cellValue !== null) {
          var rows = this.vGrid.vGridSelection.getSelectedRows();
          rows.forEach(function (x) {
            _this3.vGrid.vGridCollectionFiltered[x][_this3.value] = _this3.vGrid.vGridConfig.cellValue;
          });
          this.vGrid.vGridGenerator.rebindAllRowSlots();
        }
        this.toggleMenuOff();
        break;
      default:
        this.toggleMenuOff();
    }
  };

  return ContextRowMenu;
}(Contextmenu)) || _class4) || _class4);
var vGridDragDropCol = exports.vGridDragDropCol = (_dec5 = (0, _aureliaFramework.customAttribute)('v-drag-drop-col'), _dec6 = (0, _aureliaFramework.inject)(Element, VGrid), _dec5(_class6 = _dec6(_class6 = function () {
  function vGridDragDropCol(element, vGrid) {
    _classCallCheck(this, vGridDragDropCol);

    this.vGrid = vGrid;
    this.element = element;
    this.dragEl;
    this.canMove = false;
    this.sortable = false;
    this.onDragOverX = this.onDragOver.bind(this);
    this.onDragEndX = this.onDragEnd.bind(this);
  }

  vGridDragDropCol.prototype.bind = function bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;
  };

  vGridDragDropCol.prototype.attached = function attached() {
    var _this4 = this;

    this.setDragHandles();

    this.rootEl = this.vGrid.vGridGenerator.headerScrollElement;
    this.mainCol.addEventListener('dragstart', this.onDragStart.bind(this), false);

    this.vGrid.element.addEventListener("vGridDragStart", function () {
      _this4.drophelper.style["z-index"] = "100";
    });

    this.vGrid.element.addEventListener("vGridDragStop", function () {
      _this4.drophelper.style["z-index"] = "-100";
    });
  };

  vGridDragDropCol.prototype.setDragHandles = function setDragHandles() {
    var _this5 = this;

    this.element.classList.add("vGrid-vGridDragHandle");

    var mainCol = this.element;
    while (mainCol.nodeName !== 'V-GRID-HEADER-COL') {
      mainCol = mainCol.parentNode;
    }
    this.mainCol = mainCol;

    var drophelper = document.createElement("v-grid-drop");
    drophelper.style.width = "30px";
    drophelper.style.bottom = 0;
    drophelper.style.top = 0;
    drophelper.style.left = parseInt(this.mainCol.clientWidth / 2) - 15 + "px";

    drophelper.style["z-index"] = "-100";
    drophelper.style.position = "absolute";
    this.mainCol.appendChild(drophelper);
    this.drophelper = drophelper;

    this.element.onmouseenter = function () {
      _this5.canMove = true;

      _this5.setDraggable(true);
    };

    this.element.onmouseleave = function () {
      _this5.canMove = false;

      _this5.setDraggable(false);
    };
  };

  vGridDragDropCol.prototype.setDraggable = function setDraggable(newStatus) {
    this.mainCol.draggable = newStatus;
  };

  vGridDragDropCol.prototype.updateColumns = function updateColumns() {
    var _this6 = this;

    var tempArr = [];
    var vGridConfig = [];

    var dragHandles = this.vGrid.vGridGenerator.gridElement.getElementsByTagName('v-grid-header-col');
    [].slice.call(dragHandles).forEach(function (itemEl, index) {
      tempArr.push(parseInt(itemEl.getAttribute("column-no")));
      vGridConfig.push(null);
      itemEl.setAttribute("column-no", index);
    });

    tempArr.forEach(function (oldI, newI) {
      vGridConfig[newI] = _this6.vGrid.vGridConfig.colConfig[oldI];
    });

    this.vGrid.vGridConfig.colConfig = vGridConfig;

    this.vGrid.vGridGenerator.rowTemplate = null;

    this.vGrid.vGridGenerator.rebuildColumnsRows();
  };

  vGridDragDropCol.prototype.onDragStart = function onDragStart(evt) {
    var _this7 = this;

    if (this.canMove) {
      this.dragEl = evt.target;

      this.colNo = parseInt(this.dragEl.getAttribute("column-no"));

      var event = new CustomEvent("vGridDragStart", {
        detail: "",
        bubbles: true
      });
      this.vGrid.element.dispatchEvent(event);

      this.sortable = true;

      evt.dataTransfer.effectAllowed = 'move';
      evt.dataTransfer.setData('Text', '');

      this.rootEl.addEventListener('dragover', this.onDragOverX, false);
      this.rootEl.addEventListener('dragend', this.onDragEndX, false);

      setTimeout(function () {
        _this7.dragEl.classList.add('ghost');
      }, 0);
    } else {
      evt.preventDefault();
    }
  };

  vGridDragDropCol.prototype.onDragOver = function onDragOver(evt) {
    if (evt.preventDefault !== void 0) {
      evt.preventDefault();
      evt.stopPropagation();
    }

    var colNo = -1;

    var target = evt.target;
    if (target) {
      while (target.nodeName !== 'V-GRID-HEADER-COL') {
        target = target.offsetParent;
      }

      colNo = parseInt(target.getAttribute("column-no"));
      var targetNode = evt.target.nodeName === 'V-GRID-DROP';

      if (colNo !== this.colNo && targetNode && colNo > -1) {
        var after = colNo + 1 !== this.colNo;
        this.colNo = colNo;

        this.rootEl.insertBefore(this.dragEl, after ? target.nextElementSibling : target);

        this.updateColumns();
      }
    }
  };

  vGridDragDropCol.prototype.onDragEnd = function onDragEnd(evt) {

    evt.preventDefault();

    var event = new CustomEvent("vGridDragStop", {
      detail: "",
      bubbles: true
    });
    this.vGrid.element.dispatchEvent(event);

    this.dragEl.classList.remove('ghost');
    this.rootEl.removeEventListener('dragover', this.onDragOverX, false);
    this.rootEl.removeEventListener('dragend', this.onDragEndX, false);
    this.sortable = false;
  };

  return vGridDragDropCol;
}()) || _class6) || _class6);
var vGridAttributesFilter = exports.vGridAttributesFilter = (_dec7 = (0, _aureliaFramework.customAttribute)('v-filter'), _dec8 = (0, _aureliaFramework.inject)(Element, VGrid), _dec7(_class7 = _dec8(_class7 = function () {
  function vGridAttributesFilter(element, vGrid) {
    _classCallCheck(this, vGridAttributesFilter);

    this.vGrid = vGrid;
    this.element = element;
  }

  vGridAttributesFilter.prototype.bind = function bind(bindingContext, overrideContext) {
    var _this8 = this;

    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;

    var values = this.value.split("|");

    this.attribute = values[0].trim();

    if (values.length > 1) {
      values.forEach(function (value, i) {
        if (i !== 0) {
          _this8.checkParams(value);
        }
      });
    }

    this.filterOn = this.filterOn || "onEnterKey";
    this.filterOperator = this.filterOperator || "=";
    this.valueFormater = this.valueFormater || null;
    this.type = this.element.type;
    this.state = 0;
  };

  vGridAttributesFilter.prototype.checkParams = function checkParams(value) {

    if (value !== undefined && value !== null) {
      value = value.trim();
    }

    var valueConverter = this.valueConverters(value);
    if (valueConverter) {
      this.valueFormater = valueConverter;
    }

    var filterOperator = this.vGrid.vGridFilter.filterOperatorTableString[value];
    if (filterOperator) {
      this.filterOperator = value;
    }

    if (value === "onKeyDown") {
      this.filterOn = value;
    }
  };

  vGridAttributesFilter.prototype.getValue = function getValue() {
    if (this.type !== "checkbox") {
      return this.valueFormater ? this.valueFormater.fromView(this.element.value) : this.element.value;
    } else {
      return this.state ? this.state === 2 ? true : false : "";
    }
  };

  vGridAttributesFilter.prototype.resetValue = function resetValue() {
    if (this.type !== "checkbox") {
      this.element.value = "";
    } else {
      this.state = 0;
      this.element.checked = false;
    }
  };

  vGridAttributesFilter.prototype.updateFilter = function updateFilter(curFilter) {
    var _this9 = this;

    var filterIndex = null;

    curFilter.forEach(function (filter, index) {
      if (filter.attribute === _this9.attribute) {
        filterIndex = index;
      }
    });

    if (filterIndex !== null) {
      if (this.getValue() === "") {
        curFilter.splice(filterIndex, 1);
      } else {
        curFilter[filterIndex].value = this.getValue();
        curFilter[filterIndex].operator = this.filterOperator;
      }
    } else {
      if (this.getValue() !== "") {
        curFilter.push({
          attribute: this.attribute,
          operator: this.filterOperator,
          value: this.getValue()
        });
      }
    }
  };

  vGridAttributesFilter.prototype.attached = function attached() {
    var _this10 = this;

    if (this.attribute) {

      this.vGrid.element.addEventListener("filterUpdate", function (e) {
        if (e.detail.attribute === _this10.attribute) {
          _this10.filterOperator = e.detail.operator;
          _this10.element.placeholder = _this10.vGrid.vGridFilter.filterOperatorTableString[_this10.filterOperator];
          _this10.updateFilter(_this10.vGrid.vGridFilter.lastFilter);
        }
      });

      this.vGrid.element.addEventListener("filterClearCell", function (e) {
        if (e.detail.attribute === _this10.attribute) {
          _this10.resetValue();
          _this10.updateFilter(_this10.vGrid.vGridFilter.lastFilter);
        }
      });

      this.vGrid.element.addEventListener("filterClearAll", function (e) {
        _this10.resetValue();
        _this10.updateFilter(_this10.vGrid.vGridFilter.lastFilter);
      });

      if (this.type !== "checkbox") {

        this.element.placeholder = this.vGrid.vGridFilter.filterOperatorTableString[this.filterOperator];

        this.element.onkeyup = function (e) {
          if (e.keyCode === 13) {
            _this10.updateFilter(_this10.vGrid.vGridFilter.lastFilter);
            _this10.vGrid.vGridConfig.onFilterRun(_this10.vGrid.vGridFilter.lastFilter);
          } else {
            _this10.updateFilter(_this10.vGrid.vGridFilter.lastFilter);
            if (_this10.filterOn === "onKeyDown") {
              _this10.vGrid.vGridConfig.onFilterRun(_this10.vGrid.vGridFilter.lastFilter);
            }
          }
        };
      } else {
        this.element.style.opacity = 0.3;

        this.element.onclick = function (e) {
          switch (_this10.state) {
            case 0:
              _this10.state = 2;
              _this10.element.style.opacity = 1;
              break;
            case 2:
              _this10.state = 3;
              _this10.element.style.opacity = 1;
              break;
            default:
              _this10.element.checked = false;
              _this10.state = 0;
              _this10.element.style.opacity = 0.3;
          }
          _this10.updateFilter(_this10.vGrid.vGridFilter.lastFilter);
          _this10.vGrid.vGridConfig.onFilterRun(_this10.vGrid.vGridFilter.lastFilter);
        };
      }
    }
  };

  _createClass(vGridAttributesFilter, [{
    key: 'valueConverters',
    get: function get() {
      if (this.vGrid) {
        return this.vGrid.viewResources.lookupFunctions.valueConverters;
      }
    }
  }]);

  return vGridAttributesFilter;
}()) || _class7) || _class7);
var vGridAttributesImageFix = exports.vGridAttributesImageFix = (_dec9 = (0, _aureliaFramework.customAttribute)('v-image-fix'), _dec10 = (0, _aureliaFramework.inject)(Element, VGrid), _dec9(_class8 = _dec10(_class8 = function () {
  function vGridAttributesImageFix(element, vGrid) {
    _classCallCheck(this, vGridAttributesImageFix);

    this.vGrid = vGrid;
    this.element = element;
  }

  vGridAttributesImageFix.prototype.bind = function bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;

    var x = this.element.src;
    this.element.src = "";
    this.element.src = x;
  };

  vGridAttributesImageFix.prototype.attached = function attached() {};

  return vGridAttributesImageFix;
}()) || _class8) || _class8);
var vGridAttributesKeyMove = exports.vGridAttributesKeyMove = (_dec11 = (0, _aureliaFramework.customAttribute)('v-key-move'), _dec12 = (0, _aureliaFramework.inject)(Element, VGrid), _dec11(_class9 = _dec12(_class9 = function () {
  function vGridAttributesKeyMove(element, vGrid) {
    _classCallCheck(this, vGridAttributesKeyMove);

    this.vGrid = vGrid;
    this.element = element;
    this.classname = "v-grid-key-move";
  }

  vGridAttributesKeyMove.prototype.bind = function bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;
  };

  vGridAttributesKeyMove.prototype.attached = function attached() {
    var _this11 = this;

    this.element.classList.add(this.classname);
    this.addGridKeyListner();

    this.element.addEventListener('tabbing', function (e) {
      _this11.element.focus();

      var ev = document.createEvent('Event');
      ev.initEvent("click", true, true);
      _this11.element.offsetParent.dispatchEvent(ev);
    });

    this.element.addEventListener('focus', function (e) {

      if (_this11.vGrid.vGridCurrentEntityRef === null) {
        var ev = document.createEvent('Event');
        ev.initEvent("click", true, true);
        _this11.element.offsetParent.dispatchEvent(ev);
      }
    });
  };

  vGridAttributesKeyMove.prototype.dispatchCellClick = function dispatchCellClick(index) {
    var e = document.createEvent('Event');
    e.initEvent("tabbing", true, true);

    if (this.cells[index]) {
      this.cells[index].dispatchEvent(e);
    }
  };

  vGridAttributesKeyMove.prototype.setCellsFromElement = function setCellsFromElement(node, direction) {
    var thisTop;
    var element;
    for (var i = 0; i < 10; i++) {
      try {
        if (node.classList.contains(this.vGrid.vGridConfig.css.row)) {
          var row = parseInt(node.getAttribute("row"));
          for (var y = 0; y < this.vGrid.vGridGenerator.rowElementArray.length; y++) {
            if (row === parseInt(this.vGrid.vGridGenerator.rowElementArray[y].top / this.vGrid.vGridConfig.attRowHeight)) {
              this.row = row;
              thisTop = this.vGrid.vGridGenerator.rowElementArray[y + direction].top;
              element = this.vGrid.vGridGenerator.rowElementArray[y + direction].div;
            }
          }
        }
        node = node.parentNode;
      } catch (err) {}
    }
    if (element) {
      this.cells = element.querySelectorAll("." + this.classname);
    }
    return thisTop;
  };

  vGridAttributesKeyMove.prototype.setCellsFromTopValue = function setCellsFromTopValue(top) {
    var element = 0;
    for (var i = 0; i < this.vGrid.vGridGenerator.rowElementArray.length; i++) {
      if (this.vGrid.vGridGenerator.rowElementArray[i].top === top) {
        element = this.vGrid.vGridGenerator.rowElementArray[i].div;
      }
    }
    if (element) {
      this.cells = element.querySelectorAll("." + this.classname);
    }
  };

  vGridAttributesKeyMove.prototype.keyDownDelay = function keyDownDelay(callback) {
    var _this12 = this;

    if (!this.timer) {
      this.timer = setTimeout(function () {
        _this12.timer = null;
        callback();
      }, 150);
    }
  };

  vGridAttributesKeyMove.prototype.getIndex = function getIndex() {
    for (var i = 0; i < this.cells.length; i++) {
      if (this.element === this.cells[i]) {
        this.index = i;
        if (i === 0) {
          this.first = true;
        } else {
          this.first = false;
        }
        if (i === this.cells.length - 1) {
          this.last = true;
        } else {
          this.last = false;
        }
      }
    }
  };

  vGridAttributesKeyMove.prototype.addGridKeyListner = function addGridKeyListner() {
    var _this13 = this;

    this.element.onkeydown = function (e) {

      _this13.setCellsFromElement(_this13.element, 0);
      _this13.getIndex();

      if (e.keyCode === 33) {
        e.preventDefault();
        _this13.keyDownDelay(function () {
          var currentscrolltop = _this13.vGrid.vGridClientCtx.getScrollTop();

          var rowHeight = _this13.vGrid.vGridConfig.attRowHeight;
          var containerHeight = _this13.vGrid.vGridGenerator.contentElement.clientHeight;
          var containerRows = parseInt(containerHeight / rowHeight, 10);
          _this13.top = _this13.setCellsFromElement(_this13.element, 0);

          var newTop = _this13.top - containerRows * rowHeight;
          if (newTop / rowHeight <= 0) {
            newTop = 0;
          }

          if (_this13.vGrid.vGridScrollEvents.lastScrollType === "down") {
            _this13.vGrid.vGridScrollEvents.onSmallScroll(false);
          }

          _this13.setCellsFromTopValue(newTop);
          _this13.dispatchCellClick(_this13.index);

          var setTop = newTop - parseInt(containerRows * rowHeight / 2);
          _this13.vGrid.vGridClientCtx.setScrollTop(setTop);
        });
      }

      if (e.keyCode === 34) {
        e.preventDefault();
        _this13.keyDownDelay(function () {
          var currentscrolltop = _this13.vGrid.vGridClientCtx.getScrollTop();

          var rowHeight = _this13.vGrid.vGridConfig.attRowHeight;
          var containerHeight = _this13.vGrid.vGridGenerator.contentElement.clientHeight;
          var containerRows = parseInt(containerHeight / rowHeight, 10);
          _this13.top = _this13.setCellsFromElement(_this13.element, 0);

          var newTop = _this13.top + containerRows * rowHeight;
          if (newTop / rowHeight >= _this13.vGrid.vGridConfig.getCollectionLength()) {
            newTop = _this13.vGrid.vGridConfig.getCollectionLength() * rowHeight;
            newTop = newTop - rowHeight;
          }

          if (_this13.vGrid.vGridScrollEvents.lastScrollType === "up") {
            _this13.vGrid.vGridScrollEvents.onSmallScroll(true);
          }

          _this13.setCellsFromTopValue(newTop);
          _this13.dispatchCellClick(_this13.index);

          var setTop = newTop - parseInt(containerRows * rowHeight / 2);
          _this13.vGrid.vGridClientCtx.setScrollTop(setTop);
        });
      }

      if (e.keyCode === 40) {
        e.preventDefault();
        _this13.keyDownDelay(function () {
          if (_this13.vGrid.vGridScrollEvents.lastScrollType === "up") {
            _this13.vGrid.vGridScrollEvents.onSmallScroll(true);
          }
          _this13.top = _this13.setCellsFromElement(_this13.element, +1);
          _this13.dispatchCellClick(_this13.index);
        });
      }

      if (e.keyCode === 38) {
        e.preventDefault();
        _this13.keyDownDelay(function () {
          if (_this13.vGrid.vGridScrollEvents.lastScrollType === "down") {
            _this13.vGrid.vGridScrollEvents.onSmallScroll(false);
          }
          _this13.top = _this13.setCellsFromElement(_this13.element, -1);
          _this13.dispatchCellClick(_this13.index);
        });
      }

      if (e.keyCode === 9 && e.shiftKey === true) {
        if (_this13.row !== 0 && _this13.first) {
          e.preventDefault();
          _this13.keyDownDelay(function () {
            _this13.index = _this13.index - 1;
            if (_this13.first) {
              if (_this13.vGrid.vGridScrollEvents.lastScrollType === "down") {
                _this13.vGrid.vGridScrollEvents.onSmallScroll(false);
              }
              _this13.index = _this13.cells.length - 1;
              _this13.top = _this13.setCellsFromElement(_this13.element, -1);
            }
            _this13.dispatchCellClick(_this13.index);
          });
        }
      }

      if (e.keyCode === 9 && e.shiftKey === false) {

        e.preventDefault();
        _this13.keyDownDelay(function () {
          _this13.index = _this13.index + 1;
          if (_this13.last) {
            if (_this13.vGrid.vGridScrollEvents.lastScrollType === "up") {
              _this13.vGrid.vGridScrollEvents.onSmallScroll(true);
            }
            _this13.index = 0;
            _this13.top = _this13.setCellsFromElement(_this13.element, 1);
          }
          _this13.dispatchCellClick(_this13.index);
        });
      }
    };
  };

  return vGridAttributesKeyMove;
}()) || _class9) || _class9);
var vGridAttributesObserveField = exports.vGridAttributesObserveField = (_dec13 = (0, _aureliaFramework.customAttribute)('v-observe-field'), _dec14 = (0, _aureliaFramework.inject)(Element, VGrid, _aureliaFramework.BindingEngine), _dec13(_class10 = _dec14(_class10 = function () {
  function vGridAttributesObserveField(element, vGrid, bindingEngine) {
    _classCallCheck(this, vGridAttributesObserveField);

    this.vGrid = vGrid;
    this.element = element;
    this.timer = null;
    this.bindingEngine = bindingEngine;
  }

  vGridAttributesObserveField.prototype.bind = function bind(bindingContext, overrideContext) {
    var _this14 = this;

    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;

    if (this.propertyObserver) {
      this.propertyObserver.dispose();
      this.propertyObserver = null;
    }

    var attribute = this.value;

    if (attribute && this.bindingContext.rowRef) {
      this.vGrid.vGridObservables.disableObservablesAttributes();

      var attAttributeObserve = this.vGrid.vGridConfig.attAttributeObserve;
      var _attribute = this.value;

      if (attAttributeObserve.indexOf(_attribute) === -1 && _attribute) {
        attAttributeObserve.push(_attribute);
      }

      this.vGrid.vGridObservables.enableObservablesAttributes();

      this.propertyObserver = this.bindingEngine.propertyObserver(this.bindingContext.rowRef, this.value).subscribe(function (newValue, oldValue) {
        var newValueCheck = newValue !== undefined && newValue !== null ? newValue.toString() : newValue;
        var oldValueCheck = oldValue !== undefined && oldValue !== null ? oldValue.toString() : oldValue;

        if (newValueCheck !== oldValueCheck && _this14.vGrid.vGridCurrentEntityRef) {
          _this14.vGrid.vGridCurrentEntity[_this14.value] = newValue;
        }
      });
    }
  };

  vGridAttributesObserveField.prototype.unbind = function unbind() {
    if (this.propertyObserver) {
      this.propertyObserver.dispose();
      this.propertyObserver = null;
    }
  };

  return vGridAttributesObserveField;
}()) || _class10) || _class10);
var vGridAttributesResizeCol = exports.vGridAttributesResizeCol = (_dec15 = (0, _aureliaFramework.customAttribute)('v-resize-col'), _dec16 = (0, _aureliaFramework.inject)(Element, VGrid), _dec15(_class11 = _dec16(_class11 = function () {
  function vGridAttributesResizeCol(element, vGrid) {
    _classCallCheck(this, vGridAttributesResizeCol);

    this.vGrid = vGrid;
    this.vGridConfig = this.vGrid.vGridConfig;
    this.vGridGenerator = this.vGrid.vGridGenerator;
    this.element = element;
    this.resizable = false;
    this.screenX;
    this.index;
    this.originalWidth;
  }

  vGridAttributesResizeCol.prototype.bind = function bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;
  };

  vGridAttributesResizeCol.prototype.attached = function attached() {
    var _this15 = this;

    var mainCol = this.element;
    while (mainCol.nodeName !== 'V-GRID-HEADER-COL') {
      mainCol = mainCol.parentNode;
    }
    this.mainCol = mainCol;

    var resizeHandle = document.createElement("DIV");
    resizeHandle.classList.add(this.vGridConfig.css.resizeHeaderDragHandle);

    resizeHandle.onmousedown = function (e) {
      _this15.onmousedown(e);
    };

    this.mainCol.appendChild(resizeHandle);
  };

  vGridAttributesResizeCol.prototype.onmouseup = function onmouseup() {
    this.resizable = true;

    this.vGridGenerator.headerElement.onmouseleave = "";
    this.vGridGenerator.headerElement.onmousemove = "";
    this.vGridGenerator.headerElement.onmouseup = "";

    this.vGridConfig.colConfig[this.index].colWidth = parseInt(this.mainCol.style.width);

    this.vGridGenerator.rowTemplate = null;
    this.vGridGenerator.correctRowAndScrollbodyWidth();
    this.vGridGenerator.recreateRowViewSlots();
    this.vGridGenerator.updateGridScrollbars();
    this.vGridGenerator.rebindAllRowSlots(true);
  };

  vGridAttributesResizeCol.prototype.onmousemove = function onmousemove(e) {
    var _this16 = this;

    this.vGridGenerator.headerElement.onmouseup = function () {
      _this16.onmouseup();
    };

    this.vGridGenerator.headerElement.onmouseleave = function (e) {
      _this16.vGridGenerator.headerElement.onmouseup(e);
    };

    if (this.resizable) {
      this.updateHeader(e);
    } else {
      this.vGridGenerator.correctHeaderAndScrollbodyWidth();
    }
  };

  vGridAttributesResizeCol.prototype.updateHeader = function updateHeader(e) {
    var newWidth = parseInt(this.originalWidth) - (this.screenX - e.screenX) + "px";
    if (parseInt(newWidth) > 15) {
      this.vGridConfig.colConfig[this.index].colWidth = parseInt(newWidth);
      this.mainCol.style.width = parseInt(this.originalWidth) - (this.screenX - e.screenX) + "px";
      this.mainCol.style.width = parseInt(this.originalWidth) - (this.screenX - e.screenX) + "px";

      if (this.vGridConfig.attResizableHeadersAndRows) {
        var columnsToFix = this.vGridGenerator.contentElement.firstChild.querySelectorAll("." + this.vGridConfig.css.rowColumn + this.index);

        for (var col = 0; col < columnsToFix.length; col++) {
          columnsToFix[col].style.width = newWidth;
        }

        this.vGridGenerator.correctRowAndScrollbodyWidth();
        this.vGridGenerator.updateGridScrollbars();
      }
    }
  };

  vGridAttributesResizeCol.prototype.onmousedown = function onmousedown(e) {
    var _this17 = this;

    this.resizable = true;

    this.screenX = e.screenX;
    this.originalWidth = this.mainCol.style.width;
    this.index = this.mainCol.getAttribute("column-no");
    this.started = false;

    this.vGridGenerator.headerElement.onmousemove = function (e) {
      _this17.started = true;
      _this17.onmousemove(e);
    };

    this.vGridGenerator.headerElement.onmouseup = function (e) {
      if (!_this17.started) {
        _this17.vGridGenerator.headerElement.onmousemove = "";
      }
    };
  };

  return vGridAttributesResizeCol;
}()) || _class11) || _class11);
var vGridAttributesSelection = exports.vGridAttributesSelection = (_dec17 = (0, _aureliaFramework.customAttribute)('v-selection'), _dec18 = (0, _aureliaFramework.inject)(Element, VGrid), _dec17(_class12 = _dec18(_class12 = function () {
  function vGridAttributesSelection(element, vGrid) {
    _classCallCheck(this, vGridAttributesSelection);

    this.vGrid = vGrid;
    this.element = element;
    this.false = true;
  }

  vGridAttributesSelection.prototype.bind = function bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;
    if (this.created) {
      this.selected = this.vGrid.vGridSelection.isSelected(this.bindingContext.row);
      this.element.checked = this.selected;
    }
  };

  vGridAttributesSelection.prototype.attached = function attached() {
    var _this18 = this;

    this.created = true;
    this.selected = this.vGrid.vGridSelection.isSelected(this.bindingContext.row);
    this.element.checked = this.selected;

    this.element.onclick = function (e) {

      var status = _this18.element.checked === "true" || _this18.element.checked === true ? true : false;

      if (status) {
        if (_this18.value === "header") {
          _this18.vGrid.vGridSelection.selectAll();
          _this18.vGrid.vGridGenerator.rebindAllRowSlots();
        }
        if (_this18.value === "row") {
          _this18.vGrid.vGridSelection.select(_this18.bindingContext.row, true);
          _this18.vGrid.vGridGenerator.rebindRowNumber(_this18.bindingContext.row);
        }
      } else {

        if (_this18.value === "header") {
          _this18.vGrid.vGridSelection.deSelectAll();
          _this18.vGrid.vGridGenerator.rebindAllRowSlots();
        }

        if (_this18.value === "row") {
          _this18.vGrid.vGridSelection.deSelect(_this18.bindingContext.row, true);
          _this18.vGrid.vGridGenerator.rebindRowNumber(_this18.bindingContext.row);
        }
      }
    };
  };

  return vGridAttributesSelection;
}()) || _class12) || _class12);
var vGridAttributesSort = exports.vGridAttributesSort = (_dec19 = (0, _aureliaFramework.customAttribute)('v-sort'), _dec20 = (0, _aureliaFramework.inject)(Element, VGrid), _dec19(_class13 = _dec20(_class13 = function () {
  function vGridAttributesSort(element, vGrid) {
    _classCallCheck(this, vGridAttributesSort);

    this.vGrid = vGrid;
    this.element = element;
  }

  vGridAttributesSort.prototype.bind = function bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;

    var values = this.value.split("|");
    this.attribute = values[0];
  };

  vGridAttributesSort.prototype.attached = function attached() {
    var _this19 = this;

    this.sortIcon = document.createElement("SPAN");
    this.sortIcon.innerHTML = this.getSortIconMarkup(this.attribute);
    this.element.appendChild(this.sortIcon);
    this.element.onclick = function (e) {
      _this19.vGrid.vGridConfig.onOrderBy(_this19.attribute, e.shiftKey);
    };

    this.vGrid.element.addEventListener("sortIconUpdate", function (e) {
      _this19.sortIcon.innerHTML = _this19.getSortIconMarkup(_this19.attribute);
    });
  };

  vGridAttributesSort.prototype.getSortIconMarkup = function getSortIconMarkup(attribute) {
    var _this20 = this;

    var css = this.vGrid.vGridConfig.css;

    var markup = '<span  class="' + css.sortIcon + ' ' + css.sortIconSort + '"></span>';
    var isAscHtml = '<span  class="' + css.sortIcon + ' ' + css.sortIconAsc + '"></span>';
    var isDescHtml = '<span  class="' + css.sortIcon + ' ' + css.sortIconDesc + '"></span>';

    this.vGrid.vGridSort.getFilter().forEach(function (x) {
      if (x.attribute === _this20.attribute) {
        var block = x.asc === true ? isAscHtml : isDescHtml;
        var main = '<span $ class="' + css.sortIconNo + '" data-vgridsort="' + x.no + '"></span>';
        markup = main + block;
      }
    });

    return markup;
  };

  return vGridAttributesSort;
}()) || _class13) || _class13);

var VGridConfig = exports.VGridConfig = function () {
  function VGridConfig(vGrid) {
    var _this21 = this;

    _classCallCheck(this, VGridConfig);

    this.css = {
      wrapper: "vGrid",
      row: "vGrid-row",
      mainHeader: "vGrid-header",
      mainContent: "vGrid-body",
      mainFooter: "vGrid-footer",
      scrollBody: "vGrid-body-scroll",
      rowColumn: "vGrid-row-column",
      rowHeaderColumn: "vGrid-row-column-header",
      rowHeader: "vGrid-row-header",
      rowSelected: "vGrid-row-selected",
      rowContainer: "vGrid-row-container",
      rowAlt: "vGrid-row-alt",
      rowEven: "vGrid-row-even",
      dragHandle: "vGrid-vGridDragHandle",
      resizeHeaderDragHandle: "vGrid-draggable-handler",
      sortIcon: "vGrid-glyphicon",
      sortIconSort: "vGrid-glyphicon-sort",
      sortIconAsc: "vGrid-glyphicon-sort-asc",
      sortIconDesc: "vGrid-glyphicon-sort-desc",
      sortIconNo: "vGrid-glyphicon"
    };
    this.atts = {
      dataAttribute: "v-grid-data-attribute",
      dataAttributeFilter: "v-grid-data-attribute-filter"
    };

    this.onFilterRun = function (filterObj) {

      if (filterObj.length !== 0 || _this21.vGrid.vGridCollectionFiltered.length !== _this21.vGrid.vGridCollection.length || _this21.eventOnRemoteCall) {
        if (_this21.vGrid.vGridCollection.length > _this21.attLoadingThreshold) {
          _this21.vGrid.loading = true;
        }

        setTimeout(function () {
          var curKey = -1;
          if (_this21.vGrid.vGridCurrentEntityRef) {
            curKey = _this21.vGrid.vGridCurrentEntityRef[_this21.vGrid.vGridRowKey];
          }

          if (_this21.eventOnRemoteCall) {
            _this21.vGrid.vGridFilter.lastFilter = filterObj;

            _this21.remoteOffset = 0;

            _this21.remoteCall();
          } else {
            _this21.vGrid.vGridCollectionFiltered = _this21.vGrid.vGridFilter.run(_this21.vGrid.vGridCollection, filterObj);

            _this21.vGrid.vGridSort.run(_this21.vGrid.vGridCollectionFiltered);

            var newRowNo = -1;
            if (curKey) {
              _this21.vGrid.vGridCollectionFiltered.forEach(function (x, index) {
                if (curKey === x[_this21.vGrid.vGridRowKey]) {
                  newRowNo = index;
                }
              });
            }

            if (newRowNo > -1) {
              _this21.vGrid.vGridCurrentEntityRef = _this21.vGrid.vGridCollectionFiltered[newRowNo];
              _this21.vGrid.vGridCurrentEntity[_this21.vGrid.vGridRowKey] = _this21.vGrid.vGridCurrentEntityRef[_this21.vGrid.vGridRowKey];
              _this21.vGrid.vGridCurrentRow = newRowNo;
            } else {
              _this21.vGrid.vGridCurrentRow = newRowNo;
            }

            _this21.vGrid.vGridGenerator.collectionChange(true);
            _this21.vGrid.loading = false;
          }
        }, 50);
      }
    };

    this.vGrid = vGrid;

    this.colConfig = [];

    this.columnLength = 0;

    this.attAttributeObserve = [];
    this.attRowHeight = 50;
    this.attHeaderHeight = 0;
    this.attFooterHeight = 0;
    this.attResizableHeaders = false;
    this.attMultiSelect = undefined;
    this.attSortableHeader = false;
    this.attLoadingThreshold = -1;
    this.attRemoteIndex = false;
    this.attManualSelection = false;
    this.eventOnRowDraw = null;
    this.eventOnRowClick = null;
    this.eventOnRowDblClick = null;
    this.eventOnRemoteCall = null;

    this.repeater = false;
    this.repeatRowTemplate = null;

    this.attDataScrollDelay = 200;
    this.attRequestAnimationFrame = true;
    this.attResizableHeadersAndRows = true;
    this.attRenderOnScrollbarScroll = true;

    this.keepFilterOnCollectionChange = false;
    this.remoteLimit = 40;
    this.remoteLength = 0;
    this.remoteOffset = 0;
  }

  VGridConfig.prototype.setValue = function setValue(htmlAttributeValue, defaultValue) {
    var value = defaultValue;
    if (htmlAttributeValue !== undefined && htmlAttributeValue !== null && !isNaN(htmlAttributeValue)) {
      value = htmlAttributeValue;
    }
    return value;
  };

  VGridConfig.prototype.setBindValueArray = function setBindValueArray(value, toProperty) {
    if (value !== undefined && value !== null) {
      var tempArray = value.split(",");
      tempArray.forEach(function (prop) {
        prop = prop.trim();
      });
      this[toProperty] = tempArray;
    }
  };

  VGridConfig.prototype.setBindValueInt = function setBindValueInt(value, toProperty) {
    this[toProperty] = this.setValue(parseInt(value), this[toProperty]);
  };

  VGridConfig.prototype.setBindValueString = function setBindValueString(value, toProperty) {
    if (typeof value === "string" && value !== '' && value !== undefined && value !== null) {
      if (toProperty === "attRemoteIndex") {
        this[toProperty] = true;
        this.vGrid.vGridRowKey = value;
      } else {
        this[toProperty] = value;
      }
    }
  };

  VGridConfig.prototype.setBindValueFunction = function setBindValueFunction(value, toProperty) {
    if (typeof value === "function") {
      this[toProperty] = value;
    }
  };

  VGridConfig.prototype.setBindValueBool = function setBindValueBool(value, toProperty) {
    var type = {
      "true": true,
      "false": false
    };
    this[toProperty] = this.setValue(type[value], this[toProperty]);
  };

  VGridConfig.prototype.getRowProperties = function getRowProperties(obj) {
    if (obj) {
      var x = {};
      for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
          if (x[k] !== obj[k]) {
            x[k] = obj[k];
          }
        }
      }
      return x;
    } else {
      return "";
    }
  };

  VGridConfig.prototype.remoteCall = function remoteCall(data) {
    var _this22 = this;

    data = data ? data : {};
    this.eventOnRemoteCall({
      filter: data.filter || this.vGrid.vGridFilter.lastFilter,
      sort: data.sort || this.vGrid.vGridSort.getFilter(),
      limit: data.limit || this.remoteLimit,
      offset: data.offset || this.remoteOffset
    }).then(function (data) {

      _this22.vGrid.vGridObservables.disableObservablesArray();
      _this22.vGrid.vGridObservables.disableObservablesCollection();
      _this22.vGrid.vGridCollection = data.col;
      _this22.remoteLimit = data.limit;
      _this22.remoteLength = data.length;
      _this22.vGrid.vGridCollectionFiltered = _this22.vGrid.vGridCollection.slice(0);
      _this22.vGrid.checkKeys();
      _this22.vGrid.vGridCurrentRow = -1;
      if (!_this22.attRemoteIndex) {
        _this22.vGrid.vGridSelection.reset();
      }
      _this22.vGrid.vGridGenerator.collectionChange();
      _this22.vGrid.loading = false;
      _this22.vGrid.vGridPager.updatePager({
        limit: _this22.remoteLimit,
        offset: _this22.remoteOffset,
        length: _this22.remoteLength
      });
      setTimeout(function () {
        _this22.vGrid.vGridObservables.enableObservablesArray();
        _this22.vGrid.vGridObservables.enableObservablesCollection();
      }, 200);
    });
  };

  VGridConfig.prototype.getFilterName = function getFilterName(name) {
    return this.vGrid.vGridFilter.getNameOfFilter(name);
  };

  VGridConfig.prototype.getDataElement = function getDataElement(row, isDown, isLargeScroll, callback) {
    if (this.vGrid.vGridCollectionFiltered !== undefined) {
      if (this.eventOnRowDraw) {
        var data = this.getRowProperties(this.vGrid.vGridCollectionFiltered[row]);
        this.eventOnRowDraw({
          tempRef: data || null,
          rowRef: this.vGrid.vGridCollectionFiltered[row] || null
        });
        callback(data);
      } else {
        callback(this.vGrid.vGridCollectionFiltered[row]);
      }
    }
  };

  VGridConfig.prototype.onOrderBy = function onOrderBy(attribute, add) {
    var _this23 = this;

    if (this.vGrid.vGridCollectionFiltered.length > 0) {
      if (this.vGrid.vGridCollection.length > this.attLoadingThreshold) {
        this.vGrid.loading = true;
      }

      setTimeout(function () {
        _this23.vGrid.vGridSort.setFilter({
          attribute: attribute,
          asc: true
        }, add);

        var event = new CustomEvent("sortIconUpdate", {
          detail: "",
          bubbles: true
        });
        _this23.vGrid.element.dispatchEvent(event);

        if (_this23.eventOnRemoteCall) {
          _this23.remoteCall();
        } else {
          _this23.vGrid.vGridSort.run(_this23.vGrid.vGridCollectionFiltered);

          if (_this23.vGrid.vGridCurrentEntityRef) {
            _this23.vGrid.vGridCollectionFiltered.forEach(function (x, index) {
              if (_this23.vGrid.vGridCurrentEntityRef[_this23.vGrid.vGridRowKey] === x[_this23.vGrid.vGridRowKey]) {
                _this23.vGrid.vGridCurrentRow = index;
              }
            });
          }

          _this23.vGrid.vGridGenerator.collectionChange();
          _this23.vGrid.loading = false;
        }
      }, 50);
    }
  };

  VGridConfig.prototype.getCollectionLength = function getCollectionLength() {
    return this.vGrid.vGridCollectionFiltered.length;
  };

  VGridConfig.prototype.clickHandler = function clickHandler(event, row) {
    this.vGrid.vGridCurrentRow = row;

    this.vGrid.vGridCurrentEntityRef = this.vGrid.vGridCollectionFiltered[row];

    var data = this.vGrid.vGridCurrentEntityRef;
    for (var k in data) {
      if (data.hasOwnProperty(k)) {
        if (this.vGrid.vGridCurrentEntity[k] !== data[k]) {
          this.vGrid.vGridCurrentEntity[k] = data[k];
        }
      }
    }

    if (event.type === "click") {
      this.vGrid.raiseEvent("v-row-onclick", {
        evt: event,
        data: this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow],
        row: this.vGrid.vGridGetRowKey(this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow][this.vGrid.vGridRowKey])
      });
    }

    if (event.type === "dblclick") {
      this.vGrid.raiseEvent("v-row-ondblclick", {
        evt: event,
        data: this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow],
        row: this.vGrid.vGridGetRowKey(this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow][this.vGrid.vGridRowKey])
      });
    }
  };

  VGridConfig.prototype.updateRowBinding = function updateRowBinding(rowNo, row, isDownScroll, isLargeScroll) {
    var _this24 = this;

    this.getDataElement(rowNo, isDownScroll, isLargeScroll, function (entity) {

      row.div.setAttribute("row", rowNo);

      if (entity === "") {
        var bindingContext = {};
        row.viewSlot.bind(bindingContext, {
          bindingContext: bindingContext,
          parentOverrideContext: _this24.vGrid.overrideContext
        });
      }

      if (entity !== "" && row.viewSlot !== null) {
        var tempRef = {};
        for (var k in entity) {
          if (entity.hasOwnProperty(k)) {
            if (tempRef[k] !== entity[k]) {
              tempRef[k] = entity[k];
            }
          }
        }
        var that = _this24;
        var _bindingContext = {};
        _bindingContext.row = rowNo;
        _bindingContext.ctx = _this24;
        _bindingContext.tempRef = tempRef;
        _bindingContext.rowRef = _this24.vGrid.vGridCollectionFiltered[rowNo];
        row.viewSlot.bind(_bindingContext, {
          bindingContext: _bindingContext,
          parentOverrideContext: _this24.vGrid.overrideContext
        });
      }

      if (entity === undefined || entity === "" || entity === null) {
        row.div.style.display = "none";
      } else {
        row.div.style.display = "block";
      }

      if (rowNo % 2 === 1) {
        if (row.div.classList.contains(_this24.css.rowEven)) {
          row.div.classList.remove(_this24.css.rowEven);
          row.div.classList.add(_this24.css.rowAlt);
        }
      } else {
        if (row.div.classList.contains(_this24.css.rowAlt)) {
          row.div.classList.remove(_this24.css.rowAlt);
          row.div.classList.add(_this24.css.rowEven);
        }
      }

      if (_this24.vGrid.vGridSelection.isSelected(rowNo)) {
        row.div.classList.add(_this24.css.rowSelected);
      } else {
        row.div.classList.remove(_this24.css.rowSelected);
      }
    });
  };

  return VGridConfig;
}();

var Contextmenu = exports.Contextmenu = function () {
  function Contextmenu(element, vGrid) {
    _classCallCheck(this, Contextmenu);

    this.element = element;
    this.vGrid = vGrid;

    this.contextMenuClassName = "v-grid-context-menu";
    this.contextMenuItemClassName = "v-grid-context-menu__item";
    this.contextMenuLinkClassName = "v-grid-context-menu__link";
    this.contextMenuSplitClassName = "v-grid-context-menu__split";

    this.taskItemInContext = null;

    this.clickCoords = null;
    this.clickCoordsX = null;
    this.clickCoordsY = null;

    this.menuState = 0;
    this.menuWidth = null;
    this.menuHeight = null;
    this.menuPosition = null;
    this.menuPositionX = null;
    this.menuPositionY = null;

    this.windowWidth = null;
    this.windowHeight = null;
  }

  Contextmenu.prototype.bind = function bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;
  };

  Contextmenu.prototype.attached = function attached() {
    this.element.classList.contains(this.classToOpenOn) ? null : this.element.classList.add(this.classToOpenOn);
    this.addListener();
  };

  Contextmenu.prototype.detached = function detached() {
    this.removeListener();
  };

  Contextmenu.prototype.canOpen = function canOpen() {
    return true;
  };

  Contextmenu.prototype.addListener = function addListener() {
    this.contextListenerBinded = this.contextListener.bind(this);
    this.element.addEventListener("contextmenu", this.contextListenerBinded);
  };

  Contextmenu.prototype.removeListener = function removeListener() {
    this.element.removeEventListener("contextmenu", this.contextListenerBinded);
  };

  Contextmenu.prototype.contextListener = function contextListener(e) {
    if (this.canOpen(e)) {

      this.taskItemInContext = this.clickInsideElement(e, this.classToOpenOn);

      if (this.taskItemInContext) {
        e.preventDefault();
        this.toggleMenuOn();
        this.positionMenu(e);
      } else {
        this.taskItemInContext = null;
        this.toggleMenuOff();
      }
    } else {
      this.toggleMenuOff();
    }
  };

  Contextmenu.prototype.addMenuClickListner = function addMenuClickListner() {
    this.clickListenerBinded = this.clickListener.bind(this);
    document.addEventListener("click", this.clickListenerBinded);
  };

  Contextmenu.prototype.removeMenuClickListner = function removeMenuClickListner() {
    document.removeEventListener("click", this.clickListenerBinded);
  };

  Contextmenu.prototype.clickListener = function clickListener(e) {
    var clickeElIsLink = this.clickInsideElement(e, this.contextMenuLinkClassName);

    if (clickeElIsLink && this.taskItemInContext) {
      e.preventDefault();
      this.menuItemListener(clickeElIsLink);
    } else {
      var button = e.which || e.button;
      if (button === 1) {
        this.toggleMenuOff();
      }
    }
  };

  Contextmenu.prototype.clickInsideElement = function clickInsideElement(e, className) {
    var el = e.srcElement || e.target;

    if (el.classList.contains(className)) {
      return el;
    } else {
      while (el = el.parentNode) {
        if (el.classList && el.classList.contains(className)) {
          return el;
        }
      }
    }

    return false;
  };

  Contextmenu.prototype.createMenu = function createMenu() {
    this.menu = document.createElement("nav");
    this.menu.classList.add(this.contextMenuClassName);
    this.menu.innerHTML = this.menuHtmlMain();
    document.body.appendChild(this.menu);
    this.menuItems = this.menu.querySelectorAll("." + this.contextMenuItemClassName);
  };

  Contextmenu.prototype.replaceMenu = function replaceMenu(html) {
    this.menu.innerHTML = html;
    this.menuItems = this.menu.querySelectorAll("." + this.contextMenuItemClassName);
  };

  Contextmenu.prototype.removeMenu = function removeMenu() {
    document.body.removeChild(this.menu);
    this.menu = null;
    this.menuItems = null;
  };

  Contextmenu.prototype.toggleMenuOn = function toggleMenuOn() {
    if (this.menuState !== 1) {
      this.menuState = 1;
      this.createMenu();
      this.addMenuClickListner();
    }
  };

  Contextmenu.prototype.toggleMenuOff = function toggleMenuOff() {
    if (this.menuState !== 0) {
      this.menuState = 0;
      this.removeMenuClickListner();
      this.removeMenu();
    }
  };

  Contextmenu.prototype.positionMenu = function positionMenu(e) {
    this.clickCoords = this.getPosition(e);
    this.clickCoordsX = this.clickCoords.x;
    this.clickCoordsY = this.clickCoords.y;

    this.menuWidth = this.menu.offsetWidth + 4;
    this.menuHeight = this.menu.offsetHeight + 4;

    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;

    if (this.windowWidth - this.clickCoordsX < this.menuWidth) {
      this.menu.style.left = this.windowWidth - this.menuWidth + "px";
    } else {
      this.menu.style.left = this.clickCoordsX + "px";
    }

    if (this.windowHeight - this.clickCoordsY < this.menuHeight) {
      this.menu.style.top = this.windowHeight - this.menuHeight + "px";
    } else {
      this.menu.style.top = this.clickCoordsY + "px";
    }
  };

  Contextmenu.prototype.getPosition = function getPosition(e) {
    var posx = 0;
    var posy = 0;

    if (!e) var e = window.event;

    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return {
      x: posx,
      y: posy
    };
  };

  Contextmenu.prototype.createMenuHTML = function createMenuHTML(menuArray) {
    var _this25 = this;

    var tempHtml = document.createElement("ul");

    menuArray.forEach(function (row) {
      var li = document.createElement("li");
      li.classList.add(_this25.contextMenuItemClassName);
      var a = document.createElement("a");
      if (row.isHeader) {
        a.classList.add(_this25.contextMenuSplitClassName);
      } else {
        a.classList.add(_this25.contextMenuLinkClassName);
      }
      a.setAttribute("data-action", row.action);
      a.innerHTML = row.value;
      tempHtml.appendChild(a);
    });

    return tempHtml.innerHTML;
  };

  return Contextmenu;
}();

var VGridCtx = exports.VGridCtx = function () {
  function VGridCtx(vGrid) {
    _classCallCheck(this, VGridCtx);

    this.vGrid = vGrid;
  }

  VGridCtx.prototype.setData = function setData(data) {
    this.vGridConfig.remoteLimit = data.limit || 40;
    this.vGridConfig.remoteLength = data.length || 0;
    this.vGridConfig.remoteOffset = data.offset || 0;
    this.keepFilterOnCollectionChange();
    this.vGrid.vGridCollection = data.col || [];
    this.setLoadingOverlay(false);
    this.vGrid.vGridPager.updatePager({
      limit: this.vGridConfig.remoteLimit,
      offset: this.vGridConfig.remoteOffset,
      length: this.vGridConfig.remoteLength
    });
  };

  VGridCtx.prototype.keepFilterOnCollectionChange = function keepFilterOnCollectionChange() {
    this.vGridConfig.keepFilterOnCollectionChange = true;
  };

  VGridCtx.prototype.rebuildColumns = function rebuildColumns() {
    this.vGridGenerator.rebuildColumns();
  };

  VGridCtx.prototype.scrollBottom = function scrollBottom() {
    var collectionLength = this.vGridConfig.getCollectionLength();
    this.contentElement.scrollTop = collectionLength * this.vGridConfig.attRowHeight;
  };

  VGridCtx.prototype.scrollTop = function scrollTop() {
    this.vGridGenerator.contentElement.scrollTop = 0;
  };

  VGridCtx.prototype.setScrollTop = function setScrollTop(newTop) {
    this.vGridGenerator.contentElement.scrollTop = newTop;
  };

  VGridCtx.prototype.rebuildColumnsRows = function rebuildColumnsRows() {
    this.vGridGenerator.rebuildColumnsRows();
  };

  VGridCtx.prototype.columnChangeAndCollection = function columnChangeAndCollection(resetScrollToTop) {
    this.vGridGenerator.columnChangeAndCollection(resetScrollToTop);
  };

  VGridCtx.prototype.redrawGrid = function redrawGrid() {
    this.vGridGenerator.redrawGrid();
  };

  VGridCtx.prototype.setColumns = function setColumns(paramObj) {
    this.vGridConfig.colConfig = paramObj.colConfig;
  };

  VGridCtx.prototype.getColumns = function getColumns() {
    var arr = [];
    this.vGridConfig.colConfig.forEach(function (obj) {
      var x = {};
      for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
          if (x[k] !== obj[k]) {
            x[k] = obj[k];
          }
        }
      }
      arr.push(x);
    });
    return {
      "colConfig": arr
    };
  };

  VGridCtx.prototype.getMaxRows = function getMaxRows() {
    var supportedHeight = 10000;
    var testUpTo = navigator.userAgent.toLowerCase().match(/firefox/) ? 8947840 : 1000000000;
    var div = document.createElement("div");

    document.body.appendChild(div);

    while (true) {
      var test = supportedHeight + 10000;
      div.style.height = test + "px";
      if (test > testUpTo || div.clientHeight !== test) {
        break;
      } else {
        supportedHeight = test;
      }
    }
    document.body.removeChild(div);
    var total = Math.ceil(supportedHeight / this.vGridConfig.attRowHeight);
    return total + ", error margin:" + Math.ceil(10000 / this.vGridConfig.attRowHeight);
  };

  VGridCtx.prototype.scrollBottomNext = function scrollBottomNext() {
    this.vGridGenerator.scrollBottomOnNext = true;
  };

  VGridCtx.prototype.setLoadingOverlay = function setLoadingOverlay(value) {
    this.vGrid.loading = value === true ? true : false;
  };

  VGridCtx.prototype.getScrollTop = function getScrollTop() {
    return this.vGridGenerator.contentElement.scrollTop;
  };

  _createClass(VGridCtx, [{
    key: 'vGridSelection',
    get: function get() {
      if (this.vGrid) {
        return this.vGrid.vGridSelection;
      } else {
        return null;
      }
    }
  }, {
    key: 'vGridConfig',
    get: function get() {
      if (this.vGrid) {
        return this.vGrid.vGridConfig;
      } else {
        return null;
      }
    }
  }, {
    key: 'vGridCellHelper',
    get: function get() {
      if (this.vGrid) {
        return this.vGrid.vGridCellHelper;
      } else {
        return null;
      }
    }
  }, {
    key: 'vGridElement',
    get: function get() {
      if (this.vGrid) {
        return this.vGrid.element;
      } else {
        return null;
      }
    }
  }, {
    key: 'vGridSortable',
    get: function get() {
      if (this.vGrid) {
        return this.vGrid.vGridSortable;
      } else {
        return null;
      }
    }
  }, {
    key: 'vGridResizable',
    get: function get() {
      if (this.vGrid) {
        return this.vGrid.vGridResizable;
      } else {
        return null;
      }
    }
  }, {
    key: 'vGridFilter',
    get: function get() {
      if (this.vGrid) {
        return this.vGrid.vGridFilter;
      } else {
        return null;
      }
    }
  }, {
    key: 'vGridSort',
    get: function get() {
      if (this.vGrid) {
        return this.vGrid.vGridSort;
      } else {
        return null;
      }
    }
  }, {
    key: 'vGridObservables',
    get: function get() {
      if (this.vGrid) {
        return this.vGrid.vGridObservables;
      } else {
        return null;
      }
    }
  }, {
    key: 'vGridGenerator',
    get: function get() {
      if (this.vGrid) {
        return this.vGrid.vGridGenerator;
      } else {
        return null;
      }
    }
  }, {
    key: 'vGridCurrentEntityRef',
    get: function get() {
      if (this.vGrid) {
        return this.vGrid.vGridCurrentEntityRef;
      } else {
        return null;
      }
    }
  }, {
    key: 'vGridRowKey',
    get: function get() {
      if (this.vGrid) {
        return this.vGrid.vGridRowKey;
      } else {
        return null;
      }
    }
  }, {
    key: 'vGridCollectionFiltered',
    get: function get() {
      if (this.vGrid) {
        return this.vGrid.vGridCollectionFiltered;
      } else {
        return null;
      }
    }
  }, {
    key: 'vGridCollection',
    get: function get() {
      if (this.vGrid) {
        return this.vGrid.vGridCollection;
      } else {
        return null;
      }
    }
  }]);

  return VGridCtx;
}();

var VGridElementColConfig = exports.VGridElementColConfig = (_dec21 = (0, _aureliaFramework.noView)(), _dec22 = (0, _aureliaFramework.processContent)(function (compiler, resources, element, instruction) {

  var headerTemplateElement = element.getElementsByTagName("V-HEADER-TEMPLATE")[0];
  var headerTemplateHtml = headerTemplateElement ? headerTemplateElement.innerHTML : null;
  if (headerTemplateHtml !== '') {
    instruction.colHeaderTemplate = headerTemplateHtml;
  }

  var rowTemplateElement = element.getElementsByTagName("V-ROW-TEMPLATE")[0];
  var rowTemplateHtml = rowTemplateElement ? rowTemplateElement.innerHTML : null;
  if (rowTemplateHtml !== '') {
    instruction.colRowTemplate = rowTemplateHtml;
  }

  element.innerHTML = '';

  var css = element.getAttribute("col-css");
  if (css) {
    instruction.colCss = css;
  }
}), _dec23 = (0, _aureliaFramework.customElement)('v-grid-col'), _dec24 = (0, _aureliaFramework.inject)(Element, VGrid, _aureliaFramework.TargetInstruction), _dec25 = (0, _aureliaFramework.bindable)({ attribute: "col-width" }), _dec26 = (0, _aureliaFramework.bindable)({ attribute: "col-field" }), _dec27 = (0, _aureliaFramework.bindable)({ attribute: "col-header-name" }), _dec28 = (0, _aureliaFramework.bindable)({ attribute: "col-sort" }), _dec29 = (0, _aureliaFramework.bindable)({ attribute: "col-filter" }), _dec30 = (0, _aureliaFramework.bindable)({ attribute: "col-filter-top" }), _dec31 = (0, _aureliaFramework.bindable)({ attribute: "col-add-label-attributes" }), _dec32 = (0, _aureliaFramework.bindable)({ attribute: "col-add-filter-attributes" }), _dec33 = (0, _aureliaFramework.bindable)({ attribute: "col-add-row-attributes" }), _dec34 = (0, _aureliaFramework.bindable)({ attribute: "col-type" }), _dec21(_class15 = _dec22(_class15 = _dec23(_class15 = _dec24(_class15 = (_class16 = function () {
  function VGridElementColConfig(element, vGrid, targetInstruction) {
    _classCallCheck(this, VGridElementColConfig);

    _initDefineProp(this, 'colWidth', _descriptor, this);

    _initDefineProp(this, 'colField', _descriptor2, this);

    _initDefineProp(this, 'colHeaderName', _descriptor3, this);

    _initDefineProp(this, 'colSort', _descriptor4, this);

    _initDefineProp(this, 'colFilter', _descriptor5, this);

    _initDefineProp(this, 'colFilterTop', _descriptor6, this);

    _initDefineProp(this, 'colAddLabelAttributes', _descriptor7, this);

    _initDefineProp(this, 'colAddFilterAttributes', _descriptor8, this);

    _initDefineProp(this, 'colAddRowAttributes', _descriptor9, this);

    _initDefineProp(this, 'colType', _descriptor10, this);

    this.vGrid = vGrid;
    this.element = element;
    this.colRowTemplate = targetInstruction.elementInstruction.colRowTemplate;
    this.colHeaderTemplate = targetInstruction.elementInstruction.colHeaderTemplate;
    this.colCss = targetInstruction.elementInstruction.colCss;
  }

  VGridElementColConfig.prototype.bind = function bind(bindingContext, overrideContext) {
    this.vGrid.vGridConfig.columnLength++;

    this.vGrid.vGridConfig.colConfig.push({
      colWidth: this.colWidth || 100,
      colRowTemplate: this.colRowTemplate,
      colHeaderTemplate: this.colHeaderTemplate,
      colField: this.colField,
      colHeaderName: this.colHeaderName,
      colAddLabelAttributes: this.colAddLabelAttributes,
      colAddFilterAttributes: this.colAddFilterAttributes,
      colAddRowAttributes: this.colAddRowAttributes,
      colSort: this.colSort,
      colFilter: this.colFilter,
      colFilterTop: this.colFilterTop === "true" ? true : false,
      colCss: this.colCss,
      colType: this.colType || "text"
    });
  };

  return VGridElementColConfig;
}(), (_descriptor = _applyDecoratedDescriptor(_class16.prototype, 'colWidth', [_dec25], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class16.prototype, 'colField', [_dec26], {
  enumerable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class16.prototype, 'colHeaderName', [_dec27], {
  enumerable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class16.prototype, 'colSort', [_dec28], {
  enumerable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class16.prototype, 'colFilter', [_dec29], {
  enumerable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class16.prototype, 'colFilterTop', [_dec30], {
  enumerable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class16.prototype, 'colAddLabelAttributes', [_dec31], {
  enumerable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class16.prototype, 'colAddFilterAttributes', [_dec32], {
  enumerable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class16.prototype, 'colAddRowAttributes', [_dec33], {
  enumerable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class16.prototype, 'colType', [_dec34], {
  enumerable: true,
  initializer: null
})), _class16)) || _class15) || _class15) || _class15) || _class15);
var VGridElementFooterPager = exports.VGridElementFooterPager = (_dec35 = (0, _aureliaFramework.customElement)('v-grid-pager'), _dec36 = (0, _aureliaFramework.inject)(Element), _dec35(_class18 = _dec36(_class18 = function () {
  function VGridElementFooterPager(element) {
    _classCallCheck(this, VGridElementFooterPager);

    this.info = "";

    this.element = element;
  }

  VGridElementFooterPager.prototype.bind = function bind(parent) {
    this.parent = parent;
    this.vGrid = parent.vGrid;
    this.vGridConfig = parent.vGrid.vGridConfig;
    this.vGrid.vGridPager = this;
  };

  VGridElementFooterPager.prototype.attached = function attached() {
    this.statusNextButton = false;
    this.statusLastButton = false;
    this.statusFirstButton = false;
    this.statusPrevButton = false;
  };

  VGridElementFooterPager.prototype.updatePager = function updatePager(data) {
    this.collectionLength = data.length;
    this.limit = data.limit;
    this.offset = data.offset;
    this.page = this.offset ? Math.ceil(this.offset / this.limit) + 1 : 1;
    if (this.page === 1) {
      this.statusFirstButton = false;
      this.statusPrevButton = false;
    } else {
      this.statusFirstButton = true;
      this.statusPrevButton = true;
    }

    if (this.offset >= this.collectionLength - this.limit) {
      this.statusNextButton = false;
      this.statusLastButton = false;
    } else {
      this.statusNextButton = true;
      this.statusLastButton = true;
    }

    this.info = 'Page ' + this.page + ' of ' + Math.ceil(this.collectionLength / this.limit) + ', Total entities:' + this.collectionLength + ', page size ' + this.limit;
  };

  VGridElementFooterPager.prototype.firstBtn = function firstBtn() {
    this.vGrid.loading = true;
    this.vGridConfig.remoteOffset = 0;
    this.vGridConfig.remoteCall();
  };

  VGridElementFooterPager.prototype.nextBtn = function nextBtn() {
    this.vGrid.loading = true;
    this.vGridConfig.remoteOffset = this.vGridConfig.remoteOffset + this.vGridConfig.remoteLimit;
    this.vGridConfig.remoteCall();
  };

  VGridElementFooterPager.prototype.prevBtn = function prevBtn() {
    this.vGrid.loading = true;
    this.vGridConfig.remoteOffset = this.vGridConfig.remoteOffset - this.vGridConfig.remoteLimit;
    this.vGridConfig.remoteCall();
  };

  VGridElementFooterPager.prototype.lastBtn = function lastBtn() {
    this.vGrid.loading = true;
    this.vGridConfig.remoteOffset = this.vGridConfig.remoteLength - this.vGridConfig.remoteLimit;
    this.vGridConfig.remoteCall();
  };

  return VGridElementFooterPager;
}()) || _class18) || _class18);
var VGridElementRowRepeat = exports.VGridElementRowRepeat = (_dec37 = (0, _aureliaFramework.noView)(), _dec38 = (0, _aureliaFramework.customElement)('v-grid-row-repeat'), _dec39 = (0, _aureliaFramework.processContent)(function (compiler, resources, element, instruction) {

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
}), _dec40 = (0, _aureliaFramework.inject)(Element, VGrid, _aureliaFramework.TargetInstruction), _dec37(_class20 = _dec38(_class20 = _dec39(_class20 = _dec40(_class20 = function () {
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
}()) || _class20) || _class20) || _class20) || _class20);

var VGridFilter = exports.VGridFilter = function () {
  function VGridFilter(vGrid) {
    _classCallCheck(this, VGridFilter);

    this.lastFilter = [];
    this.queryStrings = {};
    this.filterOperatorTable = {
      "=": 1,
      "<=": 2,
      ">=": 3,
      "<": 4,
      ">": 5,
      "*": 6,
      "!=": 7,
      "!*": 8,
      "*=": 9,
      "=*": 10 };
    this.filterOperatorTableString = {
      "=": "equals",
      "<=": "less than or eq",
      ">=": "greater than or eq",
      "<": "less than",
      ">": "greater than",
      "*": "contains",
      "!=": "not equal to",
      "!*": "does not contain",
      "*=": "begins with",
      "=*": "ends with" };

    this.vGrid = vGrid;
  }

  VGridFilter.prototype.getNameOfFilter = function getNameOfFilter(name) {
    return this.filterOperatorTableString[name];
  };

  VGridFilter.prototype.run = function run(objArray, ObjFilter) {
    var filterOperatorTable = this.filterOperatorTable;

    var resultArray = objArray.filter(function (data, i) {
      var result = true;
      ObjFilter.forEach(function (x) {
        var rowValue;
        var filterValue;
        var filterOperator = filterOperatorTable[x.operator];
        var newFilterOperator;

        var typeBool = {
          "true": true,
          "false": false
        };

        var type;
        try {
          type = _typeof(data[x.attribute]);
        } catch (e) {
          type = "string";
        }

        switch (type) {
          case "number":
            rowValue = data[x.attribute];
            filterValue = Number(x.value);
            filterOperator = filterOperator || 1;
            if (filterOperator === 6) {
              filterOperator = 1;
            }

            break;
          case "string":
            rowValue = data[x.attribute].toLowerCase();
            filterValue = x.value.toLowerCase();
            filterOperator = filterOperator || 9;
            newFilterOperator = filterOperator;

            if (x.value.charAt(0) === "*" && filterOperator === 9) {
              newFilterOperator = 6;
              filterValue = filterValue.substr(1, filterValue.length);
            }

            if (x.value.charAt(0) === "*" && filterOperator === 1) {
              newFilterOperator = 10;
              filterValue = filterValue.substr(1, filterValue.length);
            }

            if (x.value.charAt(x.value.length - 1) === "*" && filterOperator === 1 && newFilterOperator === 10) {
              newFilterOperator = 6;
              filterValue = filterValue.substr(0, filterValue.length - 1);
            }

            if (x.value.charAt(x.value.length - 1) === "*" && filterOperator === 1 && newFilterOperator !== 10 && newFilterOperator !== 6) {
              newFilterOperator = 9;
              filterValue = filterValue.substr(0, filterValue.length - 1);
            }

            if (filterOperator !== newFilterOperator) {
              filterOperator = newFilterOperator;
            }
            break;

          case "boolean":
            rowValue = data[x.attribute];
            filterValue = typeBool[x.value];
            filterOperator = 1;
            break;

          case "object":
            rowValue = data[x.attribute].toISOString();
            filterValue = new Date(x.value).toISOString();
            filterOperator = filterOperator || 2;
            break;

          default:
            rowValue = data[x.attribute].toLowerCase();
            filterValue = x.value.toLowerCase();
            filterOperator = filterOperator || 1;
            break;
        }

        switch (filterOperator) {
          case 1:
            if (rowValue !== filterValue) {
              result = false;
            }
            break;
          case 2:
            if (!(rowValue <= filterValue)) {
              result = false;
            }
            break;
          case 3:
            if (!(rowValue >= filterValue)) {
              result = false;
            }
            break;
          case 4:
            if (!(rowValue < filterValue)) {
              result = false;
            }
            break;
          case 5:
            if (!(rowValue > filterValue)) {
              result = false;
            }
            break;
          case 6:
            if (rowValue.indexOf(filterValue) === -1) {
              result = false;
            }
            break;
          case 7:
            if (rowValue !== filterValue) {
              result = false;
            }
            break;
          case 8:
            if (rowValue.indexOf(filterValue) !== -1) {
              result = false;
            }
            break;
          case 9:
            if (rowValue.substring(0, filterValue.length) !== filterValue) {
              result = false;
            }
            break;
          case 10:
            if (rowValue.substring(rowValue.length - filterValue.length, rowValue.length) !== filterValue) {
              result = false;
            }
            break;
          default:
            if (rowValue !== filterValue) {
              result = false;
            }
        }
        if (type === "string") {
          if (x.value.charAt(0) === "*" && x.value.length === 1) {
            result = true;
          }
        }
      });
      return result;
    });
    return resultArray;
  };

  return VGridFilter;
}();

var VGridGenerator = exports.VGridGenerator = function () {
  function VGridGenerator(vGrid) {
    _classCallCheck(this, VGridGenerator);

    this.contentHeight = 0;
    this.gridHeight = 0;
    this.gridWidth = 0;
    this.scrollBodyHeight = 0;
    this.scrollBottomOnNext = false;
    this.gridElement = null;
    this.headerElement = null;
    this.headerScrollElement = null;
    this.contentElement = null;
    this.footerElement = null;
    this.rowElementArray = [];
    this.contentScrollBodyElement = null;
    this.rowViewFactory = null;
    this.loadingScreenViewSlot = null;
    this.headerViewSlot = null;
    this.footerViewSlot = null;

    this.vGrid = vGrid;
  }

  VGridGenerator.prototype.init = function init(isRebuild) {
    this.addHtml();
    this.addEvents();
    if (!isRebuild) {
      this.vGridSelection.setMode(this.vGridConfig.attMultiSelect);
    }
    this.updateGridScrollbars();
    this.rebindAllRowSlots();
    this.setLargeScrollLimit();
  };

  VGridGenerator.prototype.addHtml = function addHtml() {
    this.createGridElement();
    this.createGridHeaderElement();
    this.createGridContentElement();
    this.createGridFooterElement();
    this.createGridScrollBodyElement();
    this.createGridRowElements();

    this.createLoadingScreenViewSlot();
    this.createHeaderViewSlot();
    this.createRowViewSlots();
    if (this.vGridConfig.eventOnRemoteCall) {
      this.createFooterViewSlot();
    }
  };

  VGridGenerator.prototype.addEvents = function addEvents() {
    var _this26 = this;

    for (var i = 0; i < this.getRowCacheLength(); i++) {
      var rowElement = this.rowElementArray[i].div;

      rowElement.addEventListener("dblclick", function (e) {
        var currentRow = parseInt(e.currentTarget.getAttribute("row"));
        _this26.vGridConfig.clickHandler(e, currentRow);
      }, false);

      rowElement.addEventListener("click", function (e) {
        var currentRow = parseInt(e.currentTarget.getAttribute("row"));
        _this26.vGridConfig.clickHandler(e, currentRow);
        if (_this26.vGridConfig.attMultiSelect !== undefined) {
          _this26.vGridSelection.setHightlight(e, currentRow, _this26);
        }
      }, false);
    }

    this.contentElement.addEventListener("scroll", function (e) {
      if (_this26.vGridConfig.attRequestAnimationFrame) {
        requestAnimationFrame(function () {
          _this26.vGridScrollEvents.scrollEventHandler();
        });
      } else {
        _this26.vGridScrollEvents.scrollEventHandler();
      }
    });

    this.headerElement.addEventListener("scroll", function (e) {
      _this26.contentElement.scrollLeft = _this26.headerElement.scrollLeft;
      _this26.vGridScrollEvents.lastScrollLeft = _this26.headerElement.scrollLeft;
    });
  };

  VGridGenerator.prototype.createGridElement = function createGridElement() {

    var x = document.createElement("DIV");
    this.vGridElement.appendChild(x);
    this.vGridElement.style.display = "block";
    this.gridElement = x;

    this.gridElement.classList.add(this.vGridConfig.css.wrapper);
    this.gridElement.style.position = "relative";
    this.gridElement.style.height = '100%';
    this.gridElement.style.width = "100%";

    this.gridHeight = this.gridElement.clientHeight;
    this.gridWidght = this.gridElement.clientWidth;
  };

  VGridGenerator.prototype.createGridHeaderElement = function createGridHeaderElement() {
    var header = document.createElement("DIV");
    header.classList.add(this.vGridConfig.css.mainHeader);
    header.style.height = this.vGridConfig.attHeaderHeight + "px";
    if (!this.headerElement) {
      this.gridElement.appendChild(header);
      this.headerElement = header;
    } else {
      this.headerElement.innerHTML = header.innerHTML;
    }
    this.headerScrollElement = document.createElement("DIV");
    this.headerScrollElement.classList.add(this.vGridConfig.css.row);
    this.headerScrollElement.classList.add(this.vGridConfig.css.rowHeader);
    this.headerScrollElement.style.height = this.vGridConfig.attHeaderHeight + "px";
    this.headerScrollElement.style.width = this.vGrid.vGridConfig.repeater ? "100%" : this.getTotalColumnWidth() + "px";
    this.headerElement.appendChild(this.headerScrollElement);
  };

  VGridGenerator.prototype.createGridContentElement = function createGridContentElement() {
    var gridWrapperHeight = this.gridHeight;
    var headerAndFooterHeight = this.vGridConfig.attHeaderHeight + this.vGridConfig.attFooterHeight;
    this.contentHeight = gridWrapperHeight - headerAndFooterHeight;

    this.contentElement = document.createElement("DIV");
    this.contentElement.classList.add(this.vGridConfig.css.mainContent);
    this.contentElement.style.height = this.contentHeight + "px";
    this.gridElement.appendChild(this.contentElement);
  };

  VGridGenerator.prototype.createGridFooterElement = function createGridFooterElement() {
    this.footerElement = document.createElement("DIV");
    this.footerElement.classList.add(this.vGridConfig.css.mainFooter);
    this.footerElement.style.height = this.vGridConfig.attFooterHeight + "px";
    this.gridElement.appendChild(this.footerElement);
  };

  VGridGenerator.prototype.createGridScrollBodyElement = function createGridScrollBodyElement() {
    this.setScrollBodyHeightToVar();

    this.contentScrollBodyElement = document.createElement("DIV");
    this.contentScrollBodyElement.classList.add(this.vGridConfig.css.scrollBody);
    this.contentScrollBodyElement.style.height = this.scrollBodyHeight + "px";
    this.contentScrollBodyElement.style.width = this.vGrid.vGridConfig.repeater ? "100%" : this.getTotalColumnWidth() + "px";
    this.contentElement.appendChild(this.contentScrollBodyElement);
  };

  VGridGenerator.prototype.createGridRowElements = function createGridRowElements() {
    var minimumRowsNeeded = parseInt(this.contentHeight / this.vGridConfig.attRowHeight, 10);

    if (minimumRowsNeeded % 2 === 1) {
      minimumRowsNeeded = minimumRowsNeeded + 7;
    } else {
      minimumRowsNeeded = minimumRowsNeeded + 6;
    }

    var top = 0;
    for (var i = 0; i < minimumRowsNeeded; i++) {

      var row = document.createElement("DIV");

      row.classList.add(this.vGridConfig.css.row);

      if (i % 2 === 1) {
        row.classList.add(this.vGridConfig.css.rowAlt);
      } else {
        row.classList.add(this.vGridConfig.css.rowEven);
      }

      row.style.height = this.vGridConfig.attRowHeight + "px";

      this.setRowTopValue([{
        div: row,
        top: 0
      }], 0, top);

      row.style.minWidth = this.gridElement.offsetWidth + "px";
      row.style.width = this.vGrid.vGridConfig.repeater ? "100%" : this.getTotalColumnWidth() + "px";

      row.innerHTML = "";
      this.contentScrollBodyElement.appendChild(row);

      this.rowElementArray.push({
        div: row,
        top: top
      });

      top = top + this.vGridConfig.attRowHeight;
    }
  };

  VGridGenerator.prototype.createLoadingScreenViewSlot = function createLoadingScreenViewSlot() {

    var loadingScreentHtml = ['<div class="v-grid-overlay" if.bind="loading">', '</div>', '<div if.two-way="loading" class="v-grid-progress-indicator">', '<div class="v-grid-progress-bar" role="progressbar" style="width:100%">', '<span>${ loadingMessage }</span>', '</div>', '</div>'];
    var viewFactory = this.vGrid.viewCompiler.compile('<template>' + loadingScreentHtml.join("") + '</template>', this.vGrid.viewResources);
    var view = viewFactory.create(this.vGrid.container);
    this.loadingScreenViewSlot = new _aureliaFramework.ViewSlot(this.gridElement, true);
    this.loadingScreenViewSlot.add(view);

    this.loadingScreenViewSlot.bind(this.vGrid, {
      bindingContext: this.vGrid,
      parentOverrideContext: this.vGrid.overrideContext
    });
    this.loadingScreenViewSlot.attached();
  };

  VGridGenerator.prototype.createHeaderViewSlot = function createHeaderViewSlot() {
    var viewFactory = this.getHeaderViewFactory();
    var view = viewFactory.create(this.vGrid.container);
    this.headerViewSlot = new _aureliaFramework.ViewSlot(this.headerScrollElement, true);
    this.headerViewSlot.add(view);

    var bindingContext = {};
    this.headerViewSlot.bind(bindingContext, {
      bindingContext: bindingContext,
      parentOverrideContext: this.vGrid.overrideContext
    });
    this.headerViewSlot.attached();
  };

  VGridGenerator.prototype.createRowViewSlots = function createRowViewSlots() {
    var rows = this.rowElementArray;
    for (var i = 0; i < rows.length; i++) {
      var viewFactory = this.getRowViewFactory();
      var view = viewFactory.create(this.vGrid.container);
      rows[i].viewSlot = new _aureliaFramework.ViewSlot(rows[i].div, true);
      rows[i].viewSlot.add(view);
      var bindingContext = {};
      rows[i].viewSlot.bind(bindingContext, {
        bindingContext: bindingContext,
        parentOverrideContext: this.vGrid.overrideContext
      });
      rows[i].viewSlot.attached();
    }
  };

  VGridGenerator.prototype.createFooterViewSlot = function createFooterViewSlot() {
    var viewFactory = this.vGrid.viewCompiler.compile('<template><v-grid-pager></v-grid-pager></template>', this.vGrid.viewResources);
    var view = viewFactory.create(this.vGrid.container);

    this.footerViewSlot = new _aureliaFramework.ViewSlot(this.footerElement, true);
    this.footerViewSlot.add(view);

    this.footerViewSlot.bind(this, {
      bindingContext: this,
      parentOverrideContext: this.vGrid.overrideContext
    });

    this.footerViewSlot.attached();
  };

  VGridGenerator.prototype.rebindAllRowSlots = function rebindAllRowSlots() {
    for (var i = 0; i < this.getRowCacheLength(); i++) {
      var currentRow = this.rowElementArray[i].top / this.vGridConfig.attRowHeight;
      var row = this.rowElementArray[i];
      this.vGridConfig.updateRowBinding(currentRow, row, true, true);
    }
  };

  VGridGenerator.prototype.rebindRowNumber = function rebindRowNumber(rowno) {
    for (var i = 0; i < this.getRowCacheLength(); i++) {
      var currentRow = this.rowElementArray[i].top / this.vGridConfig.attRowHeight;
      if (rowno === currentRow) {
        var row = this.rowElementArray[i];
        this.vGridConfig.updateRowBinding(currentRow, row, true, true);
      }
    }
  };

  VGridGenerator.prototype.updateSelectionOnAllRows = function updateSelectionOnAllRows() {
    var i;
    for (i = 0; i < this.getRowCacheLength(); i++) {
      var currentRow = this.rowElementArray[i].top / this.vGridConfig.attRowHeight;
      if (this.vGridSelection.isSelected(currentRow)) {
        this.rowElementArray[i].div.classList.add(this.vGridConfig.css.rowSelected);
      } else {
        this.rowElementArray[i].div.classList.remove(this.vGridConfig.css.rowSelected);
      }
    }
  };

  VGridGenerator.prototype.getHeaderViewFactory = function getHeaderViewFactory() {
    var rowTemplate = "";
    if (this.vGrid.vGridConfig.repeater) {
      rowTemplate = this.vGrid.vGridConfig.repeatRowHeaderTemplate;
    } else {
      for (var i = 0; i < this.vGridConfig.columnLength; i++) {

        var style = 'style="width:' + this.vGridConfig.colConfig[i].colWidth + 'px"';
        var elementClass = 'class="' + (this.vGridConfig.css.rowHeaderColumn + i) + '"';
        var template = this.vGridConfig.colConfig[i].colHeaderTemplate;

        rowTemplate = rowTemplate + ('<v-grid-header-col ' + style + ' ' + elementClass + ' column-no="' + i + '">' + template + '</v-grid-header-col>');
      }
    }
    var viewFactory = this.vGrid.viewCompiler.compile('<template>' + rowTemplate + '</template>', this.vGrid.viewResources);
    return viewFactory;
  };

  VGridGenerator.prototype.getRowViewFactory = function getRowViewFactory() {
    var viewFactory;

    if (this.rowViewFactory !== null) {
      viewFactory = this.rowViewFactory;
    } else {
      var rowTemplate = "";
      if (this.vGrid.vGridConfig.repeater) {
        rowTemplate = '<template>' + this.vGridConfig.repeatRowTemplate + '</template>';
      } else {
        rowTemplate = '<template>';
        for (var i = 0; i < this.vGridConfig.columnLength; i++) {

          var style = 'style="width:' + this.vGridConfig.colConfig[i].colWidth + 'px"';
          var elementClass = 'class="' + (this.vGridConfig.css.rowColumn + i) + '"';
          var template = this.vGridConfig.colConfig[i].colRowTemplate;

          rowTemplate = rowTemplate + ('<v-grid-row-col ' + style + ' ' + elementClass + ' column-no=' + i + '>' + template + '</v-grid-row-col>');
        }
        rowTemplate + '</template>';
      }
      viewFactory = this.vGrid.viewCompiler.compile(rowTemplate, this.vGrid.viewResources);
    }

    this.rowViewFactory = viewFactory;

    return this.rowViewFactory;
  };

  VGridGenerator.prototype.getTotalColumnWidth = function getTotalColumnWidth() {
    var total = 0;
    for (var i = 0; i < this.vGridConfig.columnLength; i++) {
      total = total + parseInt(this.vGridConfig.colConfig[i].colWidth, 10);
    }
    return total;
  };

  VGridGenerator.prototype.getRowCacheLength = function getRowCacheLength() {
    return this.rowElementArray.length;
  };

  VGridGenerator.prototype.setRowTopValue = function setRowTopValue(rowArray, elementNo, topValue) {
    rowArray[elementNo].div.style.transform = 'translate3d(0px,' + topValue + 'px, 0px)';
    rowArray[elementNo].top = topValue;
  };

  VGridGenerator.prototype.rebuildGridHeaderHtmlAndViewSlot = function rebuildGridHeaderHtmlAndViewSlot() {
    this.unbindDetachHeaderViewSlots();
    this.headerElement.removeChild(this.headerScrollElement);
    this.createGridHeaderElement();
    this.createHeaderViewSlot();
  };

  VGridGenerator.prototype.setScrollBodyHeightToVar = function setScrollBodyHeightToVar() {
    var collectionLength = this.vGridConfig.getCollectionLength();
    this.scrollBodyHeight = collectionLength * this.vGridConfig.attRowHeight;
  };

  VGridGenerator.prototype.correctRowAndScrollbodyWidth = function correctRowAndScrollbodyWidth() {
    this.contentScrollBodyElement.style.width = this.vGrid.vGridConfig.repeater ? "100%" : this.getTotalColumnWidth() + "px";
    for (var i = 0; i < this.rowElementArray.length; i++) {
      this.rowElementArray[i].div.style.width = this.vGrid.vGridConfig.repeater ? "100%" : this.getTotalColumnWidth() + "px";
    }
    this.headerScrollElement.style.width = this.vGrid.vGridConfig.repeater ? "100%" : this.getTotalColumnWidth() + "px";
  };

  VGridGenerator.prototype.correctHeaderAndScrollbodyWidth = function correctHeaderAndScrollbodyWidth() {
    this.contentScrollBodyElement.style.width = this.vGrid.vGridConfig.repeater ? "100%" : this.getTotalColumnWidth() + "px";
    this.headerScrollElement.style.width = this.vGrid.vGridConfig.repeater ? "100%" : this.getTotalColumnWidth() + "px";
  };

  VGridGenerator.prototype.hideRowsThatIsLargerThanCollection = function hideRowsThatIsLargerThanCollection() {
    var currentRow = parseInt(this.vGridScrollEvents.lastScrollTop / this.vGridConfig.attRowHeight, 10);
    for (var i = 0; i < this.getRowCacheLength(); i++) {
      var row = this.rowElementArray[i];
      var rowTop = parseInt(row.top, 10);
      if (rowTop > (this.vGridConfig.getCollectionLength() - 1) * this.vGridConfig.attRowHeight && rowTop > parseInt(this.contentElement.style.height) - this.vGridConfig.attRowHeight) {
        this.setRowTopValue([row], 0, -5000 + i);
      }
    }

    this.rowElementArray.sort(function (a, b) {
      return parseInt(a.top) - parseInt(b.top);
    });
  };

  VGridGenerator.prototype.updateGridScrollbars = function updateGridScrollbars() {
    var collectionHeight = this.vGridConfig.getCollectionLength() * this.vGridConfig.attRowHeight + this.vGridConfig.attRowHeight / 2;
    var bodyHeight = this.contentElement.offsetHeight;
    if (collectionHeight <= bodyHeight) {
      this.contentElement.scrollTop = 0;
      this.contentElement.style.overflow = "";
      this.contentElement.style.overflowY = "hidden";
      this.contentElement.style.overflowX = "hidden";
      this.headerElement.style.overflowY = "hidden";
    } else {
      this.contentElement.style.overflow = "";
      this.contentElement.style.overflowY = "scroll";
      this.contentElement.style.overflowX = "hidden";
      this.headerElement.style.overflowY = "scroll";
    }

    if (this.contentElement.offsetWidth - 5 < this.getTotalColumnWidth()) {
      this.contentElement.style.overflowX = "scroll";
    }
  };

  VGridGenerator.prototype.setLargeScrollLimit = function setLargeScrollLimit() {
    if (!this.vGridConfig.largeScrollLimit) {
      this.vGridConfig.largeScrollLimit = this.contentHeight * 1.5;
    }
  };

  VGridGenerator.prototype.unbindDetachRowViewSlots = function unbindDetachRowViewSlots() {
    var rows = this.rowElementArray;
    for (var i = 0; i < rows.length; i++) {
      rows[i].viewSlot.unbind();
      rows[i].viewSlot.detached();
      rows[i].viewSlot.removeAll();
      rows[i].viewSlot = null;
      rows[i].div.innerHTML = "";
      this.rowViewFactory = null;
    }
  };

  VGridGenerator.prototype.unbindDetachHeaderViewSlots = function unbindDetachHeaderViewSlots() {
    this.headerViewSlot.unbind();
    this.headerViewSlot.detached();
    this.headerViewSlot.removeAll();
    this.headerViewSlot = null;
  };

  VGridGenerator.prototype.unbindDetachFooterViewSlots = function unbindDetachFooterViewSlots() {
    if (this.footerViewSlot) {
      this.footerViewSlot.unbind();
      this.footerViewSlot.detached();
      this.footerViewSlot.removeAll();
      this.footerViewSlot = null;
    }
  };

  VGridGenerator.prototype.unbindDetachLoadingScreenViewSlots = function unbindDetachLoadingScreenViewSlots() {
    if (this.loadingScreenViewSlot) {
      this.loadingScreenViewSlot.unbind();
      this.loadingScreenViewSlot.detached();
      this.loadingScreenViewSlot.removeAll();
      this.loadingScreenViewSlot = null;
    }
  };

  VGridGenerator.prototype.unbindDetachViewSlots = function unbindDetachViewSlots() {
    this.unbindDetachRowViewSlots();
    this.unbindDetachHeaderViewSlots();
    this.unbindDetachFooterViewSlots();
    this.unbindDetachLoadingScreenViewSlots();
  };

  VGridGenerator.prototype.recreateRowViewSlots = function recreateRowViewSlots() {
    this.unbindDetachRowViewSlots();
    this.createRowViewSlots();
  };

  VGridGenerator.prototype.redrawGrid = function redrawGrid() {
    this.unbindDetachViewSlots();
    this.vGridElement.getElementsByClassName(this.vGridConfig.css.wrapper)[0].remove();
    this.rowElementArray = null;
    this.rowElementArray = [];
    this.headerElement = null;
    this.contentElement = null;
    this.footerElement = null;
    this.contentScrollBodyElement = null;
    this.rowViewFactory = null;
    this.init(true);
    this.fixHeaderWithBody();
  };

  VGridGenerator.prototype.fixHeaderWithBody = function fixHeaderWithBody() {
    var currentScrollLeft = this.contentElement.scrollLeft;
    this.headerElement.scrollLeft = currentScrollLeft;
  };

  VGridGenerator.prototype.rebuildColumns = function rebuildColumns() {
    this.rebuildGridHeaderHtmlAndViewSlot();
    this.recreateRowViewSlots();
    this.rebindAllRowSlots();
    this.correctRowAndScrollbodyWidth();
    this.updateSelectionOnAllRows();
    this.updateGridScrollbars();
    this.fixHeaderWithBody();
  };

  VGridGenerator.prototype.rebuildColumnsRows = function rebuildColumnsRows() {
    this.recreateRowViewSlots();
    this.rebindAllRowSlots();
    this.updateSelectionOnAllRows();
    this.fixHeaderWithBody();
  };

  VGridGenerator.prototype.columnChangeAndCollection = function columnChangeAndCollection(resetScrollToTop) {
    this.rebuildGridHeaderHtmlAndViewSlot();
    this.recreateRowViewSlots();
    this.rebindAllRowSlots();
    this.updateSelectionOnAllRows();
    this.collectionChange(resetScrollToTop);
  };

  VGridGenerator.prototype.collectionChange = function collectionChange(resetScrollToTop, scrollBottom) {
    if (this.scrollBottomOnNext) {
      scrollBottom = true;
      this.scrollBottomOnNext = false;
    }

    this.setScrollBodyHeightToVar();
    this.contentScrollBodyElement.style.height = this.scrollBodyHeight + "px";
    var reset = false;
    if (resetScrollToTop === true) {
      this.contentElement.scrollTop = 0;
    }
    if (this.scrollBodyHeight < this.contentElement.scrollTop || scrollBottom) {
      var collectionLength = this.vGridConfig.getCollectionLength();
      var contentRows = parseInt(this.contentElement.offsetHeight / this.vGridConfig.attRowHeight);
      var scrollOffsetHeight = contentRows * this.vGridConfig.attRowHeight;
      this.contentElement.scrollTop = collectionLength * this.vGridConfig.attRowHeight - scrollOffsetHeight;
    }

    this.updateGridScrollbars();
    this.correctRowAndScrollbodyWidth();
    this.updateSelectionOnAllRows();
    this.fixHeaderWithBody();
    this.vGridScrollEvents.onLargeScroll();
    this.rebindAllRowSlots();
    if (scrollBottom) {
      this.contentElement.scrollTop = this.contentElement.scrollTop + this.vGridConfig.attRowHeight;
    }

    this.contentScrollBodyElement.style.height = this.scrollBodyHeight - 1 + "px";
    this.contentScrollBodyElement.style.height = this.scrollBodyHeight + 1 + "px";
  };

  _createClass(VGridGenerator, [{
    key: 'vGridSelection',
    get: function get() {
      if (this.vGrid) {
        return this.vGrid.vGridSelection;
      } else {
        return null;
      }
    }
  }, {
    key: 'vGridConfig',
    get: function get() {
      if (this.vGrid) {
        return this.vGrid.vGridConfig;
      } else {
        return null;
      }
    }
  }, {
    key: 'vGridCellHelper',
    get: function get() {
      if (this.vGrid) {
        return this.vGrid.vGridCellHelper;
      } else {
        return null;
      }
    }
  }, {
    key: 'vGridElement',
    get: function get() {
      if (this.vGrid) {
        return this.vGrid.element;
      } else {
        return null;
      }
    }
  }, {
    key: 'vGridResizable',
    get: function get() {
      if (this.vGrid) {
        return this.vGrid.vGridResizable;
      } else {
        return null;
      }
    }
  }, {
    key: 'vGridScrollEvents',
    get: function get() {
      if (this.vGrid) {
        return this.vGrid.vGridScrollEvents;
      } else {
        return null;
      }
    }
  }]);

  return VGridGenerator;
}();

var VGridMarkupGenerator = exports.VGridMarkupGenerator = function () {
  function VGridMarkupGenerator(vGrid) {
    _classCallCheck(this, VGridMarkupGenerator);

    this.getAttribute = function (value, capitalize) {

      var returnValue = value || "missing!";

      if (value) {
        value = value.replace('rowRef.', '');
        value = value.replace('tempRef.', '');

        var newValue = "";
        var done = false;
        for (var x = 0; x < value.length; x++) {
          var letter = value.charAt(x);

          if (!done && letter !== " " && letter !== "&" && letter !== "|" && letter !== ":") {
            newValue = newValue + letter;
          } else {
            done = true;
          }
        }

        if (capitalize) {
          returnValue = newValue.charAt(0).toUpperCase() + newValue.slice(1);
        } else {
          returnValue = newValue;
        }
      }

      return returnValue;
    };

    this.vGrid = vGrid;
  }

  VGridMarkupGenerator.prototype.generate = function generate() {
    var columnsToUse = [];
    var type = null;

    if (this.vGrid.vGridColumns && this.vGrid.vGridColumns.length > 0) {
      columnsToUse = this.vGrid.vGridColumns;
      type = 'typeArray';
    }

    if (this.vGrid.vGridConfig.colConfig && this.vGrid.vGridConfig.colConfig.length > 0) {
      columnsToUse = this.colConfig;
      type = 'typeHtml';
    }

    if (!type) {
      throw new Error('column setup missing');
    }

    if (type === 'typeArray') {
      this.vGrid.vGridConfig.colConfig = this.vGrid.vGridColumns;
      this.vGrid.vGridConfig.columnLength = this.vGrid.vGridColumns.length;
    }
    this.processColumns(this.vGrid.vGridConfig.colConfig);
  };

  VGridMarkupGenerator.prototype.processColumns = function processColumns(array) {
    var _this27 = this;

    array.forEach(function (col, index) {
      if (!col.colField && !col.colRowTemplate) {
        if (col.colType !== "selection") {
          throw new Error('colField is not set on column', index);
        }
      }

      col.colType = col.colType || "text";
      col.colFilterTop = col.colFilterTop || false;
      col.colHeaderName = col.colHeaderName || _this27.getAttribute(col.colField, true);
      col.colWidth = col.colWidth || 100;
      col.colCss = col.colCss || '';
      col.colField = _this27.checkAttribute(col.colField);

      _this27.createHeaderTemplate(col);
      _this27.createRowTemplate(col);
    });
  };

  VGridMarkupGenerator.prototype.createHeaderTemplate = function createHeaderTemplate(col) {
    if (!col.colHeaderTemplate) {
      var inputHeader = void 0;
      var labelHeader = void 0;
      switch (col.colType) {

        case "selection":
          this.vGrid.vGridConfig.attManualSelection = true;

          labelHeader = '';
          inputHeader = '<input class="vgrid-row-checkbox-100" v-selection="header" type="checkbox">';
          break;

        case "image":
          inputHeader = '<p class="vgrid-label-top"></p>';
          if (!col.colFilterTop) {
            col.colFilter = "x";
          }
          labelHeader = this.createLabelMarkup(col);
          break;

        default:
          inputHeader = this.createInputHeaderMarkup(col);
          labelHeader = this.createLabelMarkup(col);
          break;

      }

      if (col.colFilterTop) {
        col.colHeaderTemplate = inputHeader + labelHeader;
      } else {
        col.colHeaderTemplate = labelHeader + inputHeader;
      }
    }
  };

  VGridMarkupGenerator.prototype.createRowTemplate = function createRowTemplate(col) {
    if (!col.colRowTemplate) {

      switch (col.colType) {

        case "selection":
          this.vGrid.vGridConfig.attManualSelection = true;

          col.colRowTemplate = '<input v-key-move class="vgrid-row-checkbox-100"  v-selection="row" type="checkbox" >';
          break;

        case "image":
          this.createImageRowMarkup(col);
          break;

        default:
          this.createInputRowMarkup(col);
          break;

      }
    }
  };

  VGridMarkupGenerator.prototype.checkAttribute = function checkAttribute(attribute) {
    var value = attribute;
    if (attribute) {
      if (attribute.indexOf("rowRef") === -1 && attribute.indexOf("tempRef") === -1) {
        value = "rowRef." + attribute;
      }
    }
    return value;
  };

  VGridMarkupGenerator.prototype.createImageRowMarkup = function createImageRowMarkup(col) {
    var classNames = 'class="vgrid-image-round"';
    var attributeRow = col.colAddRowAttributes ? col.colAddRowAttributes : '';
    var css = col.colCss ? 'css="' + col.colCss + '"' : '';

    col.colRowTemplate = '<image ' + css + ' ' + classNames + ' v-image-fix ' + attributeRow + ' src.bind="' + col.colField + '">';
  };

  VGridMarkupGenerator.prototype.createInputRowMarkup = function createInputRowMarkup(col) {
    var colClass = 'class="' + (col.colType === "checkbox" ? 'vgrid-row-checkbox-100' : 'vgrid-row-input') + '"';

    var colType = 'type="' + col.colType + '"';

    var colAddRowAttributes = col.colAddRowAttributes ? col.colAddRowAttributes : '';

    var colCss = col.colCss ? 'css="' + col.colCss + '"' : '';

    var attributeObserver = 'v-observe-field="' + this.getAttribute(col.colField) + '"';

    if (col.colType === "checkbox") {
      col.colRowTemplate = '<input ' + attributeObserver + ' ' + colCss + ' ' + colClass + ' ' + colType + ' ' + colAddRowAttributes + '  checked.bind="' + col.colField + '">';
    } else {
      col.colRowTemplate = '<input ' + attributeObserver + ' ' + colCss + ' ' + colClass + ' ' + colType + ' ' + colAddRowAttributes + '  value.bind="' + col.colField + '">';
    }
  };

  VGridMarkupGenerator.prototype.createInputHeaderMarkup = function createInputHeaderMarkup(col) {
    var markup = void 0;
    if (col.colFilter) {
      var type = 'type="' + col.colType + '"';

      var filter = col.colFilter ? 'v-filter="' + col.colFilter + '"' : '';

      var colAddFilterAttributes = col.colAddFilterAttributes ? col.colAddFilterAttributes : '';

      var classNames = '';
      if (col.colType === "checkbox") {
        classNames = 'class="' + (col.colFilterTop ? 'vgrid-row-checkbox-50' : 'vgrid-row-checkbox-50') + '"';
      } else {
        classNames = 'class="' + (col.colFilterTop ? 'vgrid-header-input-top' : 'vgrid-header-input-bottom') + '"';
      }

      markup = '<input  ' + classNames + ' ' + colAddFilterAttributes + ' ' + type + ' ' + filter + '">';
    } else {
      markup = '';
    }

    return markup;
  };

  VGridMarkupGenerator.prototype.createLabelMarkup = function createLabelMarkup(col) {
    var filterClass = col.colFilter ? '' + (col.colFilterTop ? 'vgrid-label-bottom' : 'vgrid-label-top') : 'vgrid-label-full';

    var dragDropClass = this.vGrid.vGridConfig.attSortableHeader ? 'vGrid-vGridDragHandle' : '';

    var classname = 'class="' + dragDropClass + ' ' + filterClass + '"';

    var colAddLabelAttributes = col.colAddLabelAttributes ? col.colAddLabelAttributes : '';

    var sort = col.colSort ? 'v-sort="' + col.colSort + '"' : '';

    var markup = '<p v-drag-drop-col v-resize-col ' + classname + ' ' + sort + ' ' + colAddLabelAttributes + '>' + col.colHeaderName + '</p>';

    return markup;
  };

  return VGridMarkupGenerator;
}();

var VGridObservables = exports.VGridObservables = function () {
  function VGridObservables(vGrid, bindingEngine) {
    _classCallCheck(this, VGridObservables);

    this.bindingEngine = bindingEngine;
    this.vGrid = vGrid;
    this.subscriptionsAttributes = [];
    this.collectionSubscription = null;
    this.subscriptionsArray = [];
  }

  VGridObservables.prototype.enableObservablesCollection = function enableObservablesCollection() {
    var _this28 = this;

    var collectionSubscription = function collectionSubscription(x, y) {
      _this28.disableObservablesArray();

      _this28.vGrid.vGridCollectionFiltered = _this28.vGrid.vGridCollection.slice(0);
      _this28.vGrid.checkKeys();

      _this28.vGrid.vGridCurrentRow = -1;
      _this28.vGrid.vGridSort.reset();
      if (!_this28.vGrid.vGridConfig.keepFilterOnCollectionChange) {
        _this28.vGrid.vGridSort.reset();
        _this28.vGrid.vGridGenerator.rebuildGridHeaderHtmlAndViewSlot();

        _this28.vGrid.vGridSelection.reset();
        _this28.vGrid.vGridConfig.keepFilterOnCollectionChange = false;
      }
      _this28.vGrid.vGridGenerator.collectionChange();

      for (var k in _this28.vGrid.vGridCurrentEntity) {
        if (_this28.vGrid.vGridCurrentEntity.hasOwnProperty(k)) {
          _this28.vGrid.vGridCurrentEntity[k] = undefined;
        }
      }

      _this28.enableObservablesArray();
    };
    this.vGrid.__observers__.vGridCollection.subscribe(this.vGrid, collectionSubscription);
    this.collectioncallable = collectionSubscription;

    this.collectionSubscription = this.vGrid.__observers__.vGridCollection;
  };

  VGridObservables.prototype.enableObservablesArray = function enableObservablesArray() {
    var _this29 = this;

    var arrayObserver = this.bindingEngine.collectionObserver(this.vGrid.vGridCollection).subscribe(function (arrayObserverChanges) {

      var colFiltered = _this29.vGrid.vGridCollectionFiltered;
      var col = _this29.vGrid.vGridCollection;
      var grid = _this29.vGrid.vGridGenerator;

      var curKey = -1;
      if (_this29.vGrid.vGridCurrentEntityRef) {
        curKey = _this29.vGrid.vGridCurrentEntityRef[_this29.vGrid.vGridRowKey];
      }
      var curEntityValid = true;

      if (arrayObserverChanges.length > 0) {

        var added = false;
        var toRemove = [];

        arrayObserverChanges.forEach(function (observerChange) {
          if (observerChange.addedCount > 0) {
            for (var i = 0; i < observerChange.addedCount; i++) {
              colFiltered.push(col[observerChange.index + i]);
              _this29.vGrid.checkKey(col[observerChange.index + i]);
            }
          }

          if (observerChange.removed.length > 0) {
            observerChange.removed.forEach(function (x) {
              if (x[_this29.vGrid.vGridRowKey] === curKey) {
                curEntityValid = false;
              }

              var rowToRemove = -1;
              colFiltered.forEach(function (row, index) {
                if (row[_this29.vGrid.vGridRowKey] === x[_this29.vGrid.vGridRowKey]) {
                  rowToRemove = index;
                }
              });
              if (rowToRemove !== -1) {
                colFiltered.splice(rowToRemove, 1);
              }
            });
          }
        });

        var newRowNo = -1;

        if (!curEntityValid) {
          for (var k in _this29.vGrid.vGridCurrentEntity) {
            if (_this29.vGrid.vGridCurrentEntity.hasOwnProperty(k)) {
              _this29.vGrid.vGridCurrentEntity[k] = undefined;
            }
          }
          _this29.vGrid.vGridCurrentEntityRef = null;
          _this29.vGrid.vGridCurrentRow = -1;
        } else {
          if (curKey !== -1) {
            _this29.vGrid.vGridCollectionFiltered.forEach(function (x, index) {
              if (curKey === x[_this29.vGrid.vGridRowKey]) {
                _this29.vGrid.vGridCurrentRow = index;
              }
            });
          }
        }
        grid.collectionChange(false);
      }
    });
    this.subscriptionsArray = arrayObserver;
  };

  VGridObservables.prototype.enableObservablesAttributes = function enableObservablesAttributes() {
    var _this30 = this;

    this.vGrid.vGridConfig.attAttributeObserve.forEach(function (property) {
      var propertyObserver = _this30.bindingEngine.propertyObserver(_this30.vGrid.vGridCurrentEntity, property).subscribe(function (newValue, oldValue) {
        var newValueCheck = newValue !== undefined && newValue !== null ? newValue.toString() : newValue;
        var oldValueCheck = oldValue !== undefined && oldValue !== null ? oldValue.toString() : oldValue;

        if (newValueCheck !== oldValueCheck && _this30.vGrid.vGridCurrentEntityRef) {
          _this30.vGrid.vGridCurrentEntityRef[property] = newValue;
          _this30.vGrid.vGridGenerator.rebindRowNumber(_this30.vGrid.vGridCurrentRow);
        }
      });
      _this30.subscriptionsAttributes.push(propertyObserver);
    });
  };

  VGridObservables.prototype.disableObservablesCollection = function disableObservablesCollection() {
    this.collectionSubscription.unsubscribe(this.vGrid, this.collectioncallable);
  };

  VGridObservables.prototype.disableObservablesArray = function disableObservablesArray() {
    this.subscriptionsArray.dispose();
    this.subscriptionsArray = null;
  };

  VGridObservables.prototype.disableObservablesAttributes = function disableObservablesAttributes() {
    for (var i = 0; i < this.subscriptionsAttributes.length; i++) {
      try {
        this.subscriptionsAttributes[i].dispose();
      } catch (e) {}
    }
    this.subscriptionsAttributes = [];
  };

  return VGridObservables;
}();

var VGridScrollEvents = exports.VGridScrollEvents = function () {
  function VGridScrollEvents(vGrid) {
    _classCallCheck(this, VGridScrollEvents);

    this.vGrid = vGrid;
    this.lastScrollTop = 0;
    this.lastScrollLeft = 0;
    this.isScrollBarScrolling = false;
    this.scrollbarScrollingTimer = null;
    this.lastScrollType = null;
  }

  VGridScrollEvents.prototype.onLargeScroll = function onLargeScroll() {
    var _this31 = this;

    this.lastScrollTop = this.vGridGenerator.contentElement.scrollTop;

    if (this.vGridConfig.getCollectionLength() <= this.vGridGenerator.rowElementArray.length) {
      this.lastScrollTop = 0;
    }

    var rowHeight = this.vGridConfig.attRowHeight;
    var bodyHeight = this.vGridGenerator.contentElement.clientHeight;
    var currentRow = parseInt(this.lastScrollTop / rowHeight, 10);
    var firstRow = parseInt(this.vGridGenerator.contentElement.scrollTop / rowHeight, 10);
    var currentRowTop = rowHeight * currentRow;
    var firstRowTop = rowHeight * firstRow;
    var collectionLength = this.vGridConfig.getCollectionLength();

    var setAfter = function setAfter(cacheRowNumber) {
      var row = _this31.vGridGenerator.rowElementArray[cacheRowNumber];
      _this31.vGridGenerator.setRowTopValue([row], 0, currentRowTop);
      currentRowTop = currentRowTop + rowHeight;
    };

    var setBefore = function setBefore(cacheRowNumber) {
      var row = _this31.vGridGenerator.rowElementArray[cacheRowNumber];
      firstRowTop = firstRowTop - rowHeight;
      _this31.vGridGenerator.setRowTopValue([row], 0, firstRowTop);
    };

    var setHiddenFromView = function setHiddenFromView(cacheRowNumber) {
      var row = _this31.vGridGenerator.rowElementArray[cacheRowNumber];
      _this31.vGridGenerator.setRowTopValue([row], 0, -(currentRowTop + _this31.vGridConfig.attRowHeight * 50));
    };

    for (var i = 0; i < this.vGridGenerator.getRowCacheLength(); i++) {
      var moved = false;
      switch (true) {
        case currentRow >= 0 && currentRow <= collectionLength - 1:
          setAfter(i);
          moved = true;
          break;
        case currentRow >= collectionLength && collectionLength * rowHeight >= bodyHeight:
          setBefore(i);
          moved = true;
          break;
      }
      if (!moved) {
        if (currentRow >= collectionLength && currentRowTop - rowHeight >= bodyHeight) {
          setHiddenFromView(i);
        } else {
          if (currentRow >= collectionLength) {
            setAfter(i);
          }
        }
      }

      currentRow++;
    }

    this.vGridGenerator.rowElementArray.sort(function (a, b) {
      return parseInt(a.top) - parseInt(b.top);
    });

    this.vGridGenerator.rebindAllRowSlots();
  };

  VGridScrollEvents.prototype.onSmallScroll = function onSmallScroll(isDownScroll, currentScrollTop) {
    var currentScrollTop = this.vGridGenerator.contentElement.scrollTop;
    if (this.isScrollBarScrolling === false) {

      var newTopValue;
      var currentRow = parseInt(this.lastScrollTop / this.vGridConfig.attRowHeight, 10);
      var collectionHeight = this.vGridConfig.attRowHeight * this.vGridGenerator.getRowCacheLength();
      var rowHeight = this.vGridConfig.attRowHeight;

      for (var i = 0; i < this.vGridGenerator.getRowCacheLength(); i++) {

        var row = this.vGridGenerator.rowElementArray[i];
        var rowTop = parseInt(row.top, 10);
        var update = false;

        if (isDownScroll) {
          this.lastScrollType = "down";
          if (rowTop < currentScrollTop - rowHeight) {
            update = true;
            newTopValue = rowTop + collectionHeight;
            currentRow = (rowTop + collectionHeight) / rowHeight;
          }

          if (rowTop > (this.vGridConfig.getCollectionLength() - 1) * rowHeight && rowTop > this.vGridGenerator.contentHeight) {
            update = false;
            this.vGridGenerator.setRowTopValue([row], 0, -(rowHeight * i + rowHeight * 50));
          }
        } else {
          this.lastScrollType = "up";
          if (rowTop > currentScrollTop + this.vGridGenerator.contentHeight) {
            update = true;
            newTopValue = rowTop - collectionHeight;
            currentRow = (rowTop - collectionHeight) / rowHeight;
          }
        }

        if (update === true && currentRow >= 0 && currentRow <= this.vGridConfig.getCollectionLength() - 1) {
          this.vGridGenerator.setRowTopValue([row], 0, newTopValue);
          this.vGridConfig.updateRowBinding(currentRow, row, isDownScroll, false);
        }
      }

      this.vGridGenerator.rowElementArray.sort(function (a, b) {
        return parseInt(a.top) - parseInt(b.top);
      });
    } else {
      this.onScrollbarScrolling();
    }
  };

  VGridScrollEvents.prototype.onScrollbarScrolling = function onScrollbarScrolling() {
    var _this32 = this;

    this.isScrollBarScrolling = true;

    var timeout = this.vGridConfig.attDataScrollDelay;

    clearTimeout(this.scrollbarScrollingTimer);

    this.scrollbarScrollingTimer = setTimeout(function () {
      _this32.onLargeScroll();
      _this32.isScrollBarScrolling = false;
    }, timeout);
  };

  VGridScrollEvents.prototype.scrollEventHandler = function scrollEventHandler() {

    var currentScrollTop = this.vGridGenerator.contentElement.scrollTop;
    var currentScrollLeft = this.vGridGenerator.contentElement.scrollLeft;

    if (currentScrollTop !== this.lastScrollTop) {
      if (currentScrollLeft !== 0) {
        this.vGridGenerator.contentElement.scrollLeft = this.lastScrollLeft;
        this.vGridGenerator.headerElement.scrollLeft = this.lastScrollLeft;
      }

      var isDownScroll = true;
      if (currentScrollTop < this.lastScrollTop) {
        isDownScroll = false;
      }

      var isLargeScroll;
      switch (true) {
        case currentScrollTop > this.lastScrollTop + this.vGridConfig.largeScrollLimit:
        case currentScrollTop < this.lastScrollTop - this.vGridConfig.largeScrollLimit:
          isLargeScroll = true;
          break;
        default:
          isLargeScroll = false;
      }

      this.lastScrollTop = currentScrollTop;

      if (isLargeScroll) {
        if (this.vGridConfig.attRenderOnScrollbarScroll) {
          this.onLargeScroll();
        } else {
          this.onScrollbarScrolling();
        }
      } else {
        this.onSmallScroll(isDownScroll, currentScrollTop);
      }
    } else {

      if (this.vGridGenerator.contentElement.style.overflowX === "hidden") {
        this.vGridGenerator.contentElement.scrollLeft = 0;
        this.lastScrollLeft = 0;
        this.vGridGenerator.headerElement.scrollLeft = 0;
      } else {
        if (this.lastScrollLeft !== currentScrollLeft) {
          currentScrollLeft = this.vGridGenerator.contentElement.scrollLeft;
          this.lastScrollLeft = currentScrollLeft;
          this.vGridGenerator.headerElement.scrollLeft = currentScrollLeft;
        }
      }
    }
  };

  _createClass(VGridScrollEvents, [{
    key: 'vGridGenerator',
    get: function get() {
      if (this.vGrid) {
        return this.vGrid.vGridGenerator;
      } else {
        return null;
      }
    }
  }, {
    key: 'vGridSelection',
    get: function get() {
      if (this.vGrid) {
        return this.vGrid.vGridSelection;
      } else {
        return null;
      }
    }
  }, {
    key: 'vGridConfig',
    get: function get() {
      if (this.vGrid) {
        return this.vGrid.vGridConfig;
      } else {
        return null;
      }
    }
  }, {
    key: 'vGridCellHelper',
    get: function get() {
      if (this.vGrid) {
        return this.vGrid.vGridCellHelper;
      } else {
        return null;
      }
    }
  }, {
    key: 'vGridElement',
    get: function get() {
      if (this.vGrid) {
        return this.vGrid.element;
      } else {
        return null;
      }
    }
  }, {
    key: 'vGridSortable',
    get: function get() {
      if (this.vGrid) {
        return this.vGrid.vGridSortable;
      } else {
        return null;
      }
    }
  }, {
    key: 'vGridResizable',
    get: function get() {
      if (this.vGrid) {
        return this.vGrid.vGridResizable;
      } else {
        return null;
      }
    }
  }]);

  return VGridScrollEvents;
}();

var VGridSelection = exports.VGridSelection = function () {
  function VGridSelection(mode, vGrid) {
    _classCallCheck(this, VGridSelection);

    this.selectionMode = "none";
    this.lastRowSelected = -1;
    this.lastKeyKodeUsed = "none";
    this.selectedRows = 0;


    this.vGrid = vGrid;

    if (mode === false) {
      this.selectionMode = "single";
    }
    if (mode === true) {
      this.selectionMode = "multible";
    }

    this.selection = new Set([]);
  }

  VGridSelection.prototype.setMode = function setMode(mode) {
    this.selectionMode = "none";
    if (mode === false) {
      this.selectionMode = "single";
    }
    if (mode === true) {
      this.selectionMode = "multible";
    }
  };

  VGridSelection.prototype.isSelected = function isSelected(row) {
    var result = false;
    if (this.selectedRows > 0) {
      if (this.vGrid.vGridCollectionFiltered[row]) {
        result = this.selection.has(this.vGrid.vGridCollectionFiltered[row][this.vGrid.vGridRowKey]);
      }
    }
    return result;
  };

  VGridSelection.prototype.isSelectedMain = function isSelectedMain(row) {
    var result = false;
    if (this.selectedRows > 0) {
      if (this.vGrid.vGridCollection[row]) {
        result = this.selection.has(this.vGrid.vGridCollection[row][this.vGrid.vGridRowKey]);
      }
    }
    return result;
  };

  VGridSelection.prototype.deSelect = function deSelect(row) {
    if (this.vGrid.vGridCollectionFiltered[row]) {
      this.selection.delete(this.vGrid.vGridCollectionFiltered[row][this.vGrid.vGridRowKey]);
    }
    this.selectedRows = this.selection.size;
  };

  VGridSelection.prototype.deSelectMain = function deSelectMain(row) {
    if (this.vGrid.vGridCollection[row]) {
      this.selection.delete(this.vGrid.vGridCollection[row][this.vGrid.vGridRowKey]);
    }
    this.selectedRows = this.selection.size;
  };

  VGridSelection.prototype.select = function select(row, addToSelection) {
    switch (this.selectionMode) {
      case "none":
      case null:
      case undefined:
        break;
      case "single":
        this.selection.clear();
        if (this.vGrid.vGridCollectionFiltered[row]) {
          this.selection.add(this.vGrid.vGridCollectionFiltered[row][this.vGrid.vGridRowKey]);
        }
        this.selectedRows = this.selection.size;
        break;
      case "multible":
        if (!addToSelection) {
          this.selection.clear();
          if (this.vGrid.vGridCollectionFiltered[row]) {
            this.selection.add(this.vGrid.vGridCollectionFiltered[row][this.vGrid.vGridRowKey]);
          }
          this.selectedRows = this.selection.size;
        } else {
          if (this.vGrid.vGridCollectionFiltered[row]) {
            this.selection.add(this.vGrid.vGridCollectionFiltered[row][this.vGrid.vGridRowKey]);
          }
          this.selectedRows = this.selection.size;
        }
    }
  };

  VGridSelection.prototype.selectMain = function selectMain(row, addToSelection) {
    switch (this.selectionMode) {
      case "none":
      case null:
      case undefined:
        break;
      case "single":
        this.selection.clear();
        if (this.vGrid.vGridCollection[row]) {
          this.selection.add(this.vGrid.vGridCollection[row][this.vGrid.vGridRowKey]);
        }
        this.selectedRows = this.selection.size;
        break;
      case "multible":
        if (!addToSelection) {
          this.selection.clear();
          if (this.vGrid.vGridCollection[row]) {
            this.selection.add(this.vGrid.vGridCollection[row][this.vGrid.vGridRowKey]);
          }
          this.selectedRows = this.selection.size;
        } else {
          if (this.vGrid.vGridCollection[row]) {
            this.selection.add(this.vGrid.vGridCollection[row][this.vGrid.vGridRowKey]);
          }
          this.selectedRows = this.selection.size;
        }
    }
  };

  VGridSelection.prototype.selectRange = function selectRange(start, end) {
    if (this.selectionMode === "multible") {
      this.selection.clear();
      for (var i = start; i < end + 1; i++) {
        this.selection.add(this.vGrid.vGridCollectionFiltered[i][this.vGrid.vGridRowKey]);
      }
      this.selectedRows = this.selection.size;
    }
  };

  VGridSelection.prototype.selectAll = function selectAll() {
    if (this.selectionMode === "multible") {
      for (var i = 0; i < this.vGrid.vGridCollectionFiltered.length; i++) {
        this.selection.add(this.vGrid.vGridCollectionFiltered[i][this.vGrid.vGridRowKey]);
      }
      this.selectedRows = this.selection.size;
    }
    if (this.selectionMode === "single" && this.vGrid.vGridCurrentRow >= 0) {
      this.selection.clear();
      this.selection.add(this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow][this.vGrid.vGridRowKey]);
      this.selectedRows = this.selection.size;
    }
  };

  VGridSelection.prototype.deSelectAll = function deSelectAll() {
    for (var i = 0; i < this.vGrid.vGridCollectionFiltered.length; i++) {
      this.selection.delete(this.vGrid.vGridCollectionFiltered[i][this.vGrid.vGridRowKey]);
    }
    this.selectedRows = this.selection.size;
  };

  VGridSelection.prototype.selectRangeMain = function selectRangeMain(start, end) {
    if (this.selectionMode === "multible") {
      this.selection.clear();
      for (var i = start; i < end + 1; i++) {
        this.selection.add(this.vGrid.vGridCollection[i][this.vGrid.vGridRowKey]);
      }
      this.selectedRows = this.selection.size;
    }
  };

  VGridSelection.prototype.reset = function reset() {
    if (this.selectedRows > 0) {
      this.selection.clear();
    }
    this.lastRowSelected = -1;
    this.lastKeyKodeUsed = "none";
    this.selectedRows = this.selection.size;
  };

  VGridSelection.prototype.getSelectedRows = function getSelectedRows() {
    var _this33 = this;

    var array = [];
    if (this.selectedRows > 0) {
      this.vGrid.vGridCollectionFiltered.forEach(function (x, index) {
        if (_this33.selection.has(x[_this33.vGrid.vGridRowKey]) === true) {
          array.push(index);
        }
      });
    }
    return array;
  };

  VGridSelection.prototype.getSelectedRowsMain = function getSelectedRowsMain() {
    var _this34 = this;

    var array = [];
    if (this.selectedRows > 0) {
      this.vGrid.vGridCollection.forEach(function (x, index) {
        if (_this34.selection.has(x[_this34.vGrid.vGridRowKey]) === true) {
          array.push(index);
        }
      });
    }
    return array;
  };

  VGridSelection.prototype.setSelectedRows = function setSelectedRows(newRows) {
    if (this.selectedRows > 0) {
      this.selection.clear();
    }
    for (var i = 0; i < newRows.length; i++) {
      this.selection.add(this.vGrid.vGridCollectionFiltered[newRows[i]][this.vGrid.vGridRowKey]);
    }
    this.selectedRows = this.selection.size;
  };

  VGridSelection.prototype.setSelectedRowsMain = function setSelectedRowsMain(newRows) {
    if (this.selectedRows > 0) {
      this.selection.clear();
    }
    for (var i = 0; i < newRows.length; i++) {
      this.selection.add(this.vGrid.vGridCollection[newRows[i]][this.vGrid.vGridRowKey]);
    }
    this.selectedRows = this.selection.size;
  };

  VGridSelection.prototype.setHightlight = function setHightlight(e, currentRow, vGridGenerator) {

    var isSel;
    var manualSel = this.vGrid.vGridConfig.attManualSelection;
    if (!manualSel) {
      var currentselectedRows = this.getSelectedRows();

      if (currentRow !== this.lastRowSelected || currentselectedRows[0] !== currentRow) {

        if (currentRow <= vGridGenerator.vGridConfig.getCollectionLength() - 1) {

          if (this.selectionMode === "multible") {

            var currentKeyKode = "";

            if (e.shiftKey) {
              currentKeyKode = "shift";
              currentselectedRows = this.getSelectedRows();
              if (currentselectedRows.length > 0 && this.lastKeyKodeUsed === "none") {
                this.lastRowSelected = currentselectedRows[0];
                this.lastKeyKodeUsed = "shift";
              }
            }

            if (e.ctrlKey) {
              currentKeyKode = "ctrl";
            }

            if (!e.ctrlKey && !e.shiftKey) {
              currentKeyKode = "none";
            }

            switch (true) {
              case currentKeyKode === "none":
                this.select(currentRow);
                break;
              case this.lastKeyKodeUsed === "shift" && currentKeyKode === "ctrl":

                isSel = this.isSelected(currentRow);
                if (isSel === true) {
                  this.deSelect(currentRow);
                } else {
                  this.select(currentRow, true);
                }
                this.lastRowSelected = currentRow;
                break;

              case this.lastKeyKodeUsed === "ctrl" && currentKeyKode === "shift":
                var oldSel = this.getSelectedRows();
                this.selectRange(this.lastRowSelected, currentRow);
                var newSel = this.getSelectedRows();
                this.setSelectedRows(oldSel.concat(newSel));

                break;

              case this.lastKeyKodeUsed === "ctrl" && currentKeyKode === "ctrl":

                isSel = this.isSelected(currentRow);
                if (isSel === true) {
                  this.deSelect(currentRow);
                } else {
                  this.select(currentRow, true);
                }
                this.lastRowSelected = currentRow;
                break;

              case this.lastKeyKodeUsed === "none" && currentKeyKode === "ctrl":

                isSel = this.isSelected(currentRow);
                if (isSel === true) {
                  this.deSelect(currentRow);
                } else {
                  this.select(currentRow, true);
                }
                this.lastRowSelected = currentRow;
                break;

              case this.lastKeyKodeUsed === "shift" && currentKeyKode === "shift":

                if (this.lastRowSelected > currentRow) {
                  this.selectRange(currentRow, this.lastRowSelected);
                } else {
                  this.selectRange(this.lastRowSelected, currentRow);
                }

                break;

              case this.lastKeyKodeUsed === "none" && currentKeyKode === "shift":

                if (this.lastRowSelected !== -1) {
                  if (this.lastRowSelected > currentRow) {
                    this.selectRange(currentRow, this.lastRowSelected);
                  } else {
                    this.selectRange(this.lastRowSelected, currentRow);
                  }
                } else {
                  this.lastRowSelected = currentRow;
                  this.select(currentRow);
                }
                break;
              default:
                console.error("error, this should not happen, debug selection");
            }
          } else {
            this.select(currentRow);
          }
          this.lastKeyKodeUsed = currentKeyKode;

          vGridGenerator.updateSelectionOnAllRows();
        }
      } else {
        if (e.ctrlKey) {
          currentKeyKode = "ctrl";
        }

        if (currentKeyKode === "ctrl") {
          this.lastKeyKodeUsed = currentKeyKode;
          isSel = this.isSelected(currentRow);
          if (isSel === true) {
            this.deSelect(currentRow);
          }
          this.lastRowSelected = currentRow;
        } else {
          this.select(currentRow);
        }

        vGridGenerator.updateSelectionOnAllRows();
      }
    }
  };

  return VGridSelection;
}();

var VGridSort = exports.VGridSort = function () {
  function VGridSort(vGrid) {
    _classCallCheck(this, VGridSort);

    this.lastSort = [];
    this.curSort = [];

    this.vGrid = vGrid;
  }

  VGridSort.prototype.reset = function reset() {
    this.lastSort = [];
    this.curSort = [];
  };

  VGridSort.prototype.setFilter = function setFilter(sort, add) {
    if (add && this.lastSort.length > 0) {
      this.curSort = this.lastSort;
      var exist = false;

      this.curSort.forEach(function (x) {
        if (x.attribute === sort.attribute) {
          exist = true;
          x.asc = x.asc === true ? false : true;
        }
      });

      if (!exist) {
        this.curSort.push(sort);
        this.curSort[this.curSort.length - 1].no = this.curSort.length;
      }
      this.lastSort = this.curSort;
    } else {
      this.curSort = [sort];
      this.curSort[0].no = 1;
      if (this.lastSort[0]) {
        if (this.lastSort[0].attribute === this.curSort[0].attribute) {
          if (this.lastSort[0].asc === this.curSort[0].asc) {
            this.curSort[0].asc = this.curSort[0].asc === true ? false : true;
          }
        }
      }
      this.lastSort = this.curSort;
    }
  };

  VGridSort.prototype.getFilter = function getFilter() {
    return this.curSort;
  };

  VGridSort.prototype.run = function run(array) {
    var thisSort = this.getFilter();

    array.sort(function (obj1, obj2, i) {
      var result = 0;

      for (var i = 0; i < thisSort.length && result == 0; ++i) {
        var currentObj = thisSort[i];
        var v1 = obj1[currentObj.attribute];
        var v2 = obj2[currentObj.attribute];

        if (v1 !== v2) {
          if (currentObj.asc) {
            if (v1 < v2) result = -1;else result = 1;
          } else {
            if (v1 < v2) result = 1;else result = -1;
          }
        }
      }
      return result;
    });

    this.lastSort = this.getFilter().slice(0);
  };

  return VGridSort;
}();

var VGrid = exports.VGrid = (_dec41 = (0, _aureliaFramework.bindable)({ attribute: "v-grid-context" }), _dec42 = (0, _aureliaFramework.bindable)({ attribute: "v-collection" }), _dec43 = (0, _aureliaFramework.bindable)({ attribute: "v-current-entity" }), _dec44 = (0, _aureliaFramework.bindable)({ attribute: "v-columns" }), _dec45 = (0, _aureliaFramework.bindable)({ attribute: "v-row-height" }), _dec46 = (0, _aureliaFramework.bindable)({ attribute: "v-header-height" }), _dec47 = (0, _aureliaFramework.bindable)({ attribute: "v-footer-height" }), _dec48 = (0, _aureliaFramework.bindable)({ attribute: "v-multi-select" }), _dec49 = (0, _aureliaFramework.bindable)({ attribute: "v-manual-sel" }), _dec50 = (0, _aureliaFramework.bindable)({ attribute: "v-loading-threshold" }), _dec51 = (0, _aureliaFramework.bindable)({ attribute: "v-remote-index" }), _dec52 = (0, _aureliaFramework.bindable)({ attribute: "v-row-on-draw" }), _dec53 = (0, _aureliaFramework.bindable)({ attribute: "v-event-onremote" }), (_class26 = (_temp3 = _class27 = function () {
  function VGrid(element, bindingEngine, viewCompiler, viewSlot, container, viewResources, taskQueue) {
    _classCallCheck(this, VGrid);

    _initDefineProp(this, 'vGridContextObj', _descriptor11, this);

    _initDefineProp(this, 'vGridCollection', _descriptor12, this);

    _initDefineProp(this, 'vGridCurrentEntity', _descriptor13, this);

    _initDefineProp(this, 'vGridColumns', _descriptor14, this);

    _initDefineProp(this, 'attRowHeight', _descriptor15, this);

    _initDefineProp(this, 'attHeaderHeight', _descriptor16, this);

    _initDefineProp(this, 'attFooterHeight', _descriptor17, this);

    _initDefineProp(this, 'attMultiSelect', _descriptor18, this);

    _initDefineProp(this, 'attManualSelection', _descriptor19, this);

    _initDefineProp(this, 'attLoadingThreshold', _descriptor20, this);

    _initDefineProp(this, 'attRemoteIndex', _descriptor21, this);

    _initDefineProp(this, 'eventOnRowDraw', _descriptor22, this);

    _initDefineProp(this, 'eventOnRemoteCall', _descriptor23, this);

    _initDefineProp(this, 'loadingMessage', _descriptor24, this);

    this.loading = false;

    this.element = element;

    this.viewCompiler = viewCompiler;
    this.viewSlot = viewSlot;
    this.container = container;
    this.viewResources = viewResources;
    this.taskQueue = taskQueue;

    this.vGridCurrentEntityRef = null;

    this.vGridCurrentRow = -1;

    this.vGridRowKey = "__vGridKey";

    this.vGridCollectionFiltered = [];

    this.vGridScrollEvents = new VGridScrollEvents(this);
    this.vGridFilter = new VGridFilter(this);
    this.vGridSort = new VGridSort(this);
    this.vGridConfig = new VGridConfig(this);
    this.vGridSelection = new VGridSelection(null, this);
    this.vGridObservables = new VGridObservables(this, bindingEngine);
    this.vGridGenerator = new VGridGenerator(this);
    this.vGridClientCtx = new VGridCtx(this);
    this.vGridMarkupGenerator = new VGridMarkupGenerator(this);
    this.vGridPager = null;
  }

  VGrid.prototype.raiseEvent = function raiseEvent(name) {
    var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var event = new CustomEvent(name, {
      detail: data,
      bubbles: true
    });
    this.element.dispatchEvent(event);

    return event;
  };

  VGrid.prototype.checkKeys = function checkKeys() {
    var _this35 = this;

    this.vGridCollection.forEach(function (row) {
      if (!row[_this35.vGridRowKey] && row !== undefined && row !== null) {
        row[_this35.vGridRowKey] = _this35.guid();
      }
    });
  };

  VGrid.prototype.checkKey = function checkKey(row) {
    if (!row[this.vGridRowKey] && row !== undefined && row !== null) {
      row[this.vGridRowKey] = this.guid();
    }
  };

  VGrid.prototype.vGridGetRowKey = function vGridGetRowKey(key) {
    var _this36 = this;

    var rowFound = null;
    this.vGridCollection.forEach(function (row, index) {
      if (row[_this36.vGridRowKey] === key) {
        rowFound = index;
      }
    });
    return rowFound;
  };

  VGrid.prototype.guid = function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  };

  VGrid.prototype.bind = function bind(parent, overrideContext) {
    this.$parent = parent;
    this.overrideContext = overrideContext;

    if (!this.vGridContextObj) {
      this.vGridContextObj = {};
    }

    this.vGridContextObj.ctx = this.vGridClientCtx;
    var vConfig = this.vGridConfig;
    vConfig.setBindValueArray(this.attAttributeObserve, 'attAttributeObserve');
    vConfig.setBindValueInt(this.attRowHeight, 'attRowHeight');
    vConfig.setBindValueInt(this.attHeaderHeight, 'attHeaderHeight');
    vConfig.setBindValueInt(this.attFooterHeight, 'attFooterHeight');
    vConfig.setBindValueBool(this.attResizableHeaders, 'attResizableHeaders');
    vConfig.setBindValueBool(this.attMultiSelect, 'attMultiSelect');
    vConfig.setBindValueBool(this.attSortableHeader, 'attSortableHeader');
    vConfig.setBindValueInt(this.attLoadingThreshold, 'attLoadingThreshold');
    vConfig.setBindValueString(this.attRemoteIndex, 'attRemoteIndex');
    vConfig.setBindValueBool(this.attManualSelection, 'attManualSelection');
    vConfig.setBindValueFunction(this.eventOnRowDraw, 'eventOnRowDraw');
    vConfig.setBindValueFunction(this.eventOnRemoteCall, 'eventOnRemoteCall');

    if (this.vGridCollection === undefined || this.vGridCurrentEntity === undefined) {
      if (this.vGridCollection === undefined && this.vGridCurrentEntity === undefined) {
        console.warn("currentEntity & collection not set/binded in config attribute");
      } else {
        if (this.vGridCurrentEntity === undefined) {
          console.warn("currentEntity not set/binded in config attribute");
        }
        if (this.vGridCollection === undefined) {
          console.warn("collection not set/binded in config attribute");
        }
      }
    } else {
      this.vGridCollectionFiltered = this.vGridCollection.slice(0);

      this.checkKeys();
    }
  };

  VGrid.prototype.attached = function attached() {

    if (!this.vGridConfig.repeater) {
      this.vGridMarkupGenerator.generate();
    }

    this.vGridObservables.enableObservablesCollection();
    this.vGridObservables.enableObservablesArray();
    this.vGridObservables.enableObservablesAttributes();

    this.vGridGenerator.init(false);
  };

  VGrid.prototype.unbind = function unbind() {
    this.vGridGenerator.unbindDetachViewSlots();
  };

  VGrid.prototype.detached = function detached() {
    this.vGridObservables.disableObservablesAttributes();
    this.vGridObservables.disableObservablesCollection();
    this.vGridObservables.disableObservablesArray();
  };

  return VGrid;
}(), _class27.inject = [Element, _aureliaFramework.BindingEngine, _aureliaFramework.ViewCompiler, _aureliaFramework.ViewSlot, _aureliaFramework.Container, _aureliaFramework.ViewResources, _aureliaFramework.TaskQueue], _temp3), (_descriptor11 = _applyDecoratedDescriptor(_class26.prototype, 'vGridContextObj', [_dec41], {
  enumerable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class26.prototype, 'vGridCollection', [_dec42], {
  enumerable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class26.prototype, 'vGridCurrentEntity', [_dec43], {
  enumerable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class26.prototype, 'vGridColumns', [_dec44], {
  enumerable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class26.prototype, 'attRowHeight', [_dec45], {
  enumerable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class26.prototype, 'attHeaderHeight', [_dec46], {
  enumerable: true,
  initializer: null
}), _descriptor17 = _applyDecoratedDescriptor(_class26.prototype, 'attFooterHeight', [_dec47], {
  enumerable: true,
  initializer: null
}), _descriptor18 = _applyDecoratedDescriptor(_class26.prototype, 'attMultiSelect', [_dec48], {
  enumerable: true,
  initializer: null
}), _descriptor19 = _applyDecoratedDescriptor(_class26.prototype, 'attManualSelection', [_dec49], {
  enumerable: true,
  initializer: null
}), _descriptor20 = _applyDecoratedDescriptor(_class26.prototype, 'attLoadingThreshold', [_dec50], {
  enumerable: true,
  initializer: null
}), _descriptor21 = _applyDecoratedDescriptor(_class26.prototype, 'attRemoteIndex', [_dec51], {
  enumerable: true,
  initializer: null
}), _descriptor22 = _applyDecoratedDescriptor(_class26.prototype, 'eventOnRowDraw', [_dec52], {
  enumerable: true,
  initializer: null
}), _descriptor23 = _applyDecoratedDescriptor(_class26.prototype, 'eventOnRemoteCall', [_dec53], {
  enumerable: true,
  initializer: null
}), _descriptor24 = _applyDecoratedDescriptor(_class26.prototype, 'loadingMessage', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return "Working please wait";
  }
})), _class26));