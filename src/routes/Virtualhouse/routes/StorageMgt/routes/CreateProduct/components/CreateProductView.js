import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Row, Col, Button, Modal} from 'hen';
import Sku from "./Sku"
import SearchSpu from "./SearchSpu"
import Form from 'components/Form';


class CreateProduct extends Component {
    constructor(props){
        super(props);

        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.state = {
            visible : false
        }
    }

    _getFormItems() {
        let context = this;
        let config = {
            formItems: [{
                label: "SPU",
                name: "name1",
                required: true,
                custom(getCustomFieldProps) {
                    return <Row>
                        <Col span='12'><input type="text" className="ant-input ant-input-lg" disabled {...getCustomFieldProps('name1') } /></Col><Col span='6'><Button onClick={context.showModal}>选择已有SPU</Button></Col>
                    </Row>
                }
            }, {
                    label: "商品标题：",
                    name: "name2",
                    required: true,
                    select: {}
                }, {
                    label: "商品类目：",
                    name: "name2",
                    required: true,
                    select: {}
                }, {
                    label: "商品属性：",
                    name: "name2",
                    cascader: {}
                }, {
                    label: "商品品牌：",
                    name: "name2",
                    select: {}
                }, {
                    label: "市场价(元)：",
                    name: "name2",
                    infoLabel: <span>价格必须是0.01～9999999之间数字</span>,
                    input: {}
                }, {
                    label: "销售价(元)：",
                    name: "name2",
                    required: true,
                    infoLabel: <span>价格必须是0.01～9999999之间数字，不能大于市场价</span>,
                    input: {}
                }, {
                    label: "库存数量：",
                    name: "name2",
                    required: true,
                    infoLabel: <span>必须是0～999999999之间整数</span>,
                    input: {}
                }, {
                    label: "商品规格",
                    required: true,
                    custom() {
                        return <Sku></Sku>
                    }
                }],
            initValue: {

            }
        }
        return config;
    }

    showModal() {
        this.setState({
            visible: true
        });
    }

    handleOk() {
        this.setState({
            visible: false
        });
    }

    handleCancel(e) {
        this.setState({
            visible: false
        });
    }

    render() {
        const {formOptions, ...other} = this.props;

        return (
            <div>
                <Form horizontal  items={this._getFormItems() } onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset} />
                <Modal visible={this.state.visible}
                    closable={false}
                    width={1020}
                    onOk={this.handleOk} onCancel={this.handleCancel}>
                    <SearchSpu formOptions={formOptions}  {...other}></SearchSpu>
                </Modal>
            </div>
        )
    }
}


CreateProduct.propTypes = {

    loading: React.PropTypes.bool,
    params: React.PropTypes.object
}


export default CreateProduct;
