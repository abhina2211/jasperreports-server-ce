define(["require","exports","module","underscore","bundle!CommonBundle","bundle!ImportExportBundle","../../view/BaseWarningDialogView"],function(e,n,t){var o=e("underscore"),i=e("bundle!CommonBundle"),r=e("bundle!ImportExportBundle"),l=e("../../view/BaseWarningDialogView");t.exports=l.extend({constructor:function(e){e||(e={}),o.extend(e,{resizable:!0,buttons:[{label:r["import.button.include"],action:"include",primary:!0},{label:r["import.button.skip"],action:"skip",primary:!1},{label:i["button.cancel"],action:"cancel",primary:!1}]}),l.prototype.constructor.call(this,e),this.on("button:include",o.bind(this.close,this)),this.on("button:skip",o.bind(this.close,this)),this.on("button:cancel",o.bind(this.close,this))},open:function(e){o.extend(e,{message:r["import.dialog.broken.dependencies.intro"]}),l.prototype.open.call(this,e)}})});