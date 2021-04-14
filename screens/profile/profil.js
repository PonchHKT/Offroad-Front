import 'react-native-gesture-handler';
import { StyleSheet, View, Text, TouchableOpacity,  ScrollView } from "react-native";
import * as React from 'react';


export function profil({ navigation }) {
return (

    
<ScrollView>
  <View style={styles.container}>
    
  <TouchableOpacity
        style={styles.buttonArrondi2}
        onPress={() => navigation.navigate('Profil')}>
        <Text style={styles.front2}>Informations personnelles</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonArrondi2}
        onPress={() => navigation.navigate('Profil')}>
        <Text style={styles.front2}>Informations médicales</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonArrondi2}
        onPress={() => navigation.navigate('Profil')}>
        <Text style={styles.front2}>Mes Commentaires</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonArrondi2}
        onPress={() => navigation.navigate('Profil')}>
        <Text style={styles.front2}>Mon Historique</Text>
      </TouchableOpacity>  
      

  </View>
  <View style={styles.container2}>
      
  <TouchableOpacity
        style={styles.buttonArrondi}
        onPress={() => navigation.navigate('Profil')}
      >
        <Text style={styles.front}>Retour</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonArrondi}
        onPress={() => navigation.navigate('Profil')}
      >
        <Text style={styles.front}>Déconnexion</Text>
      </TouchableOpacity>

  </View>
</ScrollView>

)};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  container2: {
    flexDirection:'row',
  },

  buttonArrondi: { 
  backgroundColor: "#E6E6E6",
  borderRadius: 21,
  width: '40%',
  height: '50%',
  marginBottom: '10%',
  marginLeft: '5%',
  marginTop: 60,
  alignItems: "center",
},
buttonArrondi2: { 
    backgroundColor: "#E6E6E6",
    borderRadius: 21,
    width: '80%',
    height: '15%',
    marginLeft: '5%',
    marginTop: '12%',
    alignItems: "center",
  },
  front:{
    marginTop: 20,
    color: 'grey',
    height: 50,
    fontSize: 20,
    marginLeft: '2%',
  },

  front2:{
    color: 'grey',
    height: 50,
    fontSize: 20,
    marginLeft: '2%',
    textAlignVertical: 'center'
  },

  backgroundImage: {
    flex: 1,
    width: undefined,
    height: undefined,
  }
});
