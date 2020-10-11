import * as path from "path";
import * as webpack from "webpack";
import * as HtmlWebPackPlugin from "html-webpack-plugin";
import * as CopyPlugin from "copy-webpack-plugin";

const htmlPlugin = new HtmlWebPackPlugin({
	template: "./src/index.html",
	filename: "./index.html"
});

const copyPlugin = new CopyPlugin({
	patterns: [
		{ from: 'data.json' }
	],
});

const config: webpack.Configuration = {
	mode: "production",
	entry: "./src/index.tsx",
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "app.js"
	},
	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".ts", ".tsx", ".js", ".less"]
	},

	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{ test: /\.tsx?$/, loader: "awesome-typescript-loader" },
			{
				test: /\.less$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'less-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
		]
	},

	plugins: [htmlPlugin, copyPlugin]
};

export default config;