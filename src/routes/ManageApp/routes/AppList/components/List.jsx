import React,{Component, PropTypes} from 'react';
import {Link} from 'react-router';
import { Button, Row, Col, Input, InputNumber, DatePicker, message, Checkbox} from 'hen';

class Add extends Component{

  render() {
    return (
      <div>
        <h2>我的App列表</h2>
        <Link to='/docs/table'>table</Link>
      </div>
    );
  }

}

Add.propsTypes = {

}

export default Add;

