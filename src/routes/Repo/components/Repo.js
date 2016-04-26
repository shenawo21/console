import React, {PropTypes} from 'react';
import {Button, Popconfirm} from 'hen';
export default ({repo, remove}) => {
  return <li className="list-group-item">
    {repo.name}
    <Popconfirm onConfirm={remove} title={`你确定要删除 ${repo.name} 吗?`}>
      <Button type="danger" outline>delete </Button>
    </Popconfirm>
  </li>
}
