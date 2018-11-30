### 环境
1. 项目依赖 `node` 环境,版本为 `9.4.0`

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



