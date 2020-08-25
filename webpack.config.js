const path = require('path');
const glob = require('glob-all');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin'); // <-- can potentially strip out unused bootstrap (preliminary setup wasn't successful--broke certain page styling)
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = (env, options) => {
    return {
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            host: '0.0.0.0',
            port: 9000,
            watchContentBase: true,
        },
        // mode: 'production',
        entry: {
            main: ['./src/index.js', './assets/sass/main.scss'],
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist'),
        },
        // uglifyjs
        optimization: {
            minimizer: [new UglifyJsPlugin()]
        },
        plugins: [new MiniCssExtractPlugin('[name].css'), 
                //   new PurgecssPlugin({
                //     paths: glob.sync([
                //         `${path.join(__dirname, 'src')}/**/*`,
                //         `${path.join(__dirname, 'assets')}/**/*`,
                //     ], { nodir: true }),
                //   }),
                  new HtmlWebpackPlugin({
                    template: './src/index.pug'
                  }),
                ],
        module: {
            rules: [{
                    test: /\.(scss)$/,
                    use: [
                        /*{
                                                    loader: 'style-loader', // inject CSS to page
                                                },  */
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: process.env.NODE_ENV === 'development',
                            }
                        },
                        {
                            loader: 'css-loader', // translates CSS into CommonJS modules
                        },
                        {
                            loader: 'postcss-loader', // Run post css actions
                            options: {
                                plugins: function () { // post css plugins, can be exported to postcss.config.js
                                    return [
                                        require('precss'),
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        }, {
                            loader: 'sass-loader', // compiles Sass to CSS
                            options: {
                                implementation: require('sass'),
                                sassOptions: {
                                    fiber: false,
                                },
                            },
                        },

                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif|webp)$/,
                    use: [
                        'file-loader',
                    ],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }],
                },
                {
                    test: /\.pug$/,
                    loader: 'pug-loader'
                },
            ],

        }
    }
}