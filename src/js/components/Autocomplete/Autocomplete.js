import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { object, func, arrayOf, string } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { deburr, isEqual } from 'lodash';
import { throttle, debounce } from "throttle-debounce";

import { getSuggestionValue, getSuggestions, getLabeledArray } from '../../helpers'
import selectUsers from "../../selectors";
import {getUsers} from "../../actions/users.actions";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    container: {
        position: 'relative',
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
});

class BasicAutocomplete extends Component {
    state = {
        single: '',
        suggestions: [],
    };

    propTypes = {
        classes: object.isRequired,
        users: arrayOf(string),
        getUsers: func,
    };

    autocompleteSearchDebounced = debounce(500, this.props.getUsers);
    autocompleteSearchThrottled = throttle(500, this.props.getUsers);

    shouldComponentUpdate(nextProps, newState) {
        const { users } = nextProps;

        if(this.props.users !== nextProps.users){
            this.setState({
                suggestions: getSuggestions(this.state.single, getLabeledArray(users)),
            });
            return true;
        } else {
            return !isEqual(this.state, newState);
        }
    }

    handleSuggestionsFetchRequested = ({ value }) => {
        const inputValue = deburr(value.trim()).toLowerCase();
        const inputLength = inputValue.length;
        if (inputLength.length < 5) {
            this.autocompleteSearchThrottled(inputValue);
        } else if (inputLength) {
            this.autocompleteSearchDebounced(inputValue);
        }
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    handleChange = name => (event, { newValue }) => {
        this.setState({
            [name]: newValue,
        });
    };

    renderInputComponent(inputProps) {
        const { classes, inputRef = () => {}, ref, ...other } = inputProps;

        return (
            <TextField
                fullWidth
                InputProps={{
                    inputRef: node => {
                        ref(node);
                        inputRef(node);
                    },
                    classes: {
                        input: classes.input,
                    },
                }}
                {...other}
            />
        );
    }

    renderSuggestion(suggestion, { query, isHighlighted }) {
        const matches = match(suggestion.label, query);
        const parts = parse(suggestion.label, matches);

        return (
            <MenuItem selected={isHighlighted} component="div">
                <div>
                    {parts.map((part, index) => {
                        return part.highlight ? (
                            <span key={String(index)} style={{ fontWeight: 500 }}>
                                {part.text}
                            </span>
                        ) : (
                            <strong key={String(index)} style={{ fontWeight: 300 }}>
                                {part.text}
                            </strong>
                        );
                    })}
                </div>
            </MenuItem>
        );
    }

    render() {
        const { classes } = this.props;

        const autosuggestProps = {
            renderInputComponent: this.renderInputComponent,
            suggestions: this.state.suggestions,
            onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
            getSuggestionValue,
            renderSuggestion: this.renderSuggestion,
        };

        return (
            <div className={classes.root}>
                <Autosuggest
                    {...autosuggestProps}
                    inputProps={{
                        classes,
                        placeholder: 'Search a user',
                        value: this.state.single,
                        onChange: this.handleChange('single'),
                    }}
                    theme={{
                        container: classes.container,
                        suggestionsContainerOpen: classes.suggestionsContainerOpen,
                        suggestionsList: classes.suggestionsList,
                        suggestion: classes.suggestion,
                    }}
                    renderSuggestionsContainer={options => (
                        <Paper {...options.containerProps} square>
                            {options.children}
                        </Paper>
                    )}
                />
                <div className={classes.divider} />
            </div>
        );
    }
}

export const AutocompleteWithStyles = withStyles(styles)(BasicAutocomplete);

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

export default connect(mapStateToProps, mapDispatchToProps)(AutocompleteWithStyles);