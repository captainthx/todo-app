import { Alert, StyleSheet, TouchableOpacity } from "react-native";

import React from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
export default function HomeScreen() {
  const data = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
      content: "This is the first item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
      content: "This is the second item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
      content: "This is the third item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d73",
      title: "Fourt Item",
      content: "This is the fourt item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d74",
      title: "Five Item",
      content: "This is the five item",
    },
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.headContainer}>
          <Text
            style={{
              alignItems: "center",
              fontFamily: "worksans-semi-bold",
              fontSize: 24,
              color: "#F79E89",
            }}
          >
            TO DO LIST
          </Text>
          <TouchableOpacity
            onPress={() => Alert.alert("Setting Button pressed")}
          >
            <Ionicons name="settings-outline" size={24} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Entypo name="list" size={24} />
            <Text
              style={{
                alignItems: "center",
                fontFamily: "worksans-semi-bold",
                fontSize: 24,
                color: "#F76C6A",
              }}
            >
              LIST OF TODO
            </Text>
          </View>
          <AntDesign name="filter" size={24} />
        </View>

        <FlatList
          contentContainerStyle={{
            overflow: "hidden",
            width: "100%",
            paddingBottom: 100,
          }}
          data={data}
          renderItem={({ item }) => (
            <View
              style={{
                height: 100,
                padding: 16,
                margin: 8,
                backgroundColor: "#F79E89",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 4,
                  marginBottom: 8,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "worksans-semi-bold",
                    fontSize: 22,
                  }}
                >
                  {item.title}
                </Text>
                <Ionicons name="time-outline" size={24} />
              </View>
              <Text style={{ fontSize: 16 }}>{item.content}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />

        <View
          style={{
            position: "absolute",
            padding: 16,
            right: 24,
            bottom: 120,
            zIndex: 100,
            backgroundColor: "#F76C6A",
            borderRadius: 50,
          }}
        >
          <TouchableOpacity onPress={() => router.push("/slide")}>
            <Feather name="plus" size={24} color={"white"} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 16,
  },
  headContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    alignItems: "center",
  },
});
