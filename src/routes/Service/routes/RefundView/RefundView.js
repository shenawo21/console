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


            <table  size="middle" style={{textAlign:'left',width:'50%',marginLeft:'20px'}}>
                <tr>
                    <td><b>{ ArryStatus[0].name}</b></td>
                    <td>{ ArryStatus[0].status}</td>
                </tr>
                <tr>
                    <td><b>{ ArryStatus[1].name}</b></td>
                    <td>{ ArryStatus[1].status}</td>
                </tr>
                <tr>
                    <td><b>{ ArryStatus[2].name}</b></td>
                    <td>{ ArryStatus[2].status.split('\\n')[0]}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>{ ArryStatus[2].status.split('\\n')[1]}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>{ ArryStatus[2].status.split('\\n')[2]}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>{ ArryStatus[2].status.split('\\n')[3]}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>{ ArryStatus[2].status.split('\\n')[4]}</td>
                </tr>
                <tr>
                    {result.afterSaleType == 'CHANGE_GOODS' ?
                        <td>''</td> : <td> <b>凭证：</b>
                                <span>
                                    {
                                        src && src.map((item, index)=>{
                                        return <img src={item} width= '80' style={{marginRight:10}} onClick={(e) => {showBig(e.target.currentSrc)}} />
                                        })
                                    }
                          </span></td>
                    }
                </tr>
            </table>

    </div>
  )
}