import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {
  AspectRatio,
  Image,
  Heading,
  Stack,
  HStack,
  Center,
  Skeleton,
  Text,
} from 'native-base';
import {fetchFn} from '../utils/api';
import {
  MainStackScreenProps,
  PokeCardProps,
  SpeciesProps,
} from '../utils/types/types';
import {
  formatNumber,
  getTypeColor,
  removeEscapeCharacters,
} from '../utils/helpers';

const PokeDetails = ({route}: MainStackScreenProps<'Detail'>) => {
  const {name, url} = route.params;
  const {data} = useQuery<PokeCardProps>(['pokemon', name], () => fetchFn(url));

  const {isLoading: isLoadingSpecies, data: species} = useQuery<SpeciesProps>(
    ['species', name],
    () => fetchFn(data?.species.url || ''),
    {
      enabled: !!data,
    },
  );

  if (!data) return null;

  return (
    <Stack>
      <Center backgroundColor={getTypeColor(data.types[0].type.name) + '.500'}>
        <AspectRatio ratio={1} width="80%">
          <Image
            source={{
              uri: data.sprites.other['official-artwork'].front_default,
            }}
            alt={data.name}
          />
        </AspectRatio>
        <HStack
          justifyContent="space-between"
          width="100%"
          p="3"
          alignItems="center"
          position="absolute"
          bottom={0}
          left={0}
          right={0}>
          <Heading color="white" textTransform="capitalize" size="2xl">
            {name}
          </Heading>
          <Heading color="white"># {formatNumber(data.id)}</Heading>
        </HStack>
      </Center>
      <Stack p="3">
        <HStack justifyContent="center">
          {data.types.map(type => (
            <Center
              key={type.type.name}
              backgroundColor={getTypeColor(type.type.name) + '.500'}
              rounded="full"
              p="1"
              minW="32"
              _text={{
                color: 'white',
                fontSize: 'lg',
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}
              mx="2">
              {type.type.name}
            </Center>
          ))}
        </HStack>
        <Center>
          {isLoadingSpecies && <Skeleton.Text />}
          {!!species && (
            <Text fontSize="xl" mt="4">
              {removeEscapeCharacters(
                species.flavor_text_entries[0].flavor_text,
              )}
            </Text>
          )}
        </Center>
      </Stack>
    </Stack>
  );
};

export default PokeDetails;
