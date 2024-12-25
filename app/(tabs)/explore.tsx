import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

export default function SwipeToDelete() {
  const translateX = useSharedValue(0); // Animated shared value for swipe position
  const deleteWidth = 100; // Width of the delete button

  // Define the swipe gesture
  const swipeGesture = Gesture.Pan()
    .onUpdate((event) => {
      // Allow swiping left only (negative values)
      translateX.value = Math.max(-deleteWidth, event.translationX);
    })
    .onEnd(() => {
      // Snap to delete button or reset to original position based on swipe distance
      if (translateX.value < -deleteWidth / 2) {
        translateX.value = withTiming(-deleteWidth); // Snap to delete button
      } else {
        translateX.value = withTiming(0); // Reset to default position
      }
    });

  // Animated style for the swipeable row
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.wrapper}>
        {/* Delete Button */}
        <View
          style={[
            styles.deleteButton,
            { width: deleteWidth }, // Dynamically set the delete button width
          ]}
        >
          <TouchableOpacity onPress={() => alert("Item deleted!")}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>

        {/* Swipeable Row */}
        <GestureDetector gesture={swipeGesture}>
          <Animated.View style={[styles.swipeableRow, animatedStyle]}>
            <Text style={styles.rowText}>Swipe me left to delete</Text>
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  wrapper: {
    width: 300,
    height: 70,
    position: "relative",
  },
  swipeableRow: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F79E89",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    zIndex: 1,
    elevation: 3,
  },
  rowText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    position: "absolute",
    right: 0,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff4d4f",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
