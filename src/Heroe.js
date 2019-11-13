import React, { Component } from 'react';

export default class Heroe extends Component {

    state = {
        heroe: this.props.heroe
    }

    componentDidMount() {
        console.log(this.state.heroe);
    }

    loadThumbnail(path, extension) {
        //console.log("INSIDE THUMBNAIL METHOD");
        path += '/portrait_incredible.' + extension;
        //console.log(path);
        return path;
    }

    render() {
        return (

            <div className="card w-1">
                <div className="card-header">
                    <h2 className="text-center">{this.state.heroe.name}</h2>
                </div>
                <img src={this.loadThumbnail(this.state.heroe.thumbnail.path, this.state.heroe.thumbnail.extension)} className="card-img-top" alt={this.state.heroe.name}></img>
                <div className="card-body">
                    <p className="card-text">{this.state.heroe.description}</p>
                </div>
            </div>


        );
    }
}
