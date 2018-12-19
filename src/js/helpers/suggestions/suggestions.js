import { deburr } from 'lodash';

export function getSuggestions(value, suggestions) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return suggestions && suggestions.length !== 0 ? suggestions.filter(suggestion => {
        const keep =
            count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
            count += 1;
        }

        return keep;
    }) : [];
}

export function getSuggestionValue(suggestion) {
    return suggestion.label;
}
