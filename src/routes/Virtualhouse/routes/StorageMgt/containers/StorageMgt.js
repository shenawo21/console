import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import StorageMgtView from '../components/StorageMgtView'
import Panel from 'components/Panel'
import { storageMgtAction, getProList } from '../modules/StorageMgtReducer'
import {message} from 'hen';

class StorageMgt extends Component {

    constructor(props) {
        super(props);

        this.getFormOptions = this.getFormOptions.bind(this);

        this.state = {
            item: {}
        };  //定义初始状态
    }
    componentDidMount() {
        const {getProList} = this.props;
        const context = this;

        getProList();
    }

    /**
     * handle submit
     * @param  {any} formData
     * @param  {any} e
     */
    getFormOptions() {
        const _this = this;
        return {
            /**
            * (表单提交)
            *
            * @param value (description)
            */

            handleSubmit(value) {
                const { storageMgtAction, proListResult } = _this.props;
                const list = proListResult.map(a => {
                    return {
                        tempId: a.tempId,
                        skuId: a.skuId,
                        incoming: a.incoming
                    }
                })
                storageMgtAction({
                    list,
                    ...value
                })
            },

            buttonOption : {
                buttons : [
                    {
                        key : 'commit',
                        type : 'primary',
                        name : '提交',
                    },
                    {
                        key : 'back',
                        name : '返回',
                        handle(){
                            history.go(-1);
                        }
                    }
                ]
            }
        }
    }

    render() {
        const { item } = this.state;
        const {loading, items} = this.props;
        const tableOptions = {
            dataSource: items,                      //加载组件时，表格从容器里获取初始值
            loading                                 //表格加载数据状态
        }
        const formOptions = {
                ...this.getFormOptions()
        };
        return <Panel><StorageMgtView item={item} {...tableOptions} formOptions={formOptions} /></Panel>
    }
}

//数据限制类型
StorageMgt.propTypes = {
    storageMgtAction: React.PropTypes.func,
    getProList: React.PropTypes.func,
    loading: React.PropTypes.bool,
    items: React.PropTypes.array,
    result: React.PropTypes.object,
}

const mapActionCreators = {
    storageMgtAction,
    getProList
}

StorageMgt.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const {result, proListResult, loading} = state.storageMgt;
    const items = proListResult || [];
    return { result, proListResult, items, loading };
}

export default connect(mapStateToProps, mapActionCreators)(StorageMgt)
