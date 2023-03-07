import axios from "axios";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Surface, Text, MD2Colors } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { resetAuthDetails } from "../store/authSlice";



function Home() {
    // const {source, message} = route.params
    const [protectedData, setProtectedData] = useState('Check')
    const email = useSelector((state)=>state.auth.email)
    const token = useSelector((state)=>state.auth.idToken)
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const logOutHandler=()=>{
      dispatch(resetAuthDetails())
    }
    const fetchHandler= async ()=>{
      setLoading(true)
      console.log('ok')
      const response = await axios.get(`https://testproject-e3ce8-default-rtdb.firebaseio.com/test.json?auth=${token}`)
      // dispatch(resetAuthDetails())
      setProtectedData(response.data)
      setLoading(false)
    }
  return (
    <View style={styles.root}>
      <Surface style={styles.surface} elevation={4}>
        <Text variant="labelLarge">welcome</Text>
        <Text variant="labelLarge">{email}</Text>
        <Text variant="labelLarge">You are signed in</Text>
        <Text variant="labelLarge">{protectedData}</Text>
        {/* <Text variant="labelLarge">Form {source}</Text> */}
      </Surface>
      <Button mode="elevated" loading={loading} onPress={fetchHandler} style={{marginTop:24}} buttonColor={MD2Colors.green600} textColor="white">
          Fetch Data
        </Button>
      <Button mode="outlined" onPress={()=>setProtectedData('')} style={{marginTop:24}} buttonColor={MD2Colors.greenA700} textColor="white">
          Reset Data
        </Button>
      <Button mode="elevated" onPress={logOutHandler} style={{marginTop:24}} buttonColor={MD2Colors.red400} textColor="white">
          Log Out
        </Button>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#7EF1AC",
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  surface: {
    padding: 8,
    height: 150,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:6
  },
});
