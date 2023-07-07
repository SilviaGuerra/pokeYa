import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../App';

let component: any;

describe('<App />', () => {
  beforeEach(() => {
    component = render(<App />);
  });
  it('Renderiza correctamente', () => {
    expect(component).toBeDefined();
    expect(component.getByTestId('load-data-pokemon')).toBeDefined();
  });
});
