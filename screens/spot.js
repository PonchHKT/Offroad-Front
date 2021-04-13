import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spot from '../assets/images/spots/forest.jpg';
import Separator from '../components/Separator2';
import Note from '../components/Note';
import CustomButton from '../components/CustomButton';

const { width: WIDTH } = Dimensions.get('window')

export function spot({ route, navigation }) {

    const { spotId } = route.params;

    const[spot, setSpot] = useState({})
            
    return (

    <View style={styles.container}>
        <Image source={Spot} style={styles.imageSpot}></Image>
        
        <View>
            <Text style={styles.noteText}>Note :</Text>
            <Note 
                key={1}
                note={3}
                edit={false}
                spacing={4}
                size={30}
            />
        </View>

        <Separator/>

        <View style={styles.comments}>

            <View>
                <Text style={styles.user}>[USERNAME], [LEVEL]</Text>
            </View>

            <View>
                <Text style={styles.description}>Endroit vraiment kool avec baucoup de dune on peu eskalader et fair des sot en cross. Le térin est pa priver donk tout le monde peu yaller donk je met cinque étoiles vous pouvé allez voir si vou voulait.</Text>
            </View>

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
                <TouchableOpacity style={styles.heartTouch}>
                    <FontAwesome 
                        name="heart" 
                        color="black"
                        size={30}
                        style={styles.heartBtn}/>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.shareTouch}>
                    <FontAwesome 
                        name="share" 
                        color="black" 
                        size={30}
                        style={styles.shareBtn}/>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.editTouch} onPress={() => navigation.navigate('addreview', {spotId: spotId})}>
                    <FontAwesome 
                        name="edit" 
                        color="black" 
                        size={30}
                        style={styles.editBtn}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.warningTouch} onPress={() => navigation.navigate('signalspot', {spotId: spotId})}>
                    <FontAwesome 
                        name="exclamation-triangle" 
                        color="black" 
                        size={30}
                        style={styles.warningBtn}
                    />
                </TouchableOpacity>
            </View>
        </View>
        
        <View style={{bottom: 50}}>
        <CustomButton
            key={1}
            title={'Démarer'}
            actionsbtn={() => navigation.navigate('startrando', {spotId: spotId})}
        /></View>

        <StatusBar style="auto" hidden={true}/>
    </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
        paddingLeft: 20
    },
    user: {
        fontWeight: 'bold',
        color: '#606060',
        fontSize: 16,
        marginTop: 5,
    },
    description: {
        color: '#606060',
        fontSize: 15,
        marginTop: 5,
    },
    icons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: WIDTH - 50,
    },
});
