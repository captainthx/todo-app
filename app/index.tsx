import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";

export default function index() {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button title="Get Started" onPress={() => router.push("/(tabs)")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    padding: 16,
  },
  button: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 100,
    justifyContent: "center",
    height: "auto",
  },
});
