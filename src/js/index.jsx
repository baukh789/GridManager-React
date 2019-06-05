import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import '../../node_modules/gridmanager/js/gm';
import '../../node_modules/gridmanager/css/gm.css';

const $gridManager = GridManager;
export {$gridManager};
export default class ReactGridManager extends React.Component {
    static propTypes = {
        props: PropTypes.object
    };

    option = this.props.option;

    state = {
        children: []
    }

    render() {
        // console.log(this.state.children)
        return (
            <table ref={this.option.gridManagerName}></table>
        );
    }
    componentDidMount() {
        var table = this.refs[this.option.gridManagerName];

        this.option.reactList = [];
        this.option.isReact = (text) => {
            return React.isValidElement(text);
        };
        this.option.compileReact = compileList => {
            return new Promise(resolve => {
                this.option.reactList.forEach((item, index) => {
                    let element = item.el;
                    const row = item.row;
                    if (typeof element === 'function') {
                        element = element(item.cell, row);
                    }
                    ReactDOM.render(
                        React.cloneElement(element, {row, ...element.props}),
                        document.querySelector(`[data-react-key="${index}"]`)
                    );
                    document.querySelector(`[data-react-key="${index}"]`).removeAttribute('data-react-key');
                });
                this.option.reactList.length = 0;
                resolve();
            });
        };
        table.GM(this.option);
        GM.setScope(table, this);
    }
}
