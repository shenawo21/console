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
        this.handleReset = this.handleReset.bind(this)
        this.state = {
            visible : false,    //对话框是否显示
            selectItem : null,  //搜索选中元素
            specList: [],       //规格列表
            specDataList: [],   //选中的规格及值
            rowList: [],         //sku列表
            totalStock : 0,     //库存
            salePrice : 0.01,      //SPU中销售价
            chasePrice:0.01,      //spu中采购价
            submitFlag : '',     //提交数据时,skuList价格或库存是否为空
            market:'',
            chooseSpu:false,
            flag:false,
            hasSpec:false,
            chooseMenu:false
        }
    }

    _getFormItems() {
        let config = {}, context = this;
        const {cateList, getSpecByCateList,id} = this.props;
        let { selectItem, specList, specDataList, rowList, totalStock, salePrice,chasePrice, categoryId,flag,hasSpec,chooseMenu,chooseSpu} = this.state;
        let isEdit = chooseMenu == true && hasSpec == false ? false : true
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
                    let val = value.slice(0).pop();
                    if(val){
                        //根据类目获取sku规格值
                        getSpecByCateList({categoryCode: val}).then(function(res){
                            context.setState({chooseMenu:true})
                            let valueArray = res.data && res.data.filter((item) => {
                                    return item.enterpriseSpecList.length > 0
                                })
                            if(valueArray.length >0) {
                                context.setState({hasSpec:true})
                            } else {
                                context.setState({hasSpec:false}) 
                            }
                        })
                    }else{
                        context.setState({
                            hasSpec:false,
                            chooseMenu:false,
                            specList : []
                        })
                    }
                    
                }
            }
        }
        , {
            label: "市场价(元)：",
            name: "marketPrice",
            required: true,
            infoLabel: <span className = 'gray'>零售用，价格必须是0.01~9999999之间的数字</span>,
            rules: [{
                    validator(rule, value, callback) { 
                        if (!value && value !== 0) {
                            callback(new Error('请输入0.01~9999999之间值!'));
                        } else if (value < 0.01 || value > 9999999) {
                            callback(new Error('请输入0.01~9999999之间值!'));
                        } else {
                            callback();
                        }
                    }
                }],
            inputNumber: {
                step:0.01,
                min:0.01,
                max:9999999
            }
        }, 
        // {
        //     label: "采购价(元)：",
        //     name: "purchasePrice",
        //     wrapperCol: {span: 15},
        //     required: true,
        //     // rules: [{ required: true, message: '采购价不能为空' }],
        //     infoLabel: <span className = 'gray'>取sku中采购价最低值，无sku时可手动输入，显示在商城前台</span>,
        //     inputNumber: {
        //         disabled:  isEdit,
        //         step:0.01,
        //         min:0.01,
        //         max:9999999
        //     }
        // },
         {
            label: "销售价(元)：",
            name: "advicePrice",
            wrapperCol: {span: 15},
            required: true,
            //rules: [{ required: true, message: '销售价不能为空' }],
            infoLabel: <span>价格必须是0.01～9999999之间数字，不能大于市场价</span>,
            inputNumber: {
                disabled: isEdit,
                step:0.01,
                min:0.01,
                max:9999999
            }
        }, {
            label: "库存数量：",
            name: "total",
            required: true,
            //rules: [{ required: true, message: '库存数量不能为空' }],
            infoLabel: <span>必须是0～999999999之间整数</span>,
            input: {
                placeholder: "请输入库存数量",
                disabled:isEdit
            }
        }, {
            label: "商品规格：",
            required: true,
            wrapperCol: {span: 20},
            infoLabel:<span className = 'gray'>根据所选类目自动带出该类目下所关联的规格</span>,
            // rules: [{ required: true, message: '库存数量或销售价不能为空'}],
            name : 'skuData',
             custom(fieldProps, name) {
                return <Sku form = {name.props.form} specList={specList} editId={id} specDataList={specDataList} rowList={rowList} setInputValue={context.setInputValue} changeSpecValue={context.changeSpecValue}  specType={SPECTYPE} {...fieldProps('skuData')}></Sku>
            }
        }];
        config.initValue = {
            spuId: null,
            title: null,
            categoryId: null,
            marketPrice: '',
            purchasePrice:'',
            advicePrice: '',
            total: '',
            skuData : {}
        }
        //选择spu或编辑时，有selectItem值
        if( selectItem ){
            //阻止selectItem的状态被串改
            selectItem = {...selectItem}
            config.initValue = selectItem;
            let num = selectItem.categoryId.length / 2, categoryCode = []
            for(var i = 0; i < num; i++){
                categoryCode.push(selectItem.categoryId.substring(0, 2*(i+1)))
            }
            config.initValue.categoryId = categoryCode
            //编辑或spu选择时，sku累加总库存
            config.initValue.total = totalStock || selectItem.total || ''
        }else {
            config.initValue.spuId = ""
            //新增时，sku累加总库存
            config.initValue.total = totalStock || ''
        }
       
        if(salePrice !== 'undefined'){
            config.initValue.advicePrice = salePrice == 0 ? 0.01 :salePrice
        }
        //采购价
        if(chasePrice !== 'undefined'){
            config.initValue.purchasePrice = chasePrice == 0 ? 0.01 :chasePrice
        }
        if(totalStock!== 'undefined'){
            config.initValue.total = totalStock 
        }
        config.initValue.skuData = this.setSkuConfig(specDataList, rowList, selectItem)
        return config;
    }
    /**
     * 设置form表单中特殊的item数据
     */
    setOtherFormItemInfo(datas){
        const {spuId, categoryId, thumbImage, detail} = datas;
        const {getSpecBySpu, queryChntBrandNameList, photoImg, params} = this.props;
        //根据spu获取规格
        getSpecBySpu({spuId})

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
                price : val.price || 0.01,
                stock : val.stock || 0,
                purchasePrice : val.purchasePrice || 0,
                // skuId : val.skuId || '',
                // spuId : val.skuId ? selectItem ? selectItem.spuId : '' : '',
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
        const {getSpecBySpu, getSpecByCateList} = this.props;
        //const {getSpecByCateList} = this.props;
        const searchSpuState = this.refs.searchList
        let selectItem = null;
        if(searchSpuState.state){
            this.setState({chooseSpu:true})
            selectItem = searchSpuState.state.items
            if(selectItem && selectItem.specOneName == null) {
                this.setState({flag:false})

            } else {
                this.setState({flag:true})
            }
        }
        if(selectItem){
            //选着spu时，先重置表格
            this.refs.form && this.refs.form.resetFields();
            this.setOtherFormItemInfo({
                spuId : selectItem.spuId,
                categoryId : selectItem.categoryId,
            })
            this.setState({
                selectItem,
                visible: false
            });
        }else{
            this.setState({
                specList: [],       
                specDataList: [],   
                rowList: [],
                totalStock : '',
                salePrice :'',
                chasePrice : '',
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
            selectItem && this.setSkuData(selectItem);
            this.setState({
                specList: eSpecList
            })
        }
    }

    /**
     * 搜索选中元素确定后，设置sku相关数据
     * 
     * @param {any} specState
     */
    setSkuData(specState, specList){
        let eSpecList = [], curSpec = [], {totalStock, salePrice, chasePrice, ...other} = this.state,context = this;
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

                            let curBatchPrice = Number(val.purchasePrice || 0) || 0
                            totalStock += Number(val.stock || 0) || 0
                            salePrice = context.getPrice(curPrice, num, salePrice)
                            chasePrice = context.getPrice(curBatchPrice, num, chasePrice)

                        }
                        curSpec[index].items.push(val['spec'+ item +'Value']+'_d')
                    })
                    //去重规格值
                    curSpec[index].items = uniq(curSpec[index].items)
                })
            }else{
                salePrice = '',
                chasePrice = ''
            }
        }else{
            totalStock = '',
            salePrice = '',
            chasePrice = ''
        }
        this.setState({
            specList,
            specDataList : curSpec,
            rowList,
            salePrice,
            chasePrice,
            totalStock,
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
        let {specDataList, rowList, totalStock, salePrice, submitFlag,specList,chasePrice} = this.state, curSpec = [],context = this;
        if (e.target.checked == true) {
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
        }
        let newArray = specDataList.filter((val) => {
            return val.items.length > 0
        })
        let rowData = (newArray && newArray.length) == (specList && specList.length) ? specDataList : ''
        curSpec = this.normalize(rowData)
        //当修改销售价或库存数量后，再次添加sku时，要将选中的组合与之前修改的rowList里面元素进行合并，用新的curSpec做表格源数据
        if(curSpec.length >= 1){ //新增时，当列表只有一行数据时，选择规格值时不需要合并之前的rowList数据
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
                        let curBatchPrice = Number(val.purchasePrice || 0) || 0
                        totalStock += Number(val.stock || 0) || 0
                        salePrice = context.getPrice(curPrice, num, salePrice)
                        chasePrice = context.getPrice(curBatchPrice, num, chasePrice)
                        curSpec[index] = {...val, ...item}
                        if(!curSpec[index].price || !curSpec[index].purchasePrice || !curSpec[index].stock){
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
            chasePrice,
            submitFlag
        })
    }

    /**
     * 规格算法：取第一项的items为基础数据、进行递归组合
     * @param  {Array} items，例如：[{key:One,items:[1,2]}, {key:Two,items:['L','X','M']}]
     * @return {Array} 组合后的数据，如下
     *        例如： [{"specOneValue":1,"specTwoValue":"L"},{"specOneValue":1,"specTwoValue":"X"}
     *               {"specOneValue":1,"specTwoValue":"M"},{"specOneValue":2,"specTwoValue":"L"}
     *               {"specOneValue":2,"specTwoValue":"X"},{"specOneValue":2,"specTwoValue":"M"}]
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
        let {rowList, totalStock, salePrice, submitFlag,chasePrice} = this.state, curValue = e;
        const context = this;
        totalStock = 0
        submitFlag = false
        rowList.forEach((val, index) => {
            if((val.key !== undefined && val.key == row.key) || (val.skuId && val.skuId == row.skuId)){
                //每次修改当前input值，rowList状态会变更，price或assignedStock会保存上次修改状态
                rowList[index][cKey] = Number(curValue) || 0
            }
            totalStock = context.getStock(rowList[index], totalStock)
            salePrice = context.getPrice(val.price, index, salePrice)
            chasePrice = context.getPrice(val.purchasePrice, index, chasePrice)
            if(!rowList[index].stock || !rowList[index].price || !rowList[index].purchasePrice){
                submitFlag = true
            }
        })

        this.setState({
            rowList,
            totalStock,
            salePrice,
            submitFlag,
            chasePrice
        })
    }

    getStock(val, totalStock){
        totalStock += Number(val.stock || 0) || 0
        return totalStock
    }

    getPrice(val, index, salePrice){
        //计算库存和获取sku最小售价
        let curPrice = val || 0
        if(index > 0){
            //上一个price值与当前price对比，小的再赋给saleprice，循环遍历
            salePrice = salePrice > curPrice ? curPrice : salePrice
        }else{
            salePrice = curPrice
        }
        return salePrice
    }
    /**
     * (筛选表单重置)
     */
    handleReset() {
       const {id} = this.props
        if (id) {
            this.context.router.replace('/virtualhouse')
        } else {
            this.context.router.replace('/virtualhouse/storageMgt')
        }
    }
    render() {
        let {formOptions, tableFormOptions, tableOptions,buttonOption = {}} = this.props;
        const {selectItem,flag,hasSpec,chooseMenu,chooseSpu} = this.state;
        let { ok, cal} = buttonOption;
        let creatBottom = {ok:'提交',cal:'重置'}
        let editBottom = {ok:'提交',cal:'返回'}
        return (
            <div>
                <Form horizontal  items={this._getFormItems()} onSubmit={formOptions.handleSubmit} buttonOption={{ok:'提交',cal:'返回'}} onReset={this.handleReset} ref='form' />
                <Modal visible={this.state.visible}
                    closable={false}
                    width={1020}
                    onOk={this.handleOk} onCancel={this.handleCancel}>
                    <SearchSpu tableFormOptions={tableFormOptions} flag = {flag} hasSpec = {hasSpec} tableOptions={tableOptions} selectItem={selectItem} ref='searchList'></SearchSpu>
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
