import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Note from '../components/Note';
import Separator from '../components/Separator2';
import Separator2 from '../components/Separator';
import CustomButton from '../components/CustomButton';

export function addspot({ navigation }) {

return (

   <View>
       <View>
           <Text style={styles.title}>Signaler un spot</Text>
       </View>
       
       <View>
           <Text style={styles.commentText}>Décrire votre signalement :</Text>
       </View>

       <View>
           <TextInput style={styles.textInput}> </TextInput>
       </View>

       <Separator2/>
       <Separator2/>
       <Separator2/>
        <View>
        <CustomButton
            key={1}
            title={'VALIDER'}
            color={'black'}
            textColor={'white'}
            border={'gray'}
        />
    </View>

   </View> 

)};

const styles = StyleSheet.create({
    title: {
        color: '#606060',
        alignSelf: 'center',
        marginTop: 50,
        fontSize: 32,
    },
    commentText: {
        color: '#606060',
        justifyContent: 'flex-start',
        fontSize: 18,
        marginTop: 30,
        fontWeight: 'bold',
        left: 25,
    },
    textInput: {
        color: 'white',
        marginTop: 10,
        alignSelf: 'center',
        width: 300,
        height: 320,
        marginTop: 10,
        backgroundColor: '#484848',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#606060',
        textAlign: 'left',
        textAlignVertical: 'top',
        flexWrap: 'wrap',
    },
    noteText: {
        fontSize: 20,
        left: 20,
        marginTop: 10,
        color: '#606060',
    },
    note: {
        right: 78,
        marginTop: 5,
    }
});