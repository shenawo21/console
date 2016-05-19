import React from 'react';
import Form from 'components/Form';

import { Icon, Button, Row, Col} from 'hen';

import './Search.less';

export default React.createClass({

    render() {
        const buttonOption = {
            col: false,
            span : '6',
            buttons: [
                {
                    name : '搜索',
                    icon : 'search',
                    type : 'primary'
                },
                {
                    name : '重置',
                    key : 'reset'
                },
            ]
        };
        return <Form submitAfterReset prefixCls="search-box" ref="form" buttonOption={buttonOption} inline  {...this.props} resetNumber={{ pageNumber: 1 }} />
    }
});
