import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, CheckBox, Dimensions, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const { width: WIDTH } = Dimensions.get('window')

export function startrando({ navigation }) {
return (
    <ImageBackground style={styles.backgroundContainer}>
    <ScrollView>
    
    <View>
    <Text style={styles.map}>Map</Text>
    </View>
    
    <View style={styles.bottom}>
    <TouchableOpacity 
    style={styles.turnoff}>
    <Text style={styles.text} >DESACTIVER ALARME</Text>
    </TouchableOpacity>
    </View>

    <View style={styles.bottom}>
    <TouchableOpacity 
    style={styles.turnon}>
    <Text style={styles.text} >ARRETER</Text>
    </TouchableOpacity>
    </View>

    </ScrollView>
    </ImageBackground>
)}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
    },
    map: {
        alignSelf: 'center',
    },
    turnoff: {
        width: WIDTH - 200,
        height: 45,
        borderRadius: 60,    
        backgroundColor: 'rgba(230, 126, 34,1.0)',
        justifyContent: 'center',
        marginTop: 20,
        alignSelf: 'center'
    },
    turnon: {
        width: WIDTH - 200,
        height: 45,
        borderRadius: 60,    
        backgroundColor: 'rgba(230, 126, 34,1.0)',
        justifyContent: 'center',
        marginTop: 20,
        alignSelf: 'center',
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    text: {
        fontSize: 12,
        alignSelf: 'center',
    },
});