import React from 'react'
import './RefundView.less'
// import Image from 'components/Image';

export default (props) => {
  const result = props.result
  const refundComment = result.refundComment || {}
  const status = result.refund_phase == 'onsale' ? '售前退款' : '收货退款'
  const url = refundComment.picUrls
  const src = url && url.split(',')
 
  return (
    <div className="table-box">
            <table className = 'border-table' style = {{width:'100%'}}>
                <caption>客户退款申请</caption>
                <thead>
                    <th>商品编码</th>
                    <th>商品名称</th>
                    <th>原价格</th>
                    <th>数量</th>
                    <th>商品总价值</th>
                    <th>优惠金额</th>
                    <th>退货数量</th>
                    <th>退货金额</th>
                </thead>
                <tbody>
                    <tr>
                        <td>{result.outerId}</td>
                        <td>{result.title}</td>
                        <td>{result.price}</td>
                        <td>{result.goodsNum}</td>
                        <td>{result.totalFee}</td>
                        <td>{result.discountFee}</td>
                        <td>{result.tGoodsNum}</td>
                        <td>{result.refundFee}</td>
                    </tr>                       
                </tbody>
            </table>
            <table className = 'form-talbe'>

                <tr>
                    <th>货物状态:</th>
                    <td>{status}</td>
                </tr>
                <tr>
                    <th>退款说明:</th>
                    <td>{refundComment.content}</td>
                </tr>
                <tr>
                    <th>凭证:</th>
                    <td>
                        {
                            src && src.map((item, index)=>{
                            return <img src={item} width= '80' style={{marginRight:10}} />
                            })
                        }
                    </td>
                </tr>
            </table>
        </div>
  )
}