import React from 'react';
import { render, cleanup } from '@testing-library/react-native';
import UserElementIcon from '../UserElementIcon';

afterEach(cleanup);

const ELEMENT_NAMES = ['Air', 'Water', 'Fire', 'Earth'];

describe('UserElementIcon', () => {
    ELEMENT_NAMES.forEach(element => {
        it(`should render correctly with the "${element}" element`, () => {
            const { getByText, getByTestId } = render(<UserElementIcon userElement={element} />);
            expect(getByTestId('element-image')).toBeTruthy();
            expect(getByText('Mon Element')).toBeTruthy();
        });
    });

    it('should not render if an invalid element is passed', () => {
        const { queryByTestId } = render(<UserElementIcon userElement="invalidElement" />);
        expect(queryByTestId('element-image')).toBeNull();
    });

    it('should not render if userElement is null or an empty string', () => {
        const { queryByTestId } = render(<UserElementIcon userElement={null} />);
        expect(queryByTestId('element-image')).toBeNull();

        const { queryByTestId: queryByTestId2 } = render(<UserElementIcon userElement="" />);
        expect(queryByTestId2('element-image')).toBeNull();
    });
});
