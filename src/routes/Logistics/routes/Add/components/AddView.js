import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';
import {Transfer, Button} from 'hen';

class Add extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.saveData = this.saveData.bind(this);
        this.state = {
            sourceData: [],
            targetKeys: [],
            cheackLogisticsList : [], //选中的物流企业
            distData : [],
            Edit:false,   //移动操作
        }
    }

    componentWillReceiveProps(nextProps){
        let sourceData = [], targetKeys = [], {distData} = this.state;
        if(nextProps.distData){
            distData = nextProps.distData.map((val, index) => {
                return {
                    companyCode  : val.companyCode,
                    title : val.companyName
                }
            })
        }

        if(nextProps.sourceData){
            sourceData = nextProps.sourceData.map((val, index) => {
                if(distData){
                    distData.every((item, num)=>{
                        if(item.companyCode == val.companyCode){
                            targetKeys.push(index)
                            return false
                        }
                        return true
                    })
                }
                return {
                    key : index,
                    companyCode  : val.companyCode,
                    title : val.companyName
                }
            })
        }

        this.setState({
            sourceData,
            targetKeys,
            distData
        })
    }

    handleChange(targetKeys) {
        const {sourceData} = this.state;
        this.checkedItem(sourceData, targetKeys);
    }

    saveData(){
        const {addLogistic,distData} = this.props;
        const {cheackLogisticsList,Edit} = this.state;
        let distDataItem = distData && distData.map(c => {
            return {
                 companyCode : c.companyCode,
                 companyName : c.companyName,
                 defaults : c.defaults
            }
        })
        let enLogisticsList = []
        if (Edit == false) {
             enLogisticsList = distDataItem
        } else {
            enLogisticsList = cheackLogisticsList
        }
        addLogistic({enLogisticsList}).then((res)=>{
            if(res.status === 1){
                setTimeout(() => {
                    history.go(-1)
                }, 50);
            }
        })
    }

    checkedItem(sourceData, targetKeys){
        this.setState({Edit:true})
        let enLogisticsLists = [];
        const {distData} = this.props
        let defaultArray = distData.filter((item,index) => {
             return item.defaults == true            
        })
        let defaultCode = defaultArray.length > 0 ? defaultArray[0].companyCode : ''
        targetKeys.forEach((item, num)=>{
            sourceData.map((val, index)=>{
                if(index === item){
                    enLogisticsLists.push({
                        companyCode : val.companyCode,
                        companyName : val.title,
                        defaults : defaultCode == val.companyCode ? true : false
                    })
                    return false
                }
                return true
            })
        })
        this.setState({
            cheackLogisticsList:enLogisticsLists,
            targetKeys
        })
    }

    render() {
        const {sourceData, targetKeys} = this.state;
        const title = ['选择物流公司', '选中的物流公司'];
        const notFoundContent = '暂无数据';
        return (
            <div>
                <Transfer
                    titles={title}
                    listStyle={{
                        width: 300,
                        height: 510,
                    }}
                    notFoundContent={notFoundContent} 
                    dataSource={sourceData}
                    targetKeys={targetKeys}
                    onChange={this.handleChange}
                    render={item => {
                        return item.title
                    }} />
                <div style={{marginTop : "10px"}}>
                    <Button type='primary' onClick={this.saveData}>保存</Button>
                </div>
            </div>
        )
    }
}

Add.propTypes = {
    dataSource : React.PropTypes.array,
    distData : React.PropTypes.array,
    setDefault : React.PropTypes.func,
    addLogistic : React.PropTypes.func
}

export default Add;
