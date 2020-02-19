define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var confirmDialogTypesEnum = require('../../serverSettingsCommon/enum/confirmDialogTypesEnum');

var permissionMasksEnum = require('../../attributes/enum/permissionMasksEnum');

/*
 * Copyright (C) 2005 - 2019 TIBCO Software Inc. All rights reserved.
 * http://www.jaspersoft.com.
 *
 * Unless you have purchased a commercial license agreement from Jaspersoft,
 * the following license terms apply:
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
var maskMap = {
  1: 1,
  2: 2,
  32: 3,
  0: 4
};
module.exports = {
  _onViewInitialize: function _onViewInitialize() {
    this.listenTo(this.model, 'change:_embedded', _.bind(this._onPermissionChange, this));
  },
  _onViewRender: function _onViewRender() {
    var isInherited = this.model.get('inherited'),
        embeddedPermission = this.model.getPermission(),
        embeddedPermissionMask = embeddedPermission && embeddedPermission.mask,
        permissionMask = _.isNumber(embeddedPermissionMask) ? embeddedPermissionMask : this.model.get('permissionMask');

    if (isInherited && permissionMask !== permissionMasksEnum.ADMINISTRATOR) {
      var $selectedOption = this.$el.find('option:selected');
      $selectedOption.prevAll().attr('disabled', 'disabled');
    }
  },
  _onPermissionChange: function _onPermissionChange(model, value) {
    var isPermissionLimited = this._isPermissionLimited(value);

    this._showPermissionConfirm(false);

    if (this.modelChanged._embedded && isPermissionLimited) {
      this.editMode ? this._showPermissionConfirm(true) : this._openPermissionConfirm();
    } else {
      !this.editMode && model.setState('confirmedState');
    }
  },
  _showPermissionConfirm: function _showPermissionConfirm(value) {
    this.permissionConfirmShouldBeShown = value;
  },
  _isPermissionLimited: function _isPermissionLimited(value) {
    var model = this.model,
        confirmedState = model.getState('confirmedState'),
        mask = maskMap[model.getPermission(value).mask],
        previousMask = maskMap[model.getPermission(confirmedState._embedded).mask];
    return mask > previousMask;
  },
  _openPermissionConfirm: function _openPermissionConfirm(options) {
    this.trigger('open:confirm', confirmDialogTypesEnum.PERMISSION_CONFIRM, options || {});
  }
};

});