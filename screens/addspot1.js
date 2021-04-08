import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import Note from '../components/Note';
import Separator from '../components/Separator2';
import Separator2 from '../components/Separator';
import CustomButton from '../components/CustomButton';
import Navbar from '../components/Navbar';

export function addspot({ navigation }) {

return (

    <ScrollView>

    <Navbar 
    key={1}
    id={1}
    dashboard={true}
    plus={false}
    plusPress={() => navigation.navigate('')}
    like={false}
    likePress={() => navigation.navigate('')}
    account={false}
    accountPress={() => navigation.navigate('')}/>

   <View>
       <View>
           <Text style={styles.title}>Ajout d'un spot</Text>
       </View>
       
       <View>
           <Text style={styles.commentText}>Ecrire un commentaire :</Text>
       </View>

       <View>
           <TextInput style={styles.textInput}> </TextInput>
       </View>

               
       <View>
            <Text style={styles.noteText}>Note :</Text>
            </View>

            <View style={styles.note}>
            <Note 
                key={1}
                note={4}
                edit={true}
                spacing={4}
                size={30}
            />
        </View>

        <Separator/>
        <Separator2/>
        <View>
        <CustomButton
            key={1}
            title={'SUIVANT'}
            color={'black'}
            textColor={'white'}
            border={'gray'}
        />
    </View>

   </View> 
   </ScrollView>

)};

const styles = StyleSheet.create({
    title: {
        color: '#606060',
        alignSelf: 'center',
        marginTop: 10,
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
        width: 300,
        height: 200,
        marginTop: 10,
        backgroundColor: '#484848',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#606060',
        left: 20,
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