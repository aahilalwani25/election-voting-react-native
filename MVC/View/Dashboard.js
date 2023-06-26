import React from 'react';
// import { View,Text } from 'react-native';
// import NavDrawer from '../../Navigation/Drawer';
import {createDrawerNavigator} from '@react-navigation/drawer';
//import {NavigationContainer} from '@react-navigation/native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ViewResultsPage from '../View/ViewResultsPage';
import VotingScreen from '../View/VotingScreen';


const Drawer = createDrawerNavigator();
export default class Dashboard extends React.Component {

    render(){
        return (
          // <NavDrawer/>
          <Drawer.Navigator screenOptions={{}}>
            <Drawer.Screen
              name="View Results"
              component={ViewResultsPage}
              options={{
                drawerIcon: () => {
                  <Ionicon
                    name="home-outline"
                    size={20}
                    color={'black'}
                    selectionColor={'black'} //style={{width:10,height:10}}
                  />;
                },
              }}
            />
            <Drawer.Screen name="Cast Your Vote" component={VotingScreen} />
          </Drawer.Navigator>
        );
    }
}
