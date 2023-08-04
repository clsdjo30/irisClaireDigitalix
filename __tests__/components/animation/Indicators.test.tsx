import React from 'react';
import { Animated } from 'react-native';
import { render } from '@testing-library/react-native';
import Indicator from '../../../src/components/animation/Indicator';
import STEPPER from '../../../src/data/stepper';

describe('Indicator', () => {
  it('should render without crashing', () => {
    const scrollx = new Animated.Value(0);
    render(<Indicator scrollx={scrollx} />);
    // Vérifier que le rendu ne provoque pas d'erreurs
  });

  // Ajoutez d'autres tests ici pour vérifier le comportement attendu du composant.

});