import React, { Component } from 'react';
import Heroe from './Heroe';

const privateKey = '1d1e75f60a6846fbca805ed3bbcbcac0348dfc11';
const publicKey = '57755cfd79810e602c922413ed91de50';

class HeroesList extends Component {

    state = {
        heroes: []
    }

    componentDidMount() {
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

                    localStorage.setItem('heroes', JSON.stringify(value.data.results));
                })
                .catch(error => {
                    console.log("Imprimiendo error:");
                    console.log(error);
                    this.setState({ heroes: null });
                });
        }

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
                    <div className="card">
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
                </div>
            );
        }


    }
}

export default HeroesList;