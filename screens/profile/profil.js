import 'react-native-gesture-handler';
import { StyleSheet, View, Text, TouchableOpacity,  ScrollView, Dimensions, Image } from "react-native";
import React from 'react';
import Navbar from '../../components/Navbar';
import CustomButton from '../../components/CustomButton';
import LottieView from 'lottie-react-native';
import user from '../../assets/images/usericon.jpg';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

export function profil({ route, navigation }) {

    const { userInfos } = route.params;
  
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

              <View style={{borderBottomWidth: 3.5,}}>

                  <LottieView
                      style={{width: WIDTH}}
                      source={require('../../assets/profilbackground.json')} 
                      autoPlay 
                      loop={true}
                  />

                  <View style={{flex: 1, alignItems: 'center'}}>
                      <Image source={user} style={{width: 150, height: 150, position: 'absolute', bottom: -30, borderWidth: 4, borderColor: 'black', borderRadius: 75}}/>
                  </View>

              </View>

            
                  
            <View>
            
                <TouchableOpacity
                    style={styles.buttonArrondi2}
                    onPress={() => navigation.navigate('Profil')}>
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
                    <Text style={styles.front2}>Mes Commentaires</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonArrondi2}
                    onPress={() => navigation.navigate('getHistorique', {userInfos: userInfos})}>
                    <Text style={styles.front2}>Mon Historique</Text>
                </TouchableOpacity>  
      

            </View>
            <View style={{flex: 1, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-around', width: '99%', paddingTop: 40, marginBottom: 20}}>
      
                <CustomButton
                    key={1}
                    actionsbtn={() => navigation.navigate('Profil')}
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
    top: 30,
  },
  front2:{
    color: 'grey',
    fontSize: 20,
    marginLeft: 10,
  },
});
