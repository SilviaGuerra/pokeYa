import {NativeStackScreenProps} from '@react-navigation/native-stack';
export interface AllPokemonProps {
  count: number;
  next: string;
  previous?: string;
  results: {
    name: string;
    url: string;
  }[];
}
export interface PokeLinkProps {
  name: string;
  url: string;
}

export interface PokeCardProps {
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
  species: {
    url: string;
  };
}

export interface SpeciesProps {
  flavor_text_entries: {
    flavor_text: string;
  }[];
}

export type MainStackParamList = {
  Home: undefined;
  Search: undefined;
  Detail: {
    name: string;
    url: string;
  };
};

export type MainStackScreenProps<T extends keyof MainStackParamList> =
  NativeStackScreenProps<MainStackParamList, T>;
