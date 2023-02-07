import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import ip from '../../API/NetworkConfig';

export class VotingController{

  constructor() {
    this.vote = [];
  }

    async cheeckIfUserVotedBefore(){
        let cnic=await AsyncStorage.getItem('cnic');

        //console.log(cnic)
        let request = await axios.get(`http://${ip.address}:3000/api/voting/${(cnic)}`);

        let response=request.data;
        //console.log(response)
        let flag=false;
        if(response){
            response.forEach(object => {
                for(const keys in object){
                    if(keys=='party' && object[keys]!=null) flag= true;
                }
            });
        }

        if (flag) return true;
        return false;
    }

    async submitVote(party){
        let cnic = await AsyncStorage.getItem('cnic');

        let request = axios.post(`http://${ip.address}:3000/api/submitVote/`,{
            cnic:cnic,
            party:party
        });

        let response= request.data;
        console.log(response);
        if (response) {
          return true;
        }
        return false;
    }

    async calculateVote(){

      for(let party=1;party<=4;party++){
        let request= await axios.get(`http://${ip.address}:3000/api/countVotes/${party}`);
        let response = request.data;

        //console.log(response);
        if (response) {
          response.forEach(object => {
            for (const keys in object) {
              if (keys == 'count(party)' && object[keys] != null)
                this.vote.push(object[keys]);
              break;
            }
          });
        }
      }

        return this.vote;
    }

}


