import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, FlatList, SafeAreaView } from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import Navbar from '../components/Navbar';
import Note from '../components/Note';
import Separator from '../components/Separator3';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

export function viewpost({ route, navigation }) {

    const { userInfos } = route.params;
            
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
                
                <View style={{height: '60%'}}>
                    <View style={styles.userContainer}>
                        <Text style={styles.user}>Jack, amateur</Text>
                    </View>
                    <ScrollView contentContainerStyle={{flexGrow: 1}}>
                        <Text style={styles.description}>Endroit vraiment kool avec baucoup de dune on peu eskalader et fair des sot en cross. Le térin est pa priver donk tout le monde peu yaller donk je met cinque étoiles vous pouvé allez voir si vou voulait.Endroit vraiment kool avec baucoup de dune on peu eskalader et fair des sot en cross. Le térin est pa priver donk tout le monde peu yaller donk je met cinque étoiles vous pouvé allez voir si vou voulait.Endroit vraiment kool avec baucoup de dune on peu eskalader et fair des sot en cross. Le térin est pa priver donk tout le monde peu yaller donk je met cinque étoiles vous pouvé allez voir si vou voulait.Endroit vraiment kool avec baucoup de dune on peu eskalader et fair des sot en cross. Le térin est pa priver donk tout le monde peu yaller donk je met cinque étoiles vous pouvé allez voir si vou voulait.Endroit vraiment kool avec baucoup de dune on peu eskalader et fair des sot en cross. Le térin est pa priver donk tout le monde peu yaller donk je met cinque étoiles vous pouvé allez voir si vou voulait.Endroit vraiment kool avec baucoup de dune on peu eskalader et fair des sot en cross. Le térin est pa priver donk tout le monde peu yaller donk je met cinque étoiles vous pouvé allez voir si vou voulait.</Text>
                    </ScrollView>
                </View>

                <Separator/>

                <View>
                    <Text style={styles.noteText}>Note :</Text>
                    <View>
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
