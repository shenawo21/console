import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';
import {Transfer, Button} from 'hen';

class Logistics extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.saveData = this.saveData.bind(this);
        this.state = {
            sourceData: [],
            targetKeys: [],
            enLogisticsList : [] //选中的物流企业
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.sourceData || nextProps.distData){
            let sourceData = [], distData = [];
            if(nextProps.sourceData){
                sourceData = nextProps.sourceData.map((val, index) => {
                    if(nextProps.distData){
                       distData = nextProps.distData.map((item, num)=>{
                           if(item.companyCode == val.companyCode){
                               return index
                           }
                       })
                    }
                    return {
                        key : index,
                        code  : val.companyCode,
                        title : val.companyName
                    }
                })
            }

            this.setState({
                sourceData,
                targetKeys : distData
            })
        }
    }

    handleChange(targetKeys) {
        const {sourceData} = this.state;
        this.checkedItem(sourceData, targetKeys);
    }

    saveData(){
        const {addLogistic} = this.props;
        const {enLogisticsList} = this.state;
        addLogistic({enLogisticsList})
    }

    checkedItem(sourceData, targetKeys){
        let enLogisticsList = [];
        targetKeys.forEach((item, num)=>{
            sourceData.every((val, index)=>{
                if(index === num){
                    enLogisticsList.push({
                        companyCode : val.code,
                        companyName : val.title
                    })
                    return false
                }
                return true
            })
        })
        this.setState({
            enLogisticsList,
            targetKeys
        })
    }

    render() {
        const {sourceData, targetKeys} = this.state;
        const title = ['选择物流公司', '选中的物流公司'];
        const notFoundContent = '暂无数据';
        console.log(sourceData,targetKeys,'sourceData');
        return (
            <div>
                <Transfer
                    titles={title}
                    showSearch
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

Logistics.propTypes = {
    dataSource : React.PropTypes.array,
    distData : React.PropTypes.array,
    setDefault : React.PropTypes.func,
    addLogistic : React.PropTypes.func
}

export default Logistics;
