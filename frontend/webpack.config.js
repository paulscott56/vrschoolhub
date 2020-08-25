const path = require('path');

const TARGET_DIR = path.resolve(__dirname, 'target');
const SRC_DIR = path.resolve(__dirname, 'src');

const config = {
    entry: SRC_DIR + '/js/client.ts',
    output: {
        path: TARGET_DIR,
        filename: 'bundle.js',
    },
    node: {
        fs: 'empty',
        __filename: true,
    },
    module: {
        rules: [
            {
                // Compile .ts and .tsx files
                test: /\.tsx?$/,
                use: 'ts-loader',
            },
            {
                test: /\.(css|less)$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        // We want to be able to include .jsx and .tsx modules without explicitly stating the extension JSX.
        extensions: ['*', '.js', '.json', '.jsx', '.ts', '.tsx'],
    },
    externals: {
        // In cpexcel.js file (from xlsx-style package), there is a conditional require for cptable module.
        // It is never used, but webpack tries to bundle it and fails with an error.
        // This is simply to avoid that error
        './cptable': 'cptable',
    },
    devtool: 'cheap-module-source-map',
    devServer: {
        port: 3000,
        contentBase: path.join(SRC_DIR, 'assets'),
        historyApiFallback: {
            index: 'index.html',
        },
    }

};

module.exports = config;
