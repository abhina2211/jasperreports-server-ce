define(["require","exports","module","underscore","../panel/Panel","../panel/trait/collapsiblePanelTrait","../list/view/ListWithSelection","./trait/addToSelectionModelTrait","../list/model/ListWithSelectionModel","./dataprovider/DataProviderWithSearchCache"],function(t,e,i){function s(t){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function n(){this.$el.removeClass(this.loadingClass).addClass(this.openClass),c.invoke(this.plugins,"itemsRendered",this.list.model,this.list);var t=this.list.$("> .j-view-port-chunk > ul > li").addClass(this.cid).length,e=c.isFunction(this.levelHeight)?this.levelHeight():this.levelHeight;e&&t*this.listItemHeight>e?this.list.$el.css({height:e+"px","overflow-y":"auto"}):this.list.$el.css({height:"auto",overflow:"auto"}),this.list._calcViewPortHeight(),this._isReady=!0,this.trigger("ready",this)}function o(t,e){this.listRenderError=!0,this.trigger("listRenderError",t,e,this)}function l(t){var e=[];c.chain(t).keys(t).each(function(i){e.push(t[i])}),this.selection.multiple||d(this),this.trigger("selection:change",e,this,[])}function a(t){var e=[];c.chain(t).keys(t).each(function(i){e.push(t[i])}),this.selection.multiple||d(this),this.trigger("item:dblclick",e)}function r(t,e){for(var i=0;i<e.length;i++)if(e[i]===t)return!0}function h(t,e,i,s){i&&i.exclude&&c.isArray(i.exclude)&&r(t,i.exclude)||(void 0===s||s>0)&&c.chain(t.items).keys().each(function(n){i&&i.exclude&&c.isArray(i.exclude)&&r(t.items[n],i.exclude)||e.call(t.items[n],i),h(t.items[n],e,i,void 0===s?s:--s)})}function d(t,e){e=e&&{exclude:e.exclude},h(t,function(t){this.list.clearSelection(),this.list.model.selection=[]},e)}var c=t("underscore"),u=t("../panel/Panel"),p=t("../panel/trait/collapsiblePanelTrait"),f=t("../list/view/ListWithSelection"),m=t("./trait/addToSelectionModelTrait"),v=t("../list/model/ListWithSelectionModel"),g=t("./dataprovider/DataProviderWithSearchCache"),y=v.extend(m);i.exports=u.extend({constructor:function(t){t||(t={}),c.extend(t,{traits:[p]}),u.prototype.constructor.call(this,t)},initialize:function(t){t||(t={}),this._isReady=!1,this.item=t.item||{},this.id=this.item.id,this.owner=t.owner,this.parent=t.parent,this.itemsTemplate=t.itemsTemplate,this.listItemHeight=t.listItemHeight,this.levelHeight=t.levelHeight,this.lazyLoad=!!t.lazyLoad,this.selection=t.selection||{allowed:!1,multiple:!1},this.resource=this.item.value,this.bufferSize=t.bufferSize,this.cache=void 0!==t.cache&&t.cache,this.allowMouseDownEventPropagation=t.allowMouseDownEventPropagation,this.items={},this.plugins=[];for(var e={el:this.el,model:this.model},i=0,s=t.plugins.length;i<s;i++){var n=t.plugins[i].constr;this.plugins.push(new n(c.extend({},e,t.plugins[i].options)))}this.dataLayer=this.owner.getDataLayer(this),c.invoke(this.plugins,"dataLayerObtained",this.dataLayer),u.prototype.initialize.apply(this,arguments)},render:function(){var t=new y({bufferSize:this.bufferSize,getData:this._getDataProvider(this.cache)});return this.list=new f({markerClass:"."+this.cid,eventListenerPattern:"."+this.cid+":not(.readonly) > p",el:this.$contentContainer,itemsTemplate:this.itemsTemplate,listItemHeight:this.listItemHeight,lazy:!0,selection:this.selection,allowMouseDownEventPropagation:this.allowMouseDownEventPropagation,model:t}),this.list.on("render:data",c.bind(n,this)),this.list.on("listRenderError",c.bind(o,this)),this.list.on("selection:change",c.bind(l,this)),this.list.on("item:dblclick",c.bind(a,this)),this.lazyLoad?this.on("open",this._onOpen,this):this.list.renderData(),this},_getDataProvider:function(t){var e=this,i=c.bind(function(t){return this.obtainData(t,e)},this.dataLayer),n={};return t&&("object"===s(t)&&(n=c.extend(n,t)),n.request=n.request||i,this.dataProvider=new g(n),i=this.dataProvider.getData),function(t){return t||(t={offset:0,limit:100}),t.id=e.id,i(c.extend({},e.owner.context,t),e)}},_onOpen:function(){this.$el.removeClass(this.openClass).addClass(this.loadingClass),this.list.renderData()},setElement:function(t){var e=u.prototype.setElement.apply(this,arguments);return this.list&&(this.list.setElement(this.$contentContainer),this.list.totalItems=-1),c.each(this.plugins,function(e){e.setElement(t)}),this.lazyLoad||this.list&&this.list.renderData(),this.collapsed||(this.open({silent:!0,depth:0}),this.lazyLoad&&this.list.renderData()),e},open:function(t){h(this,u.prototype.open,t,t?t.depth:0),u.prototype.open.call(this,t)},close:function(t){u.prototype.close.call(this,t),h(this,u.prototype.close,t,t?t.depth:void 0),d(this)},getLevel:function(t){return c(this.items).reduce(function(e,i){return e||(i.id===t?i:i.getLevel(t))},!1)},refresh:function(t){this.listRenderError||(this.lazyLoad&&!this.collapsed||!this.lazyLoad?(this.once("ready",c.bind(h,this,this,this.refresh,t,1)),this.list.model.fetch({top:0,bottom:this.list.model.bufferSize,force:!0}),this.list.scrollTo(0)):(this.list.model.set("bufferStartIndex",void 0,{silent:!0}),this.list.model.set("bufferEndIndex",void 0,{silent:!0}),this.list.model.set("total",void 0,{silent:!0}),h(this,this.refresh,t)))},fetch:function(t,e){this.list.fetch(e,t)},recalcConstraints:function(){this.list.resize()},fetchVisibleData:function(){this.list._fetchVisibleData()},resetSelection:function(t){d(this,t),t&&t.silent||this.trigger("selection:change",[])},hasItems:function(){return!!this.$("> .subcontainer > .j-view-port-chunk > ul > li").length},clearCache:function(){c.each(this.items,function(t){t.clearCache()}),this.dataProvider&&this.dataProvider.clear()},remove:function(){var t=this,e=-1;if(c.forEach(c.keys(this.items),function(e){t.items[e].remove()}),this.dataProvider&&this.dataProvider.clear(),this.list.remove(),this.parent){var i=this.parent.id,s=this.owner.getDataLayer(i);if(s&&s.predefinedData&&s.predefinedData[i]&&c.isArray(s.predefinedData[i])){for(var n=0;n<s.predefinedData[i].length;n++)if(s.predefinedData[i][n].id===this.id){e=n;break}e>-1&&(s.predefinedData[i].splice(e,1),delete s.predefinedData[this.id])}delete this.parent.items[this.id]}u.prototype.remove.apply(this,arguments)},isReady:function(){return this._isReady}})});