import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import GridManagerReact from '../js/index.js';
import SearchComponent from './search';
import { ActionComponents, EmptyTemplate, TitleComponents, TypeComponents, EditComponents } from './components';
import FooterComponent from './footer';
import AppContext from './AppContext';

// 静态数据
const ajaxData1 = {
    "data":[
        {
            "id": 1,
            "name": "baukh",
            "age": "28",
            "createDate": "2015-03-12",
            "info": "野生前端程序",
            "children": [
                {
                    "id": 11,
                    "name": "baukh-11",
                    "age": "28",
                    "createDate": "2015-03-12",
                    "info": "野生前端程序",
                    "children": [
                        {
                            "id": 111,
                            "name": "baukh-111",
                            "age": "28",
                            "createDate": "2015-03-12",
                            "info": "野生前端程序"
                        },
                        {
                            "id": 112,
                            "name": "baukh-112",
                            "age": "28",
                            "createDate": "2015-03-12",
                            "info": "野生前端程序"
                        }
                    ]
                },
                {
                    "id": 12,
                    "name": "baukh-12",
                    "age": "28",
                    "createDate": "2015-03-12",
                    "info": "野生前端程序"
                },
                {
                    "id": 13,
                    "name": "baukh-13",
                    "age": "28",
                    "createDate": "2015-03-12",
                    "info": "野生前端程序"
                }
            ]
        },
        {
            "id": 2,
            "name": "baukh",
            "age": "28",
            "createDate": "2015-03-12",
            "info": "野生前端程序"
        },
        {
            "id": 3,
            "name": "baukh",
            "age": "28",
            "createDate": "2015-03-12",
            "info": "野生前端程序"
        },
        {
            "id": 4,
            "name": "baukh",
            "age": "28",
            "createDate": "2015-03-12",
            "info": "野生前端程序",
            "children": [
                {

                    "id": 41,
                    "name": "baukh",
                    "age": "28",
                    "createDate": "2015-03-12",
                    "info": "野生前端程序"
                },
                {

                    "id": 42,
                    "name": "baukh",
                    "age": "28",
                    "createDate": "2015-03-12",
                    "info": "野生前端程序"
                }
            ]
        },
        {
            "id": 5,
            "name": "baukh",
            "age": "28",
            "createDate": "2015-03-12",
            "info": "野生前端程序"
        },{
            "id": 6,
            "name": "baukh",
            "age": "28",
            "createDate": "2015-03-12",
            "info": "野生前端程序"
        },
        {
            "id": 7,
            "name": "baukh",
            "age": "28",
            "createDate": "2015-03-12",
            "info": "野生前端程序"
        },
        {
            "id": 8,
            "name": "baukh",
            "age": "28",
            "createDate": "2015-03-12",
            "info": "野生前端程序"
        }
    ],
    "totals": 8
};
const option = {
    disableCache: false,
    isCombSorting:  true,
    supportAjaxPage: true,
    supportSorting: true,
    supportMoveRow: true,
    // supportTreeData: true,
    // treeConfig: {
    //     insertTo: 'title',
    //     openState: false,
    //     treeKey: 'children'
    // },
    ajaxData: 'http://www.lovejavascript.com/blogManager/getBlogList',
    // ajaxData: ajaxData1,
    ajaxType: 'POST',
};

const getEmptyTemplate = (num, testFN) => {
    return (
        <>
            <EmptyTemplate text={'这个React表格, 什么数据也没有' + num} testFN={testFN}/>
        </>
    );
};

const getFullColumn = num => {
    return {
        template: function () {
            return (
                    <div style={{padding: '12px', textAlign: 'center'}}>
                        快速、灵活的对Table标签进行实例化，让Table标签充满活力。该项目已开源, {num}
                        <a target="_blank" href="https://github.com/baukh789/GridManager">点击进入</a>
                        github
                    </div>
            );
        }
    };
};
const getColumnData = (num, testFN) => {
    return [{
        key: 'pic',
        remind: 'the pic',
        width: '110px',
        text: '缩略图',
        template: (pic, row) => {
            return (
                <img style={{width: '90px', height:'58.5px', margin: '0 auto'}} src={'https://www.lovejavascript.com' + pic} title={row.name}/>
            );
        }
    },{
        key: 'title',
        remind: 'the title',
        text: '标题',
        // 快捷方式，将自动向组件的props增加row、index属性
        template: <TitleComponents/>
    },{
        key: 'type',
        text: '博文分类',
        width: '150px',
        align: 'center',
        template: (type, row, index) => {
            return <TypeComponents type={type}/>;
        }
    },{
        key: 'info',
        text: '简介',
    },{
        key: 'username',
        remind: 'the username',
        width: '100px',
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
        width: '130px',
        text: '创建时间',
        sorting: 'DESC',
        // 使用函数返回 htmlString
        template: function(createDate, rowObject){
            return new Date(createDate).toLocaleDateString();
        }
    },{
        key: 'lastDate',
        remind: 'the lastDate',
        width: '130px',
        text: '最后修改时间',
        sorting: '',
        // 使用函数返回 htmlString
        template: function(lastDate, rowObject){
            return new Date(lastDate).toLocaleDateString();
        }
    },{
        key: 'state',
        remind: '展示当前的state',
        width: '100px',
        text: 'state',
        align: 'center',
        template: (state, row, index) => {
            return (
                <span>{num}</span>
            );
        }
    },{
        key: 'action',
        remind: 'the action',
        width: '100px',
        disableCustomize: true,
        text: <ActionComponents text={'操作' + num}/>,
        template: (action, row, index) => {
            return (
                <>
                    <EditComponents row={row} index={index} gmkey={gridManagerName}/>
                    <span className='plugin-action' onClick={testFN}>state</span>
                </>
            );
        }
    }];
};
class App extends Component{
    constructor() {
        super();
        this.state = {
            num: 1
        };
        this.testFN = () => {
            this.setState(state => {
                return {
                    num: state.num + 1
                };
            });
        };
    }
    static contextType = AppContext;


    callback(query) {
        console.log('callback => ', query);
    }

    render() {
        this.columnData = getColumnData(this.state.num, this.testFN);
        this.topFullColumn = getFullColumn(this.state.num);
        this.emptyTemplate = getEmptyTemplate(this.state.num, this.testFN);
        const { gridManagerName, option } = this.context;
        return (
            <>
                <div id="search">
                    <SearchComponent/>
                </div>
                <div id="example">
                    <GridManagerReact
                        gridManagerName={gridManagerName}
                        option={option} // 也可以将option中的配置项展开
                        height={'100%'} // 展开后的参数，会覆盖option中的值
                        columnData={this.columnData}
                        // topFullColumn={this.topFullColumn}
                        emptyTemplate={this.emptyTemplate}
                        callback={this.callback.bind(this)}/>
                </div>
                <div id="footer">
                    <FooterComponent/>
                </div>
            </>
        );
    }
}

const gridManagerName = 'testReact';
ReactDOM.render(
    <AppContext.Provider value={{gridManagerName, option}}>
        <App/>
    </AppContext.Provider>,
    document.querySelector('#app')
);
