import { View, StyleSheet, ImageBackground, Keyboard, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, fbSignUp, fbSignIn } from "../../firebase.js";

import styles from "../../styles/styles.js";
import Field from "../common/Field.js";
import CustomButton from "../common/CustomButton.js";
import LoadingScreen from "../common/LoadingScreen.js";

const Login = () => {
  const nav = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      
      nav.replace("home");
    } else {
      nav.navigate("login");
    
    }
  });

  const handleSignUp = () => {
    setLoading(true);
    Keyboard.dismiss();
    fbSignUp(email, password, setLoading);
  };

  const handleLogin = () => {
    setLoading(true);
    Keyboard.dismiss();
    fbSignIn(email, password, setLoading);
  };
  return (
    <ImageBackground
      source={require("../../assets/images/login-1.jpg")}
      style={loginStyle.loginLayout}
    >
      <LoadingScreen visible={loading} />
      <View style={loginStyle.loginContainer}>
        <Text style={styles.title}>customer Login</Text>
        <Field
          label={"Username"}
          value={email}
          placeholder={"Enter your email here"}
          callback={setEmail}
        />
        <Field
          label={"Password"}
          value={password}
          secure={true}
          placeholder={"Enter your password here"}
          callback={setPassword}
        />
        <CustomButton
          callback={handleLogin}
          content={"Login"}
          cstyle={styles.button}
        />
        <CustomButton
          callback={handleSignUp}
          content={"Register"}
          cstyle={styles.buttonSecondary}
        />
      </View>
    </ImageBackground>
  );
};

const loginStyle = StyleSheet.create({
  loginLayout: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginContainer: {
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 16,
    borderRadius: 12,
  },
});

export default Login;
