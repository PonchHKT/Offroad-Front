import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, Alert, ScrollView, Share } from 'react-native';
import {FontAwesome} from '@expo/vector-icons';

import Separator from '../../components/Separator2';
import Separator2 from '../../components/SeparatorComment';
import Note from '../../components/Note';
import CustomButton from '../../components/CustomButton';
import Navbar from '../../components/Navbar';
import LottieView from 'lottie-react-native';

const { width: WIDTH } = Dimensions.get('window')

export function spot({ route, navigation }) {

    const { spotId, userInfos } = route.params;

    const[spot, setSpot] = useState({})
    const[posts, setPost] = useState({})

    useEffect(() => {
        try {

            fetch(`https://offroad-app.herokuapp.com/api/spot/unique/${spotId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((responseData) => {
                setSpot(responseData.data.spot)

                fetch(`https://offroad-app.herokuapp.com/api/post/spot/${spotId}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => response.json())
                .then((responseData) => {
                    setPost(responseData.data)

                })
                .catch((error) =>{
                    console.error(error);
                })

            })
            .catch((error) =>{
                console.error(error);
            })
        } catch(e) {
            console.log(e)
        }
    },[])

    const addLike = () => {

        fetch(`https://offroad-app.herokuapp.com/api/like/check/${userInfos.id}/${spotId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseData) => {
            if(!responseData.data.like[0]) {

                fetch(`https://offroad-app.herokuapp.com/api/like/add`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        spotId: spotId,
                        authorId: userInfos.id
                    })
                })
                .then((response) => response.json())
                .then((responseData) => {
                    if (responseData.data) {
                        Alert.alert('Spot bien ajouté aux favoris !')
                    }
                })

                .catch((error) =>{
                    console.error(error);
                })

            } else {
                fetch(`https://offroad-app.herokuapp.com/api/like/delete/${responseData.data.like[0].id}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        spotId: spotId,
                        authorId: userInfos.id
                    })
                })
                .then((response) => response.json())
                .then((responseData) => {
                    if (responseData.data) {
                        Alert.alert('Spot bien retiré des favoris !')
                    }
                })

                .catch((error) =>{
                    console.error(error);
                })
            }
        })

        .catch((error) =>{
            console.error(error);
        })
    }

    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
              `Regarde, j\'ai trouvé un spot qui pourrait être interessant pour toi !`,
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

    if (!spot.note || !spot.photo || !posts.post) {
        return <View></View>
    }
      
    return (

        <View style={{flex: 1}}>

            <Navbar 
                key={1}
                dashboard={false}
                mapPress={() => navigation.navigate('dashboard')}
                plus={false}
                plusPress={() => navigation.navigate('addspot', {userInfos: userInfos})}
                like={false}
                likePress={() => navigation.navigate('like', {userInfos: userInfos})}
                account={false}
                accountPress={() => navigation.navigate('profil', {userInfos: userInfos})}
            />

            <Image source={{uri: spot.photo}} style={styles.imageSpot}></Image>
            <LottieView 
                style={{zIndex: 10, width: WIDTH / 2.5, position: 'absolute', left: 68, top: 76}}
                resizeMode={'cover'}
                source={require('../../assets/drivingspot.json')} 
                autoPlay 
                loop= {true}
                speed={0.5}
            />
            <View>
                <Text style={styles.noteText}>Note :</Text>
                <Note 
                    key={1}
                    note={spot.note}
                    edit={false}
                    spacing={4}
                    size={30}
                />
            </View>
            <Separator/>

            <View style={styles.comments}>

                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    { posts.post.map((post, index) => (

                        <View key={index}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('viewpost', { userInfos: userInfos, postInfos: post})}
                            >
                                <View>
                                    <Text style={styles.user}>{post.userName}</Text>
                                </View>

                                <View>
                                    <Text style={styles.description}>{post.content}</Text>
                                </View>
                                <View style={{bottom: 16, right: 20}}>
                                <Note 
                                    key={1}
                                    note={post.note}
                                    edit={false}
                                    spacing={4}
                                    size={16}
                                />
                                </View>
                                <Separator2/>
                            </TouchableOpacity>
                        </View>
                    ))}

                </ScrollView>
            </View>

            <Separator/>

            <View style={styles.icons}>
            
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.locationTouch}>
                        <FontAwesome 
                            name="location-arrow" 
                            color="black"
                            size={30}
                            style={styles.locationBtn}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.heartTouch} onPress={() => addLike()}>
                        <FontAwesome 
                            name="heart" 
                            color="black"
                            size={30}
                            style={styles.heartBtn}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.shareTouch} onPress={() => onShare()}>
                        <FontAwesome 
                            name="share" 
                            color="black" 
                            size={30}
                            style={styles.shareBtn}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.editTouch} onPress={() => navigation.navigate('addreview', {spotId: spotId, userInfos: userInfos})}>
                        <FontAwesome 
                            name="edit" 
                            color="black" 
                            size={30}
                            style={styles.editBtn}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.warningTouch} onPress={() => navigation.navigate('signalspot', {spotId: spotId, userInfos: userInfos})}>
                        <FontAwesome 
                            name="exclamation-triangle" 
                            color="black" 
                            size={30}
                            style={styles.warningBtn}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            
            <View style={{paddingBottom: 10}}>
                <CustomButton
                    key={1}
                    title={'Démarrer'}
                    actionsbtn={() => navigation.navigate('startrando', {spotId: spotId, userInfos: userInfos})}
                />
            </View>

            <StatusBar style="auto" hidden={true}/>
        </View>
    )
};

const styles = StyleSheet.create({
    imageSpot: {
        width: WIDTH,
        height: 210,
    },
    noteText: {
        fontSize: 20,
        left: 20,
        marginTop: 10,
        color: '#606060',
    },
    comments: {
        paddingRight: 20,
        paddingLeft: 20,
        height: '20%'
    },
    user: {
        fontWeight: 'bold',
        color: '#606060',
        fontSize: 16,
        marginBottom: 15,
    },
    description: {
        color: '#606060',
        fontSize: 15,
        bottom: 15,
    },
    icons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: WIDTH - 50,
    },
});
