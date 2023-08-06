import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DayDrawScreen from '../DayDrawScreen';
import selectCard from '../DayDrawScreen';
import CARD_DECK from '../../../../data/cards';
import { ImageSourcePropType } from 'react-native';

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

describe('DayDrawScreen', () => {
    

    it('renders correctly', () => {
        const { toJSON } = render(<DayDrawScreen {...mockProps} />);
        expect(toJSON()).toMatchSnapshot();
    });

});

describe("Card Back Image", () => {
    let backCard: Array<ImageSourcePropType>;

    beforeEach(() => {
        backCard = CARD_DECK.map((card) => card.backImageUrl);
    });

    it("should create a backCard array from CARD_DECK", () => {
        expect(backCard).not.toBeNull();
        expect(backCard).toBeInstanceOf(Array);
    });

    it("should map each item in backCard to the backImageUrl of the card in CARD_DECK", () => {
        CARD_DECK.forEach((card, index) => {
            expect(backCard[index]).toEqual(card.backImageUrl);
        });
    });

    it("should contain equal length with CARD_DECK", () => {
        expect(backCard.length).toEqual(CARD_DECK.length);
    });

    // it("should contain only ImageSourcePropType", () => {
    //     backCard.forEach((item) => {
    //         expect(typeof item).toBe('object'); 
    //     });
    // });
});



