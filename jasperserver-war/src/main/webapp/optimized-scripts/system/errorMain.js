define("system/errorMain",["require","exports","module","jquery"],function(e,r,o){var n=e("jquery");n("#closeErrorPage").on("click",function(){n(document).trigger("errorPage:close",{})})});