import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import '../../node_modules/gridmanager/js/gm';
import '../../node_modules/gridmanager/css/gm.css';

const $gridManager = GridManager;
export { $gridManager };
export default class ReactGridManager extends React.Component {
    static propTypes = {
        props: PropTypes.object
    };

    option = this.props.option;

    render() {
        return (
            <table ref={this.option.gridManagerName}></table>
        );
    }
    componentDidMount() {
        // 框架解析唯一值
        const COMPILE_ID = 'data-compile-id';
        const table = this.refs[this.option.gridManagerName];

        this.option.compileList = [];
        this.option.compileReact = () => {
            return new Promise(resolve => {
                this.option.compileList.forEach((item, index) => {
                    let element = item.el;
                    const row = item.row;
                    const context = document.querySelector(`[${COMPILE_ID}="${index}"]`);
                    context.removeAttribute(COMPILE_ID);

                    // reactElement
                    if (React.isValidElement(element)) {
                        element = React.cloneElement(element, {row, ...element.props});
                    }

                    // function
                    if (typeof element === 'function') {
                        element = element(item.cell, row);
                    }

                    // not reactElement
                    if (!React.isValidElement(element)) {
                        return;
                    }

                    ReactDOM.render(
                        element,
                        context
                    );
                });
                this.option.compileList.length = 0;
                resolve();
            });
        };
        table.GM(this.option);
        $gridManager.setScope(table, this);
    }

    componentWillUnmount() {
        $gridManager.destroy(this.option.gridManagerName);
    }
}
