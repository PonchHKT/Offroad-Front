import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { StyleSheet, View, Text, ScrollView } from "react-native";
import React, { useState } from 'react';

import Navbar from '../../components/Navbar';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { commentsValidator } from '../../helpers/commentsValidator';


export function infoMed({ route, navigation }) {

    const { userInfos } = route.params;

    const [taille, setTaille] = useState({ value: '', error: '' })
    const [poids, setPoids] = useState({ value: '', error: '' })
    const [sang, setSang] = useState({ value: '', error: '' })
    const [numero, setNumero] = useState({ value: '', error: '' })
    const [allergies, setAllergies] = useState({ value: '', error: '' })
    const [traitement, setTraitement] = useState({ value: '', error: '' })
    const [other, setOther] = useState({ value: '', error: '' })

    const submit = async() => {

        const tailleError = commentsValidator(taille.value)
        const poidsError = commentsValidator(poids.value)
        const sangError = commentsValidator(sang.value)
        const numeroError = commentsValidator(numero.value)
        const allergiesError = commentsValidator(allergies.value)
        const traitementError = commentsValidator(traitement.value)
        const otherError = commentsValidator(other.value)

        if (tailleError || poidsError || sangError || numeroError || allergiesError || traitementError || otherError) {
            setTaille({ ...taille, error: tailleError })
            setPoids({ ...poids, error: poidsError })
            setSang({ ...sang, error: sangError })
            setNumero({ ...numero, error: numeroError })
            setAllergies({ ...allergies, error: allergiesError })
            setTraitement({ ...traitement, error: traitementError })
            setOther({ ...other, error: otherError })
            return;
      
        } else {
            fetch(`https://offroad-app.herokuapp.com/api/users/edit/medic/${userInfos.id}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({
                        pseudo: pseudo.value,
                        email: email.value,
                        password: password.value,
                        passwordConfirmation: passwordConfirmation.value,
                        level: level.value,
                        notif: true,
                    })
                })
                .then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData)
                })
            .catch((error) =>{
                console.error(error);
            })
        }
    };
    
    return (
    <ScrollView>
        <View>
            <Navbar 
                key={1}
                dashboard={false}
                mapPress={() => navigation.navigate('dashboard')}
                plus={false}
                plusPress={() => navigation.navigate('addspot', {userInfos: userInfos})}
                like={false}
                likePress={() => navigation.navigate('like', {userInfos: userInfos})}
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
                text={(text) => setSang({ value: text, error: '' })}
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
                <CustomInput
                key={5}
                placeholder={'O7 00 00 01 11'}
                valeur={numero.value}
                error={!!numero.error}
                errorText={numero.error}
                text={(text) => setNumero({ value: text, error: '' })}
            />

            <Text style={styles.front}>Allergies (à certains médicaments) :</Text>
                <CustomInput
                key={6}
                placeholder={'allergie au paracétamol'}
                valeur={allergies.value}
                error={!!allergies.error}
                errorText={allergies.error}
                text={(text) => setAllergies({ value: text, error: '' })}
            />


            <Text style={styles.front}>Traitements suivis :</Text>
                <CustomInput
                key={7}
                placeholder={'prise de médicament anti-coagulant'}
                valeur={traitement.value}
                error={!!traitement.error}
                errorText={traitement.error}
                text={(text) => setTraitement({ value: text, error: '' })}
            />


            <Text style={styles.front}>Autres (maladie/opération récente) :</Text>
            <CustomInput
                key={8}
                placeholder={'opération de la hanche le 20/05/2019'}
                valeur={other.value}
                error={!!other.error}
                errorText={other.error}
                text={(text) => setOther({ value: text, error: '' })}
            />

        </View>
        <View style={styles.container2}>
                
                <View style={{flex: 1, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-around', width: '99%', paddingTop: 10, paddingBottom: 20, marginTop: 20}}>
        
                    <CustomButton
                        key={1}
                        actionsbtn={() => navigation.navigate('profil', { userInfos: userInfos})}
                        title={'Retour'}
                        width={200}
                    />
        
                    <CustomButton
                        key={2}
                        actionsbtn={() => submit()}
                        title={'Modifier'}
                        width={200}
                    />
                </View>

            </View>
            <StatusBar style="auto" hidden={true}/>
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