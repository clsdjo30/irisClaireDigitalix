import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CardChoices from '../CardChoices'; 


describe('CardChoices', () => {
    it('renders correctly', () => {
        const onPressMock = jest.fn();
        const { getByText } = render(
            <CardChoices
                iconSource={require('../../../assets/images/testVector/yesNo.png')} 
                onPress={onPressMock}
                title="Test Title"
                explanation="Test Explanation"
            />
        );

        // Vérifie si le titre et l'explication sont correctement rendus
        expect(getByText('Test Title')).toBeTruthy();
        expect(getByText('Test Explanation')).toBeTruthy();
    });

    it('calls onPress when pressed', () => {
        const onPressMock = jest.fn();
        const { getByText } = render(
            <CardChoices
                iconSource={require('../../../assets/images/testVector/yesNo.png')} // Remplacez par le chemin d'accès réel
                onPress={onPressMock}
                title="Test Title"
                explanation="Test Explanation"
            />
        );

        // Simule un appui sur le composant
        fireEvent.press(getByText('Test Title'));

        // Vérifie si le gestionnaire onPress a été appelé
        expect(onPressMock).toHaveBeenCalled();
    });

    it('renders correctly with given props', () => {
        const onPressMock = jest.fn();
        const testTitle = 'Test Title';
        const testExplanation = 'Test Explanation';
        const { getByText } = render(
            <CardChoices
                iconSource={require('../../../assets/images/testVector/yesNo.png')} 
                onPress={onPressMock}
                title={testTitle}
                explanation={testExplanation}
            />
        );

        // Vérifie si le titre et l'explication sont correctement rendus
        expect(getByText(testTitle)).toBeTruthy();
        expect(getByText(testExplanation)).toBeTruthy();
    });

    it('renders icon correctly', () => {
        const onPressMock = jest.fn();
        const iconSource = require('../../../assets/images/testVector/yesNo.png'); 
        const { getByTestId } = render(
            <CardChoices
                iconSource={iconSource}
                onPress={onPressMock}
                title="Test Title"
                explanation="Test Explanation"
            />
        );

        // Obtenez le composant Image par son testID
        const icon = getByTestId('card-icon');

        // Vérifiez que la prop source est correcte
        expect(icon.props.source).toEqual(iconSource);
    });
});
