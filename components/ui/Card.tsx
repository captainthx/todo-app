import { StyleSheet, type ViewProps } from "react-native";
import React from "react";
import { ThemedView } from "../ThemedView";

type CardProps = ViewProps & {};
// interface CardProps extends React.PropsWithChildren {
//   style?: Object;
// }

export default function Card({ children, style, ...otherProps }: CardProps) {
  return (
    <ThemedView style={[styles.defautl, style]} {...otherProps}>
      {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  defautl: {
    justifyContent: "center",
    marginTop: 24,
    marginHorizontal: 20,
    height: 150,
    borderRadius: 16,
  },
});
