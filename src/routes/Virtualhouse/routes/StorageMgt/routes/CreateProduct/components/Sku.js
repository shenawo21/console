import React, {Component, PropTypes} from 'react';
import { Checkbox, Table, Input, Row, Col} from 'hen';

const SPECTYPE = ['One', 'Two', 'Three', 'Four']

class Sku extends Component {

    constructor(props) {
        super(props)
        this.state = {
            specList: [],
            specDataList: [],
            rowList: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.sourceData != this.props.sourceData) {
            let eSpecList = [];
            console.log(nextProps.sourceData);
            nextProps.sourceData.length && nextProps.sourceData.forEach((val, index) => {
                if (val.enterpriseSpecList.length) {
                    let specValueList = []
                    val.enterpriseSpecList.forEach((item) => {
                        specValueList.push(item.specValue)
                    })
                    eSpecList.push({
                        name: val.name,
                        specId: val.specId,
                        specValues: specValueList
                    })
                }
            })
            this.setState({
                specList: eSpecList
            })
        }
    }

    changeSpecValue(num, specTitle, specValue, e) {
        let {specDataList, rowList, specList} = this.state, curSpec = [];
        let SpecTypeNum = specList.length;
        if (e.target.checked) {
            if (!specDataList[num]) {
                specDataList[num] = {
                    key: SPECTYPE[num],
                    items: [specValue]
                }
            } else {
                specDataList[num].items.push(specValue)
            }
        } else {
            specDataList[num].items = specDataList[num].items.filter((val) => {
                return val !== specValue
            })
        }
        this.setState({
            rowList : this._normalize(specDataList)
        })
    }

    /**
   * 规格算法：取第一项的items为基础数据、进行递归组合
   * @param  {Array} items，例如：[{key:One,items:[1,2]}, {key:Two,items:['L','X','M']}]
   * @return {Array} 组合后的数据，如下
   *        例如： [{"specOneValue":1,"specOneValue":"L"},{"specOneValue":1,"specOneValue":"X"}
   *               {"specOneValue":1,"specOneValue":"M"},{"specOneValue":2,"specOneValue":"L"}
   *               {"specOneValue":2,"specOneValue":"X"},{"specOneValue":2,"specOneValue":"M"}]
   */
    _normalize(items) {
        if (items.length == 0) return [];

        const runner = (base, other) => {
            let result = { items: [] };
            const next = other[0] || { items: [] };
            if(base && base.items && base.items.length){
                base.items.forEach((b,index) => {
                    if (!next.items.length) {
                        let o = {};

                        if (base.key) {
                            o[`spec${base.key}Value`] = b;
                            o.key = index;
                        }
                        result.items.push(o)
                    }
                    next.items.forEach((n, num) => {
                        let o = {};

                        if (base.key) {
                            o[`spec${base.key}Value`] = b;
                        }
                        if (next.key) {
                            o[`spec${next.key}Value`] = n;
                            o.key = next.items.length * index + num
                        }

                        if (typeof b == 'object') {
                            o = {...b, ...o}
                        }

                        result.items.push(o)
                    })

                })
            }else{
                console.log(11212,next);
                if (next.items.length) {
                     next.items.forEach(n => {
                        let o = {};
                        if (next.key) {
                            o[`spec${next.key}Value`] = n;
                        }
                        result.items.push(o)
                    })
                }
            }
            
            const nextArray = other.slice(1);
            //已每次遍历的结果做下次遍历的条件，结果没有key值，会直接跳到next.items进行遍历，然后将base与next遍历值进行合并
            return nextArray.length && nextArray[0].items && nextArray[0].items.length ? runner(result, nextArray) : result.items;
	    }
        return runner(items[0], items.slice(1))
    }


    getColumns(){
        const {specList} = this.state;
        let columns = [], otherColumns = [];

        specList.forEach((item, num) => {
            columns.push({
                title: item.name,
                dataIndex: 'spec'+ SPECTYPE[num] +'Value',
                key: num,
                width: 150
            })
        })
        otherColumns = [{
            title: '销售价',
            dataIndex: 'price',
            key: specList.length,
            width: 200,
            render(val) {
                return <Input type='text' size="small" onChange={(e) => {

                } } defaultValue={val}/>
            }
        },{
            title: '库存数量',
            dataIndex: 'assignedStock',
            key: specList.length + 1,
            width: 200,
            render(val) {
                return <Input type='text' size="small" onChange={(e) => {

                } } defaultValue={val}/>
            }
        }]
        columns = [...columns, ...otherColumns]
        console.log(   columns );
        return columns
    }

    getDataSource(){
        const {rowList} = this.state;
        let dataSource = [];
    }

    render(){
        const {specList, rowList} = this.state;

        return <div>
            {
                specList.length ? specList.map((item, index) => {
                    return <Row><Col span='2'><label>{item.name + " "}: </label></Col>
                        {
                            item.specValues.length ? item.specValues.map((v, i) => {
                                return <Col span='2'><Checkbox key={`c-${i + item.specValues.length * index}`} onChange={this.changeSpecValue.bind(this, index, item.name, v) }>{v}</Checkbox></Col>
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