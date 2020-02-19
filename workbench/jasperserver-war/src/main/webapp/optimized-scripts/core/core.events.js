define(["require","exports","module","prototype","../util/utils.common","../core/core.layout","../actionModel/actionModel.primaryNavigation"],function(e,t,n){var o=e("prototype"),i=o.$,T=e("../util/utils.common"),a=T.isSupportsTouch,E=T.matchAny,r=T.isIPad,u=T.matchMeOrUp,s=T.relatedTargetInElementSubtree,c=T.isIE7,m=T.isRightClick,A=T.isIE,_=e("../core/core.layout"),N=e("../actionModel/actionModel.primaryNavigation");document.observe(a()?"touchstart":"mousedown",function(e){var t=e.element();if(void 0!==t.match){if(t.match(_.MINIMIZED_PATTERN))return void _.maximize(t);if(t.match(_.MINIMIZER_PATTERN))return void _.minimize(t);if(t.match(_.META_LINKS_PATTERN)&&"main_logOut_link"===t.readAttribute("id")&&N.navigationOption("logOut"),!a()||!event.treeEvent&&!event.listEvent){var n=E(t,[_.BUTTON_PATTERN,_.MENU_LIST_PATTERN],!0);n&&!i(n).match(_.PRESSED_PATTERN)&&S.down(n),t.match(_.DISCLOSURE_BUTTON_PATTERN)&&S.down(t)}}}),r()&&window.addEventListener("touchmove",function(e){}),document.observe("mouseover",function(e){var t=e.element(),n=null;n=u(t,_.NAVIGATION_MUTTON_PATTERN),n&&!s(e,n)&&(N.onMenuHeaderMouseOver(e,n),n.tabIndex=-1,n.focus()),c()||(n=E(t,[_.BUTTON_PATTERN],!0),!n||s(e,n)||n.hasClassName(_.DROP_TARGET_CLASS)||S.over(n),t.match&&t.match(_.DISCLOSURE_BUTTON_PATTERN)&&S.over(t))}),c()||document.observe("mouseout",function(e){var t=null,n=e.element();t=E(n,[_.BUTTON_PATTERN],!0),t&&!s(e,t)&&S.out(t),n.match&&n.match(_.DISCLOSURE_BUTTON_PATTERN)&&S.out(n)}),document.stopObserving(a()?"touchend":"mouseup").observe(a()?"touchend":"mouseup",function(e){var t=e.element(),n=null;if(n=u(t,_.NAVIGATION_PATTERN))if(n.identify()==_.MAIN_NAVIGATION_HOME_ITEM_ID)N.navigationOption("home");else{if(n.identify()!=_.MAIN_NAVIGATION_LIBRARY_ITEM_ID)return;N.navigationOption("library")}if(n=u(t,_.TABSET_TAB_PATTERN),n&&(i(n).match(_.SELECTED_PATTERN)||(i(n).siblings().each(function(e){S.unSelect(i(e))}),S.select(i(n)))),n=E(t,[_.BUTTON_PATTERN,_.BUTTON_SET_BUTTON,_.MENU_LIST_PATTERN],!0),n&&!n.match(_.TOOLBAR_CAPSULE_PATTERN)&&S.up(n),a()&&(event.treeEvent||event.listEvent)||t.match&&t.match(_.DISCLOSURE_BUTTON_PATTERN)&&S.up(t),!r()&&m(e)){var o=e.element();document.fire(_.ELEMENT_CONTEXTMENU,{targetEvent:e,node:o})}}),document.observe(a()?"drag:touchstart":"drag:mousedown",function(e){var t=e.memo.targetEvent.element();if(!a()||!event.treeEvent&&!event.listEvent){var n=u(t,_.LIST_ITEM_PATTERN);n&&!t.match(_.DISCLOSURE_BUTTON_PATTERN)&&S.down(n,function(e){return i(e).down(_.LIST_ITEM_WRAP_PATTERN)}),t.match(_.DISCLOSURE_BUTTON_PATTERN)&&S.down(t)}});var S={over:function(e,t){if(e&&!this.isSelected(e)){var n=t?t(e):e;i(n).addClassName(_.HOVERED_CLASS)}},out:function(e,t){if(e){var n=t?t(e):e;i(n).removeClassName(_.HOVERED_CLASS).removeClassName(_.PRESSED_CLASS)}},down:function(e,t){if(e&&!this.isSelected(e)){var n=t?t(e):e;i(n).removeClassName(_.HOVERED_CLASS).addClassName(_.PRESSED_CLASS)}},up:function(e,t){if(e&&!this.isSelected(e)){var n=t?t(e):e;n=i(n),n.removeClassName(_.PRESSED_CLASS),!r()&&n.addClassName(_.HOVERED_CLASS)}},disable:function(e){e&&(S.out(e),i(e).writeAttribute(_.DISABLED_ATTR_NAME,_.DISABLED_ATTR_NAME))},enable:function(e){e&&(S.out(e),i(e).writeAttribute(_.DISABLED_ATTR_NAME,null))},isDisabled:function(e){if(e)return i(e).readAttribute(_.DISABLED_ATTR_NAME)===_.DISABLED_ATTR_NAME||i(e).hasClassName(_.DISABLED_CLASS)},unSelect:function(e){e&&i(e).removeClassName(_.SELECTED_CLASS)},select:function(e){e&&i(e).addClassName(_.SELECTED_CLASS)},isSelected:function(e,t){if(e){var n=t?t(e):e,o=n.up("li");return o&&o.hasClassName(_.SELECTED_CLASS)}return!1}};document.observe("contextmenu",function(e){return Event.stop(e),!1}),document.observe("dom:loaded",function(e){A()&&document.body.setAttribute("oncontextmenu","return false")}),n.exports=S});