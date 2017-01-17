
/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import EditView from '../components/EditView'
import Panel from 'components/Panel'
import {view, addItem, modifyItem, getRoleList,group} from '../modules/EditReducer'
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
        const {params, view, getRoleList,group} = this.props;
        const context = this;
        if(params.id){
            view({adminId: params.id})
        }
        //获取角色列表
        getRoleList();
        // 获取账号组列表
        group()
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
            console.log(value.deptCode,'deptCode')
            if (!value.deptCode) {
                message.error('所属账号组不能为空！')
            } else {
                    let code = value.deptCode
                    let deptCode = code[code.length -1]
                    console.log(deptCode,'deptCode======')
                    value = {...value,deptCode:deptCode}
                    console.log(value,'value=====')
                    _this.setState({
                        params: value
                    })
                    if (_this.state.photoList) {
                        value.photo = (typeof _this.state.photoList) === 'string' ? _this.state.photoList : _this.state.photoList.length ? _this.state.photoList[0].name : '';
                    }
                    if(params.id) { 
                        modifyItem({
                            admin: true,
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
        const {loading, result, roleListResult,groupResult} = this.props;

        //角色列表
        let list = roleListResult && roleListResult.map(a => {
            return {
                value: a.roleId,
                label: a.name
            }
        }) || [];
        // 账号组列表
        const loop = (groupResult) => {
            return groupResult && groupResult.map(a => {
                let children = loop(a.children)

                if (children) {
                    return {
                        value: a.deptCode,
                        label: a.name,
                        children
                    }
                } else {
                    return {
                        value: a.deptCode,
                        label: a.name
                    }
                }
            })
        }

        const formOptions = {
            loading,
            result,
            'formOptions': this.getFormOptions()
        };
        return <Panel><EditView item={item} photoList={photoList} roleList={list} groupList = {loop(groupResult)} photoImg={this.photoImg} {...formOptions} /></Panel>
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
    getRoleList,
    group
}

const mapStateToProps = (state) => {
  const {result, modResult, roleListResult, loading, jump,groupResult} = state.edit;
  return {result, modResult, roleListResult, loading, jump,groupResult};
}

export default connect(mapStateToProps, mapActionCreators)(Edit)
