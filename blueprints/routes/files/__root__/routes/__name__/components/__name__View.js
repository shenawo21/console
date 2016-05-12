import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
<%if (type === 'table') {%>
import DataTable from 'components/DataTable';
<% } %>
<%if (type === 'form') {%>
import Form from 'components/Form';
<% }else if (hasSearch === 'true') {%>
import Search from 'components/Search';
<% } %>
<%if (hasQuickButton === 'true') {%>
import {Row, Col, Button, Icon} from 'hen';
<% } %>
class <%= pascalEntityName %> extends Component {
    <% if (hasSearch === 'true' || type === 'form') { %>
    _getFormItems(){
        let config = {
            formItems: [{
                label: "标题名1",
                name: "name1",
                input: {}
            },{
                label: "标题名2",
                name: "name2",
                select: {}
            }],
            initValue: {
                name1: null,
                name2 : null
            }
        }
        return config;
    }
    <% } %>
    <% if (type === 'table') { %>
    _getColumns(){
        const context = this;
        let columns = [{
            key: '0',
            title: '标题',
            dataIndex: '字段0'
        }, {
            key: '1',
            title: '标题1',
            dataIndex: '字段1'
        }, {
            key: '2',
            title: '标题2',
            dataIndex: '字段2'
        }, {
            key: '3',
            title: '标题3',
            dataIndex: '字段3'
        }, {
            key: '4',
            title: '标题4',
            dataIndex: '字段4'
        }, {
            key: '5',
            title: '标题5',
            dataIndex: '字段5'
        },{
            title: '操作',
            dataIndex: '字段6',
            render(id,row){
                return <span><Link to='#'>跳转</Link></span>
            }
        }];
        return columns;
    }
    <% } %>
    <% if (hasQuickButton === 'true') { %>
        quickButton(quickOptions){
            return <Row>
                    <Col span='2'>
                        <Button onClick={quickOptions.doUp} ><Icon type="" />快捷按钮</Button>
                    </Col>
            </Row>
        }
    <% } %>
    render() {
        const {<% if (hasSearch === 'true' || type === 'form') { %>formOptions,<% } %><% if (hasQuickButton === 'true') { %>quickOptions,<% } %> ...other} = this.props;
        
        return (
            <div>
            <%if (type === 'form' || hasSearch === 'true') {%>
                <<% if (type === 'form') { %>Form horizontal <% }else{ %>Search <% } %> items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset} />
            <% } %>
            <% if (type === 'table') { %>
                <DataTable bordered={true} columns={this._getColumns()} <% if (hasQuickButton === 'true'){ %>quickButton={this.quickButton(quickOptions)}<% } %> {...other} />
            <% } %>
            </div>
        )
    }
}


<%= pascalEntityName %>.propTypes = {
    <% if (type === 'table') { %>
    dataSource : React.PropTypes.array.isRequired,
    action : React.PropTypes.func.isRequired
    <% } %>
    loading : React.PropTypes.bool,
    params : React.PropTypes.object
}


export default <%= pascalEntityName %>;
