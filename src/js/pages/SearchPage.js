import React, { Component } from "react";
import { string, arrayOf } from 'prop-types'
import { connect } from 'react-redux';

import selectUsers from '../selectors'
import "./SearchPage.scss";

class SearchPageComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: ""
        };
    }

    render() {
        const { users } = this.props;

        return (
            <div className={ 'pageContainer' }>
                SEARCH
                {
                    users ? users.join(' ') : null
                }
            </div>
        );
    }
}

SearchPageComponent.propTypes = {
    users: arrayOf(string),
};

const mapStateToProps = state => {
    return {
        users: selectUsers(state),
    }
};

export default connect(mapStateToProps)(SearchPageComponent);