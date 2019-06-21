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

## 项目中引用
- es2015引入方式
```javascript
import ReactGridManager from 'gridmanager-react';
import 'gridmanager-react/css/gm-react.css';
```

- 通过script标签引入
```html
<link rel="stylesheet" href="../node_modules/gridmanager-react/css/gm-react.css">
<script src="../node_modules/gridmanager-react/js/gm-react.js"></script>
```

## 示例
```html
<div id="example"></div>
```

```javascript
import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import GridManager from 'gridmanager-react';
import 'gridmanager-react/css/gm-react.css';

// 组件: 操作列
function ActionInner(props) {
    const actionAlert = event => {
        alert('操作栏th是由React模板渲染的');
    };
    return <span onClick={actionAlert} style={{display: 'block', color: 'red'}}>{props.text}</span>;
}

function ActionComponents(props) {
    return <ActionInner text={props.text}/>;
}

// 组件: 空模板
function EmptyTemplate(props) {
    return (
        <section style={{textAlign: 'center'}}>
            {props.text}
        </section>
    );
}

// 组件: 标题
function TitleComponents(props) {
    return (
        <a href={'https://www.lovejavascript.com/#!zone/blog/content.html?id=' + props.row.id} target={'_black'}>{props.row.title}</a>
    );
}

// 组件: 类型
function TypeComponents(props) {
    // 博文类型
    const TYPE_MAP = {
        '1': 'HTML/CSS',
        '2': 'nodeJS',
        '3': 'javaScript',
        '4': '前端鸡汤',
        '5': 'PM Coffee',
        '6': '前端框架',
        '7': '前端相关'
    };
    return (
        <button>{TYPE_MAP[props.type]}</button>
    );
}

// 组件: 删除
function DeleteComponents(props) {
    const {index, row} = props;
    const deleteAction = event => {
        if(window.confirm(`确认要删除当前页第[${event.target.getAttribute('data-index')}]条的['${event.target.title}]?`)){
            console.log('----删除操作开始----');
            GridManager.refreshGrid(option.gridManagerName);
            console.log('数据没变是正常的, 因为这只是个示例,并不会真实删除数据.');
            console.log('----删除操作完成----');
        }
    };

    return (
        <span className={'plugin-action'} onClick={deleteAction} data-index={index} title={row.title}>删除</span>
    );
}

// 表格组件配置
const option = {
    gridManagerName: 'testReact',
    height: '100%',
    emptyTemplate: <EmptyTemplate text={'这个React表格, 什么数据也没有'}/>,
    columnData: [{
        key: 'pic',
        remind: 'the pic',
        width: '110px',
        text: '缩略图',
        template: (pic, row) => {
            return (
                <img style={{width: '90px', margin: '0 auto'}} src={'https://www.lovejavascript.com' + pic} title={row.name}/>
            );
        }
    },{
        key: 'title',
        remind: 'the title',
        text: '标题',
        template: <TitleComponents/>
    },{
        key: 'type',
        remind: 'the type',
        text: '分类',
        align: 'center',
        template: (type, row, index) => {
            return <TypeComponents type={type}/>;
        }
    },{
        key: 'info',
        remind: 'the info',
        text: '使用说明'
    },{
        key: 'username',
        remind: 'the username',
        text: '作者',
        // 使用函数返回 dom node
        template: (username, row, index) => {
            return (
                <a href={'https://github.com/baukh789'} target={'_black'}>{username}</a>
            );
        }
    },{
        key: 'createDate',
        remind: 'the createDate',
        width: '100px',
        text: '创建时间',
        sorting: 'DESC',
        // 使用函数返回 htmlString
        template: function(createDate, rowObject){
            return new Date(createDate).toLocaleDateString();
        }
    },{
        key: 'lastDate',
        remind: 'the lastDate',
        width: '120px',
        text: '最后修改时间',
        sorting: '',
        // 使用函数返回 htmlString
        template: function(lastDate, rowObject){
            return new Date(lastDate).toLocaleDateString();
        }
    },{
        key: 'action',
        remind: 'the action',
        width: '100px',
        disableCustomize: true,
        text: <ActionComponents text={'操作'}/>,
        // 快捷方式，将自动向组件的props增加row、index属性
        template: <DeleteComponents/>
    }],
    supportRemind: true,
    isCombSorting:  true,
    supportAjaxPage: true,
    supportSorting: true,
    ajax_data: 'http://www.lovejavascript.com/blogManager/getBlogList',
    ajax_type: 'POST',
};

// 渲染回调函数
const callback = query => {
    console.log('callback => ', query);
};

ReactDOM.render(
    <GridManager
        option={option} // 也可以将option中的配置项展开
        height={'100%'} // 展开后的参数，会覆盖option中的值
        callback={callback}
    />,
    document.querySelector('#example')
);
```

### 调用公开方法
> 通过ES6语法，将GridManager引入。
```javascript
import GridManager, {$gridManager} from 'gridmanager-react';

// 刷新
GridManager.refreshGrid('testReact'); // 或 $gridManager.refreshGrid('testReact');

// 更新查询条件
GridManager.setQuery('testReact', {name: 'baukh'}); // 或 $gridManager.setQuery('testReact', {name: 'baukh'});

// ...其它更多请直接访问API
```

### 查看当前版本

```javascript
import GridManagerReact, {$gridManager} from 'gridmanager-react';
console.log('GridManagerReact 的版本=>', GridManagerReact.version);
console.log('GridManager 的版本=>', $gridManager.version);
```
