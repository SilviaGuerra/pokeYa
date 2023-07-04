import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import {useInfiniteQuery} from '@tanstack/react-query';
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
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <>
            {!data ? null : (
              <FlatList
                data={data.pages.flatMap(page => page.results)}
                // keyExtractor={item => item.name}
                renderItem={({item}) => (
                  <PokeCard url={item.url} name={item.name} />
                )}
                // onEndReached={loadMore}
                ListFooterComponent={() =>
                  isFetchingNextPage ? <ActivityIndicator /> : null
                }
              />
            )}
          </>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PokeList;
