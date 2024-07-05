import React from "react";
import { useDispatch } from "react-redux";
import { deleteChatThunk } from "../core/redux/chatSlice";
import { View, Text, Button } from "react-native";

const ChatItem = ({ chat }) => {
  const dispatch = useDispatch();

  const handleDeleteChat = () => {
    dispatch(deleteChatThunk(chat.id));
  };

  return (
    <View>
      <Text>{chat.name}</Text>
      <Button title="Delete" onPress={handleDeleteChat} />
    </View>
  );
};

export default ChatItem;
