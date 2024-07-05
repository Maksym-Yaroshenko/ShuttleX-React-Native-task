import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createChatThunk } from "../core/redux/chatSlice";
import { View, TextInput, Button } from "react-native";

const CreateChatForm = () => {
  const [chatName, setChatName] = useState("");
  const dispatch = useDispatch();

  const handleCreateChat = () => {
    dispatch(createChatThunk(chatName));
    setChatName("");
  };

  return (
    <View>
      <TextInput
        placeholder="Enter chat name"
        value={chatName}
        onChangeText={setChatName}
      />
      <Button title="Create Chat" onPress={handleCreateChat} />
    </View>
  );
};

export default CreateChatForm;
