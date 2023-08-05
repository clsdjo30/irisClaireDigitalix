import { render, fireEvent } from '@testing-library/react-native';
import FirstNameScreen from '../FirstNameScreen';

// Mock the navigation object with required methods
const mockNavigation: any = {
    navigate: jest.fn(),
};
const mockRoute: any = {
    key: 'MockKey',
    name: 'MockName',
};

// Mock the Icon component from react-native-vector-icons/FontAwesome
jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');

describe('FirstNameScreen', () => {
    it('renders correctly and matches snapshot', () => {
        const tree = render(<FirstNameScreen navigation={mockNavigation} route={mockRoute} />);
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly', () => {
        const { getByTestId } = render(<FirstNameScreen navigation={mockNavigation} route={mockRoute} />);
        expect(getByTestId('first-name-screen')).toBeTruthy();
    });

    it('contains the key elements', () => {
        const { getByText, getByPlaceholderText } = render(<FirstNameScreen navigation={mockNavigation} route={mockRoute} />);
        expect(getByText('Quelle est votre prénom ?')).toBeTruthy();
        expect(getByPlaceholderText('Saisissez votre prénom')).toBeTruthy();
    });

    it('updates the user store when the input changes', () => {
        const { getByPlaceholderText } = render(<FirstNameScreen navigation={mockNavigation} route={mockRoute} />);
        const input = getByPlaceholderText('Saisissez votre prénom');
        fireEvent.changeText(input, 'John');
        // Add a check to verify that user.firstname in the store is now 'John'
    });

    it('navigates to the next screen when the Next button is pressed', () => {
        const { getByText } = render(<FirstNameScreen navigation={mockNavigation} route={mockRoute} />);
        const nextButton = getByText('Suivant');
        fireEvent.press(nextButton);
        expect(mockNavigation.navigate).toHaveBeenCalledWith('Genre', { user: expect.any(Object) });
    });

    it('updates the user state when the input changes', () => {
        const { getByPlaceholderText } = render(<FirstNameScreen navigation={mockNavigation} route={mockRoute} />);
        const input = getByPlaceholderText('Saisissez votre prénom');
        fireEvent.changeText(input, 'John');
    });

    it('renders key elements correctly', () => {
        const { getByText, getByPlaceholderText } = render(<FirstNameScreen navigation={mockNavigation} route={mockRoute} />);
        expect(getByText('Quelle est votre prénom ?')).toBeTruthy();
        expect(getByPlaceholderText('Saisissez votre prénom')).toBeTruthy();
        expect(getByText('Suivant')).toBeTruthy();
    });


});
