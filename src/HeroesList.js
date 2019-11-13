import React, { Component } from 'react';
import Heroe from './Heroe';
import ScrollToTop from 'react-scroll-up';

const privateKey = 'e2bbd003008c73aeaa0ebca9a0191fea7b187c1b';
const publicKey = 'ca744ad579e3a6b879214d6075fc079f';

class HeroesList extends Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()   // Create a ref object 

        this.state = {
            heroes: [],
            heroesCount: 0,
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        if (!navigator.onLine) {
            if (localStorage.getItem('heroes') === null) {
                console.log("OFFLINE")
                this.setState({ heroes: "loading..." });
            } else {
                //console.log("Data from local storage:" + JSON.parse(localStorage.getItem('heroes')));
                //let heroes = [];
                //heroes = localStorage.getItem('heroes');
                this.setState({ heroes: JSON.parse(localStorage.getItem("heroes")) });
            }
        } else {
            var md5 = require('md5');
            let ts = new Date();
            //console.log(`TS: ${ts}`);
            let hash = md5(ts + privateKey + publicKey);
            //console.log(`HASH: ${hash}`);

            fetch(`https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&ts=${ts}&hash=${hash}&limit=100`)
                .then(res => res.json())
                .then(value => {
                    //console.log(value);
                    //console.log(value.data.results);
                    this.setState({ heroes: value.data.results });
                    this.setState({ heroesCount: 100 });
                    localStorage.setItem('heroes', JSON.stringify(value.data.results));
                })
                .catch(error => {
                    console.log("Imprimiendo error:");
                    console.log(error);
                    this.setState({ heroes: null });
                });
        }

    }

    handleNext() {
        console.log(this.state.heroesCount);
        var md5 = require('md5');
        let ts = new Date();
        //console.log(`TS: ${ts}`);
        let hash = md5(ts + privateKey + publicKey);
        //console.log(`HASH: ${hash}`);

        fetch(`https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&ts=${ts}&hash=${hash}&limit=100&offset=${this.state.heroesCount}`)
            .then(res => res.json())
            .then(value => {
                //console.log(value);
                //console.log(value.data.results);
                this.setState({ heroes: value.data.results });
                this.setState({ heroesCount: this.state.heroesCount + 100 });
                localStorage.setItem('heroes', JSON.stringify(value.data.results));
                //console.log(this.state.heroes);
            })
            .catch(error => {
                console.log("Imprimiendo error:");
                console.log(error);
                this.setState({ heroes: null });
            });
    }

    render() {
        if (this.state.heroes === "loading..." || this.state.heroes === null) {
            return (
                <div className="row justify-content-center">
                    <div className="container-float"><h1>Loading heroes...</h1></div>
                </div>);
        } else {
            return (
                <div className="container-float">
                    <div className="card mb-2">
                        <div className="card-header">
                            <h1 className="text-center">Marvel Heroes</h1>
                        </div>
                        <div className="card-body">
                            <div className="row justify-content-center">
                                <div className="col-9">
                                    <div className="card-columns">

                                        {this.state.heroes.map((value, idx) => {
                                            return <Heroe key={idx} heroe={value} />
                                        })}

                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="row justify-content-center">
                        <button className="btn btn-primary" onClick={this.handleNext.bind(this)}> Next</button>
                    </div>
                    <ScrollToTop showUnder={160}>
                        <button className="btn btn-success">UP</button>
                    </ScrollToTop>
                </div>
            );
        }


    }
}

export default HeroesList;