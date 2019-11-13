import React, { Component } from 'react';

export default class Heroe extends Component {
    constructor(props) {
        super(props);
    
        this.state = {

        };
    }
    /*
    state = {
        heroe: this.props.heroe
    }*/

    componentDidMount() {
        //this.setState({heroe: this.props.heroe});
        console.log(this.props.heroe);
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
                    <h2 className="text-center">{this.props.heroe.name}</h2>
                </div>
                <img src={this.loadThumbnail(this.props.heroe.thumbnail.path, this.props.heroe.thumbnail.extension)} className="card-img-top" alt={this.props.heroe.name}></img>
                <div className="card-body">
                    <p className="card-text">{this.props.heroe.description}</p>
                </div>
            </div>


        );
    }
}
