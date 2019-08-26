import React from 'react';
import ReactDOM from 'react-dom';
import $gridManager, { jTool } from 'gridmanager';
import 'gridmanager/css/gm.css';

export { $gridManager, jTool };
export default class ReactGridManager extends React.Component {
    constructor(props) {
        super(props);
        this.tableRef = React.createRef();
        this.mergeProps();
    }

    // 版本号
    static version = process.env.VERSION;

    // 存储React节点
    reactCache = [];

    /**
     * 合并option， 这个函数用于实现将option内的参数分开配置
     */
    mergeProps() {
        this.option = this.props.option || {};
        this.callback = this.props.callback;
        Object.keys(this.props).forEach(key => {
            if (!['option', 'callback'].includes(key)) {
                this.option[key] = this.props[key];
            }
        });
    }

    /**
     * 清除已经不存在的React节点
     */
    updateReactCache() {
        this.reactCache = this.reactCache.filter(item => {
            const { context } = item;
            if (!window.getComputedStyle(context).display) {
                ReactDOM.unmountComponentAtNode(context);
            }
            return !!window.getComputedStyle(context).display;
        });
    }

    render() {
        return (
            <table ref={this.tableRef}/>
        );
    }

    /**
     * 将原生模板转换为React
     * @param compileList
     * @param isAdd: 是否向增加至缓存列表
     */
    toReact(compileList, isAdd) {
        compileList.forEach(item => {
            let element = item.template;
            const row = item.row;
            const context = item.el;

            // reactElement
            if (React.isValidElement(element)) {
                element = React.cloneElement(element, {row, index: item.index, ...element.props});
            }

            // function
            if (typeof element === 'function') {
                element = element(...item.fnArg);
            }

            // reactElement
            if (React.isValidElement(element)) {
                element = React.cloneElement(element, {...element.props});
            }

            // string
            if (typeof element === 'string') {
                context.innerHTML = element;
                return;
            }

            // dom
            if (element.nodeType === 1) {
                context.append(element);
                return;
            }

            ReactDOM.render(
                element,
                context
            );

            // 存储当前展示的React项
            isAdd && this.reactCache.push({
                ...item,
                context
            });
        });
    }

    componentDidUpdate() {
        this.mergeProps();

        const { columnData, emptyTemplate, topFullColumn } = this.props.option;

        const settings = $gridManager.get(this.option.gridManagerName);
        const { columnMap } = settings;

        // 更新模板: columnMap 中使用到的模板
        columnData && columnData.forEach(item => {
            columnMap[item.key].text = item.text;
            columnMap[item.key].template = item.template;
        });

        // 更新模板: 通栏
        settings.topFullColumn = topFullColumn;

        // 更新模板: 空
        settings.emptyTemplate = emptyTemplate;

        $gridManager.resetSettings(this.tableRef.current, settings);

        this.updateReactCache();

        // 更新已缓存的模板
        this.reactCache.forEach(item => {
            switch (item.type) {
                // columnMap: text || template
                case 'text':
                case 'template': {
                    item.template = columnMap[item.key][item.type];
                    break;
                }

                // 空模板
                case 'empty': {
                    item.template = emptyTemplate;
                    break;
                }

                // 通栏
                case 'full': {
                    item.template = topFullColumn.template;
                    break;
                }

                default: {
                    break;
                }
            }
        });

        // 将当前的react节点重新渲染
        this.toReact(this.reactCache);
    }

    componentDidMount() {
        // 框架解析唯一值
        const table = this.tableRef.current;

        this.option.compileReact = compileList => {
            this.updateReactCache();

            return new Promise(resolve => {
                this.toReact(compileList, true);
                resolve();
            });
        };
        table.GM(this.option, query => {
            const { className, gridManagerName } = this.option;

            // react版的className需要手动提升至table最外围容器
            if (className) {
                document.querySelector(`[grid-manager-wrap="${gridManagerName}"]`).classList.add(className);
            }

            typeof(this.callback) === 'function' && this.callback({query: query});
            $gridManager.setScope(table, this);
        });
    }

    componentWillUnmount() {
        $gridManager.destroy(this.option.gridManagerName);
    }
}

// 将原生方法，挂载至React GridManager 上
const staticList = Object.getOwnPropertyNames($gridManager);
const noExtendsList = ['name', 'length', 'prototype', 'version'];
staticList.forEach(key => {
    if (!noExtendsList.includes(key)) {
        ReactGridManager[key] = $gridManager[key];
    }
});
