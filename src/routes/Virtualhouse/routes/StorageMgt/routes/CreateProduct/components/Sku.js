import React, {Component, PropTypes} from 'react';
import { Checkbox, Table, Input, Row, Col,InputNumber} from 'hen';

class Sku extends Component {

    constructor(props) {
        super(props)
        this.state = {
            specList: [],       //规格列表
            specDataList: [],   //选中的规格及值
            rowList: []        //sku列表
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps !== this.props){
            this.setState({
                specList: nextProps.specList,
                specDataList: nextProps.specDataList,
                rowList: nextProps.rowList
            })
        }
    }

    /**
     * 表格所需要的colunms
     */
    getColumns(){
        const {specList} = this.state, context = this;
        const {specType, setInputValue} = this.props
        let columns = [], otherColumns = [];

        specList.forEach((item, num) => {
            columns.push({
                title: item.name,
                dataIndex: 'spec'+ specType[num] +'Value',
                key: num,
                width: 150
            })
        })
        
        otherColumns = [{
            title: '销售价',
            dataIndex: 'price',
            key: specList.length,
            width: 200,
            render(val, row) {
                return <InputNumber min = {0.01} max = {9999999} step = {0.01} size="large" onChange={(e) => {
                     setInputValue(e, row, 'price')
                }} defaultValue = {val == null || undefined ? 0.01 : val}  />
                // return <Input type='text' size="small" onChange={(e) => {
                //     setInputValue(e, row, 'price')
                // }} />
            }
        },{
            title: '库存数量',
            dataIndex: 'assignedStock',
            key: specList.length + 1,
            width: 200,
            render(val, row) {
                return <InputNumber  min = {0} max = {9999999} size="large" onChange={(e) => {
                    setInputValue(e, row, 'assignedStock')
                }} defaultValue = {val == null || undefined ? 0 : val}   />
            }
        }]
        columns = [...columns, ...otherColumns]
        return columns
    }

    /**
     * 禁用并选中spu带出来的规格值
     * 
     * params specData 已选中的一类规格值
     * params 某一个规格值
     */
    getfilterStatus(specData, v){
        let status = false, disabledFlag = false;
        specData && specData.items && specData.items.every((val)=>{
            let flag = val.indexOf('_d') !== -1;
            let value = flag ? val.split('_d')[0] : val
            if(value === v){
                disabledFlag = flag
                status = true
                return false
            }
            return true
        })
        return {
            status,
            disabledFlag
        }
    }
    
    render(){
        const {specList, rowList, specDataList} = this.state, context = this;
        const {changeSpecValue} = this.props;
        return <div>
            {
                specList.length ? specList.map((item, index) => {
                    return <Row><Col span='2'><label>{item.name + " "}: </label></Col>
                        {
                            item.specValues.length ? item.specValues.map((v, i) => {
                                let spec = context.getfilterStatus(specDataList[index], v);
                                return <Col span='2'><Checkbox key={`c-${i + item.specValues.length * index}`} onChange={(e)=>{
                                    changeSpecValue(index, item.name, item.specId, v, e)
                                }} checked={spec.status} disabled={spec.disabledFlag}>{v}</Checkbox></Col>
                            }) : ''
                        }
                    </Row>
                }) : '暂无数据,请选择类目'
            }
            {
                 specList.length ? <Row><Col span='2'><span>SKU表: </span></Col><Col span='20'><Table size="small" dataSource={rowList} columns={this.getColumns()} pagination={false} /></Col></Row> : ''
            }
        </div>
    }
}

Sku.propTypes = {

}

export default Sku