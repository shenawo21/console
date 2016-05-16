import React from 'react';
import Form from 'components/Form';

import { Icon, Button, Row, Col} from 'hen';

import './Search.less';

export default React.createClass({

    render() {
        const buttonOption = {
            col: false,
            ok: '搜索',
            searchSpan: '4',
            okIcon: 'search'
        };
        return <Form submitAfterReset prefixCls="search-box" ref="form" buttonOption={buttonOption} inline  {...this.props} resetNumber={{ pageNumber: 1 }} />
    }
});
