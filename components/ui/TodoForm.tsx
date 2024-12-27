import React, { useState } from "react";
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
import dayjs from "dayjs";
import * as ImagePicker from "expo-image-picker";
import { AntDesign, Fontisto } from "@expo/vector-icons";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

type TodoFormProps = {
  onFormClose: (e: boolean) => void;
};

const TodoForm = ({ onFormClose }: TodoFormProps) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [image, setImage] = useState<string>("");
  const [showImage, setShowImage] = useState(false);

  const closeModalDatePicker = () => {
    setOpenDatePicker(false);
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
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontFamily: "worksans-semi-bold", fontSize: 16 }}>
              TODO FORM
            </Text>
            <TouchableOpacity onPress={() => onFormClose(true)}>
              <AntDesign name="close" size={24} />
            </TouchableOpacity>
          </View>
          <TextInput
            style={{
              height: 40,
              margin: 8,
              borderWidth: 2,
              padding: 8,
              borderRadius: 8,
              borderColor: "#F79E89",
            }}
            placeholder="Title"
          />
          <TextInput
            numberOfLines={10}
            multiline={true}
            style={{
              margin: 8,
              height: 100,
              textAlignVertical: "top",
              borderWidth: 2,
              padding: 8,
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
                margin: 8,
                borderWidth: 2,
                padding: 8,
                borderRadius: 8,
                borderColor: "#F79E89",
              }}
              value={dayjs(date).format("YYYY-MM-DD")}
            />
            <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
              <Fontisto
                style={{
                  position: "absolute",
                  top: -40,
                  right: 16,
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
                  marginTop: 8,
                  borderRadius: 8,
                  width: 250,
                  height: 150,
                  marginBottom: 10,
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
          visible={openDatePicker}
          onRequestClose={closeModalDatePicker}
        >
          <TouchableWithoutFeedback onPress={closeModalDatePicker}>
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
                  bottom: 55,
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
};

export default TodoForm;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    padding: 16,
    overflow: "hidden",
    backgroundColor: "white",
  },
});
