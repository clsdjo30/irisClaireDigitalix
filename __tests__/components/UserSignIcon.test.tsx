
import React from 'react';
import { render, cleanup } from '@testing-library/react-native';
import UserSignIcon from '../../src/components/UserSignIcon';

afterEach(cleanup);

const ASTRO_SIGNS = ['aquarius', 'aries', 'cancer', 'capricorn', 'gemini', 'leo', 'libra', 'pisces', 'sagittarius', 'scorpio', 'taurus', 'virgo'];
jest.mock('react-native/Libraries/Image/Image', () => 'Image');
describe('UserSignIcon', () => {
    ASTRO_SIGNS.forEach(sign => {
        it(`should render correctly with the "${sign}" sign`, () => {
            const { getByText } = render(<UserSignIcon userSign={sign} name={sign.charAt(0).toUpperCase() + sign.slice(1)} />);
            expect(getByText(sign.charAt(0).toUpperCase() + sign.slice(1))).toBeTruthy();
        });
    });

    it('should not render if an invalid sign is passed', () => {
        const { queryByText } = render(<UserSignIcon userSign="invalidSign" name="Invalid Sign" />);
        expect(queryByText('Invalid Sign')).toBeNull();
    });

    it('should not render if userSign is an empty string', () => {
        const { queryByTestId } = render(<UserSignIcon userSign="" name="Empty Sign" />);
        expect(queryByTestId('astro-image')).toBeNull();
        expect(queryByTestId('sign-name')).toBeNull();
    });

    it('should render correctly if name is an empty string', () => {
        const { queryByTestId } = render(<UserSignIcon userSign="aries" name="" />);
        expect(queryByTestId('astro-image')).toBeTruthy();
        expect(queryByTestId('sign-name')).toBeNull();
    });

    it('should render correctly if name is null', () => {
        const { queryByTestId } = render(<UserSignIcon userSign="aries" name={null} />);
        expect(queryByTestId('astro-image')).toBeTruthy();
        expect(queryByTestId('sign-name')).toBeNull();
    });

    it('should not render if userSign is null', () => {
        const { queryByTestId } = render(<UserSignIcon userSign={null} name="Null Sign" />);
        expect(queryByTestId('astro-image')).toBeNull();
        expect(queryByTestId('sign-name')).toBeNull();
    });

    it('should not render if userSign and name are null', () => {
        const { queryByTestId } = render(<UserSignIcon userSign={null} name={null} />);
        expect(queryByTestId('astro-image')).toBeNull();
        expect(queryByTestId('sign-name')).toBeNull();
    });

    it('should not render if userSign and name are empty strings', () => {
        const { queryByTestId } = render(<UserSignIcon userSign="" name="" />);
        expect(queryByTestId('astro-image')).toBeNull();
        expect(queryByTestId('sign-name')).toBeNull();
    });

    it('should not render if userSign is an empty string and name is null', () => {
        const { queryByTestId } = render(<UserSignIcon userSign="" name={null} />);
        expect(queryByTestId('astro-image')).toBeNull();
        expect(queryByTestId('sign-name')).toBeNull();
    });

    it('should not render if userSign is null and name is an empty string', () => {
        const { queryByTestId } = render(<UserSignIcon userSign={null} name="" />);
        expect(queryByTestId('astro-image')).toBeNull();
        expect(queryByTestId('sign-name')).toBeNull();
    });

    it('renders correctly with valid sign name', () => {
        const { getByTestId } = render(<UserSignIcon userSign="leo" name="leo" />);
        const image = getByTestId('astro-image');
        expect(image.props.source).toEqual(require('../../assets/icons/signs/leo.png'));
    });
});
