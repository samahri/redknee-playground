const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    entry: './index.js', // the application's main file
    mode: 'development',
    output: { // specifiy where to the output files after bundling
        path: path.resolve(__dirname, './dist'),
        filename: 'index_bundle.js',
    },
    target: 'web', // specifies where the app will run
    devServer: { // configure the development server settings
        port: '5001',
        static: { // from where static files are served
            directory: path.join(__dirname, 'public')
        },
        open: true, // automatically open the browser when the script runs
        hot: true, // enable hot swapping: don't need to relaunch when the app changes
        liveReload: true, // reloads the browser when there's a change
    },
    resolve: { // tells Webpack which types of files to consider when building our app
        extensions: ['.js', '.jsx', '.json'],
    },
    module: { // rules to handle types of files
        rules: [
            { // use babel-loader when confronting js or jsx files
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader', // we haven't installed babel
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true
                        }
                    }
                ]
            },
        ],
    },
    plugins: [ // use external plugins
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html')
        }),
        new MiniCssExtractPlugin(),
    ]
};