import React from "react";
import ReactDOM from "react-dom";
import SearchPage from './src/js/pages/index';

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<SearchPage></SearchPage>, wrapper) : false;
