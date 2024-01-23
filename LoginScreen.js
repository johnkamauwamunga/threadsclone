import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const  navigation= useNavigation();


  useEffect(()=>{
    const checkloginstatus = ()=>{
      try{

        const token= await AsyncStorage.getItem("authToken");

        if(token){
          setTimeout(()=>{
            navigation.replace("Home")
          }, 400)
        }
      }catch(error){
        console.log(error)
      }
    }

    checkloginstatus();
  }, [])

  const handleLogin= ()=>{
   const user={
    email:email,
    password:password,

   }
   axios.post("http://192.168.100.5:8083/login", user)
   .then((response) => {
    console.log(response);
     const token=response.data.token;

     AsyncStorage.seItem("authToken",token)
     navigation.navigate("Home")
   
  })
  .catch((error) => {
    Alert.alert("Error","wrong credentials");
    console.log("error login", error);
  });
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View style={{ marginTop: 50 }}>
        <Image
          style={{ width: 150, height: 100, resizeMode: "contain" }}
          source={{
            uri: "https://1000logos.net/wp-content/uploads/2023/07/Threads-Logo.jpg",
          }}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 25 }}>
            Login to your acccount
          </Text>
        </View>

        <View style={{ marginTop: 40 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="gray"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={"gray"}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 16 : 16,
              }}
              placeholder="enter your email"
            />
          </View>
        </View>

        <View style={{ marginTop: 30 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="lock"
              size={24}
              color="gray"
            />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholderTextColor={"gray"}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: password ? 16 : 16,
              }}
              placeholder="enter your password"
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 12,
          }}
        >
          <Text>Keep me logged in</Text>
          <Text style={{ fontWeight: "500", color: "#007FFF" }}>
            Forgot Password
          </Text>
        </View>

        <View style={{ marginTop: 45 }} />
        <Pressable
        onPress={handleLogin}
          style={{
            width: 200,
            backgroundColor: "black",
            padding: 15,
            marginTop: 40,
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: 6,
          }}
        >
          <Text style={{textAlign:'center', fontWeight:"bold", fontSize:16,color:"white"}}>Login</Text>
        </Pressable>

        <Pressable onPress={()=> navigation.navigate("Register")} style={{margin: 10}}>
            <Text style={{textAlign:"center", fontSize:16 }}>Dont have and account? sign up</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
