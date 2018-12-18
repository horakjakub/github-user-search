import React, { Component } from "react";
import "./SearchPage.scss"

class SearchPage extends Component {
    constructor() {
        super();
        this.state = {
            title: ""
        };
    }
    render() {
        return (
            <div className={ 'pageContainer' }>
                SEARCH 
            </div>
        );
    }
}

export default SearchPage;