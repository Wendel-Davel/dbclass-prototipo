import React, {useEffect,useState, useLayoutEffect} from 'react';
import { View,Text, ScrollView, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import api from '../../services/api';
import {useNavigation, useRoute} from '@react-navigation/native';

import Posts from '../../components/posts';
import posts from '../../components/posts';

export default function Categorias() {

  const route = useRoute();
  const navigation = useNavigation();

  const [post, setPost] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title:route.params?.title === '' ? 'Categoria' : route.params?.title
    })
  },[navigation])

  useEffect(() => {
    async function loadPost(){
      const response = await api.get(`api/categories/${route.params?.id}?fields=name&populate=posts,posts.cover`)
      setPost(response.data?.data.attributes?.posts?.data)
    }

    loadPost();
  })



 return (
   <View style={styles.Container}>
      {post.length === 0 &&(
        <View style={styles.avisoContainer}> 
          <Text style={styles.aviso}>Essa categoria ainda não possui posts</Text>
         <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Home')}>
           <Text style={styles.btnTitle}>Ver todos os Posts</Text>
         </TouchableOpacity>
        </View> 

      )}
       <FlatList
       data={post}
       keyExtractor={(item) => String(item.id)}
       renderItem={({item}) => <Posts data={item} />}
      />
   </View>
  );
}

const styles = StyleSheet.create({
  Container:{
    marginHorizontal:18,
  },
  aviso:{
    fontSize:28,
    fontWeight:'bold',
    textAlign:'center',
    color:'#232630',
    
  },
  avisoContainer:{
    marginVertical:20,
    justifyContent:'center',
    alignItems:'center'
  },
  btn:{
    backgroundColor:'#f34566',
    width:'100%',
    padding:13,
    borderRadius:6,
    height:50,
    marginTop:30,
  },
  btnTitle:{
    fontSize:20,
    color:'#fff',
    textAlign:'center',
    fontWeight:'500'
  }
})