import {
  Avatar,
  Button,
  Card,
  Text,
  useTheme,
  TextInput,
} from "react-native-paper";
import { StyleSheet, ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment/moment";

import { SignUser } from "../utils/utils";
import { setAuthDetails } from "../store/authSlice";

function SignIn({ setAuthScreen }) {
  const [inputData, setInputData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const theme = useTheme();
  const dispatch = useDispatch();

  const submitHandler = async () => {
    setLoading(true);
    const response = await SignUser(inputData.email, inputData.password);
    if (response.status === 200) {
      // navigation.navigate('Home',{source:'sign in',message:response.data.email})
      dispatch(
        setAuthDetails({
          idToken: response.data.idToken,
          expiresIn: response.data.expiresIn,
          // expiresIn: moment().add(response.data.expiresIn, "seconds").toISOString,
          email:response.data.email
        })
      );
      ToastAndroid.showWithGravity(
        `Signed In successfully`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    } else {
      ToastAndroid.showWithGravity(
        `Something went wrong`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
    setLoading(false);
  };
  if (loading) {
    return <ActivityIndicator animating={true} color={MD2Colors.blue500} />;
  }
  return (
    <Card style={{ backgroundColor: "rgba(255,255,255,0.1)" }} mode="outlined">
      <Card.Title
        title="LOG IN"
        subtitle="Let's roll..."
        //   left={LeftContent}
        titleStyle={{
          textAlign: "center",
          color: theme.colors.primary,
          fontWeight: "bold",
        }}
      />
      <Card.Content>
        <TextInput
          mode="flat"
          dense
          textColor="#fff"
          contentStyle={{ paddingLeft: 6 }}
          //   outlineStyle={{backgroundColor:'yellow'}}
          style={styles.inputStyle}
          label="Email"
          // placeholder="a@1.com"
          // secureTextEntry
          // left={<TextInput.Icon icon="email" />}
          onChangeText={(data) => setInputData((s) => ({ ...s, email: data }))}
        />
        <TextInput
          dense
          textColor="#fff"
          contentStyle={{ paddingLeft: 6 }}
          style={styles.inputStyle}
          label="Password"
          secureTextEntry={false}
          // right={<TextInput.Icon icon="eye" />}
          onChangeText={(data) =>
            setInputData((s) => ({ ...s, password: data }))
          }
        />
      </Card.Content>
      <Card.Actions style={{ marginVertical: 8 }}>
        <Button
          onPress={() => {
            setAuthScreen(false);
          }}
          textColor="white"
        >
          SIGN UP
        </Button>
        <Button onPress={submitHandler}>LOG IN</Button>
      </Card.Actions>
    </Card>
  );
}

export default SignIn;

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: "transparent",
    marginTop: 8,
  },
});
