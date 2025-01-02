import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import TodoForm from "@/components/ui/TodoForm";
import ListItem from "@/components/ListItem";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { Stack } from "expo-router";

export default function HomeScreen() {
  type Todo = {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
  };
  const [openForm, setOpenForm] = useState(false);

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["todos"],
      queryFn: async ({ pageParam = 0 }) => {
        const response = await axios.get(
          `https://dummyjson.com/todos?limit=10&skip=${pageParam}`
        );
        return response.data;
      },
      getNextPageParam: (lastPage, pages) => {
        // DummyJSON has 150 total todos
        const nextSkip = pages.length * 10;
        return nextSkip < 150 ? nextSkip : undefined;
      },
    });

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const handleFormClose = () => {
    setOpenForm(false);
  };

  const renderItem = ({ item }: { item: Todo }) => <ListItem item={item} />;

  return (
    <SafeAreaProvider>
      <Stack.Screen options={{ gestureEnabled: false }} />
      <SafeAreaView style={styles.container}>
        <View style={styles.headContainer}>
          <Text
            style={{
              fontFamily: "worksans-semi-bold",
              fontSize: 24,
              color: "#F79E89",
            }}
          >
            TO DO LIST
          </Text>
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
          <TouchableOpacity>
            <AntDesign name="filter" size={24} />
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size={"large"} color="#F76C6A" />
          </View>
        ) : null}

        <FlatList
          contentContainerStyle={{
            width: "100%",
            paddingBottom: 100,
          }}
          data={data?.pages.flatMap((page) => page.todos) || []}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() =>
            isFetchingNextPage ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size={"large"} color="#F76C6A" />
              </View>
            ) : null
          }
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
          <TouchableOpacity onPress={() => setOpenForm(true)}>
            <Feather name="plus" size={24} color={"white"} />
          </TouchableOpacity>
        </View>
        {openForm && (
          <Modal
            transparent={true}
            animationType="slide"
            visible={openForm}
            onRequestClose={() => setOpenForm(false)}
          >
            <TouchableWithoutFeedback onPress={() => setOpenForm(false)}>
              <View
                style={{
                  flex: 1,
                }}
              >
                <TodoForm onFormClose={handleFormClose} />
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        )}
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
    justifyContent: "center",
    padding: 8,
    alignItems: "center",
  },
});
