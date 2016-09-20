import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Row, Col, Button, Modal,message,InputNumber} from 'hen';
import Sku from "./Sku"
import SearchSpu from "./SearchSpu"
import Form from 'components/Form';
import uniq from 'lodash/uniq'

const SPECTYPE = ['One', 'Two', 'Three', 'Four']

class CreateProduct extends Component {
    constructor(props){
        super(props);

        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.changeSpecValue = this.changeSpecValue.bind(this)
        this.setInputValue = this.setInputValue.bind(this);
        this.state = {
            visible : false,    //对话框是否显示
            selectItem : null,  //搜索选中元素
            specList: [],       //规格列表
            specDataList: [],   //选中的规格及值
            rowList: [],         //sku列表
            totalStock : 0,     //库存
            salePrice : 0,      //
            submitFlag : '',     //提交数据时,skuList价格或库存是否为空
            market:''
        }
    }


    // shouldComponentUpdate(nextProps, nextState){
    //     if(nextState.visible !== this.state.visible){
    //         return false
    //     }else{
    //         return true
    //     }
    // }

    _getFormItems() {
        let config = {}, context = this;
        const {cateList, brandList, getSpecByCateList} = this.props;
        let { selectItem, specList, specDataList, rowList, totalStock, salePrice, categoryId} = this.state;
	    config.formItems = [{
            label: "SPU：",
            name: "spuId",
            disabled: 'disabled',
            custom(getCustomFieldProps) {
                return <Row>
                    <Col span='12'><input type="text" className="ant-input ant-input-lg" {...getCustomFieldProps('spuId') } /></Col><Col span='6'><Button onClick={context.showModal}>选择已有SPU</Button></Col>
                </Row>
            }
        }, {
            label: "商品标题：",
            name: "title",
            required: true,
            rules: [{ required: true, message: '标题不能为空' }],
            input: {
                placeholder: "请输入商品标题",
                disabled: selectItem ? true : false
            }
        }, {
            label: "商品类目：",
            name: "categoryId",
            wrapperCol: {span: 15},
            required: true,
            cascader: {
                options: cateList,
                placeholder: '请选择所属类目',
                changeOnSelect: true,
                expandTrigger: 'click',
                disabled: selectItem ? true : false,
                displayRender(label) {
                    return label[label.length - 1];
                }
            },
            fieldOptions: {
                onChange:function(value) {
                    let val = value.slice(0)
                    getSpecByCateList({categoryCode: val.pop()})
                }
            }
        }, {
            label: "商品品牌：",
            name: "brandId",
            select: {
                placeholder: '请选择商品品牌',
                optionValue: brandList,
                disabled: selectItem ? true : false
            }
        }, {
            label: "市场价(元)：",
            name: "marketPrice",
            infoLabel: <span>价格必须是0.01～9999999之间数字</span>,
            rules: [{
                validator(rule, value, callback) {
                    context.setState({market:value})
                    if(value < context.state.salePrice) {
                        callback(new Error('市场价必须大于或等于销售价！')); 
                    } else {
                        callback();
                    }
                }
            }],
            inputNumber: {
                placeholder: "请输入市场价",
                disabled: selectItem ? true : false,
                step:0.01,
                min:0,
                max:9999999
            }
        }, {
            label: "销售价(元)：",
            name: "advicePrice",
            required: true,
            //rules: [{ required: true, message: '销售价不能为空' }],
            infoLabel: <span>价格必须是0.01～9999999之间数字，不能大于市场价</span>,
            input: {
                placeholder: "请输入销售价",
                disabled:true
            }
        }, {
            label: "库存数量：",
            name: "total",
            required: true,
            //rules: [{ required: true, message: '库存数量不能为空' }],
            infoLabel: <span>必须是0～999999999之间整数</span>,
            input: {
                placeholder: "请输入库存数量",
                disabled:true
            }
        }, {
            label: "商品规格：",
            required: true,
            wrapperCol: {span: 15},
            // rules: [{ required: true, message: '库存数量或销售价不能为空'}],
            name : 'skuData',
            custom(fieldProps) {
                return <Sku specList={specList} specDataList={specDataList} rowList={rowList} setInputValue={context.setInputValue} changeSpecValue={context.changeSpecValue}  specType={SPECTYPE} {...fieldProps('skuData')}></Sku>
            }
        }];
        config.initValue = {
            spuId: null,
            title: null,
            categoryId: null,
            brandId: null,
            marketPrice: null,
            advicePrice: null,
            total: '0.01',
            skuData : {}
        }

        if( selectItem ){
            //阻止selectItem的状态被串改
            selectItem = {...selectItem}
            config.initValue = selectItem;
            let num = selectItem.categoryId.length / 2, categoryCode = []
            for(var i = 0; i < num; i++){
                categoryCode.push(selectItem.categoryId.substring(0, 2*(i+1)))
            }
            config.initValue.categoryId = categoryCode
        }else{
            config.initValue.spuId = "";
        }
       
        if(salePrice){
            config.initValue.advicePrice = salePrice
        }
        if(totalStock){
            config.initValue.total = totalStock
        }
        config.initValue.skuData = this.setSkuConfig(specDataList, rowList, selectItem)
        return config;
    }

    setSkuConfig(specDataList, rowList, selectItem){
        let skuData = {skuList:[]}
        specDataList.forEach((val,index)=>{
            skuData['specId'+SPECTYPE[index]] = val.specId;
            skuData['spec'+ val.key +'Value'] = val.items.map((item) => {
                return item.indexOf('_d') !== -1 ? item.split('_')[0] : item
            }).join(',')
        })
        skuData.skuList = rowList.map((val, num)=>{
            let curSku = {}
            SPECTYPE.forEach((item)=>{
                curSku['spec'+ item +'Value'] = val['spec'+ item +'Value']
                if(selectItem && selectItem['specId'+ item] && num == 0){
                    skuData['specId'+ item] = selectItem['specId'+ item]
                }
            })
            curSku = {
                ...curSku,
                price : val.price,
                assignedStock : val.assignedStock
            }
            return curSku
        })
        return skuData
    }

    showModal() {
        const {tableOptions} = this.props;
        const {action, pagination} = tableOptions
        this.setState({
            visible: true
        });
        action({pageNumber : pagination.current})
    }

    handleOk() {
        //selectItem获取选中spu数据
        const {getSpecByCateList} = this.props;
        const searchSpuState = this.refs.searchList
        let selectItem = null;
        if(searchSpuState.state){
            selectItem = searchSpuState.state.items
        }
        if(selectItem){
            //选着spu时，先重置表格
            this.refs.form && this.refs.form.resetFields();
            getSpecByCateList({categoryCode: selectItem.categoryId})
            this.setState({
                selectItem,
                visible: false
            });
        }else{
            this.setState({
                specList: [],       
                specDataList: [],   
                rowList: [],
                totalStock : 0,
                salePrice : 0,
                selectItem,
                visible: false
            });
        }
    }

    handleCancel(e) {
        this.setState({
            visible: false
        });
    }

    /**
     * 根据类目获取规格列表数据
     * 
     * @param {any} nextProps
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.specListResult !== this.props.specListResult) {
            let eSpecList = [], {selectItem} = this.state;
            selectItem = {...selectItem}
            nextProps.specListResult.length && nextProps.specListResult.forEach((val, index) => {
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
            if(selectItem){
                this.setSkuData(selectItem, eSpecList);
            }else{
                this.setState({
                    specList: eSpecList
                })
            }
        }
    }

    /**
     * 搜索选中元素确定后，设置sku相关数据
     * 
     * @param {any} specState
     */
    setSkuData(specState, specList){
        let eSpecList = [], curSpec = [], {totalStock, salePrice} = this.state;
        let rowList = specState.skuList ? specState.skuList : []
        //获取已选规格列表
        if(specState){
            SPECTYPE.forEach((val)=>{
                let specName = specState['spec'+ val +'Name']
                let specValue = specState['spec'+ val +'Value']
                let specId = specState['specId'+ val]
                
                if(specName && specValue){
                    eSpecList.push({
                        name: specName,
                        specId,
                        specValues : specValue.split(',')
                    })
                }
            })
            //获取规格类型标示，比如‘one’，‘two’
            let curSpecType = SPECTYPE.slice(0, eSpecList.length);
            totalStock = 0;
            if(curSpecType.length){
                //循环遍历已选中规格值
                curSpecType.forEach((item, index)=>{
                    let specChecked = []
                    curSpec[index] = {key:item, items:[], specId : eSpecList[index].specId}
                    rowList.forEach((val, num)=>{
                        //计算库存和获取sku最小售价
                        if(index == 0){
                            let curPrice = Number(val.price || 0) || 0
                            totalStock += Number(val.assignedStock || 0) || 0
                            if(num > 0){
                                //上一个price值与当前price对比，小的再赋给saleprice，循环遍历
                                salePrice = salePrice > curPrice ? curPrice : salePrice
                            }else{
                                salePrice = curPrice
                            }
                        }
                        curSpec[index].items.push(val['spec'+ item +'Value']+'_d')
                    })
                    //去重规格值
                    curSpec[index].items = uniq(curSpec[index].items)
                })
            }else{
                salePrice = 0
            }
        }else{
            totalStock = 0
            salePrice = 0
        }
        
        this.setState({
            specList,
            specDataList : curSpec,
            rowList,
            salePrice,
            totalStock
        })
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
    changeSpecValue(num, specTitle, specId, specValue, e) {
        let {specDataList, rowList, totalStock, salePrice, submitFlag} = this.state, curSpec = [];
        if (e.target.checked) {
            if (!specDataList[num]) {
                specDataList[num] = {
                    key: SPECTYPE[num],
                    items: [specValue],
                    specId
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
        curSpec = this.normalize(specDataList)
        //当修改销售价或库存数量后，再次添加sku时，要将选中的组合与之前修改的rowList里面元素进行合并，用新的curSpec做表格源数据
        if(curSpec.length > 1){ //新增时，当列表只有一行数据时，选择规格值时不需要合并之前的rowList数据
            totalStock = 0
            submitFlag = false
            rowList.forEach((val, num) => {
                !val.specOneValue && delete rowList[num].specOneValue
                !val.specTwoValue && delete rowList[num].specTwoValue
                !val.specThreeValue && delete rowList[num].specThreeValue
                !val.specFourValue && delete rowList[num].specFourValue
                curSpec.every((item,index) => {
                    if(val.specOneValue == item.specOneValue && val.specTwoValue == item.specTwoValue && val.specThreeValue == item.specThreeValue && val.specFourValue == item.specFourValue){
                        let curPrice = Number(val.price || 0) || 0
                        totalStock += Number(val.assignedStock || 0) || 0
                        if(num > 0){
                            //上一个price值与当前price对比，小的再赋给saleprice，循环遍历
                            salePrice = salePrice > curPrice ? curPrice : salePrice
                        }else{
                            salePrice = curPrice
                        }
                        curSpec[index] = {...val, ...item}
                        if(!curSpec[index].price || !curSpec[index].assignedStock){
                            submitFlag = true
                        }
                        return false 
                    }
                    return true
                })
            })
        }
        this.setState({
            specDataList,
            rowList : curSpec,
            totalStock,
            salePrice,
            submitFlag
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
                            o[`spec${base.key}Value`] = b.indexOf('_d') != -1 ? b.split('_')[0] : b;
                            o.key = index;
                        }
                        result.items.push(o)
                    }
                    next.items.forEach((n, num) => {
                        let o = {};
                        if (base.key) {
                            o[`spec${base.key}Value`] = b.indexOf('_d') != -1 ? b.split('_')[0] : b;
                        }
                        if (next.key) {
                            o[`spec${next.key}Value`] = n.indexOf('_d') != -1 ? n.split('_')[0] : n;
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
                            o[`spec${next.key}Value`] = n.indexOf('_d') != -1 ? n.split('_')[0] : n;
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
     * 设置input框里面的值
     * params cKey 为 price或
     * params e
     */
    setInputValue(e, row, cKey){
        let {rowList, totalStock, salePrice, submitFlag} = this.state, curValue = e.target.value || 0;
        const context = this;
        totalStock = 0
        submitFlag = false
        rowList.forEach((val, index) => {
            if((val.key !== undefined && val.key == row.key) || (val.skuId && val.skuId == row.skuId)){
                //每次修改当前input值，rowList状态会变更，price或assignedStock会保存上次修改状态
                rowList[index][cKey] = Number(curValue) || 0
            }
            totalStock = context.getStock(rowList[index], totalStock)
            salePrice = context.getPrice(rowList[index], index, salePrice)
            if(!rowList[index].assignedStock || !rowList[index].price){
                submitFlag = true
            }
        })
        this.setState({
            rowList,
            totalStock,
            salePrice,
            submitFlag
        })
    }

    getStock(val, totalStock){
        totalStock += Number(val.assignedStock || 0) || 0
        return totalStock
    }

    getPrice(val, index, salePrice){
        //计算库存和获取sku最小售价
        let curPrice = val.price
        if(index > 0){
            //上一个price值与当前price对比，小的再赋给saleprice，循环遍历
            salePrice = salePrice > curPrice ? curPrice : salePrice
        }else{
            salePrice = curPrice
        }
        return salePrice
    }

    render() {
        let {formOptions, tableFormOptions, tableOptions} = this.props;
        const {selectItem} = this.state;
        return (
            <div>
                <Form horizontal  items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset} ref='form' />
                <Modal visible={this.state.visible}
                    closable={false}
                    width={1020}
                    onOk={this.handleOk} onCancel={this.handleCancel}>
                    <SearchSpu tableFormOptions={tableFormOptions} tableOptions={tableOptions} selectItem={selectItem} ref='searchList'></SearchSpu>
                </Modal>
            </div>
        )
    }
}


CreateProduct.propTypes = {

    loading: React.PropTypes.bool,
    params: React.PropTypes.object
}


export default CreateProduct;
