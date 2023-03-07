import React, { useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Text,
  useTheme,
  TextInput,
} from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";


function Auth() {
  const theme = useTheme();
  const [authSCreen, setAuthScreen] = useState(true);




  return (
    <LinearGradient colors={["white", "black"]} style={styles.root}>
      <ImageBackground
        style={styles.root}
        source={require("../assets/bg01.jpg")}
        imageStyle={styles.imageStyle}
        resizeMode="cover"
      >
        <View style={styles.container}>
          {authSCreen ? <SignIn setAuthScreen={setAuthScreen} /> : <SignUp setAuthScreen={setAuthScreen} />}
        </View>
      </ImageBackground>
    </LinearGradient>
  );
}

export default Auth;

const styles = StyleSheet.create({
  root: {
    // backgroundColor:'green',
    flex: 1,
    // paddingVertical: 12,
    // paddingHorizontal: 4,
  },
  container: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  imageStyle: {
    opacity: 0.65,
  },

});
