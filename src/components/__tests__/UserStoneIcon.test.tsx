import React from 'react';
import { render, cleanup } from '@testing-library/react-native';
import UserStoneIcon from '../UserStoneIcon';

afterEach(cleanup);

const STONE_NAMES = ['Onyx', 'Cornaline', 'Amethyst', 'Emerald', 'Ruby', 'Sapphire', 'Topaz', 'Agate', 'Beryl', 'Chrysolite', 'Camelian', 'Heliotrope'];

describe('UserStoneIcon', () => {
    STONE_NAMES.forEach(stone => {
        it(`should render correctly with the "${stone}" stone`, () => {
            const { getByText, getByTestId } = render(<UserStoneIcon userStone={stone} />);
            expect(getByTestId('stone-image')).toBeTruthy();
            expect(getByText('Ma Pierre')).toBeTruthy();
        });
    });

    it('should not render if an invalid stone is passed', () => {
        const { queryByTestId } = render(<UserStoneIcon userStone="invalidStone" />);
        expect(queryByTestId('stone-image')).toBeNull();
    });

    it('should not render if userStone is null or an empty string', () => {
        const { queryByTestId } = render(<UserStoneIcon userStone={null} />);
        expect(queryByTestId('stone-image')).toBeNull();

        const { queryByTestId: queryByTestId2 } = render(<UserStoneIcon userStone="" />);
        expect(queryByTestId2('stone-image')).toBeNull();
    });
});
