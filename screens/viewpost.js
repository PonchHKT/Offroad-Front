import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import Navbar from '../components/Navbar';
import Note from '../components/Note';
import Separator from '../components/Separator3';

const { width: WIDTH } = Dimensions.get('window')

export function viewpost({ navigation }) {
            
    return (
        <ScrollView>

        <View>
            <Navbar 
                key={1}
                dashboard={false}
                mapPress={() => navigation.navigate('dashboard')}
                plus={false}
                plusPress={() => navigation.navigate('addspot')}
                like={false}
                likePress={() => navigation.navigate('like')}
                account={true}
            />
        </View>

        <View style={styles.userContainer}>
                <Text style={styles.user}>Jack, amateur</Text>
            </View>

            <View>
                <Text style={styles.description}>Endroit vraiment kool avec baucoup de dune on peu eskalader et fair des sot en cross. Le térin est pa priver donk tout le monde peu yaller donk je met cinque étoiles vous pouvé allez voir si vou voulait.Endroit vraiment kool avec baucoup de dune on peu eskalader et fair des sot en cross. Le térin est pa priver donk tout le monde peu yaller donk je met cinque étoiles vous pouvé allez voir si vou voulait.Endroit vraiment kool avec baucoup de dune on peu eskalader et fair des sot en cross. Le térin est pa priver donk tout le monde peu yaller donk je met cinque étoiles vous pouvé allez voir si vou voulait.Endroit vraiment kool avec baucoup de dune on peu eskalader et fair des sot en cross. Le térin est pa priver donk tout le monde peu yaller donk je met cinque étoiles vous pouvé allez voir si vou voulait.Endroit vraiment kool avec baucoup de dune on peu eskalader et fair des sot en cross. Le térin est pa priver donk tout le monde peu yaller donk je met cinque étoiles vous pouvé allez voir si vou voulait.Endroit vraiment kool avec baucoup de dune on peu eskalader et fair des sot en cross. Le térin est pa priver donk tout le monde peu yaller donk je met cinque étoiles vous pouvé allez voir si vou voulait.</Text>
            </View>
            <Separator/>
            <View>
            <Text style={styles.noteText}>Note :</Text>
            <View style={{right: 5,}}>
            <Note
                key={1}
                note={3}
                edit={false}
                spacing={4}
                size={30}
            />
            </View>
        </View>

            <Separator/>

            <View style={styles.icons}>

            <View style={styles.buttonContainer}>
                <TouchableOpacity>
                    <FontAwesome 
                        name="share" 
                        color="black"
                        size={30}
                        style={styles.locationBtn}/>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity>
                    <FontAwesome 
                        name="warning" 
                        color="black"
                        size={30}
                        style={styles.heartBtn}/>
                </TouchableOpacity>
            </View>

            </View>
            <StatusBar style="auto" hidden={true}/>
        </ScrollView>
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
    userContainer: {
        marginLeft: 10,
        marginTop: 25,
        left: 8,
    },
    user: {
        fontWeight: 'bold',
        color: '#606060',
        fontSize: 16,
    },
    description: {
        color: '#606060',
        fontSize: 15,
        marginTop: 5,
        width: 340,
        height: 350,
        left: 15,
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
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: WIDTH - 300,
        marginBottom: 25,
        bottom: 8,
    },
    buttonContainer: {
        paddingBottom: 10,
    },
});
