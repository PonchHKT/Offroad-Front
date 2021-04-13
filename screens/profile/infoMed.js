import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from 'react';

import Navbar from '../../components/Navbar';
import CustomInput from '../../components/CustomInput';


export function infoMed({ navigation }) {

    const [taille, setTaille] = useState({ value: '', error: '' })
    const [poids, setPoids] = useState({ value: '', error: '' })
    const [sang, setSang] = useState({ value: '', error: '' })


    return (
    <ScrollView>
        <View>
            <Navbar 
                key={1}
                dashboard={false}
                mapPress={() => navigation.navigate('dashboard')}
                plus={false}
                plusPress={() => navigation.navigate('addspot')}
                like={false}
                likePress={() => navigation.navigate('')}
                account={true}
            />
        </View>
        <View style={styles.container}>
            
            <Text style={styles.front}>Taille :</Text>
            <CustomInput
                key={2}
                placeholder={'1m75'}
                valeur={taille.value}
                error={!!taille.error}
                errorText={taille.error}
                text={(text) => setTaille({ value: text, error: '' })}
            />

            <Text style={styles.front}>Poids :</Text>
            <CustomInput
                key={3}
                placeholder={'63Kg'}
                valeur={poids.value}
                error={!!poids.error}
                errorText={poids.error}
                text={(text) => setPoids({ value: text, error: '' })}
            />

            <Text style={styles.front}>Groupe sanguin :</Text>
            <CustomInput
                key={4}
                placeholder={'O+'}
                valeur={sang.value}
                error={!!sang.error}
                errorText={sang.error}
                text={(text) => setPoids({ value: text, error: '' })}
            />

            <Text style={styles.front}>Numéro du proche à contacter :</Text>
                <View style={styles.rect}/>  

            <Text style={styles.front}>Allergies (à certains médicaments) :</Text>
                <View style={styles.rect}/>

            <Text style={styles.front}>Traitement suivis :</Text>
                <View style={styles.rect}/>

            <Text style={styles.front}>Autres (maladie/opération récente) :</Text>
            <View style={styles.rect}/>
            

        </View>
        <View style={styles.container2}>
            
            <TouchableOpacity
                style={styles.buttonArrondi}
                onPress={() => navigation.navigate('Profil')}
            >
                <Text style={styles.front}>Retour</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonArrondi}
                onPress={() => navigation.navigate('Profil')}
            >
                <Text style={styles.front}>Modifier</Text>
            </TouchableOpacity>

        <StatusBar style="auto" hidden={true}/>
        </View>
    </ScrollView>
)};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    container2: {
        flexDirection:'row',
    },
    front:{
        marginTop: 20,
        color: 'grey',
        height: 50,
        fontSize: 20,
        marginLeft: 20,
    },
});