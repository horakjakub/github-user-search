import React from "react";
import { render }from "react-dom";
import { AppContainer }from './src/js/pages';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './src/js/reducers';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import './src/global-styles.scss';
// import { replaceUsers } from "./src/js/actions/users.actions";

const appWrapper = document.getElementById("root");
const store = createStore(reducers);

const theme = createMuiTheme(
    {
        palette: {
            primary: {
                main: "#EF5350"
            },
            secondary: {
                main: '#F06292',
            },
        },
    }
);

appWrapper ? render(
    <MuiThemeProvider theme={theme}>
        <Provider store={ store }>
            <AppContainer></AppContainer>
        </Provider>
    </MuiThemeProvider>
    ,
    appWrapper
) : null;



