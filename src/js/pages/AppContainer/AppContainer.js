import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';

import { Autocomplete } from '../../components/Autocomplete'
import { SearchPage } from '../SearchPage'
import { container, bar } from './AppContainer.scss';

class AppContainer extends Component {
    constructor(){
        super();
    }

    renderSearchBar(){
        return (
            <AppBar color="primary" position="fixed">
                <div className={ bar }>
                    <Autocomplete/>
                </div>
            </AppBar>
        )
    }

    render() {
        return (
            <div className={ container }>
                { this.renderSearchBar() }
                <SearchPage />
            </div>
        );
    }
}

export default AppContainer;