import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { styles } from '../../Styles';

class StartScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>E-VOTING</Text>

        <TouchableOpacity
          style={[styles.button, {backgroundColor: 'black'}]}
          onPress={() => this.props.navigation.navigate('signup')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, {backgroundColor: 'grey'}]}
          onPress={() => this.props.navigation.navigate('login')}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'white',
//   },
//   text: {
//     fontSize: 50,
//     marginBottom: 20,
//     color: 'black',
//   },
//   button: {
//     width: '80%',
//     height: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 10,
//     marginBottom:10,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//   },
// });

export default StartScreen;
