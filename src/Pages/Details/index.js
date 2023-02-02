import React, {useEffect,useState, useLayoutEffect} from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, Share, TouchableOpacity, ScrollView, Modal } from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Feather, Entypo} from '@expo/vector-icons';

import api from '../../services/api';
import LinkWeb from '../../components/LinkWeb';


export default function Details() {
  const route = useRoute();
  const navigation = useNavigation();
  const [post, setPost]= useState({});
  const [links, setLinks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [openLink, setOpenLink] = useState();


  useEffect(() => {
      async function getPost(){
        const response = await api.get(`api/posts/${route.params.id}?populate=cover,category,opcoes`)
        setPost(response.data.data)
        setLinks(response.data?.data?.attributes?.opcoes)
      }
      getPost()
  },[])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
        onPress={handleShare}
        >
          <Entypo name='share' size={20} color='#fff'/>
        </TouchableOpacity>
      )
    })
  },[navigation, post])

  async function handleShare(){
    try{
      const result = await Share.share({
        message: `
        Confere esse post: ${post?.attributes?.title}

        ${post?.attributes?.description}
        Vi lá no app devpost!
        `
      })
      if(result.action === Share.sharedAction){
          if(result.activityType){
            console.log('ACTIVIY TYPE')
          }else{
            console.log('Compartilhado com sucesso')
          }
      }else if(result.action === Share.dismissedAction){
        console.log('Modal Fechado')
      }
    }catch(error){
      console.log('ERROR')
    }
  }


   function handleOpenLink(link){
       setModalVisible(true);
       setOpenLink(link)
   }

 return (
     <SafeAreaView style={styles.Container}>

       <Image
         style={styles.Capa}
         source={{uri:`http://192.168.15.50:1337${post?.attributes?.cover?.data?.attributes.url}`}}
       />
             <ScrollView 
      showsVerticalScrollIndicator={false}
      >
       <Text style={styles.Titulo}>{post?.attributes?.title}</Text>
       <Text style={styles.Descricao}>{post?.attributes?.description}</Text>

       {links.map( link => (
        <TouchableOpacity
        style={styles.btnLink}
        onPress={() => handleOpenLink(link)}
         key={link.id}
        >
          <Text style={styles.Link}>Ver Ebook</Text>
        </TouchableOpacity>
       ))}
       </ScrollView>

       <Modal animationType='slide' visible={modalVisible} transparent={true}>
        <LinkWeb

          link={openLink?.url}
          title={openLink?.name}
          closeModal={() => setModalVisible(false)}
        />
       </Modal>
     </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 Container:{
  flex:1,
  backgroundColor:'#fff'
 },
 Capa:{
  width:'100%',
  height:200,
 },
 Titulo:{
  fontSize:20,
  fontWeight:'bold',
  color:'#232630',
  marginHorizontal:18,
  marginVertical:10,
 },
 Descricao:{
  fontSize:16,
  color:'#232630',
  marginHorizontal:18,
  marginVertical:10,
 },
 Link:{
  fontSize:16,
  fontWeight:'bold',
  color:'#fff',
  alignItems:'center',
  textAlign:'center',
  padding:10,
 },
 btnLink:{
  backgroundColor:'#570495',
  height:50,
  marginHorizontal:18,
  marginVertical:20,
  borderRadius:6,
  justifyContent:'center',
  alignItems:'center'

 }
})