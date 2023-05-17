import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
interface IProps{
  source: any,  
  rotate: SharedValue<number>
}
const CardBack = ({rotate, source}:IProps)=> {
    return (
      <Pressable 
      onPress={()=>{
        rotate.value = rotate.value ? 0 : 1;
      }} style={styles.container}>
         <Image source={source} style={styles.cardSize}  />
      </Pressable>
    );
  }
export default CardBack;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#023047',
    width: 60,
    height: 120,
    borderRadius: 10,
   
  },
  cardSize: {
    width: 60,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
},
});