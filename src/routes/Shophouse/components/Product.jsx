import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';

import Search from 'components/Search';

import { Collapse } from 'hen';
const Panel = Collapse.Panel;


class product extends Component {
   

    render() {
        const {formOptions, ...other} = this.props;
        function callback(key) {
            console.log(key);
        }
        return (
            <div>
 
                <Collapse defaultActiveKey={['1']} onChange={callback}>
                    <Panel header="This is panel header 1" key="1">
                    <p>{text}</p>
                    </Panel>
                    <Panel header="This is panel header 2" key="2">
                    <p>{text}</p>
                    </Panel>
                    <Panel header="This is panel header 3" key="3">
                    <p>{text}</p>
                    </Panel>
                </Collapse>

            </div>
        )
    }
}


product.propTypes = {

    // dataSource : React.PropTypes.array.isRequired,
    // action : React.PropTypes.func.isRequired,

    // loading : React.PropTypes.bool,
    // params : React.PropTypes.object
}


export default product;
