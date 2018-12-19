import React from 'react';
import { shallow } from 'enzyme';

import AppContainer from './AppContainer';

describe('AppContainer', () => {
    it('should render', () => {
        const wrapper = shallow(<AppContainer />);
        expect(wrapper.length).toBeTruthy();
    });
})