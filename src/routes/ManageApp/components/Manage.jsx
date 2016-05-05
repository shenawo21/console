import React,{Component, PropTypes} from 'react';
import {Link} from 'react-router';

class Manage extends Component{

  render() {
    return (
      <div>
        <Link to='/manage/add'>ADD</Link>
      </div>
    );
  }

}

Manage.propsTypes = {

}

export default Manage;

