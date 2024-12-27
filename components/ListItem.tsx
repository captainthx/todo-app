import React from "react";
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

const ListItem = ({ item }: any) => {
  const [openOptions, setOpenOptions] = React.useState(false);

  const optionItems = [
    {
      id: "complete",
      title: "Complete",
      icon: <Ionicons name="checkmark-done" size={24} />,
      action: () => Alert.alert("Complete"),
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
                  fontSize: 22,
                }}
              >
                {item.title}
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
                      {optionItems.map((item, index) => (
                        <TouchableOpacity
                          onPress={item.action}
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
                          {item.icon}
                          <Text style={{ marginLeft: 16 }}>{item.title}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>
          <Text style={{ fontSize: 16 }}>{item.discription}</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ListItem;
