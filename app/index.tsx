import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { router } from "expo-router";

export default function index() {
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Image
          style={styles.image}
          source={require("../assets/images/check-list.png")}
        />
      </View>
      <View style={styles.button}>
        <TouchableOpacity onPress={() => router.push("/(tabs)")}>
          <Text style={{ color: "white", fontSize: 24, textAlign: "center" }}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    padding: 16,
    backgroundColor: "white",
  },
  button: {
    position: "absolute",
    justifyContent: "center",
    left: 95,
    right: 0,
    bottom: 100,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#F79E89",
    width: 200,
  },
  image: {
    width: 370,
    height: 300,
  },
});
