import React from 'react';
import { render } from '@testing-library/react-native';
import UserStoneIcon from '../../src/components/UserStoneIcon';

jest.mock('react-native/Libraries/Image/Image', () => 'Image');

describe('UserStoneIcon', () => {
    it('renders correctly with valid stone name', () => {
        const { getByText } = render(<UserStoneIcon userStone="onyx" name="Onyx" />);
        expect(getByText('Onyx')).toBeTruthy();
    });

    it('does not render with invalid stone name', () => {
        const { queryByText } = render(<UserStoneIcon userStone="invalid" name="Invalid" />);
        expect(queryByText('Invalid')).toBeNull();
    });

    it('does not render when userStone is an empty string', () => {
        const { queryByText } = render(<UserStoneIcon userStone="" name="Onyx" />);
        expect(queryByText('Onyx')).toBeNull();
    });

    it('does not render when userStone is null', () => {
        const { queryByText } = render(<UserStoneIcon userStone={null} name="Onyx" />);
        expect(queryByText('Onyx')).toBeNull();
    });

    it('renders correctly when name is an empty string', () => {
        const { queryByTestId } = render(<UserStoneIcon userStone="onyx" name="" />);
        expect(queryByTestId('stone-image')).toBeTruthy();
        expect(queryByTestId('stone-name')).toBeNull();
    });

    it('renders correctly when name is null', () => {
        const { queryByTestId } = render(<UserStoneIcon userStone="onyx" name={null} />);
        expect(queryByTestId('stone-image')).toBeTruthy();
        expect(queryByTestId('stone-name')).toBeNull();
    });

    it('renders correctly with valid stone name', () => {
        const { getByTestId } = render(<UserStoneIcon userStone="onyx" name="Onyx" />);
        const image = getByTestId('stone-image');
        expect(image.props.source).toEqual(require('../../assets/icons/stones/onyx.png'));
    });
});
