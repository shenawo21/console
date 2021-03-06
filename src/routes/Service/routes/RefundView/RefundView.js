import React from 'react'
import './RefundView.less'
// import Image from 'components/Image';

export default (props) => {
  const result = props.result
  const showBig = props.showBig   
  const ArryStatus = props.ArryStatus
  const src = props.src
  let outerSkuId = result.tradesOrder ? result.tradesOrder.outerSkuId : ''
  return (
    <div className="table-box">
            <table className = 'border-table' style = {{width:'100%'}}>
                <caption>{props.title}</caption>
                <tr>
                    <th>商品编码</th>
                    <th>商品名称</th>
                    <th>原价格</th>
                    <th>数量</th>
                    <th>商品总价值</th>
                    <th>优惠金额</th>
                    {result.afterSaleType == 'CHANGE_GOODS' ?
                    <th>换货数量</th>:
                    <th>退货数量</th> }
                    {result.afterSaleType == 'CHANGE_GOODS' ?
                    <th>换后商品编码</th>:
                    result.afterSaleType == 'REFUND_MONEY' ?
                        <th>退款金额</th>:
                        <th>退货金额</th>
                    }
                </tr>
                <tbody>
                    <tr>
                        <td>{outerSkuId}</td>
                        <td>{result.title}</td>
                        <td>{result.price}</td>
                        {result.afterSaleType == 'CHANGE_GOODS' ? 
                        <td>{result.goodsNum}</td> :
                        <td>{result.goodsNum}</td> 
                        }
                        <td>{result.totalFee}</td>
                        <td>{result.discountFee ? result.discountFee : 0 }</td>
                        {result.afterSaleType == 'CHANGE_GOODS' ?
                        <td>{result.refundNums}</td>:
                        result.afterSaleType == 'REFUND_MONEY' ?
                            <td>无退货</td>:
                            <td>{result.goodsNum}</td>
                         }
                        {result.afterSaleType == 'CHANGE_GOODS' ?
                        <td>{result.changeSkuCode}</td>:
                        <td>{result.totalFee}</td>}
                    </tr>                       
                </tbody>
            </table>
            <ul className = 'form-talbe'>
                    {
                        ArryStatus && ArryStatus.map((item, index)=>{
                            return  <li><b>{item.name}</b>{item.name == '退货说明:' ? item.status.split('\\n').map((itemSum, key) => {
                                                           return <div style={{marginLeft:'9%'}}><span>{itemSum}</span></div>
                                                       }) : <span>{item.status}</span>}</li>   
                                        
                        })
                    }
                    {result.afterSaleType == 'CHANGE_GOODS' ?
                    '' :  <li><b>凭证：</b>
                                <span>
                                    {
                                        src && src.map((item, index)=>{
                                        return <img src={item} width= '80' style={{marginRight:10}} onClick={(e) => {showBig(e.target.currentSrc)}} />
                                        })
                                    }
                          </span></li>
                    }
            </ul>

    </div>
  )
}