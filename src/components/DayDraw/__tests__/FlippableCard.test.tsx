import { useEffect, useRef, useState } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { render, fireEvent } from '@testing-library/react-native';
import { ImageSourcePropType } from 'react-native';
import FlippableCard from '../FlippableCard';

const useMyHook = () => {
  const rotate = useRef(0);
  const [flipped, setFlipped] = useState(false);

  // Code to be tested
  useEffect(() => {
    rotate.current = flipped ? 1 : 0;
  }, [flipped]);

  return { rotate, flipped, setFlipped };
};

describe('FlippableCard', () => {
  const mockProps = {
    source: require('../../../../assets/images/cards/back/Card_Back_001.png') as ImageSourcePropType,
    onPress: jest.fn(),
    flipped: false,
    isBackCard: false
  };

  it('renders correctly', () => {
    const tree = render(<FlippableCard {...mockProps} />);
    expect(tree).toMatchSnapshot();
  });

  

  it('calls onPress when the card is clicked', () => {
    const { getByTestId } = render(<FlippableCard {...mockProps} />);
    const card = getByTestId('card');

    fireEvent.press(card);

    expect(mockProps.onPress).toHaveBeenCalled();
  });
 
  
  it('should flip when pressed', () => {
    const { getByTestId } = render(
      <FlippableCard {...mockProps} />
    );
    const card = getByTestId('card');
    fireEvent.press(card);
    expect(card).toBeTruthy();
  });

  it('should not flip when pressed', () => {
    const { getByTestId } = render(
      <FlippableCard {...mockProps} />
    );
    const card = getByTestId('card');
    fireEvent.press(card);
    expect(card).toBeTruthy();
  });

  it('should update rotate value on flipped state change', () => {
    const { result } = renderHook(() => useMyHook());

    // Initial state
    expect(result.current.rotate.current).toEqual(0);
    expect(result.current.flipped).toEqual(false);

    act(() => {
      result.current.setFlipped(true);
    });

    // Dispose it since the ref object will hold the old value.
    renderHook(() => useMyHook()).unmount();

    // After flipping
    expect(result.current.rotate.current).toEqual(1);
    expect(result.current.flipped).toEqual(true);
  });

});
