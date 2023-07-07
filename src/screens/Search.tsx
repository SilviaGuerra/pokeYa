import React, {useState, useEffect} from 'react';
import {Stack, Input, Spinner, Text, Center, SearchIcon} from 'native-base';
import {useQuery} from '@tanstack/react-query';
import {MainStackScreenProps, PokeLinkProps} from '../utils/types/types';
import {fetchPokemon} from '../utils/api';

const Search = ({navigation}: MainStackScreenProps<'Search'>) => {
  const [text, setText] = useState('');
  const {data, fetchStatus, error} = useQuery<PokeLinkProps>(
    ['pokemon', text],
    () => fetchPokemon(text.toLowerCase()),
    {
      enabled: !!text,
    },
  );

  useEffect(() => {
    if (data) {
      navigation.replace('Detail', {
        name: data.name,
        url: 'https://pokeapi.co/api/v2/pokemon/' + data.name,
      });
    }
  }, [data, navigation]);

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
      <Center flex="1">
        {!!error && (
          <Text fontSize="xl" color="gray.500">
            No se han encontrado resultados para la búsqueda {text}
          </Text>
        )}
        {fetchStatus === 'fetching' && <Spinner size="lg" />}
      </Center>
    </Stack>
  );
};

export default Search;
