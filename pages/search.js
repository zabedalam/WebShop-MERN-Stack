import React, { Component } from 'react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import SearchList from '../components/Search/SearchList';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state={
            search:'',
            searchResult: null                                                                                                         
        };
   
        this.handleChange=this.handleChange.bind(this);
    }
    //https://stackoverflow.com/questions/39926968/reactjs-shouldcomponentupdate-for-states
    shouldComponentUpdate(nextProps, nextState) {
        return this.state.searchResult != nextState.searchResult;
    }

    handleChange(event){
        this.setState({search:event.target.value});
    }

    async handleSubmit(e){
        e.preventDefault();
        let { search } =this.state;
        const url=`${baseUrl}/api/search?q=${search}`;
        // const payload = { search: search }
        // axios.get(url).then((res) => console.log(res)).catch((err) => {console.log(err)});
        const res = await axios.get(url);
        console.log(res);
        this.setState({searchResult: res.data.resultArray})
        // this.setState({searchResult: res.data.resultArray});
        // console.log(res.data.resultArray);
        // console.log(this.state.searchResult);

    }


    render (){
        return (
            <section className="section-register-login">
                <div className="container">
                    <h2 className="title" style={{marginTop: "150px"}}>SEARCH</h2>
                        
                    <div className="form">
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <input type="text" placeholder="Enter Name" name="search" onChange={this.handleChange} className="search-field"/>
                        </form>
                        <ul className="list-search">

                            {
                            this.state.searchResult ? 
                            this.state.searchResult.map((el, i) => <SearchList key={i} item={el}/>)
                            :
                            <li>No results to show</li>
                            }                  
                    
                        </ul>
                    </div>
                </div>
            </section>            
        )
    }    


}

export default Search;