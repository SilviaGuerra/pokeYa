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
  Skeleton,
  Pressable,
  Center,
  AspectRatio,
} from 'native-base';
import {fetchFn} from '../utils/api';
import {formatNumber, getTypeColor} from '../utils/helpers';
import {
  MainStackScreenProps,
  PokeCardProps,
  PokeLinkProps,
} from '../utils/types/types';

const PokeCard = ({url, name}: PokeLinkProps) => {
  const navigation =
    useNavigation<MainStackScreenProps<'Home'>['navigation']>();

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
      onPress={() => navigation.navigate('Detail', {name, url})}>
      {(() => {
        if (isLoading) {
          return <ActivityIndicator />;
        }
      })()}
      {!data || error ? null : (
        <>
          <Center
            safeArea
            backgroundColor={getTypeColor(data.types[0].type.name) + '.500'}>
            <AspectRatio ratio={1} width="80%">
              <Image
                source={{
                  uri: data.sprites.other['official-artwork'].front_default,
                }}
                alt={data.name}
              />
            </AspectRatio>
          </Center>
          <HStack justifyContent="space-between" mb={2}>
            <Heading textTransform="capitalize" color="white" size="sm">
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
                  fontSize: 'xs',
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
