import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { LoginController } from '../Controller/LoginController';

class LoginScreen extends React.Component {

  constructor(){
    super();
    this.state={
      cnic:null,
      password:null,
    };
    
    this.login=new LoginController();

  }
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="CNIC"
          placeholderTextColor={'grey'}
          onChangeText={text => {
            this.setState({cnic: text});
            //console.log(this.state.cnic);
          }}
          keyboardType={"number-pad"}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={text => {
            this.setState({password: text});
            //console.log(this.state.password);
          }}
          placeholderTextColor={'grey'}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.login.getLogin(this.state.cnic,this.state.password)
            .then(res=>{
              console.log(res.valueOf())
              if(res.valueOf()){
                this.props.navigation.navigate('dashboard');
              }else{
                Alert.alert("ERROR","Either CNIC or password is wrong")
              }
            })
            // .then(data=>{
              
            //   //Alert.alert("Wrong CNIC or password!");
            // })
            .catch(err=>{
              Alert.alert(err);
            })
            
          }}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 40,
    marginBottom: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    color: 'black',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default LoginScreen;
