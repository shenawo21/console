
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
            params: {},
            item: {},
            selState: null,
            enterList: [],
            roleList: [],
            photoList: [],
            resultState:[]
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
                
        getRoleList().then(res => {
            const lists = res.data;
            var list = lists.map(a => {
                return {
                    value: a.roleId,
                    label: a.name
                }
            })
            context.setState({
                roleList: list
            })
            
        })
        
        
        if(params.id){
            view({adminId: params.id})
        }
    }

    componentWillReceiveProps(nextProps, preProps){
        
        if (nextProps) {
            //console.log(nextProps.result.photo,'t')
            this.setState({
                item: nextProps.result,
                photoList: nextProps.result.photo
            })
        }
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
            console.log(1111,value);
            if(params.id) { 
                modifyItem({
                    adminId: params.id,
                    enterpriseCode: enterpriseCode,
                    ...value
                    }).then(res => {
                        if(res.data == null){
                            // _this.setState({
                            //     resultState: value
                            // });
	                        //res.data = value;    
                        }

                        // if(res.status == 1){
                        //     message.success(res.message || '修改成功')
                        //     setTimeout(() => {
                        //         let pathname = '/accounts';
                        //         _this.context.router.replace(pathname);
                        //     }, 1000);

                        // }
                    })
                }else{ 
                    addItem({
                        ...value,
                        enterpriseCode: enterpriseCode
                    }).then(res => {
                            
                            if(res.status == 1){
                                message.success(res.message || '修改成功')
                                setTimeout(() => {
                                    let pathname = '/accounts';
                                    _this.context.router.replace(pathname);
                                }, 1000);

                            }
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
        const {params, item, enterList, selState, roleList, photoList, resultState} = this.state;
        const {loading, result} = this.props;
        console.log(111111,this.props)
        const formOptions = {
            loading,
            result,
            'formOptions': this.getFormOptions()
        };
        console.log(result,'ttt');
        return <Panel><EditView item={item} enterList={enterList} selState={selState} photoList={photoList} roleList={roleList} photoImg={this.photoImg} {...formOptions} /></Panel>
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
  const {result, loading} = state.edit;
  return {'result': result, loading};

}
export default connect(mapStateToProps, mapActionCreators)(Edit)
