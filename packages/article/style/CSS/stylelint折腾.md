# 在vscode中stylelint折腾

1. 安装[stylelint](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint)插件
2. 项目中安装stylelint-config-standard, 
3. 新建`stylelint.config.js`文件
    ```
    module.exports = {
      extends: 'stylelint-config-standard', // 也可以安装stylelint-config-standard到全局， 这里配置绝对路径
      rules: { // 扩展的rules
      },
    };

    ```