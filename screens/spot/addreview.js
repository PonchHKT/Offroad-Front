import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, Image } from 'react-native';

import { commentsValidator } from '../../helpers/commentsValidator';

import Note from '../../components/Note';
import Separator2 from '../../components/Separator2';
import Separator from '../../components/Separator';
import CustomButton from '../../components/CustomButton';
import Navbar from '../../components/Navbar';
import CustomTitle from '../../components/CustomTitle';
import CustomInput from '../../components/CustomInput';
import review from '../../assets/images/addreview.gif'

export function addreview({ route, navigation }) {

    const { spotId, userInfos } = route.params;

    const [comment, setComment] = useState('');
    const [note, setNote] = useState(0);

    const submit = () => {

        const commentError = commentsValidator(comment)
        const noteError = commentsValidator(note)

        if (commentError || noteError) {
            Alert.alert('Des champs non pas été remplis !')
            return;

        } else {

            fetch(`https://offroad-app.herokuapp.com/api/post/add`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: comment,
                    noteUser: note,
                    spotId: spotId,
                    authorId: userInfos.id,
                    userName: userInfos.pseudo
                })
            })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData)
                if (responseData.data) {
                    Alert.alert('Commentaire bien ajouté !')
                    navigation.navigate('spot', {spotId: spotId, userInfos: userInfos})
                }
            })

            .catch((error) =>{
                console.error(error);
            })
        }
    }

    return (

        <View style={{backgroundColor: 'white', color: 'ffffff'}}>

            <ScrollView>
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
            </ScrollView>

            <Separator/>
            <Separator/>

            <View>
                <CustomTitle
                    key={1}
                    title={'Ajout d\'un avis'}
                />
            </View>
            
            <View>
                <Text style={styles.commentText}>Ecrire un commentaire :</Text>
            </View>

            <ScrollView>
                <CustomInput
                    key={1}
                    placeholder={'Dites ce que vous en pensez...'}
                    valeur={comment}
                    text={(text) => setComment(text)}
                    multiline={true}
                />
            </ScrollView>

                    
            <View>
                <Text style={styles.noteText}>Note :</Text>
                </View>

                <View style={styles.note}>
                <Note 
                    key={1}
                    note={note}
                    update={(val) => setNote(val)}
                    edit={true}
                    spacing={4}
                    size={30}
                />
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center', position: 'absolute', left: 210, top: 448}}>
                        <Image 
                        source={review}
                        style={{width: 120, height: 120}}/>
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
        </View> 

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
    noteText: {
        fontSize: 20,
        left: 20,
        marginTop: 10,
        color: '#606060',
    },
    note: {
        marginTop: 5,
    },
});