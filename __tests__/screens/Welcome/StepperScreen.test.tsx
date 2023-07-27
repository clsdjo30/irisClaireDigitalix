import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import StepperScreen from '../../../src/screens/Welcome/StepperScreen';

// Mock the navigation object with required methods
const mockNavigation: any = {
    navigate: jest.fn(),
};
const mockRoute: any = {
    key: 'MockKey',
    name: 'MockName',
};

describe('StepperScreen', () => {
    it('renders without error', () => {
        const { getByTestId } = render(<StepperScreen navigation={mockNavigation} route={mockRoute} />);
        const container = getByTestId('stepper-screen'); // Add "testID" to the root View in StepperScreen
        expect(container).toBeDefined();
    });

    it('displays the correct title and description for each step', () => {
        const { getByText } = render(<StepperScreen navigation={mockNavigation} route={mockRoute} />);
        const step1Title = getByText('Envie de réponses instantanées à vos questions ?');
        const step1Description = getByText('Recevez des reponses instantanée à toutes vos interogations');
        expect(step1Title).toBeDefined();
        expect(step1Description).toBeDefined();

        // Add similar checks for other steps if applicable
    });

    it('navigates to FirstName screen when "S\'inscrire" button is pressed', () => {
        const { getByTestId } = render(<StepperScreen navigation={mockNavigation} route={mockRoute} />);
        const sInscrireButton = getByTestId('s-inscrire-button'); // Add "testID" to the "S'inscrire" button
        fireEvent.press(sInscrireButton);
        expect(mockNavigation.navigate).toHaveBeenCalledWith('FirstName');
    });

    it('navigates to Login screen when "Se Connecter" button is pressed', () => {
        const { getByTestId } = render(<StepperScreen navigation={mockNavigation} route={mockRoute} />);
        const seConnecterButton = getByTestId('se-connecter-button'); // Add "testID" to the "Se Connecter" button
        fireEvent.press(seConnecterButton);
        expect(mockNavigation.navigate).toHaveBeenCalledWith('Login');
    });
});

