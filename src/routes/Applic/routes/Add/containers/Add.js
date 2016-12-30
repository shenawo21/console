import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import AddView from '../components/AddView'
import Panel from 'components/Panel'
import {queryList, getListLogistic, addLogistic,structure} from '../modules/AddReducer'

class Add extends Component {

    constructor(props) {
        super(props);
        this.onExpand = this.onExpand.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.state = {
            item: {},
            keys: {}
        }
    }

    componentDidMount() {
        const {getListLogistic, queryList, structure} = this.props;
        getListLogistic();
        queryList();
        structure({roleId: '72'})
        
    }

    getFilterExpandedKeys(data) {
    let curCheckedKeys = []
    const loop = (data) => {
      let expandedKeys = data && data.map(p => {
          //显示时，只获取子节点selected选中状态，根据子节点状态影响父节点状态
          if (p.selected && !p.childrenList) {
            curCheckedKeys.push('' + p.permissionId);
          }
          if (p.childrenList) {
            loop(p.childrenList);
          }
          return p.permissionId + '';
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
        console.log(selectedKeys,'selectedKeys')
        

    }
    componentWillReceiveProps(nextProps, preProps) {
    if(nextProps.result){
        let keys = this.getFilterExpandedKeys(nextProps.result.permissionList);
        console.log( keys,'9999')
        this.setState({
          item: nextProps.result,
          keys
        })
      }
  }

    render() {
        const {listResult, queryResult,addLogistic} = this.props;
        const {item, keys} = this.state;

        const options = {
            sourceData: listResult,
            distData: queryResult,
            addLogistic
        }

        return <Panel title=""><AddView {...options} keys={keys} onExpand={this.onExpand} onSelect = {this.onSelect}
                  item={item} /></Panel>
    }
}


Add.propTypes = {
    queryList: React.PropTypes.func,
    getListLogistic: React.PropTypes.func, 
    addLogistic : React.PropTypes.func,
    loading: React.PropTypes.bool
}

const mapActionCreators = {
    getListLogistic,
    queryList,
    addLogistic,
    structure
}

const mapStateToProps = (state) => {
    const {result,listResult, queryResult} = state.addLogistics;
    return {'result': result, listResult, queryResult};
}

export default connect(mapStateToProps, mapActionCreators)(Add)

