define(["require","jquery","backbone","underscore","text!./template/sizerTemplate.htm","logger","jquery-ui/widgets/resizable"],function(e){"use strict";var i=e("jquery"),t=e("backbone"),n=e("underscore"),r=e("text!./template/sizerTemplate.htm"),s=e("logger").register("Sizer");return e("jquery-ui/widgets/resizable"),t.View.extend({template:n.template(r),el:function(){return this.template()},initialize:function(e){this.container=e.container,this.sizerOptions=n.clone(e),delete this.sizerOptions.container,this.$container=i(this.container),this.render()},render:function(){return n.defaults(this.sizerOptions,{minHeight:this.$container.height(),handles:{s:this.$el}}),this.$container.resizable(this.sizerOptions),this},show:function(){return this.$el.removeClass("jr-isInvisible"),this},hide:function(){return this.$el.addClass("jr-isInvisible"),this},updateMinMax:function(e){this.$container.resizable("option","minHeight",e.minHeight),this.$container.resizable("option","maxHeight",e.maxHeight)},remove:function(){try{this.$container.resizable("destroy")}catch(e){s.debug(e)}t.View.prototype.remove.apply(this,arguments)}})});