import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { StyleSheet, View, Text, ScrollView, Dimensions } from "react-native";
import React, { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";

import Navbar from '../../components/Navbar';
import CustomInput from '../../components/CustomInput';
import ModalDropdown from 'react-native-modal-dropdown';
import CustomButton from '../../components/CustomButton';
import Separator from '../../components/Separator';
import { pseudoValidator } from '../../helpers/auth/pseudoValidator';
import { emailValidator } from '../../helpers/auth/emailValidator';
import { passwordValidator } from '../../helpers/auth/passwordValidator';

const { width: WIDTH } = Dimensions.get('window')


export function infoUser({ route, navigation }) {

    const { userInfos, token } = route.params;

    const [security, setSecurity] = useState(true);
    const [user, setUser] = useState({});
    const [token2, setToken] = useState('');

    const [pseudo, setPseudo] = useState({ value: userInfos.pseudo, error: '' })
    const [email, setEmail] = useState({ value: userInfos.email, error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [passwordConfirmation, setPasswordConf] = useState({ value: '', error: '' })
    const [level, setLevel] = useState(0);
    const [notif, setNotif] = useState(0);

    const changeSecurity = () => {
        { security ?
            setSecurity(false)
        :
            setSecurity(true)
        }
    }

    const levelChose = (val) => {
        switch (val) {
            case 0:
                setLevel('DEBUTANT')
                break;
            case 1:
                setLevel('INTERMEDIAIRE')
                break;
            case 2:
                setLevel('AVANCE')
                break;
            case 3:
                setLevel('EXPERT')
                break;
            default:
                break;
        }
    }

    const notifChose = (val) => {
        switch (val) {
            case 0:
                setNotif(true)
                break;
            case 1:
                setNotif(false)
                break;
            default:
                break;
        }
    }

    const submit = async() => {

        const pseudoError = pseudoValidator(pseudo.value)
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        const passwordError2 = passwordValidator(passwordConfirmation.value)

        if (pseudoError || emailError || passwordError || passwordError2) {
            setPseudo({ ...pseudo, error: pseudoError })
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            setPasswordConf({ ...passwordConfirmation, error: passwordError2 })
            return;
      
        } else {
            fetch(`https://offroad-app.herokuapp.com/api/users/edit/${userInfos.id}`, {
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
                        level: level,
                        notif: notif,
                    })
                })
                .then((response) => response.json())
                .then(async(responseData) => {
                    console.log(responseData)
                    await AsyncStorage.removeItem('token')
                    AsyncStorage.setItem('token', responseData.data.token)
                    .then((tokenUser) => { 
                        const decryptToken = jwt_decode(tokenUser);
                        setUser(decryptToken)
                        setToken(tokenUser)
                    })
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
                    plusPress={() => navigation.navigate('addspot')}
                    like={false}
                    likePress={() => navigation.navigate('')}
                    account={true}
                />
            </View>
            <View style={styles.container}>
                
                <Text style={styles.front}>Pseudo :</Text>
                <CustomInput
                    key={2}
                    valeur={pseudo.value}
                    error={!!pseudo.error}
                    errorText={pseudo.error}
                    text={(text) => setPseudo({ value: text, error: '' })}
                />

                <Text style={styles.front}>Adresse email :</Text>
                <CustomInput
                    key={3}
                    valeur={email.value}
                    error={!!email.error}
                    errorText={email.error}
                    text={(text) => setEmail({ value: text, error: '' })}
                />

                <Text style={styles.front}>Mot de passe :</Text>
                <CustomInput
                    key={4}
                    valeur={password.value}
                    error={!!password.error}
                    errorText={password.error}
                    text={(text) => setPassword({ value: text, error: '' })}
                    secure={security}
                    pwd={true}
                    changeVisibility={changeSecurity}
                />

                <Text style={styles.front}>Confirmation du mot de passe :</Text>
                <CustomInput
                    key={5}
                    valeur={passwordConfirmation.value}
                    error={!!passwordConfirmation.error}
                    errorText={passwordConfirmation.error}
                    text={(text) => setPasswordConf({ value: text, error: '' })}
                    secure={security}
                    pwd={true}
                    changeVisibility={changeSecurity}
                />

                <Text style={styles.front}>Niveau :</Text>
                <View style={styles.picker}>
                    <ModalDropdown
                        options={ ['D??butant', 'Interm??diaire','Avanc??', 'Expert']}
                        style={{height: 40, width: '100%'}}
                        onSelect={(val) => levelChose(val)}
                        dropdownStyle={styles.dropdown}
                        dropdownTextStyle={{fontSize: 20, width: WIDTH - 70}}
                        defaultValue={'Appuyer pour choisir'}
                        textStyle= {{fontSize: 20, marginLeft: 10, marginTop: 5}}
                    />
                </View>

                <Separator />
                <Separator />
                <Separator />

                <Text style={styles.front}>Notifications :</Text>
                <View style={styles.picker}>
                    <ModalDropdown
                    options={ ['Oui', 'Non']}
                    style={{height: 40, width: '100%'}}
                    onSelect={(val) => notifChose(val)}
                    dropdownStyle={styles.dropdown}
                    dropdownTextStyle={{fontSize: 20, width: WIDTH - 70,}}
                    defaultValue={'Appuyer pour choisir'}
                    textStyle= {{fontSize: 20, marginLeft: 10, marginTop: 5}}
                    />                     
                </View>

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
        marginBottom: 10,
        color: 'grey',
        fontSize: 20,
        marginLeft: '5%'
    },
    picker: {
        flex: 1,
        flexDirection: 'row',
        width: WIDTH - 60,
        alignSelf: 'center',
        backgroundColor: "ghostwhite",
        borderWidth: 1.5,
        borderColor: "#000000",
        borderRadius: 15,
        paddingTop: 4,
        paddingBottom: 4
    },
});