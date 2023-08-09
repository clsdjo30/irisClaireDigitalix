
import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import TendanceResultScreen from '../TendanceResultScreen';
import { shareAsync } from 'expo-sharing';


// Mocks
jest.mock('react-native-view-shot', () => ({
    captureRef: jest.fn(),
}));
jest.mock('expo-sharing', () => ({
    isAvailableAsync: jest.fn(() => Promise.resolve(true)),
    shareAsync: jest.fn(),
}));

const testImage = require('../../../../../assets/images/cards/front/1-le-bateleur.png')

jest.mock('../../../../hooks/useDayDrawStore', () => ({
    useDaydrawStore: () => [
        {
            daycard: 'Test Card',
            daytendance: 'Test Tendance',
            daycardimage: testImage,
        },
        jest.fn(),
    ],
}));

// Mock navigation
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

global.alert = jest.fn();


describe('TendanceResultScreen', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        const { getByText, getByTestId } = render(<TendanceResultScreen {...mockProps} />);

        expect(getByText('Test Card')).toBeTruthy();
        expect(getByText('Test Tendance')).toBeTruthy();
        expect(getByTestId('day-result-screen')).toBeTruthy();
        expect(getByTestId('share-result-button')).toBeTruthy();
    });

    it('navigates to Home when "A Demain" button is pressed', () => {
        const { getByText } = render(<TendanceResultScreen {...mockProps} />);
        fireEvent.press(getByText('A Demain'));
        expect(mockNavigation.navigate).toHaveBeenCalledWith('Home');
    });

    it('should trigger the share function when "Partagez votre tendance" button is clicked', async () => {
        const { getByText } = render(<TendanceResultScreen {...mockProps} />); 

        const shareButton = getByText('Partagez votre tendance');
           
        await act(async () => {
            fireEvent.press(shareButton);
        });
        expect(shareButton).toBeTruthy();

    //verifier que la fonction shareAsync a bien été appelée
        expect(shareAsync).toHaveBeenCalled();
        
    });
});
