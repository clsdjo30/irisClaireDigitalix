import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import BirthdayScreen from '../BirthdayScreen';

// Mock de useUserStore
jest.mock('../../../hooks/useUserStore');
const mockUseUserStore = require('../../../hooks/useUserStore').useUserStore;

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

// Mock the Icon component
jest.mock('@rneui/base', () => ({
    Icon: () => 'Icon',
}));

describe('BirthDayScreen component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        const date = new Date(2000, 0, 1); // 1er janvier 2000
        mockUseUserStore.mockReturnValue([
            { birthday: date.toISOString() },
            jest.fn(),
        ]);
    });

    it('renders correctly and matches snapshot', () => {
        const tree = render(<BirthdayScreen {...mockProps} />);
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly', () => {
        const { getByTestId } = render(<BirthdayScreen {...mockProps} />);
        expect(getByTestId('birthday-screen')).toBeTruthy();
    });

    it('contains the key elements', () => {
        const { getByText, getByPlaceholderText } = render(<BirthdayScreen {...mockProps} />);
        expect(getByText('Quelle est votre date de naissance ?')).toBeTruthy();
        expect(getByPlaceholderText('Date de naissance')).toBeTruthy();
    });

    it('should not call navigation.navigate when "S\'inscrire" button is pressed and the user is under 18', () => {
        mockUseUserStore.mockReturnValueOnce([
            { birthday: new Date().toLocaleDateString() }, // setting the birthday to today's date
            jest.fn(),
        ]);

        const { getByText } = render(<BirthdayScreen {...mockProps} />);
        fireEvent.press(getByText("S'inscrire"));

        expect(mockNavigation.navigate).not.toHaveBeenCalled();
    });

    it('should display an error message if the user is under 18', () => {
        mockUseUserStore.mockReturnValueOnce([
            { birthday: new Date().toLocaleDateString() }, // setting the birthday to today's date
            jest.fn(),
        ]);

        const { getByText } = render(<BirthdayScreen {...mockProps} />);
        fireEvent.press(getByText("S'inscrire"));

        expect(getByText("Vous devez avoir plus de 18 ans pour vous inscrire")).toBeTruthy();
    });

    it('should set error if birthday is not defined', () => {
        mockUseUserStore.mockReturnValueOnce([
            { birthday: '' }, // Mocking an empty birthday
            jest.fn(),
        ]);

        const { getByText } = render(<BirthdayScreen {...mockProps} />);
        fireEvent.press(getByText("S'inscrire"));

        expect(getByText("Votre date de naissance ne peut pas être vide")).toBeTruthy();
        expect(mockNavigation.navigate).not.toHaveBeenCalled();
    });

    it('should set error if user is under 18', () => {
        const currentDate = new Date();
        const seventeenYearsAgo = new Date(currentDate.getFullYear() - 17, currentDate.getMonth(), currentDate.getDate()).toLocaleDateString();

        mockUseUserStore.mockReturnValueOnce([
            { birthday: seventeenYearsAgo }, // Mocking a birthday that makes user 17 years old
            jest.fn(),
        ]);

        const { getByText } = render(<BirthdayScreen {...mockProps} />);
        fireEvent.press(getByText("S'inscrire"));

        expect(getByText("Vous devez avoir plus de 18 ans pour vous inscrire")).toBeTruthy();
        expect(mockNavigation.navigate).not.toHaveBeenCalled();
    });

    // test goToSignUp function

    

   
});

