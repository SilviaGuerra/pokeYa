import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SearchIcon} from 'native-base';

import PokeList from './Pokelist';
import PokeDetails from '../screens/PokeDetails';
import Search from '../screens/Search';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={PokeList}
        options={({navigation}) => ({
          headerLargeTitle: true,
          headerTitle: 'Pokédex',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <SearchIcon size="5" mt="0.5" color="black" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        component={PokeDetails}
        name="Detail"
        options={{
          headerTitle: '',
          headerTransparent: true,
          headerTintColor: 'white',
        }}
      />
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen
          name="Search"
          component={Search}
          options={() => ({
            headerTitle: '¿Quién es ese Pokémon?',
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MainNavigator;
