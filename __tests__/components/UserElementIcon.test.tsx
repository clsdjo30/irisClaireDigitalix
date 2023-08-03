import React from 'react';
import { render } from '@testing-library/react-native';
import UserElementIcon from '../../src/components/UserElementIcon';
jest.mock('react-native/Libraries/Image/Image', () => 'Image');

describe('UserElementIcon', () => {
    it('renders correctly with valid element name', () => {
        const { getByText } = render(<UserElementIcon userElement="air" name="Air" />);
        expect(getByText('Air')).toBeTruthy();
    });

    it('does not render with invalid element name', () => {
        const { queryByText } = render(<UserElementIcon userElement="invalid" name="Invalid" />);
        expect(queryByText('Invalid')).toBeNull();
    });

    it('does not render when userElement is an empty string', () => {
        const { queryByText } = render(<UserElementIcon userElement="" name="Air" />);
        expect(queryByText('Air')).toBeNull();
    });

    it('does not render when userElement is null', () => {
        const { queryByText } = render(<UserElementIcon userElement={null} name="Air" />);
        expect(queryByText('Air')).toBeNull();
    });

    it('renders correctly when name is an empty string', () => {
        const { getByText } = render(<UserElementIcon userElement="air" name="" />);
        expect(getByText('')).toBeTruthy();
    });

    it('renders correctly when name is null', () => {
        const { getByText } = render(<UserElementIcon userElement="air" name={null} />);
        expect(getByText('')).toBeTruthy();
    });

    it('renders correctly with valid element name', () => {
        const { getByTestId } = render(<UserElementIcon userElement="air" name="air" />);
        const image = getByTestId('element-image');
        expect(image.props.source).toEqual(require('../../assets/icons/elements/air.png'));
    });
});
