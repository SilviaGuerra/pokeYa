import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {useNavigation} from '@react-navigation/native';
import {fetchFn} from '../utils/api';

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
  const {isLoading, error, data} = useQuery<PokeCardProps>(
    ['pokemon', name],
    () => fetchFn(url),
  );

  return (
    <TouchableOpacity
      style={styles.container}
      // onPress={() => navigation.navigate('Details', {name})}
    >
      {(() => {
        if (isLoading) {
          return <ActivityIndicator />;
        }
      })()}
      {!data || error ? null : (
        <>
          <Image
            source={{
              uri: data.sprites.other['official-artwork'].front_default,
            }}
            style={styles.image}
          />
          <Text>{data.name}</Text>
        </>
      )}
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
