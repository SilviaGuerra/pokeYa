import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import PokeCard from './PokeCard';

interface PokemonProps {
  name: string;
  url: string;
}

const PokeList = () => {
  const [pokemon, setPokemon] = useState<PokemonProps[]>([]);
  const [next, setNext] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/')
      .then(res => res.json())
      .then(data => {
        setPokemon(data.results);
        setNext(data.next);
      });
  }, []);

  const loadMore = () => {
    if (next) {
      setIsLoading(true);
      fetch(next)
        .then(res => res.json())
        .then(data => {
          setPokemon(prevPokemon => [...prevPokemon, ...data.results]);
          setNext(data.next);
          setIsLoading(false);
        });
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <FlatList
            data={pokemon}
            // keyExtractor={item => item.name}
            renderItem={({item}) => (
              <PokeCard url={item.url} name={item.name} />
            )}
            // onEndReached={loadMore}
            ListFooterComponent={() =>
              isLoading ? <ActivityIndicator /> : null
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PokeList;
