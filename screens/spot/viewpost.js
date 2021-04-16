import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Share } from 'react-native';
import {FontAwesome} from '@expo/vector-icons';

import Navbar from '../../components/Navbar';
import Note from '../../components/Note';
import Separator from '../../components/Separator3';

export function viewpost({ route, navigation }) {

    const { spotId, userInfos, postInfos } = route.params;

    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
              `Regarde, j\'ai trouvé un commentaire qui pourrait être interessant pour toi !`,
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
            } else {
            }
          } else if (result.action === Share.dismissedAction) {
          }
        } catch (error) {
          alert(error.message);
        }
    };

    const deletePost = () => {
        fetch(`https://offroad-app.herokuapp.com/api/post/delete/${postInfos.id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData)
            if (responseData.data) {
                Alert.alert('Le commentaire à bien été supprimé !')
                navigation.navigate('spot', {userInfos: userInfos, spotId: spotId})
            }
        })

        .catch((error) =>{
            console.error(error);
        })
    }
            
    return (
        <View style={{flex: 1}}>

                <ScrollView>
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
                </ScrollView>
                
                <View style={{height: '50%'}}>
                    <View style={styles.userContainer}>
                        <Text style={styles.user}>{postInfos.userName}</Text>
                    </View>
                    <ScrollView contentContainerStyle={{flexGrow: 1,}}>
                        <Text style={styles.description}>{postInfos.content}</Text>
                    </ScrollView>
                </View>

                <Separator/>

                <View>
                    <Text style={styles.noteText}>Note :</Text>
                    <View>
                        <Note
                            key={1}
                            note={postInfos.note}
                            edit={false}
                            spacing={4}
                            size={30}
                        />
                    </View>
                </View>

                <Separator/>

            <View style={styles.icons}>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => onShare()}>
                        <FontAwesome 
                            name="share" 
                            color="black"
                            size={30}
                        />
                    </TouchableOpacity>
                </View>

                { postInfos.authorId == userInfos.id ?
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => deletePost()}>
                            <FontAwesome 
                                name="trash" 
                                color="black"
                                size={30}
                            />
                        </TouchableOpacity>
                    </View>
                :
                    <View></View>
                }
                { postInfos.authorId == userInfos.id ?
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('editpost', {userInfos: userInfos, spotId: spotId, postInfos: postInfos})}>
                            <FontAwesome 
                                name="edit" 
                                color="black"
                                size={30}
                            />
                        </TouchableOpacity>
                    </View>
                :
                    <View></View>
                }

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('signalpost', { userInfos: userInfos, postInfos: postInfos})}>
                        <FontAwesome 
                            name="warning" 
                            color="black"
                            size={30}
                        />
                    </TouchableOpacity>
                </View>

            </View>
            <StatusBar style="auto" hidden={true}/>
        </View>
    )
};

const styles = StyleSheet.create({
    userContainer: {
        marginLeft: 10,
        left: 8,
        paddingBottom: 10,
    },
    user: {
        fontWeight: 'bold',
        color: '#606060',
        fontSize: 20,
    },
    description: {
        color: '#606060',
        fontSize: 16,
        width: '90%',
        alignSelf: 'center',
    },
    noteText: {
        fontSize: 20,
        left: 20,
        color: '#606060',
        bottom: 5,
        right: -8,
    },
    icons: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 10,
    },
    buttonContainer: {
        paddingLeft: 20,
        paddingRight: 20
    }
});
