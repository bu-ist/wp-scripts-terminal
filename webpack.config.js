/**
 * WEBPACK CONFIG
 *
 * This file extends the default wp-scripts webpack config file found here
 *
 * @link https://webpack.js.org/concepts/ Webpack Docs
 * @link https://github.com/WordPress/gutenberg/blob/trunk/packages/scripts/config/webpack.config.js WordPress Webpack Config
 * @link https://developer.bu.edu/gutenberg/gutenberg-handbook/webpack-config-js/ BU Documentation
 *
 * Run `npm list webpack` to see current version.
 */

const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const { mergeWithRules } = require( 'webpack-merge' );
const path = require( 'path' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const RemoveEmptyScriptsPlugin = require( 'webpack-remove-empty-scripts' );

// Import our theme paths from a separate file that can be modified in the theme.
const {
	customIncludePaths,
	themeEntryPoints,
	sassCompiler,
	statsConfig,
} = require( './webpack.customizations' );

/**
 * Config rules for the blocks build.
 */
const blocksConfig = {
	/**
	 * `module` determines how the different types of modules within a project will be treated.
	 * @link https://webpack.js.org/configuration/module/
	 */
	module: {
		/**
		 * `rules` modify how the module is created. They can apply loaders to the module, or modify the parser.
		 * @link https://webpack.js.org/configuration/module/#modulerules
		 */
		rules: [
			{
				test: /\.(sc|sa)ss$/,
				use: [
					{
						loader: require.resolve( 'sass-loader' ),
						// @link https://sass-lang.com/documentation/js-api/interfaces/options/
						options: {
							sassOptions: {
								includePaths: customIncludePaths, // Adding our custom include paths so that
								// outputStyle: 'compressed', // Determines the output format of the final CSS style.
								quietDeps: true, // If this option is set to true, Sass won’t print warnings that are caused by dependencies.
							},
							implementation: require( sassCompiler ),
						},
					},
				],
			},
		],
	},
	stats: statsConfig,
};

/**
 * Config rules for the theme build.
 */
const themeConfig = {
	entry: {
		...themeEntryPoints,
	},
	/**
	 * `module` determines how the different types of modules within a project will be treated.
	 * @link https://webpack.js.org/configuration/module/
	 */
	module: {
		/**
		 * `rules` modify how the module is created. They can apply loaders to the module, or modify the parser.
		 * @link https://webpack.js.org/configuration/module/#modulerules
		 */
		rules: [
			{
				test: /\.(sc|sa)ss$/,
				use: [
					{
						loader: require.resolve( 'css-loader' ),
						options: {
							sourceMap: true, // Set sourceMap to true so we generate a map even for prod builds.
						},
					},
					{
						loader: require.resolve( 'sass-loader' ),
						// @link https://sass-lang.com/documentation/js-api/interfaces/options/
						options: {
							sassOptions: {
								includePaths: customIncludePaths,
								// outputStyle: 'compressed', // Determines the output format of the final CSS style.
								quietDeps: true, // If this option is set to true, Sass won’t print warnings that are caused by dependencies.
							},
							sourceMap: true, // Set sourceMap to true so we generate a map even for prod builds.
							implementation: require( sassCompiler ),
						},
					},
				],
			},
		],
	},
	/**
	 * `stats` lets you precisely control what bundle information gets displayed.
	 * @link https://webpack.js.org/configuration/stats/#stats-presets
	 */
	stats: statsConfig,
	plugins: [
		// Grab the defaultConfig's plugins array and filter it to remove what we don't need.
		...defaultConfig.plugins.filter(
			// Remove CopyWebpackPlugin from the ThemeConfig so we don't copy block.json & php files into our output folder for the theme's files.
			( plugin ) => ! ( plugin instanceof CopyWebpackPlugin )
		),
		new RemoveEmptyScriptsPlugin(), // Add new plugin that removes empty script files for CSS only entries
	],
};

/**
 * Now we use `webpack-merge` to combine our custom rules defined here with the base WordPress rules.
 * Export the new modified configuration for webpack and use the webpack-merge functions to merge our modified configuration in.
 * @link https://github.com/survivejs/webpack-merge?tab=readme-ov-file#mergewithrules
 */
module.exports = [
	mergeWithRules( {
		module: {
			rules: {
				test: 'match',
				use: {
					loader: 'match',
					options: 'merge',
				},
			},
		},
		stats: 'replace',
	} )( defaultConfig, blocksConfig ),
	mergeWithRules( {
		entry: 'merge',
		module: {
			rules: {
				test: 'match',
				use: {
					loader: 'match',
					options: 'merge',
				},
			},
		},
		stats: 'replace',
		plugins: 'replace',
	} )( defaultConfig, themeConfig ),
];
