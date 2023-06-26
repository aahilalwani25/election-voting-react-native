import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
//const axios = require('axios');
const ip = require('../../API/NetworkConfig');

export class LoginController {

  async getLogin(cnic, password) {
    let request = await axios.get(`http://${ip.address}:3000/api/users/${cnic}/${password}`);

    let response = request.data;
    let u_cnic_check = false, u_password_check = false;
    let phone=null;
    console.log(response)
    if (response) {
      response.forEach(object => {
        for (const key in object) {
          if (key == 'Cnic' && object[key] == cnic) u_cnic_check = true;
          if (key == 'Phone') phone= object[key];
          if (key == 'password' && object[key] == password) u_password_check = true;
        }
      });

      if (u_cnic_check && u_password_check && phone!=null) {
        AsyncStorage.setItem('cnic', cnic.toString(),(err)=>{
          if(err) console.log(err);
        });
        console.log(phone);
        //this.getPhone(cnic);
        AsyncStorage.setItem('ph', phone.toString(), err => {
          if (err) console.log(err);
        });
        return true;
      }
    }
    return false;
  }
}
