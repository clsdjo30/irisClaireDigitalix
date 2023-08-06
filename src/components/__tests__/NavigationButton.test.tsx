import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NavigationButton from '../NavigationButton';

describe('NavigationButton', () => {
    it('renders correctly', () => {
        const { getByText } = render(
            <NavigationButton
                title="Test"
                onPress={() => { }}
            />
        );

        expect(getByText('Test')).toBeTruthy();
    });

    it('calls onPress when pressed', () => {
        const onPressMock = jest.fn();

        const { getByText } = render(
            <NavigationButton
                title="Test"
                onPress={onPressMock}
            />
        );

        fireEvent.press(getByText('Test'));

        expect(onPressMock).toHaveBeenCalled();
    });

    it('renders the correct title', () => {
        const { getByText, rerender } = render(
            <NavigationButton
                title="Test"
                onPress={() => { }}
            />
        );

        expect(getByText('Test')).toBeTruthy();

        rerender(
            <NavigationButton
                title="Changed"
                onPress={() => { }}
            />
        );

        expect(getByText('Changed')).toBeTruthy();
    });

});
