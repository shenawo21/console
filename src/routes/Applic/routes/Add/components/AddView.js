import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';
import {Transfer, Button, Tree,Row,Col} from 'hen';
const TreeNode = Tree.TreeNode;

class Add extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.saveData = this.saveData.bind(this);
        this.state = {
            sourceData: [],
            targetKeys: [],
            cheackUser : [], //选中的用户
            distData : [],
            Edit:false,   //移动操作
            defaultExpandAll: true,
        }
    }

    componentWillReceiveProps(nextProps){
        let sourceData = [], targetKeys = [], {distData} = this.state;
        if(nextProps.distData){
            distData = nextProps.distData.map((val, index) => { 
                return {
                    key : index,
                    deptCode  : val.deptCode,
                    title : val.name,
                    adminId:val.adminId
                }
            })
            
        }

        if(nextProps.sourceData){
            sourceData = nextProps.sourceData.map((val, index) => {
                if(distData){
                    distData.every((item, num)=>{
                        if(item.deptCode == val.deptCode){
                            targetKeys.push(index)
                            return false
                        }
                        return true
                    })
                }
                return {
                    key : index,
                    deptCode  : val.deptCode,
                    title : val.name,
                    adminId:val.adminId

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
        const {addLogistic,distData,shopId} = this.props;
        const {cheackUser,Edit} = this.state;
        let distDataItem = distData && distData.map(c => {
            return {
                 adminId : c.adminId,
                 shopId : shopId,
            }
        })
        let checkList = []
        if (Edit == false) {
             checkList = distDataItem
        } else {
            checkList = cheackUser
        }
        addLogistic({checkList}).then((res)=>{
            if(res.status === 1){
                setTimeout(() => {
                    history.go(-1)
                }, 50);
            }
        })
    }

    checkedItem(sourceData, targetKeys){
        this.setState({Edit:true})
        let checkLists = [];
        const {distData,shopId} = this.props
        let defaultArray = distData.filter((item,index) => {
             return item.defaults == true            
        })
        let defaultCode = defaultArray.length > 0 ? defaultArray[0].deptCode : ''
        targetKeys.forEach((item, num)=>{
            sourceData.map((val, index)=>{
                if(index === item){
                    checkLists.push({
                         adminId : val.adminId,
                         shopId : shopId,
                    })
                    return false
                }
                return true
            })
        })
        this.setState({
            cheackUser:checkLists,
            targetKeys
        })
    }

    render() {
        const {sourceData, targetKeys} = this.state;
        const {item, keys, onExpand,onSelect} = this.props;
        const title = ['可选用户', '已选用户'];
        const notFoundContent = '暂无数据';      
        const loop = data => data && data.map((i) => {
        if (i.children) {
            return (
            <TreeNode key={i.deptCode} title={i.name}>
                {loop(i.children) }
            </TreeNode>
            );
        }
        return <TreeNode key={i.deptCode} title={i.name}/>;
        });

        return (
            <div>
                 <Row>
                    <Col span='8'>
                        <h3 className = 'title'>账号组</h3>
                         <Tree 
                            defaultExpandAll={this.state.defaultExpandAll}
                            onExpand={onExpand}
                            expandedKeys={keys.expandedKeys || []}
                            onSelect = {onSelect}>
                            {loop(item)}
                        </Tree>
                    </Col>
                    <Col span='16'>
                        <h3 className = 'title'>授权设置</h3>
                         <Transfer
                            titles={title}
                            listStyle={{
                                width: 300,
                                height: 510,
                            }}
                            showSearch
                            operations={['添加所选用户', '移除所选用户']}
                            notFoundContent={notFoundContent} 
                            dataSource={sourceData}
                            targetKeys={targetKeys}
                            onChange={this.handleChange}
                            render={item => {
                                return item.title
                            }} />   
                    </Col>
                </Row>                    
                <div style={{marginTop : "10px"}}>
                    <Button type='primary' onClick={this.saveData}>保存设置</Button>
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
