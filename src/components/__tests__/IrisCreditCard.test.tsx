import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CreditCard from '../IrisCreditCard';

describe('CreditCard', () => {
    const defaultProps = {
        colors: ['#000', '#fff'],
        creditAmount: 100,
        price: 50,
        promoPrice: 40,
        bestDeal: true,
    };

    it('renders correctly', () => {
        const { getByText } = render(<CreditCard {...defaultProps} />);

        expect(getByText('100')).toBeTruthy();
        expect(getByText('Crédit')).toBeTruthy();
        expect(getByText('Best Deal')).toBeTruthy();
        expect(getByText('40€')).toBeTruthy();
        expect(getByText('50€')).toBeTruthy();
    });

    it('does not render Best Deal when bestDeal prop is false', () => {
        const { queryByText } = render(<CreditCard {...defaultProps} bestDeal={false} />);

        expect(queryByText('Best Deal')).toBeNull();
    });

    it('does not render promoPrice when promoPrice prop is not provided', () => {
        const { queryByText } = render(<CreditCard {...defaultProps} promoPrice={undefined} />);

        expect(queryByText('40€')).toBeNull();
    });

    it('matches snapshot', () => {
        const { toJSON } = render(<CreditCard {...defaultProps} />);

        expect(toJSON()).toMatchSnapshot();
    });
});
