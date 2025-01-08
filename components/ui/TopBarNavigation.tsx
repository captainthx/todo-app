import { useThemeColor } from "@/hooks/useThemeColor";
import { MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

type PropsItem = {
  name: string;
  onSharing?: () => void;
};

export default function TopBarNavigation({ name, onSharing }: PropsItem) {
  const colorIcon = useThemeColor({}, "icon");

  return (
    <ThemedView
      style={{
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <MaterialIcons name="arrow-back" size={24} color={colorIcon} />
      </TouchableOpacity>
      <ThemedText
        style={{
          flex: 1,
          textAlign: "center",
          fontFamily: "worksans-semi-bold",
          fontSize: 16,
        }}
      >
        {name}
      </ThemedText>
      {onSharing && (
        <TouchableOpacity onPress={onSharing}>
          <SimpleLineIcons name="share" size={24} color={colorIcon} />
        </TouchableOpacity>
      )}
    </ThemedView>
  );
}
