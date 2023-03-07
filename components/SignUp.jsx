import {
  Avatar,
  Button,
  Card,
  Text,
  useTheme,
  TextInput,
} from "react-native-paper";
import { useState } from "react";
import { StyleSheet, ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { useDispatch } from "react-redux";
import moment from "moment";

import { CreateUser } from "../utils/utils";
import { setAuthDetails } from "../store/authSlice";

function SignUp({ setAuthScreen }) {
  const [inputData, setInputData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const signUpHandler = async () => {
    setLoading(true);
    const response = await CreateUser(inputData.email, inputData.password);
    if (response.status === 200) {
      // navigation.navigate('Home',{source:'sign up',message:response.data.email})
      dispatch(
        setAuthDetails({
          idToken: response.data.idToken,
          expiresIn: response.data.expiresIn,
          // expiresIn: moment().add(response.data.expiresIn, "seconds").toISOString,
          email: response.data.email,
        })
      );
      ToastAndroid.showWithGravity(
        `Signed up successfully`,
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
        title="SIGN UP"
        subtitle="Want to be inclusive and be all? get in..."
        //   left={LeftContent}
        titleStyle={{
          textAlign: "center",
          color: theme.colors.primary,
          fontWeight: "bold",
          //   backgroundColor:'rgba(255,255,255,0.5)'
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
          label="Name"
          // placeholder="a@1.com"
          // secureTextEntry
          // left={<TextInput.Icon icon="email" />}
        />
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
        <TextInput
          dense
          textColor="#fff"
          contentStyle={{ paddingLeft: 6 }}
          style={styles.inputStyle}
          label="Confirm Password"
          secureTextEntry={false}

          // right={<TextInput.Icon icon="eye" />}
        />
      </Card.Content>
      <Card.Actions style={{ marginVertical: 8 }}>
        <Button
          onPress={() => {
            setAuthScreen(true);
          }}
          textColor="white"
        >
          LOG IN
        </Button>
        <Button onPress={signUpHandler} textColor="white">
          SIGN UP
        </Button>
      </Card.Actions>
    </Card>
  );
}

export default SignUp;

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
    opacity: 0.45,
  },
  inputStyle: {
    backgroundColor: "transparent",
    marginTop: 8,
  },
});
