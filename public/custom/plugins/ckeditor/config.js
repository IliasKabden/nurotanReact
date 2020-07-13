/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';

  config.removeDialogTabs = 'image:advanced;link:advanced';
	config.extraPlugins = 'uploadcare';
	config.uploadUrl = 'https://upload.uploadcare.com/from_url/?pub_key=d6392098c6da3fb1b694';
	config.allowedContent = true;
  config.language = 'ru';
};
