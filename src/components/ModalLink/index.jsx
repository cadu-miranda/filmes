import React from "react";
import { BackButton, MovieTitle } from "./styles";
import { Feather } from "@expo/vector-icons";
import { WebView } from "react-native-webview";

export default function ModalLink({ link, title, closeModal }) {
  return (
    <>
      <BackButton onPress={closeModal}>
        <Feather name="x" size={35} color="#fff" />
        <MovieTitle numberOfLines={1}>{title}</MovieTitle>
      </BackButton>

      <WebView source={{ uri: link }} />
    </>
  );
}
