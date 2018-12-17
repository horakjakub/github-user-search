import React from 'react';
import { shallow, mount, render } from 'enzyme';

import SearchPage from './SearchPage';

describe('<SearchPage />', () => {
    it('should render', () => {
        const wrapper = shallow(<SearchPage />);
        expect(wrapper.length).toBeTruthy();
    });
})