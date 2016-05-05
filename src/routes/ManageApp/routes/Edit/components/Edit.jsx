import React,{Component, PropTypes} from 'react';
import {Row, Col,Steps} from 'hen';

export default ({repo, remove}) => {
  return <li className="list-group-item">
    {repo.name}
    <Popconfirm onConfirm={remove} title={`你确定要删除 ${repo.name} 吗?`}>
      <Button type="danger" outline>delete </Button>
    </Popconfirm>
  </li>
}

Edit.propsTypes = {

}

export default Edit;

