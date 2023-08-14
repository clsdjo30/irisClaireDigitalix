import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import Card from '../Card';

describe('Card', () => {
    const onPressMock = jest.fn();
    const imageSource = { uri: 'testUri' };

    it('renders correctly', () => {
        const { getByTestId } = render(<Card onPress={onPressMock} source={imageSource} />);

<<<<<<< HEAD
<<<<<<< HEAD
        const card = getByTestId('cardss');
=======
        const card = getByTestId('card777777');
>>>>>>> parent of c23cc17 (test husky again)
=======
        const card = getByTestId('card777777999');
>>>>>>> c23cc170ed504f2ec358eaa39eb9a0015820114f
        expect(card).toBeTruthy();
    });

    it('calls onPress when pressed', () => {
        const { getByTestId } = render(<Card onPress={onPressMock} source={imageSource} />);

        const card = getByTestId('card');
        fireEvent.press(card);

        expect(onPressMock).toHaveBeenCalledWith();
    });

    it('displays the correct image', () => {
        const { getByTestId } = render(<Card onPress={onPressMock} source={imageSource} />);

        const image = getByTestId('card-image');
        expect(image.props.source.uri).toEqual('testUri');
    });
});