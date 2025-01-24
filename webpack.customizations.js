/**
 * Webpack Theme Customization file.
 *
 * Theme developers can make changes to the options, entry points, and paths listed in this file in order to modify the webpack config to load new assets from node packages or to add new stylesheets to be compiled by webpack.
 */

/**
 * SASS includePaths
 *
 * This array specifies the includePaths for Dart Sass to reference in order to find and load SASS partials from node_modules packages.
 * New paths can be added to this array in this file and will be added as paths that Dart Sass checks to find SASS partials for @import instances.
 */
const customIncludePaths = [
	'./node_modules/normalize-scss/sass',
	'./node_modules/mathsass/dist/',
	'./node_modules/@bostonuniversity',
];

/**
 * Theme Entry Points
 *
 * This object contains each of the theme related files that need to be compiled for this theme. This can be SASS or Javascript used in the theme.
 *
 * Format: 'name': 'path-to-file'
 *
 * The name can contain a path to control the output location of the file within the output directory.
 *
 * Example: 'css/admin/adminstyle': './css/admin.scss',
 * In this example the admin.scss file will be compiled as a file named `adminstyle.css` in the /build/css/admin folder path.
 */
const themeEntryPoints = {
	// Styles
	// 'css/theme': './src/scss/theme.scss', // A stylesheet for the theme.
	// Scripts
	// 'js/admin': './src/js/admin.js', // Admin only scripts.
};

/**
 * Set SASS compiler to use the faster embedded version. Default is `sass`. `sass-embedded` appears to be faster on MacOS. This can be changed back to `sass` if it causes issues.
 */
const sassCompiler = 'sass-embedded';

/**
 * The stats option lets you precisely control what bundle information gets displayed. This can be a nice middle ground if you don't want to use quiet or noInfo because you want some bundle information, but not all of it.
 *
 * It is defined as a const here so it can be used for both blocksConfig and themeConfig, but if you'd like to use a different setup for each, you can define them inside the individual config objects.
 *
 * @link https://webpack.js.org/configuration/stats/
 */
const statsConfig = {
	preset: 'verbose', // Output everything.
	// Settings below will modify the preset output.
	errors: true, // Show errors.
	errorsSpace: 5,
	errorStack: false,
	errorDetails: false,
	//
	warnings: false, // Hide warnings.
	colors: true, // Use colors for better readability.
	modules: false, // Hide module details.
	chunks: false, // Hide chunk details.
	chunkGroups : false,
	assets: false, // Hide "assets by path" details.
	entrypoints: true, // Hide the entry points with the corresponding bundles.
	logging: 'none',
	publicPath: false,
	// @todo these are all ignored? the stack trace is too damn long and clutters the build
	//
	warningsSpace: 5,
	reasonsSpace: 5,
	//
	moduleAssets: false,
	moduleTrace: false,
	modulesSpace: 5,
	nestedModules: false,
	nestedModulesSpace: 5,
	chunkModulesSpace: 5,
	//
	assetsSpace: 5,
};

/**
 * Export these so webpack.config.js can consume it.
 */
module.exports = {
	customIncludePaths,
	themeEntryPoints,
	sassCompiler,
	statsConfig,
};
