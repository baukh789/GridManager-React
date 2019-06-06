# GridManager React
> 基于 React 的 GridManager 封装, 用于便捷的在 React 中使用GridManager. 除过React特性外，其它API与GridManager API相同。

![image](https://s2.ax1x.com/2019/04/16/AxA4xK.png)
[![Build Status](https://travis-ci.org/baukh789/GridManager.svg?branch=master&style=flat-square)](https://travis-ci.org/baukh789/GridManager)
[![npm version](https://img.shields.io/npm/v/gridmanager-react.svg?style=flat-square)](https://www.npmjs.com/package/gridmanager-react)
[![npm downloads](https://img.shields.io/npm/dt/gridmanager-react.svg?style=flat-square)](https://www.npmjs.com/package/gridmanager-react)
[![coverage](https://img.shields.io/codecov/c/github/baukh789/GridManager.svg?style=flat-square)](https://codecov.io/gh/baukh789/GridManager)

## 实现功能
- 宽度调整: 表格的列宽度可进行拖拽式调整
- 位置更换: 表格的列位置进行拖拽式调整
- 配置列: 可通过配置对列进行显示隐藏转换
- 表头吸顶: 在表存在可视区域的情况下,表头将一直存在于顶部
- 排序: 表格单项排序或组合排序
- 分页: 表格ajax分页,包含选择每页显示总条数和跳转至指定页功能
- 用户偏好记忆: 记住用户行为,含用户调整的列宽、列顺序、列可视状态及每页显示条数
- 序号: 自动生成序号列
- 全选: 自动生成全选列
- 导出: 当前页数据下载,和仅针对已选中的表格下载
- 右键菜单: 常用功能在菜单中可进行快捷操作
- 过滤: 通过对列进行过滤达到快速搜索效果

## API
> 该文档为原生GridManager的文档，react版本除了在`columnData.text` `columnData.template` `topFullColumn.template`中可以使用react模版外，其它使用方式相同。
- [API](http://gridmanager.lovejavascript.com/api/index.html)

## Demo
> 该示例为原生GridManager的示例，react版本除了在`columnData.text` `columnData.template` `topFullColumn.template`中可以使用react模版外，其它使用方式相同。
- [简单的示例](http://gridmanager.lovejavascript.com/demo/index.html)
- [复杂的示例](http://develop.lovejavascript.com/node_modules/gridmanager/demo/index.html)

## Core code
- [GridManager](https://github.com/baukh789/GridManager)
- [jTool](https://github.com/baukh789/jTool)

## 开发环境
ES2015 + webpack + React + GridManager
