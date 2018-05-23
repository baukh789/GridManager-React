import React, { Component, PropTypes } from 'react';
import '../../node_modules/gridmanager/js/gm';
import '../../node_modules/gridmanager/css/gm.css';
export default class ReactGridManager extends Component {
    static propTypes = {
        props: PropTypes.string.object
    };
    render() {
        return (
            <table ref={this.props.option.gridManagerName}></table>
        );
    }
    componentDidMount() {
        var table = this.refs[this.props.option.gridManagerName];
        table.GM(this.props);
        GM.setScope(table, this);
    }
}

// var ReactGridManager = React.createClass({
//     render: function () {
//         return <table ref={this.props.option.gridManagerName}></table>;
//     },
//     componentDidMount: function () {
//         var table = this.refs[this.props.option.gridManagerName];
//         table.GM(this.props.option);
//     }
// });