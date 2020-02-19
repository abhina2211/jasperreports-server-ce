define(["require","exports","module","jquery","underscore","backbone","bundle!EditSettingsBundle","runtime_dependencies/js-sdk/src/common/component/baseTable/BaseTable","text!../templates/collectionViewTemplate.htm","runtime_dependencies/js-sdk/src/common/component/dialog/AlertDialog","runtime_dependencies/js-sdk/src/common/component/notification/Notification","../../../serverSettingsCommon/enum/confirmDialogTypesEnum","../../../administer/resetSettings/factory/confirmationDialogFactory","css!attributes.css"],function(e,t,i){var n=e("jquery"),o=e("underscore"),s=e("backbone"),a=e("bundle!EditSettingsBundle"),c=e("runtime_dependencies/js-sdk/src/common/component/baseTable/BaseTable"),r=e("text!../templates/collectionViewTemplate.htm"),l=e("runtime_dependencies/js-sdk/src/common/component/dialog/AlertDialog"),h=e("runtime_dependencies/js-sdk/src/common/component/notification/Notification"),d=e("../../../serverSettingsCommon/enum/confirmDialogTypesEnum"),m=e("../../../administer/resetSettings/factory/confirmationDialogFactory");e("css!attributes.css");var u=c.extend({template:o.template(r),templateHelpers:function(){return{i18n:a}},childEvents:{"open:confirm":"_openConfirm"},initialize:function(e){c.prototype.initialize.apply(this,arguments),this.notification=new h,this.alertDialog=new l,this.model=new s.Model,this.changedViews=[],!o.isEmpty(e.buttons)&&e.buttonsContainer&&this._initButtons(e),this._initConfirmationDialogs(),this.tooltip&&this._initTooltipEvents(),this._initEvents()},fetchData:function(){return this.collection.fetch({reset:!0,headers:{Accept:"application/attributes.collection.hal+json"}})},saveChildren:function(){var e=this,t=[];o.each(e.changedViews,function(e){t.push(e.model)},e),t.length&&e.collection.save(t).done(o.bind(e._successAjaxCallback,e)).fail(o.bind(e._errorAjaxCallback,e))},revertChanges:function(){for(var e=this.changedViews.length,t=e-1;t>=0;t--)this._revertViewRemoval(this.changedViews[t]);this._resetChangedList()},containsUnsavedItems:function(){return!!this.changedViews.length},remove:function(){n(window).off("beforeunload",this._onPageLeave),this.confirmationDialog&&this.confirmationDialog.remove(),this.notification&&this.notification.remove(),this.alertDialog&&this.alertDialog.remove(),c.prototype.remove.apply(this,arguments)},_initEvents:function(){n(window).on("beforeunload",o.bind(this._onPageLeave,this))},_initTooltipEvents:function(){this.listenTo(this,"childview:mouseover",this._onChildViewMouseOver),this.listenTo(this,"childview:mouseout",this._onChildViewMouseOut)},_initConfirmationDialogs:function(){this.confirmationDialogs={},o.each(d,function(e){this.confirmationDialogs[e]=m(e)},this),this.listenTo(this.confirmationDialogs[d.DELETE_CONFIRM],"button:yes",this._onDeleteConfirm),this.listenTo(this.confirmationDialogs[d.CANCEL_CONFIRM],"button:yes",this.revertChanges),this._initPermissionConfirmEvents&&this._initPermissionConfirmEvents()},_successAjaxCallback:function(e){this.notification.show({message:a["editSettings.notification.message.saved"],type:"success"}),this._resetChangedList()},_errorAjaxCallback:function(e){var t;switch(e.status){case 401:t=a["editSettings.error.message.not.authenticated"];break;default:t=a["editSettings.error.message.unknown.error"]}this.alertDialog.setMessage(t),this.alertDialog.open()},_findChildrenByModel:function(e){return(e=o.isString(e)?this._findModelsWhere({name:e}):e)&&this.children.findByModel(e)},_resetChangedList:function(){this.changedViews.length=0,this.toggleButtons()},_revertViewRemoval:function(e){this._deleteViewFromChangedList(e),this.collection.add(e.model,{at:e.indexAt})},_openConfirm:function(e,t){this.model.set("changedChildView",e);var i=this.confirmationDialogs[t],n=t!==d.CANCEL_CONFIRM||this.containsUnsavedItems();t===d.DELETE_CONFIRM&&i.setContent(o.template(a["editSettings.confirm.delete.dialog.text"],{name:e.model.get("name")})),n&&i.open()},_saveChildViewToChangedList:function(e,t){var i=o.indexOf(this.changedViews,e);-1!==i?!t&&this._deleteViewFromChangedList(e,i):t&&this.changedViews.push(e),this.toggleButtons()},_deleteViewFromChangedList:function(e,t){-1!==(t=t||o.indexOf(this.changedViews,e))&&this.changedViews.splice(t,1)},_removeModel:function(e){this.collection.remove(e)},_onPageLeave:function(e){if(this.containsUnsavedItems())return(e||window.event).returnValue=a["editSettings.dialog.unsaved.changes"],a["editSettings.dialog.unsaved.changes"]},_onDeleteConfirm:function(){var e=this.model.get("changedChildView"),t=e.model;e.indexAt=this.collection.indexOf(t),this._saveChildViewToChangedList(e,!0),this._removeModel(t)},_onChildViewMouseOver:function(e,t,i){var s,a=n(i.target).closest(".table-column");a.hasClass("name")&&(s="name"),a.hasClass("value")&&(s="value"),this.tooltip.show(o.pick(t.toJSON(),s))},_onChildViewMouseOut:function(e,t,i){this.tooltip.hide()}});i.exports=u});