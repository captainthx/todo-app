import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { Stack } from "expo-router";
import TopBarNavigation from "@/components/ui/TopBarNavigation";
import ViewShot, { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import { useThemeColor } from "@/hooks/useThemeColor";

type Todo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

export default function todoDetail() {
  const { data } = useLocalSearchParams<{ data: string }>();
  const ref = useRef<any>();
  const [todoData, setTodoData] = useState<Todo>({
    id: 0,
    todo: "",
    completed: false,
    userId: 0,
  });

  const [lineText, setLineText] = useState<number | undefined>(20);

  const showMoreText = () => {
    if (lineText === undefined) {
      setLineText(20);
      return;
    }
    setLineText(undefined);
  };

  const share = async () => {
    const uri = await captureRef(ref);
    if (uri) {
      await Sharing.shareAsync(uri);
    }
  };

  useEffect(() => {
    const json = JSON.parse(data);
    setTodoData(json);
  }, [data]);
  const backgroundColor = useThemeColor({}, "background");
  return (
    <SafeAreaView style={{ height: "100%", padding: 24, backgroundColor }}>
      <TopBarNavigation name="Detail" onSharing={share} />
      <ViewShot ref={ref}>
        <View
          style={{
            width: "100%",
            padding: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        ></View>
        <ScrollView>
          <View
            style={{
              margin: 8,
              padding: 20,
              backgroundColor: "rgba(255, 255, 255, 0.81)",
              borderRadius: 16,
              marginBottom: 100,
            }}
          >
            <TouchableOpacity onPress={showMoreText}>
              <Text
                numberOfLines={lineText}
                style={{
                  fontSize: 16,
                  fontFamily: "worksans",
                }}
              >
                {todoData.todo}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ViewShot>
    </SafeAreaView>
  );
}
