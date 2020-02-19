import React, { Component } from 'react';
import GridManager from '../js/index.js';
import AppContext from './AppContext';
const gridManagerName = 'testReact';

export default class FooterComponent extends Component {
    static contextType = AppContext;
    resetTable() {
        this.props.resetTable();
        // let now = Date.now();
        // document.querySelector(`table[grid-manager="${gridManagerName}"]`).GM('init', this.context.option, () => {
        //     console.log('callback => ', Date.now() - now);
        // });
    }

    destroy() {
        GridManager.destroy(gridManagerName);
    }

    render() {
        return (
            <div className="bottom-bar">
                <button onClick={this.resetTable.bind(this)}>init</button>
                <button onClick={this.destroy.bind(this)}>destroy</button>
            </div>
        );
    }
}
