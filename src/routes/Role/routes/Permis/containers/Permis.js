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
          if (p.selected) {
            curCheckedKeys.push('' + p.permissionId);
          }
          if (p.children) {
            loop(p.children);
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
    const {modifyItem, params} = this.props;
    modifyItem({
      roleId: parseInt(params.id),
      permissionIdList: this.state.keys.checkedKeys
    })
    history.go(-1);
  }

  componentWillReceiveProps(nextProps, preProps) {
    if (!nextProps.params.id) {
      this.setState({
        item: {},
        keys: {}
      })
    } else {
      let keys = this.getFilterExpandedKeys(nextProps.result.permissionList);

      this.setState({
        item: nextProps.result,
        keys
      })
    }
    if(nextProps.isJump){
      nextProps.history.go(-1)
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
  const {result, loading,isJump} = state.permis;

  return {'result': result, loading,isJump};

}

export default connect(mapStateToProps, mapActionCreators)(Permis)

