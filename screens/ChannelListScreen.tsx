import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { ChannelList } from "stream-chat-expo";
import AuthContext from "../contexts/Authentication";
import { RootTabScreenProps } from "../types";

export default function ChannelListScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const onChannelPressed = (channel) => {
    navigation.navigate("Channel", { channel });
  };

  const filters = {
    members: {
      $in: [userId],
    },
  };

  return <ChannelList 
  onSelect={onChannelPressed} 
  filters={filters} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export default ChannelListScreen