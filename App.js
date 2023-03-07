import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  MD2LightTheme,
  Provider as PaperProvider,
  useTheme,
} from 'react-native-paper';
import { Provider, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import moment from "moment";


import Auth from "./screens/Auth";
import Home from "./screens/Home";
import store from "./store";

const theme = {
  ...MD2LightTheme, // or MD2DarkTheme
  roundness: 2,
  colors: {
    ...MD2LightTheme.colors,
    primary: '#3498db',
    secondary: '#f1c40f',
    tertiary: '#a1b2c3',
  },
  // backgroundColor:'transparent'
};

const Stack = createNativeStackNavigator();
function Main (){
  const data = useSelector((state)=>state.auth)
  
  
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerStyle:{backgroundColor:'#042511',}, headerTintColor:'#fff',animation:"slide_from_right"}} >
          {!data.idToken?
          <Stack.Screen name="Auth" options={{title:"Let's Start !"}} component={Auth} />:
          <Stack.Screen name="Home" component={Home} />
          }
          
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default function App() {
  
  return (
    <PaperProvider >
      <Provider store={store}>
    {/* <PaperProvider theme={theme}> */}
      <StatusBar style="light" />
      <Main/>
      </Provider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({

});
