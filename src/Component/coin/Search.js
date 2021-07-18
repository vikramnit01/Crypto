import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {debounce} from 'lodash';

export default class Search extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             coin_name:[],
             text:'',
             suggestion:[]
        }
    }
    componentDidMount(){
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.coinranking.com/v2/coins`,{
            headers: {
            'x-access-token' : 'coinranking589028b71220e16da9b11cd88d420fb0c7b02803bcbb7859'
            }
        })
      .then((res)=>{
          console.log(res.data.data.coins)
          this.setState({coin_name:res.data.data.coins})
      })
      .catch(err=>console.log(err))
    }
    onChangeHandler = debounce((text) =>{
        let matches = [];
        console.log(this.state.coin_name);
        if(text.length>0){
            matches = this.state.coin_name.filter(coin=>{
                const regex = new RegExp(`${text}`,"gi");
                return coin.name.match(regex)
            })
        }
        console.log('match',matches);
        this.setState({suggestion:matches})
        console.log(this.state.suggestion)
        this.setState({text:text})
    },500)
    
    render() {
        // const {suggestion}=this.state.suggestion;
        console.log(this.state.suggestion)
        return (
        <div className="card card-body mb-4 p-4">
            <input type="text" className="form-control" placeholder="Search Coin"  aria-describedby="basic-addon1" onChange={e=>this.onChangeHandler(e.target.value)}>
            </input>
            {this.state.suggestion&&this.state.suggestion.slice(0,10).map((suggest,i)=>{
                return <li key={i} ><Link to={`coin/${suggest.uuid}`} style={{ textDecoration: 'none' }}>{suggest.name}</Link> </li>
            })}
        </div>
        )
    }
}
