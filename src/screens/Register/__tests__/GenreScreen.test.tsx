import React, { ReactNode } from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import GenreScreen from '../GenreScreen';

// Mock de la navigation
const mockNavigation: any = {
    navigate: jest.fn(),
};
const mockRoute: any = {
    key: 'MockKey',
    name: 'MockName',
};
const mockProps = {
    navigation: mockNavigation,
    route: mockRoute,
};

jest.mock('../../../hooks/useUserStore', () => ({
    useUserStore: jest.fn(),
}));
const mockUseUserStore = require('../../../hooks/useUserStore').useUserStore;

// Mock the Icon component from react-native-vector-icons/FontAwesome
jest.mock('@rneui/base', () => ({
    Icon: () => 'Icon',
}));

beforeEach(() => {
    mockUseUserStore.mockReturnValue([{ genre: '' }, jest.fn()]);
});

describe('GenreScreen', () => {
    it('renders correctly and matches the snapshot', () => {
        const tree = render(<GenreScreen {...mockProps} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should render correctly', () => {
        const { getByText, getByTestId } = render(<GenreScreen {...mockProps} />);
        expect(getByText('Vous êtes : ')).toBeTruthy();
        expect(getByTestId('genre-screen')).toBeTruthy();
    });

    it('should navigate to Birthday screen if genre is selected', () => {
        mockUseUserStore.mockReturnValueOnce([{ genre: 'Femme' }, jest.fn()]);
        const { getByText } = render(<GenreScreen {...mockProps} />);
        fireEvent.press(getByText('Suivant'));
        expect(mockNavigation.navigate).toHaveBeenCalledWith('Birthday');
    });

    it('should show an error if no genre is selected', () => {
        const { getByText } = render(<GenreScreen {...mockProps} />);
        fireEvent.press(getByText('Suivant'));
        expect(mockNavigation.navigate).not.toHaveBeenCalled();
        expect(getByText('Vous devez choisir un genre')).toBeTruthy();
    });
})
