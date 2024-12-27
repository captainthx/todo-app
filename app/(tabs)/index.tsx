import {
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

export default function HomeScreen() {
  const fixedContent =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  const data = [
    {
      id: "1",
      title: "First Item",
      content: fixedContent,
      discription: "This is the first item",
    },
    {
      id: "2",
      title: "Second Item",
      content: fixedContent,
      discription: "This is the second item",
    },
    {
      id: "3",
      title: "Third Item",
      content: fixedContent,
      discription: "This is the third item",
    },
    {
      id: "4",
      title: "Fourt Item",
      content: fixedContent,
      discription: "This is the fourth item",
    },
    {
      id: "5",
      title: "Five Item",
      content: fixedContent,
      discription: "This is the fifth item",
    },
    {
      id: "6",
      title: "Six Item",
      content: fixedContent,
      discription: "This is the sixth item",
    },
  ];

  const [openForm, setOpenForm] = useState(false);

  const handleFormClose = () => {
    setOpenForm(false);
  };

  const renderItem = ({ item }: any) => <ListItem item={item} />;

  return (
    <SafeAreaProvider>
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

        <FlatList
          contentContainerStyle={{
            width: "100%",
            paddingBottom: 100,
          }}
          data={data}
          renderItem={renderItem}
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
