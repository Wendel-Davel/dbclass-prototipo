import React, {useState, useEffect} from 'react';

import { View, Text, StyleSheet, TextInput, Platform,Keyboard, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import {Feather} from '@expo/vector-icons';
import Posts from '../../components/posts';

import api from '../../services/api';

export default function Search() {
  const [pesquisa, setPesquisa] = useState('');
  const [posts, setPosts] = useState([]);
  const [empty, setEmpty] = useState('')


  async function handleSearchPost(){
      if(pesquisa === '') {
        alert('Digite o que você procura')
        return
      }
    const response = await api.get(`api/posts?filters[title][$containsi]=${pesquisa}&populate=cover`)

    if(response.data?.data.length === 0){
      setEmpty(true);
      setPosts([]);
      return;
    }
    // console.log(response.data?.data)
    setPosts(response.data?.data)
    setEmpty(false)
    setPesquisa('');
    Keyboard.dismiss();
  }
 return (
    
   <View style={styles.Container} behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
     <View style={styles.containerInput}>
       <TextInput

        placeholder='O que você procura ?'
        autoCorrect={false}
        autoCapitalize="none"
        value={pesquisa}
        onChangeText={ (text) => setPesquisa(text) }
        style={styles.Input}
       />
    
       <TouchableOpacity 
        onPress={handleSearchPost}
        style={styles.Button}>
          <Feather name='search' size={20} color='#232630' />
       </TouchableOpacity>
     </View>
     <View style={styles.ContainerList}>
      {empty && (
        <View>
          <Text>Hummm... Não encontramos o que você procura</Text>
        </View>
      )}
 
      <FlatList
       data={posts}
       keyExtractor={(item) => String(item.id)}
       renderItem={({item}) => <Posts data={item} />}
      />
     </View>
   </View>
  );
}

const styles = StyleSheet.create({
 Container:{
  flex:1,
  backgroundColor:'#fff',
  padding:18,

 },
 Input:{
   fontSize:17,
   color:'#232630',
   backgroundColor:'#ddd',
   padding:18,
   width:'85%',
   borderTopLeftRadius:6,
   borderBottomLeftRadius:6,
 },
 containerInput:{
  flexDirection:'row',
  alignItems:'center',
  width:'100%',
  borderRadius:3,
  marginBottom:20,
 },
 Button:{
  backgroundColor:'#ddd',
  padding:18,
  borderTopRightRadius:6,
  borderBottomRightRadius:6,
 },
 ContainerList:{
  flex:1,
 }
})