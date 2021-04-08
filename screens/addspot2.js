import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import Note from '../components/Note';
import Separator from '../components/Separator2';
import Separator2 from '../components/Separator';
import CustomButton from '../components/CustomButton';
import CustomRadio from '../components/CustomRadio';
import Navbar from '../components/Navbar';

export function addspotnext({ navigation }) {

    const [checked, setChecked] = useState('Débutant');

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
            <Text style={styles.title}>Ajout d'un spot</Text>
        </View>

        <View style={styles.level}>
            <Text style={{fontSize: 20, color: '#606060'}}>Niveau :</Text>
            <View>
                <CustomRadio 
                    key={1}
                    value={'Débutant'}
                    color={'black'}
                    status={checked === 'Débutant' ? 'checked' : 'unchecked'}
                    action={() => setChecked('Débutant')}
                />
                <CustomRadio 
                    key={2}
                    value={'Intermédiaire'}
                    color={'black'}
                    status={checked === 'Intermédiaire' ? 'checked' : 'unchecked'}
                    action={() => setChecked('Intermédiaire')}
                />
                <CustomRadio 
                    key={3}
                    value={'Avancé'}
                    color={'black'}
                    status={checked === 'Avancé' ? 'checked' : 'unchecked'}
                    action={() => setChecked('Avancé')}
                />
                <CustomRadio 
                    key={4}
                    value={'Expert'}
                    color={'black'}
                    status={checked === 'Expert' ? 'checked' : 'unchecked'}
                    action={() => setChecked('Expert')}
                />
            </View>
        </View>
        
        <View style={styles.informationbox}>
            <Text style={styles.commentText}>Adresse :</Text>
        </View>

        <View>
            <TextInput style={styles.textInput}> </TextInput>
        </View>


        <View style={styles.informationbox1}>
            <Text style={styles.commentText1}>Information supplémentaire :</Text>
        </View>

        <View>
            <TextInput style={styles.textInput1}> </TextInput>
        </View>

        <View style={{bottom: 65}}>
        <Separator/>
            <CustomButton
                key={1}
                title={'AJOUTER'}
                color={'black'}
                textColor={'white'}
                border={'gray'}
            />
        </View>

    </ScrollView> 

)};

const styles = StyleSheet.create({
    title: {
        color: '#606060',
        alignSelf: 'center',
        marginTop: 38,
        fontSize: 32,
    },
    level: {
        marginTop: 15,
        paddingLeft: '6.5%',
    },
    informationbox: {
        bottom: 30,
        marginTop: 15,
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
        height: 50,
        marginTop: 8,
        backgroundColor: '#484848',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#606060',
        left: 20,
        textAlign: 'left',
        textAlignVertical: 'top',
        flexWrap: 'wrap',
        bottom: 35,
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
    informationbox1: {
        bottom: 30,
    },
    commentText1: {
        color: '#606060',
        justifyContent: 'flex-start',
        fontSize: 18,
        marginTop: 30,
        fontWeight: 'bold',
        left: 25,
        bottom: 28,
    },
    textInput1: {
        color: 'white',
        width: 300,
        height: 50,
        marginTop: 8,
        backgroundColor: '#484848',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#606060',
        left: 20,
        textAlign: 'left',
        textAlignVertical: 'top',
        flexWrap: 'wrap',
        bottom: 60,
    },
});