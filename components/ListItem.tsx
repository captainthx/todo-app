import { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Alert,
} from "react-native";

import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native";
import { router } from "expo-router";
import axios from "axios";

type Todo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

type ListItemProps = {
  item: Todo;
  onUpdate: (todo: Todo) => void;
};

const ListItem = ({ item, onUpdate }: ListItemProps) => {
  const [openOptions, setOpenOptions] = useState(false);

  const onCompleteTodo = async (id: number) => {
    try {
      const response = await axios.put(`https://dummyjson.com/todos/${id}`, {
        completed: true,
      });

      if (response.data) {
        Alert.alert("Update todo", "update todo completed.!", [
          {
            text: "ok",
            onPress: () => {
              setOpenOptions(false);
              onUpdate(response.data);
            },
          },

          {
            text: "cancel",
            style: "cancel",
            onPress: () => setOpenOptions(false),
          },
        ]);
      }
    } catch (error) {
      console.log("error update todo", error);
    }
  };

  const optionItems = [
    {
      id: "complete",
      title: "Complete",
      icon: <Ionicons name="checkmark-done" size={24} />,
      action: (id: any) => onCompleteTodo(id),
    },
    {
      id: "edit",
      title: "Edit",
      icon: <SimpleLineIcons name="pencil" size={24} />,
      action: () => Alert.alert("Edit"),
    },
    {
      id: "share",
      title: "Share",
      icon: <SimpleLineIcons name="share" size={24} />,
      action: () => Alert.alert("Share"),
    },
  ];

  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/todoDetail",
            params: { data: JSON.stringify(item) },
          })
        }
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            height: 100,
            padding: 8,
            marginBottom: 8,
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
            }}
          >
            <View>
              <Text
                style={{
                  color: "white",
                  fontFamily: "worksans-semi-bold",
                  fontSize: 24,
                }}
              >
                {item.id}
              </Text>
            </View>
            <TouchableOpacity onPress={() => setOpenOptions(!openOptions)}>
              <SimpleLineIcons name="options-vertical" size={16} />
            </TouchableOpacity>

            <Modal
              animationType="slide"
              transparent={true}
              visible={openOptions}
            >
              <TouchableWithoutFeedback onPress={() => setOpenOptions(false)}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "flex-start",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.5)",
                  }}
                >
                  <View
                    style={{
                      position: "absolute",
                      borderRadius: 16,
                      height: "30%",
                      width: "100%",
                      backgroundColor: "white",
                      zIndex: 999,
                      bottom: 0,
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                        padding: 16,
                        backgroundColor: "rgba(163, 160, 160, 0.1)",
                        borderBottomLeftRadius: 16,
                        borderBottomRightRadius: 16,
                      }}
                    >
                      {optionItems.map((option, index) => (
                        <TouchableOpacity
                          onPress={() => option.action(item.id)}
                          key={index}
                          style={{
                            width: "100%",
                            height: 60,
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            borderBottomWidth: 1,
                            borderBottomColor: "rgba(163, 160, 160, 0.1)",
                          }}
                        >
                          {option.icon}
                          <Text style={{ marginLeft: 16 }}>{option.title}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, color: "white" }}>{item.todo}</Text>
            <Text>{item.completed ? "✅" : "❌"}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ListItem;
