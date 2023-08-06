import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import Card from '../Card';

describe('Card', () => {
    const onPressMock = jest.fn();
    const imageSource = { uri: 'testUri' };

    it('renders correctly', () => {
        const { getByTestId } = render(<Card onPress={onPressMock} source={imageSource} />);

        const card = getByTestId('card');
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