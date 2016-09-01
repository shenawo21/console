import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Form from 'components/Form';
import DataTable from 'components/DataTable'
import {UploadImage} from 'components/FileLoader'
import RefundView from 'routes/Service/routes/RefundView';
const RESON = [
            {value:'已发货，买家未举证',title:'已发货，买家未举证'},
            {value:'买家恶意申请退款',title:'买家恶意申请退款'}
        ]
class InfoView extends Component {
    constructor() {
        super();
        this.state = {
            photoList : []
        }
    }
        
    _getFormItems(){
        let context = this;
        const {item, photoList, licenseImg, ...other} = context.props;
        let upConfig = {
            listType: 'picture',
            showUploadList: true,
            onlyFile: true
        };
        let config = {
            formItems: [{
                label: "拒绝退款原因：",
                name: "cwRefuseReason",
                required: true,
                rules: [{ required: true, message: '原因不能为空' }],
                select: {
                    placeholder:'请选择拒绝退款原因',
                    optionValue: RESON
                }
            },{
                label: "退款审批说明：",
                name: "optRemark",
                wrapperCol: {span: 10},
                input: {
                    rows: '5',
                    type: "textarea",
                    placeholder: "请输入审核描述",
                }
            }, {
                label: "发货凭证：",
                name: "businessLicense",
                custom(getCustomFieldProps) {
                    upConfig.fileList = [];
                    return <UploadImage title="验货凭证" className='upload-list-inline upload-fixed'
                            upConfig={{...upConfig, onChangeFileList:licenseImg}}
                            {...getCustomFieldProps('businessLicense')} />
                }
            }],
            initValue: {
                cwRefuseReason : null,
                optRemark: null,
                businessLicense : null
            }
        }
        return config;
    }
    
    render() {
        let {result, handleSubmit} = this.props;
        const buttonOption = {
            buttons : [
                {
                    key : 'review',
                    name :'审核通过，通知财务退款',
                    type : 'primary',
                },
                {
                    key : 'refuse',
                    name : '拒绝退款',
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
        return (
            <div>
                <RefundView result = {result} />

                <h3 className = 'titleName'>退款审批</h3>
                <Form horizontal items={this._getFormItems()} onSubmit={handleSubmit}  buttonOption={buttonOption} />
            </div>
        )
    }
}

InfoView.propTypes = {       
    loading : React.PropTypes.bool
}

export default InfoView;
