import React, { Component } from 'react';
import { string, func, object, number } from 'prop-types'
import { connect } from 'react-redux';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { InView } from 'react-intersection-observer'
import { throttle } from 'lodash';

import { getRepositoriesRequest } from '../../actions';
import { selectRepositoriesLists, selectUser} from '../../selectors'
import { page, listWrapper, loaderWrapper, loader } from './SearchPage.scss';

class SearchPageComponent extends Component {
    propTypes = {
        repositoriesLists: object,
        currentPage: number,
        currentUser: string,
        total: number,
        getRepositories: func.isRequired,
    };

    getRepositoriesThrottled = throttle(this.props.getRepositories, 500);

    state = {
        inView: false,
    };

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps) {
        const { repositoriesLists, currentUser, getRepositories } = this.props;
        const nextUser = nextProps.currentUser;
        const nextLists = nextProps.repositoriesLists;

        if(nextUser && currentUser !== nextUser){
            getRepositories(nextUser);
            return false;
        } else if(this.state.inView && this.isLoadRepositoriesPossible(this.getCurrentList(nextProps))) {
            this.getRepositoriesThrottled(nextUser);
            return true;
        }
        return repositoriesLists !== nextLists;
    }

    onInView = () => (inView) => {
        const { currentUser } = this.props;

        this.setState({ inView });

        if(inView && this.isLoadRepositoriesPossible()) {
            this.getRepositoriesThrottled(currentUser);
        } else if (this.isLoadRepositoriesPossible()) {
            this.getRepositoriesThrottled.cancel();
        }
    };

    renderList(){
        const repositoriesList = this.getCurrentList();

        if(!repositoriesList){
            return;
        }

        return (
            <div className={ listWrapper }>
                <div>
                    {
                        repositoriesList.list
                            .map((itemData, i) => {
                                return this.renderListItem(itemData, i)
                            })
                    }
                    {
                        this.isLoadRepositoriesPossible() ? this.renderLoader() : null
                    }
                </div>
            </div>
        )
    }

    getCurrentList(props = this.props){
        const { repositoriesLists, currentUser } = props;
        return repositoriesLists && currentUser && repositoriesLists[currentUser] && repositoriesLists[currentUser];
    }

    isLoadRepositoriesPossible(repositoriesList = this.getCurrentList()) {
        return repositoriesList && repositoriesList.page !== Math.ceil(repositoriesList.total / 10);
    }

    renderLoader() {
        return (
            <div className={ loaderWrapper }>
                <InView tag="div" onChange={ this.onInView() }/>
                <div className={ loader } />
            </div>
        )
    }

    renderListItem(item, index) {
        const { name, url } = item;

        return (
            <ListItem button component="a" key={index} href={ url } target="_blank">
                <ListItemText primary={ name } />
            </ListItem>
        )
    }

    render() {
        return (
            <div className={ page }>
                { this.renderList() }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: selectUser(state),
        repositoriesLists: selectRepositoriesLists(state),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getRepositories: (userName) => dispatch(getRepositoriesRequest(userName)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPageComponent);