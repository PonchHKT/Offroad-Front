import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Spot from '../assets/images/spots/forest.jpg';
import {FontAwesome} from '@expo/vector-icons';
import Separator from '../components/Separator2';
import Note from '../components/Note';

const { width: WIDTH } = Dimensions.get('window')

export function spot({ navigation }) {
            
    return (

    <View>
        <Image source={Spot} style={styles.imageSpot}></Image>
        
        <View>
            <Text style={styles.noteText}>Note :</Text>
            <Note
                note={4.5}
            />
        </View>

        <Separator/>

        <ScrollView>

            <View>
                <Text style={styles.user}>[USERNAME], [LEVEL]</Text>
            </View>

            <View>
                <Text style={styles.description}>Endroit vraiment kool avec baucoup de dune on peu eskalader et fair des sot en cross. Le térin est pa priver donk tout le monde peu yaller donk je met cinque étoiles vous pouvé allez voir si vou voulait.</Text>
            </View>

        </ScrollView>

        <Separator/>

        <View>
        
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.locationTouch}>
                    <FontAwesome 
                        name="location-arrow" 
                        color="black" 
                        style={styles.locationBtn}/>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.heartTouch}>
                    <FontAwesome 
                        name="heart" 
                        color="black" 
                        style={styles.heartBtn}/>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.shareTouch}>
                    <FontAwesome 
                        name="share" 
                        color="black" 
                        style={styles.shareBtn}/>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.editTouch}>
                    <FontAwesome 
                        name="edit" 
                        color="black" 
                        style={styles.editBtn}/>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.warningTouch}>
                    <FontAwesome 
                        name="exclamation-triangle" 
                        color="black" 
                        style={styles.warningBtn}/>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonView}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Démarrer</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
    )
};

class Star extends React.Component {
    render() {
        return (
            <FontAwesome name="star" color="black" size={32} style={styles.stars}/>
        )
    } 
}

const styles = StyleSheet.create({
    imageSpot: {
        width: WIDTH,
        height: 250,
        marginTop: 25,
    },
    backgroundContainer: {
        resizeMode: "cover", 
        flex:1, 
        height: '100%', 
        width: '100%',
    },
    noteText: {
        fontSize: 20,
        left: 20,
        marginTop: 10,
        color: '#606060',
    },
    stars: {
        marginHorizontal: 4,
        left: 15,
        marginTop: 5,
    },
    user: {
        fontWeight: 'bold',
        color: '#606060',
        fontSize: 16,
        left: 10,
        marginTop: 5,
    },
    description: {
        color: '#606060',
        fontSize: 15,
        left: 10,
        marginTop: 5,
    },
    buttonContainer: {
        marginBottom: 20,
        marginLeft: 25,
    },
    locationBtn: {
        alignSelf: 'flex-start',
        fontSize: 38,
        left: 10,
        marginTop: 5,
    },
    locationTouch: {
        width: 50,
        borderRadius: 60,
        paddingRight: 20,
        left: 20,
    },
    heartBtn: {
        alignSelf: 'flex-start',
        fontSize: 38,
        left: 10,
        marginTop: 5,
        marginLeft : -8,
    },
    heartTouch: {
        width: 50,
        borderRadius: 60,
        marginBottom: 20,
        paddingRight: 20,
        left: 80,
        bottom: 63,
    },
    shareBtn: {
        alignSelf: 'flex-start',
        fontSize: 38,
        left: 10,
        marginTop: 5,
        marginLeft : -8,
    },
    shareTouch: {
        width: 50,
        borderRadius: 60,
        marginBottom: 20,
        paddingRight: 20,
        left: 135,
        bottom: 146,
    },
    editBtn: {
        alignSelf: 'flex-start',
        fontSize: 38,
        left: 10,
        marginTop: 5,
        marginLeft : -8,
    },
    editTouch: {
        width: 50,
        borderRadius: 60,
        marginBottom: 20,
        paddingRight: 20,
        left: 193,
        bottom: 228,
    },
    warningBtn: {
        alignSelf: 'flex-start',
        fontSize: 38,
        left: 10,
        marginTop: 5,
        marginLeft : -8,
    },
    warningTouch: {
        width: 50,
        borderRadius: 60,
        marginBottom: 20,
        paddingRight: 20,
        left: 240,
        bottom: 313,
    },
    buttonView: {
        alignSelf: 'center',
        bottom: 360,
    },
    button: {
        justifyContent: 'center',
        width: WIDTH - 200,
        height: 55,
        backgroundColor: "black",
        borderWidth: 1.75,
        borderColor: "gray",
        borderRadius: 15,
        marginTop: 15,
    },
    buttonText: {
        alignSelf: 'center',
        color: 'white',
    },
});
