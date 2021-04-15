import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ImageBackground, Dimensions } from 'react-native';

import Note from '../../components/Note';
import Separator2 from '../../components/Separator3';
import Separator from '../../components/Separator';
import CustomButton from '../../components/CustomButton';
import Navbar from '../../components/Navbar';
import CustomTitle from '../../components/CustomTitle';
import CustomInput from '../../components/CustomInput';
import couple from '../../assets/images/addspotcouple.gif'
import { commentsValidator } from '../../helpers/commentsValidator';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

export function addspot({ route, navigation }) {

    const { userInfos } = route.params;

    const [comment, setComment] = useState('');
    const [note, setNote] = useState(0);

    const submit = () => {

        const commentError = commentsValidator(comment)
        const noteError = commentsValidator(note)

        if (commentError || noteError) {
            Alert.alert('Des champs non pas été remplis !')
            return;
        } else {
            navigation.navigate('addspotnext', { userInfos: userInfos, comment: comment, note: note})
        }
    }

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

                    <Separator/>
                    <Separator/>

                    <View>
                        <CustomTitle
                            key={1}
                            id={1}
                            title={'Ajout d\'un spot'}
                        />
                    </View>
            
                    <View>
                        <Text style={styles.commentText}>Écrire un commentaire :</Text>
                    </View>

                    <ScrollView style={{zIndex: 1000}}>
                        <CustomInput
                            key={1}
                            placeholder={''}
                            valeur={comment}
                            text={(text) => setComment(text)}
                            multiline={true}
                        />
                    </ScrollView>

                            
                    <View>
                        <Text style={styles.noteText}>Note :</Text>
                    </View>

                    <Separator/>

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

                    <View style={{justifyContent: 'center', alignItems: 'center', position: 'absolute', left: 210, top: 350}}>
                        <Image 
                        source={couple}
                        style={{width: 150, height: 150}}/>
                    </View>

                    <View>
                    
                        <Separator/>
                        <Separator2/>

                        <View>
                            <CustomButton
                                key={1}
                                title={'Suivant'}
                                actionsbtn={() => submit()}
                            />
                        </View>
                        <Separator/>
                        <Separator/>
                        <Separator/>
                        <Separator/>

                    </View>
                </View> 
                <StatusBar style="auto" hidden={true}/>
        </View>
    </ImageBackground>
)};

const styles = StyleSheet.create({
    commentText: {
        color: '#606060',
        fontSize: 18,
        marginTop: 20,
        fontWeight: 'bold',
        left: 25,
        bottom: 10,
        zIndex: 1000,
    },
   
    noteText: {
        fontSize: 20,
        left: 35,
        marginTop: 3,
        color: '#606060',
        zIndex: 1000,
    },
    note: {
        left: 10,
        bottom: 5,
        zIndex: 1000,
    },
});