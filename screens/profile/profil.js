import 'react-native-gesture-handler';
import { StyleSheet, View, Text, TouchableOpacity,  ScrollView, Dimensions, Image } from "react-native";
import React from 'react';
import Navbar from '../../components/Navbar';
import CustomButton from '../../components/CustomButton';
import LottieView from 'lottie-react-native';
import user from '../../assets/images/usericon.jpg';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

export function profil({ navigation }) {
  
    return (
        <View style={{flex: 1}} >
              <ScrollView style={{zIndex: 100}}>
                  <Navbar 
                      key={1}
                      id={1}
                      dashboard={false}
                      mapPress={() => navigation.navigate('dashboard')}
                      plus={false}
                      plusPress={() => navigation.navigate('addspot', {userInfos: userInfos})}
                      like={false}
                      likePress={() => navigation.navigate('like', {userInfos: userInfos})}
                      account={true}
                  />
              </ScrollView>
              <View style={styles.backgroundContainer}>

                    <LottieView
                    style={{width: WIDTH / 0.2, height: HEIGHT / 2.7, display: 'flex', position: 'absolute',}}
                    source={require('../../assets/profilbackground.json')} 
                    autoPlay 
                    loop
                    speed={0.2}/>
                    <View style={styles.user}>
                    <Image source={user} style={{width: 120, height: 120}}/>
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
                    onPress={() => navigation.navigate('Profil')}>
                    <Text style={styles.front2}>Informations médicales</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonArrondi2}
                    onPress={() => navigation.navigate('Profil')}>
                    <Text style={styles.front2}>Mes Commentaires</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonArrondi2}
                    onPress={() => navigation.navigate('Profil')}>
                    <Text style={styles.front2}>Mon Historique</Text>
                </TouchableOpacity>  
      

            </View>
            <View style={{flex: 1, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-around', width: '99%'}}>
      
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
    marginTop: 5,
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
    textAlignVertical: 'center'
  },
  backgroundContainer: {
    width: 550,
    height: 240,
    position: 'absolute',
    borderColor: 'black',
    borderWidth: 2,
    right: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    paddingRight: 10,
  },
  user: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});
