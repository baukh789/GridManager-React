import React from 'react';
import ReactDOM from 'react-dom';
import '../../node_modules/gridmanager/js/gm';
import '../../node_modules/gridmanager/css/gm.css';

const $gridManager = GridManager;
export { $gridManager };
export default class ReactGridManager extends React.Component {
    constructor(props) {
        super(props);
        this.tableRef = React.createRef();

        this.option = this.props.option || {};
        this.callback = this.props.callback;
        Object.keys(props).forEach(key => {
            if (!['option', 'callback'].includes(key)) {
                this.option[key] = props[key];
            }
        });
    }

    // 版本号
    static version = process.env.VERSION;

    // 存储React节点
    reactCanche = [];

    render() {
        return (
            <table ref={this.tableRef}/>
        );
    }

    componentDidUpdate() {
        // 更新时，刷新当前展示区域所使用的组件
        this.reactCanche.forEach(item => {
            const { element, context } = item;
            ReactDOM.render(
                React.cloneElement(element, {...element.props}),
                context
            );
        });
    }

    componentDidMount() {
        // 框架解析唯一值
        const table = this.tableRef.current;

        this.option.compileReact = compileList => {

            // 清除已经不存在的React节点
            this.reactCanche = this.reactCanche.filter(item => {
                const { element, context } = item;
                if (!window.getComputedStyle(context).display) {
                    ReactDOM.unmountComponentAtNode(context);
                }
                return !!window.getComputedStyle(context).display;
            });

            return new Promise(resolve => {
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
                    this.reactCanche.push({
                        element,
                        context
                    });
                });
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
