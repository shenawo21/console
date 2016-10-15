
/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import EditView from '../components/EditView'
import Panel from 'components/Panel'
import {view, addItem, modifyItem, getRoleList} from '../modules/EditReducer'
import store from 'store2';
import {message} from 'hen';

class Edit extends Component {

    constructor(props) {
        super(props);

        this.getFormOptions = this.getFormOptions.bind(this);
        this.photoImg = this.photoImg.bind(this);

        this.state = {
            item: {},
            photoList: []
        };  //定义初始状态
    }
    photoImg(files) {
        this.setState({
            photoList: files
        })
    }

    componentDidMount() {
        const {params, view, getRoleList} = this.props;
        const context = this;
        if(params.id){
            view({adminId: params.id})
        }
        //获取角色列表
        getRoleList();
    }

    componentWillReceiveProps(nextProps, preProps){
        if(nextProps.jump){
            setTimeout(()=>{
                this.context.router.push('/accounts')
            },100)
        }

        if (!nextProps.params.id) { 
            this.setState({
                item: null,
                photoList: []
            })
        } else {
            this.setState({
                item: nextProps.result,
                photoList: nextProps.result ? nextProps.result.photo : []
            })
        }
	
        // if(nextProps.result && nextProps.roleListResult){
        //     const lists = nextProps.roleListResult;
        //     var list = lists.map(a => {
        //         return {
        //             value: a.roleId,
        //             label: a.name
        //         }
        //     })
        //     this.setState({
        //         roleList: list
        //     })
        // }
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
       * (筛选表单提交)
       *
       * @param value (description)
       */

        handleSubmit(value) {
            const {addItem, modifyItem, params} = _this.props;
            const enterpriseCode = store.get('USER').enterpriseCode;
            _this.setState({
                params: value
            })
            if (_this.state.photoList) {
                value.photo = (typeof _this.state.photoList) === 'string' ? _this.state.photoList : _this.state.photoList.length ? _this.state.photoList[0].name : '';
            }
            if(params.id) { 
                modifyItem({
                    adminId: params.id,
                    enterpriseCode: enterpriseCode,
                    ...value
                })
            }else{ 
                addItem({
                    ...value,
                    enterpriseCode: enterpriseCode
                })
            }
          },

          /**
           * (重置)表单
           */

          handleReset(){

          }
        }
    }

    render() {
        const { item, photoList} = this.state;
        const {loading, result, roleListResult} = this.props;

        //角色列表
        let list = roleListResult && roleListResult.map(a => {
            return {
                value: a.roleId,
                label: a.name
            }
        }) || [];
        const formOptions = {
            loading,
            result,
            'formOptions': this.getFormOptions()
        };
        return <Panel><EditView item={item} photoList={photoList} roleList={list} photoImg={this.photoImg} {...formOptions} /></Panel>
    }
}

//数据限制类型
Edit.propTypes = {
    view: React.PropTypes.func,
    addItem: React.PropTypes.func,
    modifyItem: React.PropTypes.func,
    getRoleList: React.PropTypes.func,
    loading: React.PropTypes.bool,
    result: React.PropTypes.object,
}

Edit.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

const mapActionCreators = {
    view,
    addItem,
    modifyItem,
    getRoleList
}

const mapStateToProps = (state) => {
  const {result, modResult, roleListResult, loading, jump} = state.edit;
  return {result, modResult, roleListResult, loading, jump};
}

export default connect(mapStateToProps, mapActionCreators)(Edit)
