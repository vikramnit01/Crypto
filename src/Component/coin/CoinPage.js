import React, { Component } from 'react'
import axios from 'axios'
import { Spinner } from 'react-bootstrap'
export default class CoinPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             coin:{},
             loading : true
        }
    }
    componentDidMount(){
        console.log(this.props.match.params.id)
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.coinranking.com/v2/coin/${this.props.match.params.id}`,{
            headers: {
            'x-access-token' : 'coinranking589028b71220e16da9b11cd88d420fb0c7b02803bcbb7859'
            }
        })
      .then((res)=>{
          console.log(res.data)
          //console.log(res.data)
        //   this.setState({coin:res.data.data.coin})
          let coin = res.data.data.coin;
          this.setState({coin : {
              rank :coin.rank,
              name : coin.name,
              price : coin.price,
              allTimeHigh : coin.allTimeHigh.price,
              description : coin.description.replace(/<[^>]+>/g, ''),
              website : coin.links[0].url,
              supply : coin.supply.total
          }})
          this.setState({
              loading : false
          })
      })
      .catch(err=>console.log(err))
    }
    
    render() {
        const{loading,coin}=this.state
        // console.log(coin)
        if(loading)
            return (<Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>)
        return (
            <>
                <div class="card ml-1">
                    <h2 class="card-header">{coin.name}</h2>
                    <div class="card-body">
                      <h5 class="card-title">Rank : {coin.rank}</h5>
                      <h5 class="card-title">Price : ${parseFloat(coin.price).toFixed(2)}</h5>
                      <h5 class="card-title">ALL Time High Price : ${parseFloat(coin.allTimeHigh).toFixed(2)}</h5>
                      <h5 class="card-title">Supply : {coin.supply}</h5>
                      <h5 class="card-text" >{coin.description}</h5>
                      <a href={coin.website} target="_blank" className="btn btn-dark btn-sm m-1">Official Website</a>
                      <a href="/" className="btn btn-dark btn-sm m-2">Go Back</a>
                    </div>
               </div>
               
            </>
        )
    }
}
