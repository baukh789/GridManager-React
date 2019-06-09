import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import '../../node_modules/gridmanager/js/gm';
import '../../node_modules/gridmanager/css/gm.css';

const $gridManager = GridManager;
export { $gridManager };
export default class ReactGridManager extends React.Component {
    static version = process.env.VERSION;
    static propTypes = {
        props: PropTypes.object
    };

    option = this.props.option;
    callback = this.props.callback;

    render() {
        return (
            <table ref={this.option.gridManagerName}></table>
        );
    }
    componentDidMount() {
        // 框架解析唯一值
        const table = this.refs[this.option.gridManagerName];

        this.option.compileReact = compileList => {
            return new Promise(resolve => {
                compileList.forEach((item, index) => {
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
                });
                resolve();
            });
        };
        table.GM(this.option, query => {
            typeof(this.callback) === 'function' && this.callback({query: query});
            $gridManager.setScope(table, this);
        });
    }

    componentWillUnmount() {
        $gridManager.destroy(this.option.gridManagerName);
    }
}
