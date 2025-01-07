import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedView } from "../ThemedView";

interface CardProps extends React.PropsWithChildren {
  style?: Object;
}

export default function Card({ children, style }: CardProps) {
  return (
    <ThemedView
      style={[
        {
          justifyContent: "center",
          alignItems: "center",
          marginTop: 24,
          marginHorizontal: 20,
          height: 150,
          borderRadius: 16,
        },
        style,
      ]}
    >
      {children}
    </ThemedView>
  );
}
