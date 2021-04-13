import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import Note from '../components/Note';
import Separator2 from '../components/Separator2';
import Separator from '../components/Separator';
import CustomButton from '../components/CustomButton';
import Navbar from '../components/Navbar';
import CustomTitle from '../components/CustomTitle';
import CustomInput from '../components/CustomInput';

export function addreview({ navigation }) {

    const [comment, setComment] = useState('');
    const [note, setNote] = useState(0);

    return (

        <ScrollView>

            <View>
                <Navbar 
                    key={1}
                    dashboard={true}
                    plus={false}
                    plusPress={() => navigation.navigate('addspot')}
                    like={false}
                    likePress={() => navigation.navigate('')}
                    account={false}
                    accountPress={() => navigation.navigate('')}
                />
            </View>

            <Separator/>
            <Separator/>

            <View>
                <CustomTitle
                    key={1}
                    id={1}
                    title={'Ajout d\'un avis'}
                />
            </View>
            
            <View>
                <Text style={styles.commentText}>Ecrire un commentaire :</Text>
            </View>

            <View>
                <CustomInput
                    key={1}
                    placeholder={''}
                    valeur={comment}
                    text={(text) => setComment(text)}
                    multiline={true}
                />
            </View>

                    
            <View>
                <Text style={styles.noteText}>Note :</Text>
                </View>

                <View style={styles.note}>
                <Note 
                    key={1}
                    note={note}
                    update={(val) => setNote(val)}
                    edit={true}
                    spacing={4}
                    size={30}
                />
            </View>

            <Separator/>
            <Separator2/>
            <Separator/>

            <View>

                <CustomButton
                    key={1}
                    title={'Valider'}
                />

            </View>
            <StatusBar style="auto" hidden={true}/>
        </ScrollView> 

)};

const styles = StyleSheet.create({
    commentText: {
        color: '#606060',
        fontSize: 18,
        marginTop: 20,
        fontWeight: 'bold',
        left: 25,
        bottom: 10,
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
});