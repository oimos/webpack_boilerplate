module.exports = {
	plugins: [
		require('postcss-will-change'),
		require('autoprefixer')({
			browsers: ['> 0.01%']
		}),
		require('postcss-simple-vars'),
		require('postcss-nested'),
		require('postcss-flexbugs-fixes'),

	]
}