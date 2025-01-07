import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import { router } from "expo-router";

type PropsItem = {
  name: string;
  onSharing?: () => void;
};

export default function TopBarNavigation({ name, onSharing }: PropsItem) {
  return (
    <View
      style={{
        width: "100%",
        padding: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <MaterialIcons name="arrow-back" size={24} />
      </TouchableOpacity>
      <Text
        style={{
          flex: 1,
          textAlign: "center",
          fontFamily: "worksans-semi-bold",
          fontSize: 16,
        }}
      >
        {name}
      </Text>
      {onSharing && (
        <TouchableOpacity onPress={onSharing}>
          <SimpleLineIcons name="share" size={24} />
        </TouchableOpacity>
      )}
    </View>
  );
}
