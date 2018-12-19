import React, { Component } from "react";
import { string, arrayOf, func } from 'prop-types'
import { connect } from 'react-redux';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

import { getUsers } from "../../actions/users.actions";
import selectUsers from '../../selectors';
import "./SearchPage.scss";

const repositoresData = Array(10)
    .fill({ name: 'Repository', url: 'www.google.com' })
    .map((data, i) => ({ name: `${data.name} ${i}`, url: data.url }));

class SearchPageComponent extends Component {
    propTypes = {
        users: arrayOf(string),
        getUsers: func,
    };

    constructor(props) {
        super(props);

        this.state = {
            title: ""
        };
    }

    // componentDidMount() {
    //     this.props.getUsers('horakjakub')
    // }

    // shouldComponentUpdate(nextProps, newState) {
    //     const { users } = nextProps;
    // }

    renderList(){
        return (
            <div className="search-page__list">
                {
                    repositoresData
                        .map((itemData, i) => {
                            return this.renderListItem(itemData, i)
                        })
                }
            </div>
        )
    }

    renderListItem(item, index) {
        const {name, url } = item;

        return (
            <ListItem button component="a" key={index} href={ url } target="_blank">
                <ListItemText primary={ name } />
            </ListItem>
        )
    }

    render() {
        return (
            <div className={ 'search-page' }>
                <div className={ 'search-page__list__wrapper'}>
                    {
                        this.renderList()
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: selectUsers(state),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: (name) => dispatch(getUsers(name))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPageComponent);