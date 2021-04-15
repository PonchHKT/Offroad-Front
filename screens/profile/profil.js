import 'react-native-gesture-handler';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image, Alert } from "react-native";
import React from 'react';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Navbar from '../../components/Navbar';
import CustomButton from '../../components/CustomButton';
import user from '../../assets/images/usericon.jpg';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

export function profil({ route, navigation }) {

    const { userInfos } = route.params;

    if (!AsyncStorage.getItem('token')) {
        navigation.navigate('welcome')
    }
    
    async function logout() {
        Alert.alert('Vous avez été déconnecté !')
        try {
            await AsyncStorage.removeItem('token')
            navigation.navigate('welcome')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={{flex: 1}} >
              
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

                <View style={{bottom: 40}}>
              <View style={{borderBottomWidth: 3.3,}}>

                  <LottieView
                      style={{width: WIDTH,}}
                      source={require('../../assets/profilbackground.json')} 
                      autoPlay 
                      loop={true}
                  />

                  <View style={{flex: 1, alignItems: 'center' }}>
                      <Image source={user} style={{width: 150, height: 150, position: 'absolute', bottom: -30, borderWidth: 4, borderColor: 'black', borderRadius: 75}}/>
                  </View>

              </View>
              </View>

            
                  
            <View>
            
                <TouchableOpacity
                    style={styles.buttonArrondi2}
                    onPress={() => navigation.navigate('infoUser')}>
                    <Text style={styles.front2}>Informations personnelles</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonArrondi2}
                    onPress={() => navigation.navigate('infoMed', {userInfos: userInfos})}>
                    <Text style={styles.front2}>Informations médicales</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonArrondi2}
                    onPress={() => navigation.navigate('comments', {userInfos: userInfos})}>
                    <Text style={styles.front2}>Mes commentaires</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonArrondi2}
                    onPress={() => navigation.navigate('getHistorique', {userInfos: userInfos})}>
                    <Text style={styles.front2}>Mon historique</Text>
                </TouchableOpacity>  
      

            </View>
            <View style={{flex: 1, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-around', width: '99%', paddingTop: 10, paddingBottom: 20, marginBottom: 30,}}>
      
                <CustomButton
                    key={1}
                    actionsbtn={() => logout()}
                    title={'Déconnexion'}
                    width={200}
                />
                
                <CustomButton
                    key={2}
                    actionsbtn={() => navigation.navigate('Profil')}
                    title={'Options'}
                    width={200}
                />
                </View>

                <View><Text onPress={() => navigation.navigate('cgu')} style={styles.clickHere}>Conditions générales d'utilisation</Text></View>
            </View>
)};

const styles = StyleSheet.create({
  buttonArrondi2: {
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: "#E6E6E6",
    borderRadius: 21,
    width: WIDTH / 1.1,
    height: 60,
    alignSelf: 'center',
    justifyContent: 'center',
    bottom: 10,
  },
  front2:{
    color: 'grey',
    fontSize: 20,
    marginLeft: 10,
  },
  clickHere: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: 'black',
    fontSize: 10,
    textAlign: 'center',
    bottom: 25,
},
});
