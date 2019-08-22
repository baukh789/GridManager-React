import React, { Component } from 'react';
import GridManager from '../js/index.js';
import AppContext from './AppContext';
const gridManagerName = 'testReact';

export default class FooterComponent extends Component {
    static contextType = AppContext;
    init() {
        document.querySelector(`table[grid-manager="${gridManagerName}"]`).GM('init', this.context.option);
    }

    destroy() {
        GridManager.destroy(gridManagerName);
    }

    render() {
        return (
            <div className="bottom-bar">
                <button onClick={this.init.bind(this)}>init</button>
                <button onClick={this.destroy.bind(this)}>destroy</button>
            </div>
        );
    }
}
