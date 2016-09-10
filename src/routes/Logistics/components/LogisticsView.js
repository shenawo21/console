import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';
import {Transfer, Button} from 'hen';

class Logistics extends Component {
    constructor(props) {
        super(props)
        this.getMock = this.getMock.bind(this);
        this.state = {
            mockData: [],
            targetKeys: []
        } 
    }
    componentDidMount() {
        this.getMock();
    }
    getMock() {
        let targetKeys = [];
        let mockData = [];
        for (let i = 0; i < 20; i++) {
            const data = {
                key: i,
                title: `内容${i + 1}`,
                description: `内容${i + 1}的描述`,
                chosen: Math.random() * 2 > 1
            };
            if (data.chosen) {
                targetKeys.push(data.key);
            }
            mockData.push(data);
        }
        this.setState({ mockData, targetKeys });
    }
    handleChange(targetKeys, direction, moveKeys) {
        console.log(targetKeys, direction, moveKeys);
        this.setState({ targetKeys });
    }

    render() {
        const {quickOptions, tableOptions} = this.props;
        const {mockData} = this.state;
        const title = ['选择物流公司', '选中的物流公司'];
        const notFoundContent = '暂无数据';
        console.log(mockData,'mockData');
        return (
            <div>
                <Transfer
                    titles={title} 
                    listStyle={{
                        width: 300,
                        height: 500,
                    }} 
                    notFoundContent={notFoundContent} 
                    dataSource={mockData}
                    targetKeys={this.state.targetKeys}
                    onChange={this.handleChange}
                    render={item => item.title} />
            </div>
        )
    }
}


Logistics.propTypes = {
    dataSource : React.PropTypes.array,
    loading : React.PropTypes.bool
}

export default Logistics;
