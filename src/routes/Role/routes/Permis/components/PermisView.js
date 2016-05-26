import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Checkbox, Row, Col, Button, Icon, Tree} from 'hen';

import Form from 'components/Form';

const TreeNode = Tree.TreeNode;
class Permis extends Component {

  constructor(props) {
    super(props);

    this.state = {
      defaultExpandAll: true
    }
  }

  render() {
    const {item, onSave, onCheck, keys, onExpand} = this.props;
    const loop = data => data && data.map((i) => {
      if (i.childrenList) {
        return (
          <TreeNode key={i.permissionId} title={i.name}>
            {loop(i.childrenList) }
          </TreeNode>
        );
      }
      return <TreeNode key={i.permissionId} title={i.name}/>;
    });

    return (<div>
        <Row>
          <Col span='3'>
            <Button onClick={onSave} type="primary"><Icon type="save"/>保存</Button>
          </Col>
        </Row>
        <Tree checkable multiple
              defaultExpandAll={this.state.defaultExpandAll}
              onExpand={onExpand}
              expandedKeys={keys.expandedKeys || []}
              checkedKeys={keys.checkedKeys}
              onCheck={onCheck}>
          {loop(item.permissionList)}
        </Tree>
      </div>
    )
  }
}


Permis.propTypes = {

  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}


export default Permis;
