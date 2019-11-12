import React, { Component } from 'react';

const privateKey = '1d1e75f60a6846fbca805ed3bbcbcac0348dfc11';
const publicKey = '57755cfd79810e602c922413ed91de50';

export default class Heroe extends Component {

    state = {
        heroe: this.props.heroe
    }

    componentDidMount() {
        console.log(this.state.heroe);
    }

    loadThumbnail(path, extension) {
        console.log("INSIDE THUMBNAIL METHOD");
        /*
        var md5 = require('md5');
        let ts = new Date();
        let hash = md5(ts+privateKey+publicKey);*/
        path += '/portrait_xlarge' + '.' + extension;
        //path += `?apikey=${publicKey}&ts=${ts}&hash=${hash}`;
        console.log(path);
        return path;
    }

    render() {
        return (
            <div className="col-3">
                <div className="card m-3">
                    <img src={this.loadThumbnail(this.state.heroe.thumbnail.path, this.state.heroe.thumbnail.extension)} className="card-img-top" alt="..."></img>
                    <div className="card-body">
        <h2 className="text-center">{this.state.heroe.name}</h2>
                        <p className="card-text">{this.state.heroe.description}</p>
                    </div>
                </div>
            </div>

        );
    }
}
