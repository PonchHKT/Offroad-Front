import React, { useState } from 'react';
import { View, StyleSheet, Text } from "react-native";
import { SearchBar } from 'react-native-elements';
import { IconButton } from 'react-native-paper';

export default function Navbar(props) {

    const styles = StyleSheet.create({
        navbar: {
            flex: 1,
            flexDirection: 'row',
            backgroundColor: 'grey',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 5,
            paddingBottom: 5
        },
        searchbar: {
            paddingRight: '30%',
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
                    inputContainerStyle={{backgroundColor: 'white'}}
                    containerStyle={{backgroundColor: 'grey', borderBottomColor: 'transparent', borderTopColor: 'transparent'}}
                    placeholder=""
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