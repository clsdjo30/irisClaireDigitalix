import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DayCardChoices from '../../src/components//DayCardChoices';

// Mock the Icon component from react-native-vector-icons/FontAwesome
jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');

// Mock the navigation object
const mockNavigation = {
    navigate: jest.fn(),
};

describe('DayCardChoices', () => {
    it('renders correctly when daycard.isdraw is false', () => {
        const daycard = { isdraw: false };
        const { getByText, getByTestId } = render(<DayCardChoices navigation={mockNavigation} daycard={daycard} />);

        // Check if the texts are rendered
        expect(getByText('Tendance du Jour')).toBeTruthy();
        expect(getByText('Une pensée inspirante pour éclairer votre journée !')).toBeTruthy();

        // Check if the exclamation icon is rendered
        expect(getByTestId('exclamation-icon')).toBeTruthy();
    });

    it('renders correctly when daycard.isdraw is true', () => {
        const daycard = { isdraw: true };
        const { getByText, getByTestId } = render(<DayCardChoices navigation={mockNavigation} daycard={daycard} />);

        // Check if the text is rendered
        expect(getByText('Tendance du Jour')).toBeTruthy();

        // Check if the check icon is rendered
        expect(getByTestId('check-icon')).toBeTruthy();
    });

    it('navigates when pressed', () => {
        const daycard = { isdraw: false };
        const { getByTestId } = render(<DayCardChoices navigation={mockNavigation} daycard={daycard} />);

        // Simulate a press on the card
        fireEvent.press(getByTestId('day-tendance-card'));

        // Check if navigation has been called
        expect(mockNavigation.navigate).toHaveBeenCalled();
    });
});
