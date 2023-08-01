import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BuyIrisScreen from '../../../../src/screens/Main/IrisPage/BuyIrisScreen'; 

// Mock the navigation object with required methods
const mockNavigation: any = {
    navigate: jest.fn(),
};
const mockRoute: any = {
    key: 'MockKey',
    name: 'MockName',
};

describe('BuyIrisScreen', () => {
    it('renders correctly', () => {
        const { toJSON } = render(<BuyIrisScreen navigation={mockNavigation} route={mockRoute} />);
        expect(toJSON()).toMatchSnapshot();
    });

    it('renders the title correctly', () => {
        const { getByText } = render(<BuyIrisScreen navigation={mockNavigation} route={mockRoute} />);
        expect(getByText('Credits')).toBeTruthy();
    });

    it('renders the credit explanation correctly', () => {
        const { getByText } = render(<BuyIrisScreen navigation={mockNavigation} route={mockRoute} />);
        expect(getByText('1 Crédit = 1 Question Oui/Non')).toBeTruthy();
        expect(getByText('3 Crédits = 1 Tirage Complet')).toBeTruthy();
    });

    it('renders the credit cards correctly', () => {
        const { getByText } = render(<BuyIrisScreen navigation={mockNavigation} route={mockRoute} />);
        expect(getByText('1')).toBeTruthy();
        expect(getByText('3')).toBeTruthy();
        expect(getByText('10')).toBeTruthy();
        expect(getByText('20')).toBeTruthy();
        expect(getByText('30')).toBeTruthy();
    });
});
