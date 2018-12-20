import React from 'react';
import { render }from 'react-dom';
import { AppContainer } from './src/js/pages/AppContainer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './src/js/reducers';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import { ApiService } from './src/js/services';
import './src/styles/global-styles.scss';

const store = createStore(
    reducers,
    applyMiddleware(thunk.withExtraArgument(ApiService))
);

const theme = createMuiTheme(
    {
        palette: {
            primary: {
                main: '#EF5350'
            },
            secondary: {
                main: '#F06292',
            },
        },
    }
);

const appWrapper = document.getElementById('root');

appWrapper ? render(
    <MuiThemeProvider theme={theme}>
        <Provider store={ store }>
            <AppContainer></AppContainer>
        </Provider>
    </MuiThemeProvider>
    ,
    appWrapper
) : null;



