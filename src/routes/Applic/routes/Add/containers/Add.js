import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import AddView from '../components/AddView'
import Panel from 'components/Panel'
import {queryList, userList, addLogistic,structure} from '../modules/AddReducer'

class Add extends Component {

    constructor(props) {
        super(props);
        this.onExpand = this.onExpand.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.state = {
            item: [],
            keys: {},
            shopId:props.params.id,
            selected:false
        }
    }

    componentDidMount() {
        const {userList, queryList, structure,params} = this.props;
        structure()
        userList({shopId:params.id});   //可选用户  
        queryList({shopId:params.id});  //已选用户
       
        
    }

    getFilterExpandedKeys(data) {
    let curCheckedKeys = []
    const loop = (data) => {
      let expandedKeys = data && data.map(p => {
          //显示时，只获取子节点selected选中状态，根据子节点状态影响父节点状态
          if (p.selected == "true" && !p.children) {
            curCheckedKeys.push('' + p.deptCode);
          }
          if (p.children) {
            loop(p.children);
          }
          return p.deptCode + '';
        }) || [];
      return {
        expandedKeys,
        checkedKeys: curCheckedKeys
      };
    }
    return loop(data);
  }
    onExpand(treeNode, expand, expandedKeys) {
    const index = expandedKeys.indexOf(treeNode.props.eventKey);
    if (expand) {
      if (index > -1) {
        expandedKeys.splice(index, 1);
      }
    } else {
      if (index === -1) {
        expandedKeys.push(treeNode.props.eventKey);
      }
    }

    this.setState({
      keys: {
        checkedKeys: this.state.keys.checkedKeys,
        expandedKeys
      }
    });
  }
    onSelect(selectedKeys, e) {
        const _this = this
        const {userList, queryList,structure} = _this.props;
        const {shopId,selected} = _this.state;
        _this.state.selected = true
        let deptCode =  selectedKeys.join(',')
        structure({deptCode:deptCode})
        userList({deptCode:deptCode,shopId:shopId})
        //queryList({deptCode:deptCode,shopId:shopId})
    }
    componentWillReceiveProps(nextProps, preProps) {
    if(nextProps.result){
        let keys = this.getFilterExpandedKeys(nextProps.result);
        this.setState({
          item: nextProps.result,
          keys
        })
      }
  }

    render() {
        const {listResult, queryResult,addLogistic, loading} = this.props;
        const {item, keys,shopId,selected} = this.state;
        const options = {
            sourceData: listResult,
            distData: queryResult,
            addLogistic
        }
        return <Panel title=""><AddView {...options} keys={keys} onExpand={this.onExpand} onSelect = {this.onSelect}
                  item={item} shopId = {shopId} selected = {selected} loading={loading}/></Panel>
    }
}


Add.propTypes = {
    queryList: React.PropTypes.func,
    userList: React.PropTypes.func, 
    addLogistic : React.PropTypes.func,
    loading: React.PropTypes.bool
}

const mapActionCreators = {
    userList,
    queryList,
    addLogistic,
    structure
}

const mapStateToProps = (state) => {
    const {result,listResult, queryResult, loading} = state.addLogistics;
    return {'result': result, listResult, queryResult, loading};
}

export default connect(mapStateToProps, mapActionCreators)(Add)

