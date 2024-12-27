import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { Stack } from "expo-router";
import TopBarNavigation from "@/components/ui/TopBarNavigation";

type Todo = {
  id: string;
  title: string;
  content: string;
};

export default function todoDetail() {
  const { data } = useLocalSearchParams<{ data: string }>();

  const [todoData, setTodoData] = useState<Todo>({
    id: "",
    title: "",
    content: "",
  });

  const [lineText, setLineText] = useState<number | undefined>(20);

  const showMoreText = () => {
    if (lineText === undefined) {
      setLineText(20);
      return;
    }
    setLineText(undefined);
  };

  useEffect(() => {
    const json = JSON.parse(data);
    setTodoData(json);
  }, [data]);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontFamily: "worksans-semi-bold",
            fontSize: 24,
          },
          headerTitle: () => <TopBarNavigation name="Detail" />,
        }}
      />
      <View
        style={{
          width: "100%",
          padding: 8,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontFamily: "worksans-semi-bold",
          }}
        >
          {todoData.title}
        </Text>
      </View>
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
              {todoData.content}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "auto",
  },
});
