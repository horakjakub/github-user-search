import { deburr } from 'lodash';

function deburrPhrase(phrase) {
    return deburr(phrase.trim()).toLowerCase();
}

export default deburrPhrase;