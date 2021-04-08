import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import Note from '../components/Note';
import Separator2 from '../components/Separator2';
import Separator from '../components/Separator';
import CustomButton from '../components/CustomButton';
import Navbar from '../components/Navbar';
import CustomTitle from '../components/CustomTitle';

export function addspot({ navigation }) {

return (

    <ScrollView>

        <Navbar 
            key={1}
            id={1}
            dashboard={false}
            plus={true}
            like={false}
            likePress={() => navigation.navigate('')}
            account={false}
            accountPress={() => navigation.navigate('')}
        />

        <View>

            <Separator/>
            <Separator/>

            <View>
                <CustomTitle
                    key={1}
                    id={1}
                    title={'Ajout d\'un spot'}
                />
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
            <Separator2/>
            <View style={styles.note}>
                <Note 
                    key={1}
                    note={4}
                    edit={true}
                    spacing={4}
                    size={30}
                />
            </View>

            <View style={styles.margin}>
            
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
        </View> 
   </ScrollView>
)};

const styles = StyleSheet.create({
    title: {
        color: '#606060',
        alignSelf: 'center',
        marginTop: 35,
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
        color: 'black',
        width: 300,
        height: 200,
        marginTop: 10,
        backgroundColor: 'ghostwhite',
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
    },
    margin: {
        top: 15,
    },
});