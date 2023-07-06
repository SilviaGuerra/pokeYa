import React from 'react';
import {useInfiniteQuery} from '@tanstack/react-query';
import {Center, Spinner, FlatList} from 'native-base';

import PokeCard from './PokeCard';
import {fetchAllPokemon} from '../utils/api';

interface AllPokemonProps {
  count: number;
  next: string;
  previous?: string;
  results: {
    name: string;
    url: string;
  }[];
}

const PokeList = () => {
  const {data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage} =
    useInfiniteQuery<AllPokemonProps>(['pokemons'], fetchAllPokemon, {
      getNextPageParam: lastPage => lastPage.next,
    });

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage;
    }
  };

  if (isLoading) {
    return (
      <Center flex={1}>
        <Spinner size="lg" color="black" />
      </Center>
    );
  }

  return (
    <>
      {!data ? null : (
        <FlatList
          data={data.pages.flatMap(page => page.results)}
          keyExtractor={item => item.name}
          renderItem={({item}) => <PokeCard url={item.url} name={item.name} />}
          onEndReached={loadMore}
          numColumns={2}
          contentInsetAdjustmentBehavior="automatic"
          ListFooterComponent={() =>
            isFetchingNextPage ? (
              <Spinner mt="4" size="lg" color="black" />
            ) : null
          }
          _contentContainerStyle={{p: 2, bg: 'white'}}
        />
      )}
    </>
  );
};

export default PokeList;
