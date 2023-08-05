import React from 'react';
import { render} from '@testing-library/react-native';
import SignInScreen from '../LoginScreen';

// Mock the navigation object with required methods
const mockNavigation: any = {
    navigate: jest.fn(),
};
const mockRoute: any = {
    key: 'MockKey',
    name: 'MockName',
};

jest.mock('../../../config/firebaseConfig');
// Mock the Icon component from react-native-vector-icons/FontAwesome
jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');

describe('SignInScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        const { getByPlaceholderText, getAllByText } = render(<SignInScreen navigation={mockNavigation} route={mockRoute} />);

        // Vérifie si les champs de saisie sont présents
        expect(getByPlaceholderText('Email')).toBeTruthy();
        expect(getByPlaceholderText('Password')).toBeTruthy();

        // Vérifie si le bouton de connexion est présent
        const signInButtons = getAllByText('Connexion');
        expect(signInButtons.length).toBeGreaterThan(0);
    });

});


