import React, {Component, PropTypes} from 'react';
import { Checkbox, Table, Input, Row, Col} from 'hen';
import uniq from 'lodash/uniq'
// import indexOf from 'lodash/indexOf'

const SPECTYPE = ['One', 'Two', 'Three', 'Four']

class Sku extends Component {

    constructor(props) {
        super(props)
        this.state = {
            specList: [],       //规格列表
            specDataList: [],   //选中的规格及值
            rowList: []         //sku列表
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.sourceData !== this.props.sourceData) {
            let eSpecList = [];
            nextProps.sourceData.length && nextProps.sourceData.forEach((val, index) => {
                if (val.enterpriseSpecList.length) {
                    let specValues = []
                    val.enterpriseSpecList.forEach((item) => {
                        specValues.push(item.specValue)
                    })
                    eSpecList.push({
                        name: val.name,
                        specId: val.specId,
                        specValues
                    })
                }
            })
            this.setState({
                specList: eSpecList
            })
        }
        if(!Object.is(nextProps.specState, this.props.specState)){
            let eSpecList = [], curSpec = [];
            let rowList = nextProps.specState.skuList ? nextProps.specState.skuList : []
            //获取规格列表
            SPECTYPE.forEach((val)=>{
                let specName = nextProps.specState['spec'+ val +'Name']
                let specValue = nextProps.specState['spec'+ val +'Value']
                let specId = nextProps.specState['specId'+ val]
                
                if(specName && specValue){
                     eSpecList.push({
                        name: specName,
                        specId,
                        specValues : specValue.split(',')
                    })
                }
            })
            //获取规格类型标示，比如‘one’，‘two’
            let curSpecType = SPECTYPE.slice(0, eSpecList.length)
            //循环遍历已选中规格值
            curSpecType.forEach((item, index)=>{
                let specChecked = []
                curSpec[index] = {key:item, items:[]}
                rowList.forEach((val, num)=>{
                    curSpec[index].items.push(val['spec'+ item +'Value'])
                })
                //去重规格值
                curSpec[index].items = uniq(curSpec[index].items)
            })
            console.log(rowList,curSpec);
            this.setState({
                specList: eSpecList,
                specDataList : curSpec,
                rowList
            })
        }
    }

    /**
     * 选中规格,组合列表数据
     * 
     * @param {any} num 第几个spec
     * @param {any} specTitle 规格名称
     * @param {any} specValue 选中的规格值
     * @param {any} e
     * @returns
    
     */
    changeSpecValue(num, specTitle, specValue, e) {
        let {specDataList, rowList} = this.state, curSpec = [];
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
            if(!specDataList[num].items.length){
                specDataList.splice(num, 1);
            }
        }
        console.log('11111',specDataList);
        curSpec = this.normalize(specDataList)
        //当修改销售价或库存数量后，再次添加sku时，要将选中的组合与之前修改的rowList里面元素进行合并，用新的curSpec做表格源数据
        if(curSpec.length > 1){ //新增时，当列表只有一行数据时，选择规格值时不需要合并之前的rowList数据
            rowList.forEach((val)=>{
                curSpec.every((item,index)=>{
                    if(val.key === item.key){
                        curSpec[index] = {...val, ...item}
                        return false 
                    }
                    return true
                })
            })
        }
        this.setState({
            specDataList,
            rowList : curSpec
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
    normalize(items) {
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
                if (next.items.length) {
                     next.items.forEach((n,index) => {
                        let o = {};
                        if (next.key) {
                            o[`spec${next.key}Value`] = n;
                            o.key = index;
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

    /**
     * 表格所需要的colunms
     */
    getColumns(){
        const {specList} = this.state, context = this;
        let columns = [], otherColumns = [];

        specList.forEach((item, num) => {
            columns.push({
                title: item.name,
                dataIndex: 'spec'+ SPECTYPE[num] +'Value',
                key: num,
                width: 150
            })
        })
        //
        otherColumns = [{
            title: '销售价',
            dataIndex: 'price',
            key: specList.length,
            width: 200,
            render(val, row) {
                return <Input type='text' size="small" onChange={(e) => {
                    context.setInputValue(e, row, 'price')
                }} defaultValue={val}/>
            }
        },{
            title: '库存数量',
            dataIndex: 'assignedStock',
            key: specList.length + 1,
            width: 200,
            render(val, row) {
                return <Input type='text' size="small" onChange={(e) => {
                    context.setInputValue(e, row, 'assignedStock')
                }} defaultValue={val}/>
            }
        }]
        columns = [...columns, ...otherColumns]
        return columns
    }

    /**
     * 设置input框里面的值
     * params cKey 为 price或assignedStock
     * params e
     */
    setInputValue(e, row, cKey){
        const {rowList} = this.state;
        let item = {}, selectItems = [], num = '', salePrice = 0, totalStock = '';
        rowList.forEach((val, index) => {
            // if(index !== rowList.length - 1){
            //     if(rowList[index].price < rowList[index + 1].price){
            //         salePrice = rowList[index].price
            //     }else{
            //         salePrice = rowList[index + 1].price
            //     }
            // }
            if(val.key !== row.key){
                //筛选不是当前行的数据
                selectItems.push(val)
            }else{
                //记录当前行下标num及元素值item
                num = index;
                item = val
            }
        })
        //修改当前cKey的值
        item[cKey] = e.target.value
        //将修改后的item重新插入selectItems数组，下标为num，保证与源数据顺序一致
        selectItems.splice(num, 0, item)
        this.setState({
            rowList: selectItems
        })
    }

    render(){
        const {specList, rowList} = this.state;
        console.log('render',rowList,specList);
        return <div>
            {
                specList.length ? specList.map((item, index) => {
                    return <Row><Col span='2'><label>{item.name + " "}: </label></Col>
                        {
                            item.specValues.length ? item.specValues.map((v, i) => {
                                // let status = specCheckedList.length && indexOf(specCheckedList[index].isDisabled, v) !== -1 ? true : false;
                                // let disabledFlag = specCheckedList[index]
                                return <Col span='2'><Checkbox key={`c-${i + item.specValues.length * index}`} onChange={this.changeSpecValue.bind(this, index, item.name, v) } defaultChecked={status} disabled={status}>{v}</Checkbox></Col>
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