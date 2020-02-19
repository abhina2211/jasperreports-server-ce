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

package com.jaspersoft.jasperserver.api.engine.jasperreports.common;


/**
 * @author sanda zaharia
 * @version $Id$
 */
public class PdfExportParametersBean extends AbstractExportParameters {
	
	public static final String PROPERTY_PDF_PAGINATED = "com.jaspersoft.jrs.export.pdf.paginated";
	
	public static final String PROPERTY_PDF_MAX_PAGE_HEIGHT = "com.jaspersoft.jrs.export.pdf.max.page.height";
	
	public static final String PROPERTY_PDF_MAX_PAGE_WIDTH = "com.jaspersoft.jrs.export.pdf.max.page.width";

	public void setPropertyValues(Object object){
		if(object instanceof PdfExportParametersBean){
			PdfExportParametersBean bean =(PdfExportParametersBean)object;
		}
	}

}