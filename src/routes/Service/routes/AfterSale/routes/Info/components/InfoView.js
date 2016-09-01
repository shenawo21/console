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
        const {isRequired, photoList, licenseImg } = context.props;
        let upConfig = {
            listType: 'picture',
            showUploadList: true,
            onlyFile: true
        };
        let config = {
            formItems: [{
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
        if (isRequired == true) {
            const obj = {
                label: "拒绝退款原因：",
                name: "cwRefuseReason",
                required: true,
                rules: [{ required: true, message: '请选择快递公司' }],
                select: {
                    placeholder:'请选择拒绝退款原因',
                    optionValue: RESON
                }
            }
             config.formItems.unshift(obj)

        }

        return config;
    }
    
    render() {
        const {result, handleSubmit} = this.props;
        const refundComment = result.refundComment || {}
        const Goodsstatus = result.refund_phase == 'onsale' ? '售前退款' : '收货退款'
        const url = refundComment.picUrls
        const src = url && url.split(',')
        const ArryStatus = [
            {name:'货物状态:',status:Goodsstatus},
            {name:'退款说明:',status:refundComment.content},
        ]
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
                <RefundView result = {result} ArryStatus = {ArryStatus} src = {src} />

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
