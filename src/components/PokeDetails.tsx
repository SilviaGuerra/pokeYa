import React from 'react';
import {Text} from 'react-native';

const PokeDetails = ({route}) => {
  const {name} = route.params;
  return <Text>{name}</Text>;
};

export default PokeDetails;
