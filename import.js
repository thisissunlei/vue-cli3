/*
 * @Author: hongyongbo
 * @Date: 2018-12-04 12:26:13
 * @LastEditors: hongyongbo
 * @LastEditTime: 2018-12-06 11:44:40
 * @Description: 用于批量添加iview按需引用
 * @dest: views文件夹和components文件夹内的所有.vue文件
 * 
 */

const fs = require("fs");
const path = require("path");
const viewPath = path.resolve(__dirname, "src", "views");
const componentsPath = path.resolve(__dirname, "src", "components");

/**
 * 读取目录内所有文件
 *
 * @param {*} dir
 * @returns promise subDirList
 */
function readdirPromisify(dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, list) => {
      if (err) {
        reject(err);
      }
      resolve(list);
    });
  });
}

/**
 *
 *
 * @param {*} dir 目标文件夹
 * @returns
 */
function injectDir(dir) {
  let stats = fs.statSync(dir);
  if (stats.isDirectory()) {
    return readdirPromisify(dir)
      .then(list =>
        Promise.all(list.map(item => injectDir(path.resolve(dir, item))))
      )
      .then(fileArr => [].concat(...fileArr));
  } else {
    if (path.extname(dir).toUpperCase() === ".VUE") {
      injectVueFile(dir);
    }
  }
}

/**
 * 处理.vue 文件
 *
 * @param {*} filePath .vue文件路径
 */
function injectVueFile(filePath) {
  // 读取内容
  fs.readFile(filePath, { flag: "rs+", encoding: "utf8" }, function(err, data) {
    if (err) {
      console.error(err);
      return;
    }
    // 判断是否有引用iview组件
    const reg = /(?<=<)(([A-Z]|i-)(\w|-)+\b)(?=.+template)/gms; //只能匹配template里的以大写字母获取i-开头的标签
    if (reg.test(data)) {
      // 获取引用的组件
      let componentsArr = data.match(reg); //两种特殊情况：1，含有自定义组件 需要去掉 ；2，类似i-input需要改为Input Form-item改为FormItem

      componentsArr.map((item, index) => {
        item = item.replace(/-(.)/, (m, p) => {
          return p.toUpperCase();
        });
        item = item.replace(/^i/,'');
        componentsArr[index] = item;
      });
      // console.log('componentsArr:  ',componentsArr)

      let forkComponents = Array.from(new Set(componentsArr));
      // console.log('forkComponents:  ',forkComponents)

      //过滤自定义组件
      let components = [];
      forkComponents.map(item => {
        let regTemp = new RegExp("import\\s+?" + item + "\\b");
        if (!regTemp.test(data)) {
          components.push(item);
        }
      });
      // console.log('components:  ',components)
      if (components.length === 0) {
        console.log("\x1B[33m 无需写入1: \x1B[39m", filePath);
        return;
      }

      //删除已有的import {} from 'iview'
      //防止多次注入iview引用
      let regImport = /(?:import\s+?\{)(.+)(?:\}\s+?from\s=?'iview';)/g;
      let str2Import = `import {${components.join()}} from 'iview';`;
      if (regImport.test(data)) {
        data = data.replace(regImport, str2Import);
      } else {
        // 插入import {} from 'iview'
        let regExport = /(?=export\sdefault)/m;
        data = data.replace(regExport, str2Import + "\n");
      }

      // 插入components
      // let regComponent = /components:{([\s\S]+,?)+},/m;
      let regComponent = /components\s?:\s?\{(.+?)\},/ms;
      let m = data.match(regComponent);
      let components2Import = [];
      if (m) {
        //已有components：{}
        //获取已有的引用并从components数组中剔除，以免重复添加
        let exist = m[1];
        // console.log('exist',exist)

        components2Import = components.filter(item => !exist.includes(item));
        // console.log('components',components)
        // console.log('components2Import',components2Import)
        if (components2Import.length != 0) {
          //插入引用
          regComponent = /(?<=components\s*:\s*{)/m;
          let strComponent = `\n    ${components2Import.join(",\n    ")},`;
          data = data.replace(regComponent, strComponent);
        }
      } else {
        //没有components：{} 需要添加
        regComponent = /(?<=export\s*default\s*{)/m;
        let strComponent = `\n  components:{\n    ${components.join(",\n    ")},\n  },\n`;
        data = data.replace(regComponent, strComponent);
        components2Import=components
      }

      // 复制文件副本
      // const filePathBak = filePath + ".bak";
      // fs.writeFileSync(filePathBak, fs.readFileSync(filePath));

      // 写入本文件
      // let fileName=path.basename(filePath)
      // let newFilePath=path.resolve(path.dirname(filePath),"_"+fileName)

      if (components2Import.length === 0) {
        console.log("\x1B[33m 无需写入2: \x1B[39m", filePath);
        return;
      }

      let newFilePath = filePath;
      fs.writeFile(newFilePath, data, { flag: "w+" }, function(err) {
        if (err) {
          console.error("\x1B[31m 写入失败: \x1B[39m", newFilePath);
          console.error(err);
        } else {
          console.log("\x1B[32m 写入成功: \x1B[39m", newFilePath);
        }
      });
    }
  });
}

injectDir(viewPath);
injectDir(componentsPath);
