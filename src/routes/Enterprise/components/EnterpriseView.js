import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';


import Search from 'components/Search';


import {Row, Col, Button, Icon, DatePicker} from 'hen';

const ENABLED = {
  'false': "否",
  'true': "是"
};
class Enterprise extends Component {

    _getFormItems(){
        let config = {
            formItems: [{
                label: "企业编码：",
                name: "enterpriseCode",
                input: {
                  placeholder :"请输入企业编码"
                }
            },{
              label: "企业名称：",
              name: "name",
              input: {
                placeholder :"请输入企业名称"
              }
            },{
              label: "企业状态：",
              name: "enabled",
              select: {
                tipValue: "请选择是否可用",
                optionValue: Object.keys(ENABLED).map((key) => {
                  return {'value': key, 'title': ENABLED[key]}
                })
              }
            }],
            initValue: {
              enterpriseCode: null,
              name : null,
              enabled:null
            }
        }
        return config;
    }
    _getColumns(){
        const context = this;
        let columns = [{
            key: '0',
            title: '企业编码',
            dataIndex: 'enterpriseCode'
        }, {
            key: '1',
            title: '企业名称',
            dataIndex: 'name'
        }, {
            key: '2',
            title: '联系电话',
            dataIndex: 'telephone'
        }, {
            key: '3',
            title: '企业状态',
            dataIndex: 'enabled',
            render(key){
              return <span>{ENABLED[key]}</span>;
            }
        }, {
            key: '4',
            title: '是否审核',
            dataIndex: 'isReview'
        }, {
          key: '5',
          title: '企业类型',
          dataIndex: 'type'
        }, {
          key: '6',
          title: '入驻时间',
          dataIndex: 'createTime'
        },{
            title: '操作',
            dataIndex: 'guid',
            render(id,row){
                return <span>
                  <Link to={`/enterprise/detail/${id}`}>查看</Link> |
                  <Link to={`/enterprise/detail/${id}`}>编辑</Link> |
                  <Link to={`/enterprise/detail/${id}`}>删除</Link>
                </span>
            }
        }];
        return columns;
    }


        quickButton(quickOptions){
            return <Row>
                    <Col span='2'>
                      <Link to={`/`}>
                        <Button onClick={quickOptions.doUp} type="primary"><Icon type="menu-unfold" />企业入驻</Button>
                      </Link>
                    </Col>
            </Row>
        }

    render() {
        const {formOptions,quickOptions, ...other} = this.props;

        return (
            <div>

                <Search  items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset} />


                <DataTable bordered={true} columns={this._getColumns()} quickButton={this.quickButton(quickOptions)} {...other} />

            </div>
        )
    }
}


Enterprise.propTypes = {

    dataSource : React.PropTypes.array.isRequired,
    action : React.PropTypes.func.isRequired,

    loading : React.PropTypes.bool,
    params : React.PropTypes.object
}


export default Enterprise;
