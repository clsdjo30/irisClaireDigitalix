
import React from 'react';
import { render, cleanup } from '@testing-library/react-native';
import UserSignIcon from '../UserSignIcon';

afterEach(cleanup);

const ASTRO_SIGNS = ['aquarius', 'aries', 'cancer', 'capricorn', 'gemini', 'leo', 'libra', 'pisces', 'sagittarius', 'scorpio', 'taurus', 'virgo'];


describe('UserSignIcon', () => {
    ASTRO_SIGNS.forEach(sign => {
        it(`should render correctly with the "${sign}" sign`, () => {
            const { getByText, getByTestId } = render(<UserSignIcon userSign={sign} />);
            expect(getByTestId('astro-image')).toBeTruthy();
            expect(getByText('Mon Signe')).toBeTruthy();
        });
    });

    it('should not render if an invalid sign is passed', () => {
        const { queryByText } = render(<UserSignIcon userSign="invalidSign" />);
        expect(queryByText('Invalid Sign')).toBeNull();
    });

    it('should not render if userSign is an empty string', () => {
        const { queryByTestId } = render(<UserSignIcon userSign="" />);
        expect(queryByTestId('astro-image')).toBeNull();
    });

    it('should not render if userSign is null', () => {
        const { queryByTestId } = render(<UserSignIcon userSign={null} />);
        expect(queryByTestId('astro-image')).toBeNull();
    });

   
});
