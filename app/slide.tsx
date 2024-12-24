import { Fontisto } from "@expo/vector-icons";
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
  Button,
  TouchableOpacity,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Slide() {
  const [openModal, setOpenModal] = useState(false);
  const [date, setDate] = useState(new Date());

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

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.container}>
          <Text>Modal screen</Text>
          <TextInput
            style={{
              height: 40,
              margin: 12,
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
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
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
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
                borderWidth: 1,
                padding: 10,
                borderRadius: 10,
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
                  style={{ fontFamily: "worksans-semi-bold", fontSize: 20 }}
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
    height: "100%",
    padding: 16,
    overflow: "hidden",
  },
});
