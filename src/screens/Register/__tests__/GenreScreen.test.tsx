import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import GenreScreen from '../GenreScreen';

// Mock the navigation object with required methods
const mockNavigation: any = {
    navigate: jest.fn(),
};
const mockRoute: any = {
    key: 'MockKey',
    name: 'MockName',
};

// Mock the Icon component from react-native-vector-icons/FontAwesome
jest.mock('@rneui/base', () => ({
    Icon: () => 'Icon',
}));

describe('GenreScreen', () => {
    it('renders correctly and matches the snapshot', () => {
        const tree = render(<GenreScreen navigation={mockNavigation} route={mockRoute} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly', () => {
        const { getByTestId } = render(<GenreScreen navigation = { mockNavigation } route = { mockRoute }  />);
        expect(getByTestId('genre-screen')).toBeTruthy();
    });

    it('contains the key elements', () => {
        const { getByText} = render(<GenreScreen navigation={mockNavigation} route={mockRoute} />);
        expect(getByText('Vous êtes : ')).toBeTruthy();
        expect(getByText('Choisissez votre genre')).toBeTruthy();
    });

    it('navigates to the next screen when the Next button is pressed', () => {
        const { getByText } = render(<GenreScreen navigation={mockNavigation} route={mockRoute} />);
        const nextButton = getByText('Suivant');
        fireEvent.press(nextButton);
        expect(mockNavigation.navigate).toHaveBeenCalledWith('Birthday', { user: expect.any(Object) });
    });
});
