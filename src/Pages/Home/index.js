import React,{useEffect, useState} from 'react';
import { View,Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Feather} from '@expo/vector-icons';
import api from '../../services/api';
import {getFavorite, setFavorite} from '../../services/favorite';
import CategoryItem from '../../components/CategoryItem';
import FavoritePost from '../../components/favoritePost';
import Posts from '../../components/posts';


export default function Home() {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([])
  const [favCategory,setFavCategory] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadData(){
        await getListPosts();

        const category = await api.get("/api/categories?populate=icon")
        setCategories(category.data.data)
    }
    loadData()
  },[])

  useEffect(() => {
    async function favorite(){
      const response = await getFavorite()
      setFavCategory(response)
    }
    favorite()
  },[])

   async function getListPosts(){
    setLoading(true)
    const response = await api.get("api/posts?populate=cover&sort=createdAt:desc")
    setPosts(response.data.data)
    setLoading(false)
  }

  //Favoritando categoria
 async function handleFavorite(id){
     const response = await setFavorite(id)
     setFavCategory(response)

     console.log(response)
    //  alert('CATEGORIA FAVORITADA')
  }


 return (
   <SafeAreaView style={styles.container}>
      <View style={styles.Header}>
        <Text style={styles.Name}>dB Prototipo</Text>
        <TouchableOpacity onPress={()=> navigation.navigate('Pesquisa')}>
           <Feather name='search' size={25} color='#fff' />
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingRight:12,}}
        style={styles.categories}
        data={categories}
        keyExtrator={(item) => String(item.id)}
        renderItem={({item}) => (
          <CategoryItem
          data={item}
          favorite={() => handleFavorite(item.id)}
          />
        )}
      />

      <View style={styles.main}>
          { favCategory.length !== 0 && (
            <FlatList
            style={{marginTop:50, maxHeight:100, paddingStart:18,}}
            contentContainerStyle={{paddingEnd:18}}
            data={favCategory}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => String(item.id)}
            renderItem={({item}) => <FavoritePost data={item}/>}
            />
          )}

          <Text style={[styles.Title, 
           {marginTop:favCategory.length > 0 ? 14 : 40 }]}>Conteúdos em alta</Text>

           <FlatList
           style={{flex:1, paddingHorizontal:18,}}
           showsVerticalScrollIndicator={false}
           data={posts}
           keyExtractor={(item) => String(item.id)}
           renderItem={({item}) => <Posts data={item} />}
           refreshing={loading}
           onRefresh={() => getListPosts()}
           />

      </View>


   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#0F0219',
    flex:1,

  },
  Header:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginHorizontal:18,
    marginTop:18,
    marginBottom:24,
  },
  Name:{
    color:'#fff',
    fontSize:22,
    fontWeight: 'bold',

  },
  Titulo:{
    alignItems:'center',
    justifyContent: 'center',
    color:'#fff'
  },
  categories:{
    maxHeight:115,
    marginLeft:18,
    zIndex:9,
  },
  main:{
    backgroundColor:'#fff',
    flex:1,
    marginTop:-30,
  },
  Title:{
    fontSize:25,
    paddingHorizontal:18,
    marginBottom:14,

    fontWeight:'bold',
    color: '#0F0219',
  }
})