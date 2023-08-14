import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PolicyModal from '../PolicyModal';

describe('<PolicyModal />', () => {
    it('renders correctly when visible is true', () => {
        const { getByText } = render(<PolicyModal visible={true} onClose={jest.fn()} onAgree={jest.fn()} />);
        expect(getByText('Politique d\'utilisation')).toBeTruthy();
    });

    it('does not render when visible is false', () => {
        const { queryByText } = render(<PolicyModal visible={false} onClose={jest.fn()} onAgree={jest.fn()} />);
        expect(queryByText('Politique d\'utilisation')).toBeNull();
    });

    it('calls onAgree when Accept button is pressed', () => {
        const onAgreeMock = jest.fn();
        const { getByText } = render(<PolicyModal visible={true} onClose={jest.fn()} onAgree={onAgreeMock} />);
        fireEvent.press(getByText('Accepter nos politiques d\'utilisation'));
        expect(onAgreeMock).toHaveBeenCalled();
    });

});
