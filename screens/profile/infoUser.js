import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import CustomInput from '../../components/CustomInput';
import ModalDropdown from 'react-native-modal-dropdown';
import CustomButton from '../../components/CustomButton';

const { width: WIDTH } = Dimensions.get('window')


export function infoUser({ navigation }) {

    const [pseudo, setPseudo] = useState({ value: '', error: '' })
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })

    const [user, setUser] = useState({
        niveau: '',
    });
    function handleGender(text) {
        setUser({ ...user, gender: text })
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
                placeholder={'Dark Rider'}
                valeur={pseudo.value}
                error={!!pseudo.error}
                errorText={pseudo.error}
                text={(text) => setPseudo({ value: text, error: '' })}
            />

            <Text style={styles.front}>Adresse email :</Text>
            <CustomInput
                key={3}
                placeholder={'mathilde.tapis@gmail.com'}
                valeur={email.value}
                error={!!email.error}
                errorText={email.error}
                text={(text) => setEmail({ value: text, error: '' })}
            />

            <Text style={styles.front}>Mot de passe :</Text>
            <CustomInput
                    key={4}
                    placeholder={'Mot de passe'}
                    valeur={password.value}
                    error={!!password.error}
                    errorText={password.error}
                    text={(text) => setPassword({ value: text, error: '' })}
                    pwd={true}
                />

            <Text style={styles.front}>Niveau :</Text>
            <View style={styles.picker}>
            <ModalDropdown
                  options={ ['Débutant', 'Intermédiaire','Avancé', 'Expert']}
                  style={{height: 40, width: '100%'}}
                  dropdownStyle={styles.dropdown}
                  dropdownTextStyle={{fontSize: 20, width: WIDTH - 70}}
                  defaultValue={'Appuyer pour choisir'}
                  textStyle= {{fontSize: 20, marginLeft: 10, marginTop: 5}}
                />
                        
                    </View>

            <Text style={styles.front}>Notifications :</Text>
                <View style={styles.picker}>
                    <ModalDropdown
                    options={ ['Oui', 'Non']}
                    style={{height: 40, width: '100%'}}
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
                actionsbtn={() => navigation.navigate('profil')}
                title={'Retour'}
                width={200}
            />
      
        <CustomButton
                key={2}
                actionsbtn={() => navigation.navigate('')}
                title={'Modifier'}
                width={200}
            />
      </View>

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
        marginTop: 30,
        color: 'grey',
        height: 50,
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
            borderRadius: 20,
        },
        buttonArrondi: { backgroundColor: "#E6E6E6",
        borderRadius: 21,
        width: '30%',
        height: 61,
        marginBottom: '10%',
        marginLeft: '13%',
        marginTop: '5%',
        alignItems: 'center'
      },
      btntxt: {
        color: 'grey',
        height: 50,
        fontSize: 20,
        textAlignVertical: 'center'
      }
});