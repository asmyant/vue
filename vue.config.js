const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  publicPath: '',
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        data: `
          @import '@/assets/scss/abstracts/_functions.scss';
          @import '@/assets/scss/abstracts/_variables.scss';
        `,
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, '/src'),
        ui: path.join(__dirname, 'src/components/ui'),
        catalog: path.join(__dirname, 'src/components/catalog'),
        images: path.join(__dirname, 'src/assets/images'),
      },
    },
  },
});
