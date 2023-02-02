import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text } from 'react-native';
import Home from './src/Pages/Home';
import Routes from './src/routes';
import { NavigationContainer } from '@react-navigation/native';
export default function App() {
 return (
      <NavigationContainer>
      <StatusBar style='light'/>
      <Routes/>
      </NavigationContainer>
  );
}