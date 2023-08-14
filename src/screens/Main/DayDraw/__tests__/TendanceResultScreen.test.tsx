import React from 'react';
import { render, fireEvent, act, cleanup } from '@testing-library/react-native';
import TendanceResultScreen from '../TendanceResultScreen';
import * as Sharing from 'expo-sharing';
import * as ViewShot from 'react-native-view-shot';
import { BackHandler } from 'react-native';


// Mocks
jest.mock('expo-sharing', () => ({
    isAvailableAsync: jest.fn(() => Promise.resolve(true)),
    shareAsync: jest.fn(),
}));

jest.mock('react-native-view-shot', () => ({
    captureRef: jest.fn(() => Promise.resolve('path/to/image.png')),
}));

jest.mock('../../../../hooks/useDayDrawStore', () => {
    const testImage = require('../../../../../assets/images/cards/front/1-le-bateleur.png');

    return {
        useDaydrawStore: () => [
            {
                daycard: 'Test Card',
                daytendance: 'Test Tendance',
                daycardimage: testImage,
            },
            jest.fn(),
        ],
    };
});

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

// Cast mocked functions for better TypeScript support
const mockedSharingIsAvailableAsync = Sharing.isAvailableAsync as jest.MockedFunction<typeof Sharing.isAvailableAsync>;
const mockedShareAsync = Sharing.shareAsync as jest.MockedFunction<typeof Sharing.shareAsync>;
const mockedCaptureRef = ViewShot.captureRef as jest.MockedFunction<typeof ViewShot.captureRef>;

describe('TendanceResultScreen', () => {
    afterEach(() => {
        jest.clearAllMocks();
        cleanup();
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

    it('should display the daydraw values correctly', () => {
        const { getByText } = render(<TendanceResultScreen {...mockProps} />);

        // Vérifiez que les valeurs renvoyées par le hook sont affichées
        expect(getByText('Test Card')).toBeTruthy();
        expect(getByText('Test Tendance')).toBeTruthy();
    });

    it('should alert if sharing is not available', async () => {
        mockedSharingIsAvailableAsync.mockResolvedValueOnce(false);

        const { getByText } = render(<TendanceResultScreen {...mockProps} />);
        const shareButton = getByText('Partagez votre tendance');

        await act(async () => {
            fireEvent.press(shareButton);
        });

        expect(global.alert).toHaveBeenCalledWith(`Uh oh, sharing isn't available on your platform`);
    });

    it('should capture and share the screen if sharing is available', async () => {
        mockedSharingIsAvailableAsync.mockResolvedValue(true);
        mockedCaptureRef.mockResolvedValue('path/to/image.png');

        const { getByText } = render(<TendanceResultScreen {...mockProps} />);
        const shareButton = getByText('Partagez votre tendance');

        await act(async () => {
            fireEvent.press(shareButton);
        });

        expect(mockedCaptureRef).toHaveBeenCalled();
        expect(mockedShareAsync).toHaveBeenCalledWith('path/to/image.png');
    });

    it('listens for hardware back press on mount', () => {
        const addEventListenerSpy = jest.spyOn(BackHandler, 'addEventListener');

        render(<TendanceResultScreen {...mockProps} />);

        expect(addEventListenerSpy).toHaveBeenCalledWith('hardwareBackPress', expect.any(Function));
    });

    it('removes the listener on unmount', () => {
        const removeSpy = jest.fn();
        jest.spyOn(BackHandler, 'addEventListener').mockReturnValue({ remove: removeSpy });

        const { unmount } = render(<TendanceResultScreen {...mockProps} />);

        unmount();

        expect(removeSpy).toHaveBeenCalled();
    });
});
