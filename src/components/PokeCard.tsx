import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {useNavigation} from '@react-navigation/native';

interface PokeLinkProps {
  url: string;
  name: string;
}

interface PokeCardProps {
  name?: string;
  order?: number;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}

const PokeCard = ({url, name}: PokeLinkProps) => {
  // const {isLoading, error, data} = useQuery(['pokemon', name], () =>
  //   fetch(url).then(res => res.json()),
  // );
  const [pokemon, setPokemon] = useState<PokeCardProps>();
  const navigation = useNavigation();

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setPokemon(data);
      });
  }, [url]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Details', {name})}>
      {pokemon ? (
        <>
          <Image
            source={{
              uri: pokemon.sprites.other['official-artwork'].front_default,
            }}
            style={styles.image}
          />
          <Text>{pokemon.name}</Text>
        </>
      ) : null}
    </TouchableOpacity>
  );
};

export default PokeCard;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 32,
  },
});
