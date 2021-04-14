import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';

import { commentsValidator } from '../../helpers/commentsValidator';

import Separator2 from '../../components/Separator2';
import Separator from '../../components/Separator';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import Navbar from '../../components/Navbar';
import CustomTitle from '../../components/CustomTitle';

export function signalspot({ route, navigation }) {

    const { spotId, userInfos } = route.params;

    const [comment, setComment] = useState('');

    const submit = () => {

        const commentError = commentsValidator(comment)

        if (commentError) {
            Alert.alert('Le champ n\'a pas été rempli !')
            return;

        } else {

            fetch(`https://offroad-app.herokuapp.com/api/reportspot/add`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: comment,
                    spotId: spotId,
                    authorId: userInfos.id
                })
            })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.data) {
                    Alert.alert('Spot bien signalé !')
                    navigation.navigate('spot', {spotId: spotId, userInfos: userInfos})
                }
            })

            .catch((error) =>{
                console.error(error);
            })
        }
    }

    return (

        <ScrollView>

            <View>
                <Navbar 
                    key={1}
                    dashboard={true}
                    plus={false}
                    plusPress={() => navigation.navigate('addspot')}
                    like={false}
                    likePress={() => navigation.navigate('like', {userInfos: userInfos})}
                    account={false}
                    accountPress={() => navigation.navigate('profil', {userInfos: userInfos})}
                />
            </View>

            <Separator/>
            <Separator/>

            <View>
                <CustomTitle
                    key={1}
                    id={1}
                    title={'Signaler un spot'}
                />
            </View>
            
            <View>
                <Text style={styles.commentText}>Décrire votre signalement :</Text>
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

            <Separator/>
            <Separator2/>
            <Separator/>

            <View>

                <CustomButton
                    key={1}
                    title={'Valider'}
                    actionsbtn={() => submit()}
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
});