import { Fontisto, Ionicons } from "@expo/vector-icons";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import * as ImagePicker from "expo-image-picker";

export default function Slide() {
  const [openModal, setOpenModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [image, setImage] = useState<string>("");
  const [showImage, setShowImage] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  const onDateChange = (event: DateTimePickerEvent, date?: Date) => {
    const {
      type,
      nativeEvent: { timestamp, utcOffset },
    } = event;
    if (date) {
      setDate(date);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setShowImage(true);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.container}>
          <Text>Modal screen</Text>
          <TextInput
            style={{
              height: 40,
              margin: 12,
              borderWidth: 2,
              padding: 10,
              borderRadius: 8,
              borderColor: "#F79E89",
            }}
            placeholder="Title"
          />
          <TextInput
            numberOfLines={10}
            multiline={true}
            style={{
              margin: 12,
              height: 100,
              textAlignVertical: "top",
              borderWidth: 2,
              padding: 10,
              borderRadius: 8,
              borderColor: "#F79E89",
            }}
            placeholder="Description"
          />

          <View>
            <TextInput
              editable={false}
              selectTextOnFocus={false}
              style={{
                height: 40,
                margin: 12,
                borderWidth: 2,
                padding: 10,
                borderRadius: 8,
                borderColor: "#F79E89",
              }}
              value={dayjs(date).format("YYYY-MM-DD")}
            />
            <TouchableOpacity onPress={() => setOpenModal(true)}>
              <Fontisto
                style={{
                  position: "absolute",
                  top: -45,
                  right: 20,
                }}
                name="date"
                size={24}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {showImage && (
              <Image
                style={{
                  padding: 4,
                  marginTop: 20,
                  borderRadius: 8,
                  width: 300,
                  height: 250,
                  marginBottom: 20,
                }}
                source={{ uri: image }}
              />
            )}
            <TouchableOpacity
              onPress={pickImage}
              style={{
                backgroundColor: "#F79E89",
                padding: 16,
                borderRadius: 8,
              }}
            >
              <Text style={{ fontFamily: "worksans", fontSize: 16 }}>
                {" "}
                Pick an image
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          transparent={true}
          animationType="slide"
          visible={openModal}
          onRequestClose={closeModal}
        >
          <TouchableWithoutFeedback onPress={closeModal}>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  position: "absolute",
                  zIndex: 999,
                  bottom: 100,
                  height: "auto",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontFamily: "worksans-semi-bold", fontSize: 16 }}
                >
                  Choose date and time
                </Text>
                <RNDateTimePicker
                  testID="datePicker"
                  locale="EN"
                  value={date}
                  mode="date"
                  display="spinner"
                  onChange={onDateChange}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    height: "100%",
    padding: 16,
    overflow: "hidden",
  },
});
