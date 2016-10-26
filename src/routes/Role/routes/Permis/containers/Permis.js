import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import PermisView from '../components/PermisView'
import Panel from 'components/Panel'
import {queryList, modifyItem} from '../modules/PermisReducer'

class Permis extends Component {

  constructor(props) {
    super(props);
    this.onExpand = this.onExpand.bind(this);
    this.state = {
      item: {},
      keys: {}
    }
  }

  componentDidMount() {
    const {params, queryList} = this.props;
    if (params.id) {
      queryList({roleId: params.id})
    }
  }

  getFilterExpandedKeys(data) {
    let curCheckedKeys = []
    const loop = (data) => {
      let expandedKeys = data && data.map(p => {
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

  onCheck(checkedKeys) {
    this.setState({
      keys: {
        checkedKeys,
        expandedKeys: this.state.keys.expandedKeys
      }
    });
  }

  onSave() {

    const {modifyItem, params, result} = this.props;
    const {checkedKeys = []} = this.state.keys;
    let curCheckedKeys = checkedKeys.slice(0);
    //循环查找选中key值的的父节点permissionId
    const loop = (data, item, parentId) => {
        data && data.forEach(val => {
            if(item == val.permissionId){
              parentId && !curCheckedKeys.includes('' + parentId) && curCheckedKeys.push(parentId + '')
            }
            if (val.childrenList) {
              loop(val.childrenList, item, val.permissionId);
            }
        })
    }
    checkedKeys.length && checkedKeys.forEach(p => {
        loop(result.permissionList, p);
    })
    
    modifyItem({
      roleId: parseInt(params.id),
      permissionIdList: curCheckedKeys
    })
  }

  componentWillReceiveProps(nextProps, preProps) {
    if (!nextProps.params.id) {
      this.setState({
        item: {},
        keys: {}
      })
    } else {
      if(nextProps.isJump){
          setTimeout(()=> {
            nextProps.history.go(-1);
          }, 800);
          return
      }
      if(nextProps.result){
        let keys = this.getFilterExpandedKeys(nextProps.result.permissionList);
        console.log( keys)
        this.setState({
          item: nextProps.result,
          keys
        })
      }
    }
  }

  render() {
    const {item, keys} = this.state;
    return <Panel title="">
      <PermisView onSave={this.onSave.bind(this)} onCheck={this.onCheck.bind(this)} keys={keys} onExpand={this.onExpand}
                  item={item}/>
    </Panel>
  }
}
Permis.propTypes = {

  modifyItem: React.PropTypes.func,
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  queryList,
  modifyItem,
}


const mapStateToProps = (state) => {
  const {result, loading, isJump} = state.permis;

  return {'result': result, loading,isJump};

}

export default connect(mapStateToProps, mapActionCreators)(Permis)

