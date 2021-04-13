import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from "react-native";
import { SearchBar } from 'react-native-elements';
import { IconButton } from 'react-native-paper';

const { width: WIDTH } = Dimensions.get('window')

export default function Navbar(props) {

    const styles = StyleSheet.create({
        navbar: {
            flex: 1,
            flexDirection: 'row',
            backgroundColor: '#e74c3c',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 5,
            paddingBottom: 5,
            borderBottomColor: 'black',
            borderBottomWidth: 1,
        },
    })

    const [search, setSearch] = useState({ value: '' })

    const updateSearch = (search) => {
        setSearch({ value: search })
    }
    
    return (
        <View style={styles.navbar}>
            { props.dashboard ?
                <SearchBar
                    style={styles.searchbar}
                    inputContainerStyle={{backgroundColor: 'white', borderRadius: 20, width: WIDTH - 180}}
                    containerStyle={{backgroundColor: 'transparent', borderBottomColor: 'transparent', borderTopColor: 'transparent'}}
                    onChangeText={updateSearch}
                    value={search.value}
                />
            :
                <IconButton
                    icon={"map"}
                    size={30}
                    color={props.map ? 'ghostwhite' : 'black'}
                    onPress={props.mapPress}
                />
            }
            <IconButton
                icon={"plus-circle"}
                size={30}
                color={props.plus ? 'ghostwhite' : 'black'}
                onPress={props.plusPress}
            />
            <IconButton
                icon={"cards-heart"}
                size={30}
                color={props.like ? 'ghostwhite' : 'black'}
                onPress={props.likePress}
            />
            <IconButton
                icon={"account"}
                size={30}
                color={props.account ? 'ghostwhite' : 'black'}
                onPress={props.accountPress}
            />
        </View>
    )
}