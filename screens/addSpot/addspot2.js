import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, ImageBackground } from 'react-native';

import Separator from '../../components/Separator';
import Separator2 from '../../components/Separator3';
import CustomButton from '../../components/CustomButton';
import CustomRadio from '../../components/CustomRadio';
import Navbar from '../../components/Navbar';
import CustomTitle from '../../components/CustomTitle';
import CustomInput from '../../components/CustomInput';
import LottieView from 'lottie-react-native';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

export function addspotnext({ route, navigation }) {

    const { userInfos } = route.params;

    const [checked, setChecked] = useState('Débutant');
    const [adress, setAdress] = useState('');
    const [infos, setInfos] = useState('');

    return (
        <ImageBackground style={{backgroundColor: 'white', height: HEIGHT}}>
            <View>
                <ScrollView>
                    <Navbar 
                        key={1}
                        dashboard={false}
                        mapPress={() => navigation.navigate('dashboard')}
                        plus={true}
                        like={false}
                        likePress={() => navigation.navigate('like', {userInfos: userInfos})}
                        account={false}
                        accountPress={() => navigation.navigate('profil', {userInfos: userInfos})}
                    />
                </ScrollView>

                    <View>
                        <CustomTitle
                            key={1}
                            title={'Ajout d\'un spot'}
                        />
                    </View>
                   
                    <View>

                    <View style={styles.level}>
                        <Text style={{fontSize: 20, color: '#606060'}}>Niveau :</Text>
                        <ScrollView>
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
                            
                        </ScrollView>
                        <LottieView 
                            style={{flex: 1, width: WIDTH / 2, right: 0, position: 'absolute'}}
                            resizeMode={'cover'}
                            source={require('../../assets/addspotmap.json')} 
                            autoPlay 
                            loop={true}
                            speed={0.5}
                        />
                </View>

                    <View>

                    <View>
                        <Text style={styles.commentText}>Adresse :</Text>
                    </View>

                    <ScrollView>
                        <CustomInput
                            key={1}
                            placeholder={''}
                            valeur={adress}
                            text={(text) => setAdress(text)}
                            secure={false}
                            pwd={false}
                        />
                    </ScrollView>


                    <View>
                        <Text style={styles.commentText}>Informations supplémentaires :</Text>
                    </View>

                    <ScrollView>
                        <CustomInput
                            key={2}
                            placeholder={''}
                            valeur={infos}
                            text={(text) => setInfos(text)}
                            secure={false}
                            pwd={false}
                        />
                    </ScrollView>

                    <View style={{bottom: 14,}}>

                        <Separator2/>

                        <CustomButton
                            key={1}
                            title={'Ajouter'}
                        />
                        </View>

                    </View>
                </View>
                <StatusBar style="auto" hidden={true}/>
            </View> 
        </ImageBackground>
)};

const styles = StyleSheet.create({
    level: {
        marginTop: 15,
        paddingLeft: '6.5%',
        bottom: 10,
        left: 10,
    },
    commentText: {
        color: '#606060',
        fontSize: 18,
        marginTop: 20,
        fontWeight: 'bold',
        left: 25,
        bottom: 10,
    },
});