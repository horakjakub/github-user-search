import React from "react";
import { render }from "react-dom";
import SearchPage from './src/js/pages/index';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './src/js/reducers'
import { replaceUsers } from "./src/js/actions/users.actions";

const appWrapper = document.getElementById("container");
const store = createStore(reducers);

appWrapper ? render(
    <Provider store={ store }>
        <SearchPage></SearchPage>
    </Provider>,
    appWrapper
) : null;



setTimeout(()=>{
    store.dispatch(replaceUsers(['first', 'second']))
}, 5000);


