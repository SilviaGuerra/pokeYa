import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {useNavigation} from '@react-navigation/native';
import {
  Box,
  Heading,
  Image,
  Text,
  HStack,
  Pressable,
  Center,
  AspectRatio,
} from 'native-base';
import {fetchFn} from '../utils/api';
import {formatNumber, getTypeColor} from '../utils/helpers';

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
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
}

const PokeCard = ({url, name}: PokeLinkProps) => {
  const navigation = useNavigation();
  const {isLoading, error, data} = useQuery<PokeCardProps>(
    ['pokemon', name],
    () => fetchFn(url),
  );

  return (
    <Pressable
      flex={1}
      m="1.5"
      p="4"
      backgroundColor={
        data ? getTypeColor(data.types[0].type.name) + '.500' : ''
      }
      borderRadius={10}
      onPress={() => navigation.navigate('Details', {name})}>
      {(() => {
        if (isLoading) {
          return <ActivityIndicator />;
        }
      })()}
      {!data || error ? null : (
        <>
          <Center>
            <AspectRatio ratio={1} width="80%">
              <Image
                source={{
                  uri: data.sprites.other['official-artwork'].front_default,
                }}
                alt="Pokeimage"
              />
            </AspectRatio>
          </Center>
          <HStack justifyContent="space-between" mb={2}>
            <Heading textTransform="capitalize" color="white">
              {data.name}
            </Heading>
            <Text color="white">#{formatNumber(data.id)}</Text>
          </HStack>
          <HStack>
            {data.types.map(type => (
              <Box
                key={type.type.name}
                px="2"
                mr="1"
                backgroundColor={getTypeColor(type.type.name) + '.400'}
                borderRadius={10}
                _text={{
                  color: 'white',
                }}>
                {type.type.name}
              </Box>
            ))}
          </HStack>
        </>
      )}
    </Pressable>
  );
};

export default PokeCard;
