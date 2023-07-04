import React from 'react';
import {Text} from 'react-native';

const PokeDetails = ({route}) => {
  console.log(route);
  const {name} = route.name;
  return <Text>Detalle {name}</Text>;
};

export default PokeDetails;
