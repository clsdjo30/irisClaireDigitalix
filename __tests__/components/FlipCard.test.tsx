import React from 'react';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react-native';
import FlipCard from '../../src/components/FlipCard';

jest.mock('react-native/Libraries/Image/Image', () => 'Image');


describe('FlipCard', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });
  it('renders the front and back images correctly', async () => {
    const { getByTestId, findByTestId } = render(
        <FlipCard frontImageUrl={require('front.png')} backImageUrl={require('back.png')} />
    );

    expect(getByTestId('frontImage').props.source).toEqual('test-file-stub');

    // Simulate pressing the card
    fireEvent.press(getByTestId('flipCard'));

    // Wait for the back image to be rendered
      const backImage = await waitFor(() => findByTestId('backImage'));

    expect(backImage.props.source).toEqual('test-file-stub');
});

    // Other tests...
});
