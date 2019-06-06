import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import ReactGridManager, { $gridManager } from '../js/index.js';

// 组件: 缩略图
function SmallPicInner(props) {
    return <span style={{color: '#098'}}>{props.text}</span>;
}
function SmallPic(props) {
    return <span><SmallPicInner text={props.text}/></span>;
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
    const deleteAction = event => {
        alert(`模拟删除[${event.target.title}]`);
    };

    return (
        <span className={'plugin-action'} onClick={deleteAction} title={props.row.title}>删除</span>
    );
}
const option = {
    gridManagerName: 'testReact',
    height: '100%',
    emptyTemplate: <EmptyTemplate text={'这个React表格, 什么数据也没有'}/>,
    columnData: [{
        key: 'pic',
        remind: 'the pic',
        width: '110px',
        text: <SmallPic text={'缩略图'}/>,
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
        template: (type, row) => {
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
        template: (username, row) => {
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
        text: '操作',
        template: <DeleteComponents/>
    }],
    supportRemind: true,
    isCombSorting:  true,
    supportAjaxPage: true,
    supportSorting: true,
    ajax_data: 'http://www.lovejavascript.com/blogManager/getBlogList',
    ajax_type: 'POST',
};

ReactDOM.render(
    <ReactGridManager
        option={option}
    />,
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




function FooterComponent() {
    const init = () => {
        document.querySelector(`table[grid-manager="${option.gridManagerName}"]`).GM('init', option);
    };
    const destroy = () => {
        $gridManager.destroy(option.gridManagerName);
    };
    return (
        <div className="bottom-bar">
            <button onClick={init}>init</button>
            <button onClick={destroy}>destroy</button>
        </div>
    );
}
ReactDOM.render(
    <FooterComponent/>,
    document.querySelector('#footer')
);
