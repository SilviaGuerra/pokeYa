import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NativeBaseProvider} from 'native-base';
// import {TouchableOpacity} from 'react-native';
// import {MaterialIcons} from '@expo/vector-icons';

import PokeList from './src/components/Pokelist';
import PokeDetails from './src/components/PokeDetails';
// import Search from './src/components/Search';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={PokeList}
              // options={({navigation}) => ({
              options={() => ({
                headerLargeTitle: true,
                headerTitle: 'Pokedex',
                // headerRight: () => (
                //   <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                //     <MaterialIcons name="search" color="black" size={32} />
                //   </TouchableOpacity>
                // ),
              })}
            />
            {/* <Stack.Screen name="Home" component={PokeList} /> */}
            <Stack.Screen name="Details" component={PokeDetails} />
            {/* <Stack.Group screenOptions={{presentation: 'modal'}}>
              <Stack.Screen name="Search" component={Search} />
            </Stack.Group> */}
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
};

export default App;
