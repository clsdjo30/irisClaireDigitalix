import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BirthdayScreen from '../BirthdayScreen';

// Mock de useUserStore
jest.mock('../../../hooks/useUserStore', () => ({
    useUserStore: () => [
        { birthday: '01/01/2000' },
        jest.fn(),
    ],
}));

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

describe('BirthDayScreen component', () => {
    it('renders correctly and matches snapshot', () => {
        const tree = render(<BirthdayScreen navigation={mockNavigation} route={mockRoute} />);
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly', () => {
        const { getByTestId } = render(<BirthdayScreen navigation={mockNavigation} route={mockRoute} />);
        expect(getByTestId('birthday-screen')).toBeTruthy();
    });

    it('contains the key elements', () => {
        const { getByText, getByPlaceholderText } = render(<BirthdayScreen navigation={mockNavigation} route={mockRoute} />);
        expect(getByText('Quelle est votre date de naissance ?')).toBeTruthy();
        expect(getByPlaceholderText('Date de naissance')).toBeTruthy();
    });

    it('updates the user store when the input changes', () => {
        const { getByPlaceholderText } = render(<BirthdayScreen navigation={mockNavigation} route={mockRoute} />);
        const input = getByPlaceholderText('Date de naissance');
        fireEvent.changeText(input, '01/01/2000');
        // Add a check to verify that user.firstname in the store is now 'John'
    });

    it('should call navigation.navigate when "S\'inscrire" button is pressed', () => {
        const { getByText } = render(
            <BirthdayScreen navigation={mockNavigation} route={mockRoute} />
        );

        fireEvent.press(getByText("S'inscrire"));

        expect(mockNavigation.navigate).toHaveBeenCalledWith('Sign Up');
    });

  
});
