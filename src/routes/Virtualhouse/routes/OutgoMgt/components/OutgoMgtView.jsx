import React, {Component, PropTypes} from 'react';

import {Link} from 'react-router';
import {Button, Input, message} from 'hen';

import Form from 'components/Form';
class Setting extends Component {

  constructor() {
    super();
  }


  render() {
    return (
      <div>
        出库管理
      </div>
    );
  }

}

Setting.proptype = {

  loading: React.PropTypes.bool,
  params: React.PropTypes.object

}

export default Setting;

