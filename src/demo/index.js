import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import GridManager from '../js/index.js';
import SearchComponent from './search';
import { ActionComponents, EmptyTemplate, TitleComponents, TypeComponents, EditComponents } from './components';
import FooterComponent from './footer';
import AppContext from './AppContext';

const option = {
    disableCache: false,
    emptyTemplate: <EmptyTemplate text={'这个React表格, 什么数据也没有'}/>,
    isCombSorting:  true,
    supportAjaxPage: true,
    supportSorting: true,
    ajaxData: 'http://www.lovejavascript.com/blogManager/getBlogList',
    ajaxType: 'POST',
};
class App extends Component{
    constructor() {
        super();
        this.state = {
            num: 1
        };
        setTimeout(() => {
            this.setState(state => {
                return {
                    num: state.num + 1
                };
            });
        }, 4000);

        this.columnData = [{
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
            key: 'action',
            remind: 'the action',
            width: '100px',
            disableCustomize: true,
            text: <ActionComponents text={'操作'}/>,
            template: (action, row, index) => {
                return <EditComponents row={row} index={index} gmkey={gridManagerName} num={this.state.num}/>
            }
        }];
    }
    static contextType = AppContext;

    callback(query) {
        console.log('callback => ', query);
    }

    render() {
        // const columnData = getColumnData(this.state);
        const { gridManagerName, option } = this.context;
        return (
            <>
                <div id="search">
                    <SearchComponent/>
                </div>
                <div id="example">
                    <GridManager
                        gridManagerName={gridManagerName}
                        option={option} // 也可以将option中的配置项展开
                        height={'100%'} // 展开后的参数，会覆盖option中的值
                        columnData={this.columnData}
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
