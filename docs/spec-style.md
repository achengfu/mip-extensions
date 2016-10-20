MIP 扩展组件规范 - 样式开发
==============


Style Guide
------

组件的样式开发必须遵守 [CSS Style Guide](https://github.com/ecomfe/spec/blob/master/css-style-guide.md)。如果你使用了 [LESS](http://lesscss.org/) ，还需要遵守 [LESS Code Style](https://github.com/ecomfe/spec/blob/master/less-code-style.md)。

开发时，我们可以通过 [FECS](http://fecs.baidu.com/) 工具进行检查。



文件
----

### 所有样式文件 **必须(MUST)** 使用无 BOM 的 UTF-8 编码。

解释：

UTF-8 编码具有更广泛的适应性。[BOM](https://en.wikipedia.org/wiki/Byte_order_mark) 在使用程序或工具处理文件时可能造成不必要的干扰。




选择器
-----


待讨论