const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    // 开启代理服务器
    devServer: {
        proxy: 'http://localhost:4000',
    },
})
