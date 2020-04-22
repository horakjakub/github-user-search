import React from 'react';
import AppBar from '@material-ui/core/AppBar';

import { Autocomplete } from '../../components/Autocomplete'
import { SearchPage } from '../SearchPage'
import { container, bar } from './AppContainer.scss';

export const SearchBar = ()=> ( 
	<AppBar color="primary" position="fixed">
		<div className={ bar }> 
			<Autocomplete/>
		</div>
    </AppBar>
);

export const AppContainer = () => (
	<div className={ container }>
		<SearchBar /> 
		<SearchPage />
	</div>
);

export default AppContainer;
