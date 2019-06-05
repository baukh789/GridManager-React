import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import ReactGridManager, { $gridManager } from '../js/index.jsx';
function WelcomeInner(props) {
    return <a title={props.title}>{props.text}</a>;
}
function Welcome(props) {
    return <span>Hello,<WelcomeInner title={props.title} text={props.text}/></span>;
}

function EmptyTemplate(props) {
    return (
        <section style={{textAlign: 'center'}}>
            {props.text}
        </section>
    );
}
function TestSelect(props) {
    return (
        <select value={props.type.toString()} onChange={value => {console.log(value)}}>
            <option value="1">前端框架、插件</option>
            <option value="2">javaScript相关链接</option>
            <option value="3">css相关链接</option>
            <option value="4">html相关链接</option>
            <option value="5">工具类相关链接</option>
            <option value="6">其它链接</option>
        </select>
    );
}
const text = 'react gridmanager';
const option = {
    gridManagerName: 'testReact',
    height: '400px',
    // supportCheckbox: false,
    firstLoading: false,
    emptyTemplate: <EmptyTemplate text={'这个React表格, 什么数据也没有'}/>,
    columnData: [{
        key: 'name',
        remind: 'the name',
        align: 'right',
        text: <Welcome text={text} title={'http://gridmanager.lovejavascript.com/index.html'}/>,
        // text: '名称',
        sorting: ''
    },{
        key: 'type',
        remind: 'the type',
        text: '分类',
        template: (type, row) => {
            return <TestSelect type={type} name={row.name}/>;
        }
    },{
        key: 'info',
        remind: 'the info',
        text: '使用说明'
    },{
        key: 'url',
        remind: 'the url',
        text: 'url',
        // 使用函数返回 dom node
        template: function(url) {
            var urlNode = document.createElement('a');
            urlNode.setAttribute('href', url);
            urlNode.setAttribute('title', url);
            urlNode.setAttribute('target', '_blank');
            urlNode.innerText = url;
            return urlNode;
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
        text: '操作',
        template: function(action, rowObject){
            return '<span class="plugin-action edit-action" gm-click="testGM">删除</span>';
        }
    }],
    supportRemind: true,
    isCombSorting:  true,
    supportAjaxPage: true,
    supportSorting: true,
    ajax_data: 'http://www.lovejavascript.com/learnLinkManager/getLearnLinkList',
    ajax_type: 'POST',
};

ReactDOM.render(
    <div>
        <ReactGridManager
            option={option}
        />
    </div>,
    document.querySelector('#example')
);


function SearchComponent() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    function setQuery() {
        $gridManager.setQuery(option.gridManagerName, {title, content});
    }

    return (
        <div className="search-area">
            <div className="sa-ele">
                <label className="se-title">名称:</label>
                <input className="se-con" onChange={event=>{setTitle(event.target.value)}}/>
            </div>
            <div className="sa-ele">
                <label className="se-title">内容:</label>
                <input className="se-con" onChange={event=>{setContent(event.target.value)}}/>
            </div>
            <div className="sa-ele">
                <button className="search-action" onClick={setQuery}>搜索</button>
                <button className="reset-action">重置</button>
            </div>
        </div>
    );
}

ReactDOM.render(
    <SearchComponent/>,
    document.querySelector('#search')
);
