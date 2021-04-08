import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export function addreview({ navigation }) {

return (

   <View>
       <View>
           <Text style={styles.title}>Ajout d'un avis</Text>
       </View>
   </View> 

)};

const styles = StyleSheet.create({
    title: {
        color: '#606060',
        alignSelf: 'center',
    },
});