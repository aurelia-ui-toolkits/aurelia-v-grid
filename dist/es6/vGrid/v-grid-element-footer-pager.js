/*****************************************************************************************************************
 *    VGridFooterPager
 *    Custom element for use in the footer container
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {inject, customElement, bindable} from 'aurelia-framework';


@customElement('v-grid-pager')
@inject(Element)
export class VGridElementFooterPager {

  info = "";


  constructor(element) {
    this.element = element;
  }


  bind(parent) {
    this.parent = parent;
    this.vGrid = parent.vGrid;
    this.vGridConfig = parent.vGrid.vGridConfig;
    this.vGrid.vGridPager = this;
  }


  attached() {
    this.statusNextButton = false;
    this.statusLastButton = false;
    this.statusFirstButton = false;
    this.statusPrevButton = false;

    this.statusNextButtonTitle = this.getLang("pagerBtnNext") || "Next";
    this.statusLastButtonTitle = this.getLang("pagerBtnLast") || "Last";
    this.statusFirstButtonTitle = this.getLang("pagerBtnFirst") || "First";
    this.statusPrevButtonTitle = this.getLang("pagerBtnLast") || "Last";

    this.pagerStringPage = this.getLang("pagerStringPage") || "Page ";
    this.pagerStringOf = this.getLang("pagerStringOf") || " of ";
    this.pagerStringTotalEntities = this.getLang("pagerStringTotalEntities") || ", Total entities:";
    this.pagerStringPageSize = this.getLang("pagerStringPageSize") || ", page size ";

  }

  
  getLang(value){
    return this.vGrid.vGridConfig.attLanguage[value];
  }


  updatePager(data) {
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


    //do we show page info?
    if (!this.vGridConfig.attHidePagerInfo) {
      this.info = `${this.pagerStringPage}${this.page}${this.pagerStringOf}${Math.ceil(this.collectionLength / this.limit)}${this.pagerStringTotalEntities}${this.collectionLength}${this.pagerStringPageSize}${this.limit}`;
    }


    //raise event
    this.vGrid.raiseEvent("v-remote-collection-event", {
      evt: "v-remote-collection-event",
      page: this.page,
      pages: Math.ceil(this.collectionLength / this.limit),
      length: this.collectionLength,
      pageSize: this.limit
    });

  }


  firstBtn() {
    this.vGrid.loading = true;
    this.vGridConfig.remoteOffset = 0;
    this.vGridConfig.remoteCall();
  }


  nextBtn() {
    this.vGrid.loading = true;
    this.vGridConfig.remoteOffset = this.vGridConfig.remoteOffset + this.vGridConfig.remoteLimit;
    this.vGridConfig.remoteCall();
  }


  prevBtn() {
    this.vGrid.loading = true;
    this.vGridConfig.remoteOffset = this.vGridConfig.remoteOffset - this.vGridConfig.remoteLimit;
    this.vGridConfig.remoteCall();
  }


  lastBtn() {
    this.vGrid.loading = true;
    this.vGridConfig.remoteOffset = this.vGridConfig.remoteLength - this.vGridConfig.remoteLimit;
    this.vGridConfig.remoteCall();
  }


}
