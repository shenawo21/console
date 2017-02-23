import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DataTable from 'components/DataTable';
import {Popconfirm, Button, Row, Col, Icon} from 'hen'
import {getPermissions} from 'common/utils'


class Logistics extends Component {

    constructor(props) {
      super(props)

      const url = location.hash.split('?')[0].split('#')[1]
      this.check = getPermissions(url)
  }
    
    isDefault(id){
        const {setDefault} = this.props, context = this;
        setDefault({ logisticId: id }).then((res)=>{
            res.status === 1 && context.refs.dt.refresh()
        });
    }

    _getColumns(){
        const context = this;
        
        let columns = [{
            key: '0',
            title: '物流企业',
            dataIndex: 'companyName'
        }, {
            key: '1',
            title: '是否默认',
            dataIndex: 'defaults',
            render(val){
                return <span>{val ? '是' : '否'}</span>
            }
        }, {
            title: '操作',
            dataIndex: 'logisticId',
            render:(id, row) => {
                return <span>
                    {row.defaults == true ? <span>设为默认</span> :  
                     (this.check('设为默认') ? <Popconfirm title="确认设为默认物流公司" onConfirm={context.isDefault.bind(context, id)}>
                        <a href="javascript:;">设为默认</a>
                    </Popconfirm> : <span></span>)}
                </span>
            }
        }];
        return columns;
    }
    
    quickButton() {
        return <Row>
            {this.check('选择物流公司') ? <Col span='2'>
                <Link to={`/logistics/add`}>
                    <Button type="primary"><Icon type="plus-circle"/>选择物流公司</Button>
                </Link>
            </Col> : <span></span>}
        </Row>
     }

    
    render() {
        const { tableOptions} = this.props;
        return (
            <div>
                <DataTable bordered={true} columns={this._getColumns()}  {...tableOptions} quickButton={this.quickButton()} ref='dt' />
            </div>
        )
    }
}


Logistics.propTypes = {
    dataSource : React.PropTypes.array,
    action : React.PropTypes.func,
    loading : React.PropTypes.bool,
    params : React.PropTypes.object
}


export default Logistics;
