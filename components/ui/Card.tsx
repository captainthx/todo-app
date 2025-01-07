import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface CardProps extends React.PropsWithChildren {
  lightColor?: string;
  darkColor?: string;
  name: String;
}

export default function Card({ children }: CardProps) {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        marginTop: 24,
        marginHorizontal: 20,
        height: 150,
        borderRadius: 16,
      }}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({});
