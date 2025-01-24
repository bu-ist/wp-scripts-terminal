# Blocks Library

This folder would contain any custom Blocks for the Block Editor as well as any
other block editor specific features such as sidebar plugins for the editor.

Each block is organized in it's own folder, and should contain it's JS code,
PHP, frontend styles, editor styles, and frontend JS

The wp-scripts config is changed to use `blocks` as the source directory
instead of the default of `src`. This is so that it is clearer when this
folder structure is placed in a larger theme or plugin that contains other
features such as page templates, custom post types, and theme or plugin styles.
