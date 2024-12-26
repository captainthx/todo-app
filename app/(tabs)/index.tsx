import {
  Alert,
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
    {
      id: "58694a0f-3da1-471f-bd96-2323",
      title: "Six Item",
      content: "This is the six item",
    },
  ];

  const [openForm, setOpenForm] = useState(false);
  const [items, setItems] = useState(data);

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
              alignItems: "center",
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
          data={items}
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
