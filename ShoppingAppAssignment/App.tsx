/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProductList, CartList } from './app/screens';
import {store} from './app/data/Store'
import { Provider } from 'react-redux';



type SectionProps = PropsWithChildren<{
  title: string;
}>;

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App(): JSX.Element {

  return (
    <Provider store={store}>
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Product" component={ProductList} />
          <Tab.Screen name="Cart" component={CartList} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
