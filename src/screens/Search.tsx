import React, {useState, useEffect} from 'react';
import {
  Stack,
  Input,
  Spinner,
  Text,
  Center,
  Icon,
  SearchIcon,
} from 'native-base';

const Search = () => {
  const [text, setText] = useState('');

  return (
    <Stack flex={1} p="4">
      <Input
        placeholder="Buscar Pokémon por nombre o número"
        backgroundColor="white"
        rounded="xl"
        py="3"
        px="1"
        fontSize="14"
        returnKeyType="search"
        onSubmitEditing={({nativeEvent}) => setText(nativeEvent.text)}
        InputLeftElement={<SearchIcon name="search" color="black" m="3" />}
      />
      <Text>Seaaaaarch</Text>
    </Stack>
  );
};

export default Search;
