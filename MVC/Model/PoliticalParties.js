export class PoliticalParties{

    constructor(){
        this.parties=[
            {name: 'PTI',  picture: require('../../assets/1.jpg'),id:0},
            {name: 'PMLN', picture: require('../../assets/2.jpg'),id:1},
            {name: 'PPP', picture: require('../../assets/3.jpg'),id:2},
            {name: 'MQM', picture: require('../../assets/4.jpg'),id:3},
        ];

        this.vote=[];

    }

    updateVote(vote){
        this.vote.push(vote)
    }

    getUpdateVote(){
        return this.vote;
    }
}