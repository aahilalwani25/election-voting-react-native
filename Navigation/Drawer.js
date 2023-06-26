// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { NavigationContainer } from "@react-navigation/native";
// import React from "react";
// import ViewResultsPagae from "../MVC/View/ViewResultsPage";
// import VotingScreen from "../MVC/View/VotingScreen";
// import Ionicon from "react-native-vector-icons/Ionicons";


// const Drawer= createDrawerNavigator();

// export default class NavDrawer extends React.Component{

//     render(){
//         return (
           
//             <Drawer.Navigator screenOptions={{
                
//             }} >
//               <Drawer.Screen name="View Results" component={ViewResultsPage}
//               options={{
//                 drawerIcon:()=>{
//                     <Ionicon name="home-outline" size={20} color={'black'} selectionColor={'black'} //style={{width:10,height:10}}
//                     />
//                 }
//               }} />
//               <Drawer.Screen name="Cast Your Vote" component={VotingScreen} />
//             </Drawer.Navigator>
            
//         );
//     }
// }