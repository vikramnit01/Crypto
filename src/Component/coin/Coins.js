import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap'

class Coins extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             coin_list :[]
        }
    }
    componentDidMount(){
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.coinranking.com/v2/coins?limit=10&orderBy=price`,{
            headers: {
            'x-access-token' : 'coinranking589028b71220e16da9b11cd88d420fb0c7b02803bcbb7859'
            }
        })
      .then((res)=>{
         console.log(res.data.data.coins)
          this.setState({coin_list:res.data.data.coins})
      })
      .catch(err=>console.log(err))
    }
    

    render() {
        const coin_list= this.state.coin_list;
        console.log(coin_list);
                        if(coin_list=== undefined||coin_list.length===0){
                            return (
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            )
                        }else{
                        console.log(coin_list )
                        return (
                          <>
                            <table className="table table-striped table-dark">
                              <thead>
                                <tr>
                                 <th scope="col">Name</th>
                                 <th scope="col">Price in USD</th>
                                 <th scope="col">Market_Cap</th>
                                 <th scope="col">btcPrice</th>
                                 <th scope="col">Change</th>
                                 <th scope="col">View Details</th>
                                </tr>
                               </thead>
                             <tbody>
                             {  
                            coin_list.map(item=>{
                                {console.log(item)}
                               return( <>
                                <tr>
                                <td scope="row">{item.name}</td>
                                <td>${parseFloat(item.price).toFixed(2)}$</td>
                                <td>{parseFloat(item.marketCap).toFixed(2)}</td>  
                                <td>{parseFloat(item.btcPrice).toFixed(2)}</td>
                                 {item.change<0 ?(
                                <td style={{ color: 'red' }}>{parseFloat(item.change).toFixed(2)}%</td> 
                                 ):(
                                <td style={{color: 'green'}}>{parseFloat(item.change).toFixed(2)}%</td>
                                 )
                                 }
                                <td> <Link to={`coin/${item.uuid}`} style={{ textDecoration: 'none' }}> View Details</Link> </td>

                                </tr>
                                </>
                               )
                             }) 
                             }
                              </tbody>
                            </table>
                        </>
                        )
              }
}
}

export default Coins
