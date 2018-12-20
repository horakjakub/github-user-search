import React from 'react';
import { shallow } from 'enzyme';

import { AutocompleteWithStyles } from './Autocomplete';

describe('Autocomplete', () => {
    it('should render', () => {
        const wrapper = shallow(<AutocompleteWithStyles />);
        expect(wrapper.length).toBeTruthy();
    });
})