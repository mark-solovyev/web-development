const webpack = require("webpack");
module.exports = {
    mode: "development",
    output: {
        filename: "bundle.js"
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })    
    ]
}