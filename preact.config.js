module.exports = function (config, env, helpers) {
	let css = helpers.getLoadersByName(config, 'css-loader')[0];
	css.loader.options.modules = false;

	config.resolve.modules.push(env.src)

	if (!env.production) {
		const pathRewrite = (path, request) => {
			delete request.headers.referer;

			return '/' + path.replace(/^\/[^\/]+\//, '');
		}

		const onProxyRes = (proxyRes, request, res) => {
			proxyRes.headers.connection = 'keep-alive';
			proxyRes.headers['cache-control'] = 'no-cache';
		}

		config.devServer.proxy = [
			{
				path: '/api/**',
				target: 'http://higimo.ru/api',

				changeOrigin: true,
				changeHost: true,

				pathRewrite,
				onProxyRes,
			},
			{
				path: '/project/**',
				target: 'http://higimo.ru/project',

				changeOrigin: true,
				changeHost: true,

				pathRewrite,
				onProxyRes,
			},
		];
	}
}
