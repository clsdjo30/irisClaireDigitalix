import React from 'react';
import { render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';

import HomeScreen from '../../../src/screens/Main/HomeScreen';

jest.mock('../../../src/hooks/useUserInformations', () => ({
    useUserInformation: () => ({
        user: {
            firstname: 'John',
        },
    }),
}));

// Mock the Icon component from react-native-vector-icons/FontAwesome
jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');

// Mock the navigation object with required methods
const mockNavigation: any = {
    navigate: jest.fn(),
};
const mockRoute: any = {
    key: 'MockKey',
    name: 'MockName',
};



jest.mock('firebase/auth', () => {
    const user = { uid: '123', email: 'test@test.com' };
    return {
        getAuth: jest.fn(() => ({
            currentUser: user
        })),
    };
});

describe('HomeScreen', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<HomeScreen navigation={mockNavigation} route={mockRoute} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should display the greeting', () => {
        const { getByText } = render(<HomeScreen navigation={mockNavigation} route={mockRoute} />);

        expect(getByText('Bonjour John')).toBeTruthy();
    });

    it('should render the CardChoices component', () => {
        const { getByText } = render(<HomeScreen navigation={mockNavigation} route={mockRoute} />);

        expect(getByText('Question Oui/Non')).toBeTruthy();
        expect(getByText('Tirage Complet')).toBeTruthy();
    });


    it('should render the DayCardChoices component with isdraw as false', () => {
        jest.mock('../../../src/hooks/useDayDrawStore', () => ({
            useDaydrawStore: () => [{ isdraw: false }],
        }));

        const { getByText, getByTestId } = render(<HomeScreen navigation={mockNavigation} route={mockRoute} />);

        expect(getByText('Tendance du Jour')).toBeTruthy();
        expect(getByTestId('exclamation-icon')).toBeTruthy();
    });
    
    // it('should render the DayCardChoices component with isdraw as true', () => {
    //     jest.mock('../../../src/hooks/useDayDrawStore', () => ({
    //         useDaydrawStore: () => [{ isdraw: true }],
    //     }));
        
    //     const { getByText, getByTestId } = render(<HomeScreen navigation={mockNavigation} route={mockRoute} />);
        
    //     expect(getByText('Tendance du Jour')).toBeTruthy();
    //     // Check if the check icon is rendered
    //     expect(getByTestId('check-icon')).toBeTruthy();
    // });
});
