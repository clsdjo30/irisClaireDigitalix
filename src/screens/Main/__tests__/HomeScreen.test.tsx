import React from 'react';
import { render, act, cleanup } from '@testing-library/react-native';
import renderer, { ReactTestRenderer } from 'react-test-renderer';

import HomeScreen from '../HomeScreen';

// Mocks
jest.mock('react-native/Libraries/Image/Image', () => 'Image');
jest.mock('../../../hooks/useUserInformations', () => ({
    useUserInformation: () => ({
        user: {
            firstname: 'John',
        },
    }),
}));
jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');
jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(() => ({
        currentUser: { uid: '123', email: 'test@test.com' },
    })),
}));
jest.mock('../../../utils/resetAtMidnight');

// Mock navigation and route
const mockNavigation: any = {
    navigate: jest.fn(),
};
const mockRoute: any = {
    key: 'MockKey',
    name: 'MockName',
};

describe('HomeScreen', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });
    
    it('renders correctly', () => {
        let tree: ReactTestRenderer | null = null;
        act(() => {
            tree = renderer.create(<HomeScreen navigation={mockNavigation} route={mockRoute} />);
        });
        if (tree) {
            expect(tree).not.toBeNull();
            expect((tree as ReactTestRenderer).toJSON()).toMatchSnapshot();
        }
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
        jest.mock('../../../hooks/useDayDrawStore', () => ({
            useDaydrawStore: () => [{ isdraw: false }],
        }));
        const { getByText, getByTestId } = render(<HomeScreen navigation={mockNavigation} route={mockRoute} />);
        expect(getByText('Allez vite découvrir la tendance de votre journée !')).toBeTruthy();
    });
});
