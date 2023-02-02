import React from 'react';
import { View } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Pages/Home';
import Details from '../Pages/Details';
import Categorias from '../Pages/Categorias'
import Search from '../Pages/Search'

const Stack = createNativeStackNavigator();

export default function routes() {
   
 return (
     <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={Home}
        options={{
          
          headerShown:false,
        }}
      />
      <Stack.Screen
        name='Detalhes'
        component={Details}
        options={{
          title: 'Detalhes',
          headerBackTitleVisible:false,
          headerTintColor:'#fff',
          headerStyle:{
            backgroundColor:'#0F0219',
          }
        }}
      />
      <Stack.Screen
        name='Categoria'
        component={Categorias}
        options={{
          title: 'Categorias do Posts',
          headerBackTitleVisible:false,
          headerTintColor:'#fff',
          headerStyle:{
            backgroundColor:'#0F0219',
          }
        }}
      />
       <Stack.Screen
        name='Pesquisa'
        component={Search}
        options={{
          title: 'Procurando algo?',
          headerBackTitleVisible:false,
          headerTintColor:'#fff',
          headerStyle:{
            backgroundColor:'#0F0219',
          }
        }}
      />
     </Stack.Navigator>

  );
}