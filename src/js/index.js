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

    // 是否重复触发渲染
    isRepeatRender = false;

    // 存储传递的className
    classNameCache = '';

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
            const { el } = item;
            if (!window.getComputedStyle(el).display) {
                // 清除framework.send 后存在操作的DOM节点
                const tree = el.querySelector('[tree-element]');
                tree && el.removeChild(tree);

                // 移除react node
                ReactDOM.unmountComponentAtNode(el);
            }
            return !!window.getComputedStyle(el).display;
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
            const { row, el, template, fnArg = []} = item;
            let element = template(...fnArg);

            // reactElement
            if (React.isValidElement(element)) {
                // 如果当前使用的模块(任何类型的)未使用组件或空标签包裹时，会在生成的DOM节点上生成row=[object Object]
                element = React.cloneElement(element, {row, index: item.index, ...element.props});
            }

            // string
            if (typeof element === 'string') {
                el.innerHTML = element;
                return;
            }

            if (!element) {
                return;
            }
            // dom
            if (element.nodeType === 1) {
                el.append(element);
                return;
            }

            ReactDOM.render(
                element,
                el
            );

            // 存储当前展示的React项
            isAdd && this.reactCache.push({
                ...item,
                el
            });
        });
    }

    /**
     * 更新react模版
     */
    updateReactTemplate() {
        const settings = $gridManager.get(this.option.gridManagerName);
        let { columnData, emptyTemplate = settings.emptyTemplate, topFullColumn = settings.topFullColumn } = $gridManager.updateTemplate(this.option);

        const { columnMap } = settings;

        // 更新模板: columnMap[text, template]
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

    /**
     * update table-wrap className
     * react版的className需要手动提升至table最外围容器
     */
    updateClassName() {
        const { gridManagerName, className } = this.option;

        if (className === this.classNameCache) {
            return;
        }

        const classList = document.querySelector(`[grid-manager-wrap="${gridManagerName}"]`).classList;
        if (this.classNameCache) {
            classList.remove(this.classNameCache);
        }

        if (className) {
            classList.add(className);
        }

        this.classNameCache = className;
    }

    componentDidUpdate() {
        this.mergeProps();

        if (!$gridManager.get(this.option.gridManagerName).rendered) {
            this.isRepeatRender = true;
            return;
        }
        this.updateReactTemplate();
        this.updateClassName();

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

        new $gridManager(table, this.option, query => {
            if (this.isRepeatRender) {
                this.updateReactTemplate();
                this.isRepeatRender = false;
            }

            this.updateClassName();
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
