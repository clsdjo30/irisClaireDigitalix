import React from 'react';
import { Animated } from 'react-native';
import { render } from '@testing-library/react-native';
import Square from '../../../src/components/animation/Square';

describe('Backdrop', () => {
  it('should render without crashing', () => {
    const scrollx = new Animated.Value(0);
    render(<Square scrollx={scrollx} />);
    // Vérifier que le rendu ne provoque pas d'erreurs
  });

  // Ajoutez d'autres tests ici pour vérifier le comportement attendu du composant.
});