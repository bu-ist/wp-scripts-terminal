# wp-scripts-terminal

Trying to better understand and control the terminal output when using `wp-scripts build`. This is a simple repo with an intentional error in the code so I can adjust what is displayed.

Goal:

<img width="1177" alt="Image" src="https://github.com/user-attachments/assets/fcf66263-4b4e-4798-8581-c9fbe21b4536" />

Attempting to use the [stats-options](https://webpack.js.org/configuration/stats/#stats-options) but not getting the desired results.

https://github.com/bu-ist/wp-scripts-terminal/blob/6427baea6815cfe13850a6fe4f3fb32f5871631e/webpack.customizations.js#L50-L75

## OTHER FINDINGS

- https://stackoverflow.com/questions/34828222/webpack-hide-stack-trace-from-babel-errors - same issue, no solution
- https://stackoverflow.com/questions/58694583/webpack-with-babel-loader-hide-babel-error-stack-trace - no solution
- https://www.npmjs.com/package/error-logger-webpack-plugin - abandoned
- https://www.npmjs.com/package/pretty-error - abandoned
- https://stackoverflow.com/questions/56023389/better-errors-in-console-after-compiling-scripts-using-webpack - source maps
- Maybe [this is what is happening](https://github.com/webpack/webpack/issues/15980#issuecomment-1563502236): `The main problem some tools (for example node-sass, maybe due bindling) put stack inside message, so because of errorDetails enabled by default you see the stack, but this stack just in error message, so I don't think we can solve it on webpack level...`
