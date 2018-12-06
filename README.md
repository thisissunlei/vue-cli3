### 环境
1. 项目依赖 `node` 环境,版本为 `10.14.1`

### 项目启动
1. npm i (或者 yarn)
2. npm run dev

### 项目打包
1. npm run build

### 项目打包并分析
1. npm run analyz

### 项目目录
```
project-vue
	dist 打包目录
	public 静态文件（不会被webpack打包，直接拷贝到dist）
	src 开发文件夹
	    api 接口配置目录
	    assets 项目静态内容（项目自身公共样式，图片，js）
	    components 项目公用组件
	    plugins 不同项目间的公用方法（通过import引入使用）
	    views 开发内容详情区
	vue.config.js	主要配置文件
	.env 环境变量配置
```

### 项目UI
https://www.iviewui.com/ ，`iview` 版本为 `^3.1.5`
iview 从 2 到 3 写法的改变有：
- Button
  - (<b>不兼容</b>) 废弃 type ghost，原先的 default 样式有改变。Button 组件的type='ghost' 属性要去掉
  - 新增属性 custom-icon，支持自定义图标
  - 新增属性 to、replace、target，支持点击直接跳转
  - 新增幽灵属性 ghost，可以使按钮背景透明，常用于有色背景上

- Input
  - i-input 改为 Input
  - 新增属性 prefix 和 suffix 以及同名 slot，支持设置前缀和后缀图标
  - 新增属性 search 和 enterButton，支持搜索类型的输入框
  - 新增事件 @on-search，使用搜索类型输入框时，点击搜索或按下回车键时触发

- Icon
  - Icon 的图标升级至 ionicons 3.0 图标，图标名称有改变
  - 新增属性 custom，支持自定义图标

- 其他：其他语法的改动详见 https://yuguo.site/2018/08/24/iview2-%E5%8D%87%E7%BA%A7-iview3/



