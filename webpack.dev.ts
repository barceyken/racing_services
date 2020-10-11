import * as webpack from "webpack";
import * as HtmlWebPackPlugin from "html-webpack-plugin";

const htmlPlugin = new HtmlWebPackPlugin({
	template: "./src/index.html"
});

const config: webpack.Configuration = {
	mode: "development",
	entry: "./src/index.tsx",
	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".ts", ".tsx", ".js", ".json", ".d.ts", ".less"]
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
	plugins: [htmlPlugin]
};

export default config;