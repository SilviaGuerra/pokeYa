import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import PokeList from './src/components/Pokelist';
import PokeDetails from './src/components/PokeDetails';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PokeList />
    </QueryClientProvider>
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Pokedex" component={PokeList} />
    //     <Stack.Screen name="Details" component={PokeDetails} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default App;
