import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, FlatList } from "react-native";
import { subscribeToChat } from "../core/services/chatService";
import { receiveMessage } from "../core/redux/chatSlice";

const ChatScreen = ({ route }) => {
  const { chatId } = route.params;
  const dispatch = useDispatch();
  const messages = useSelector(
    (state: any) => state.chats.messages[chatId] || []
  );

  useEffect(() => {
    const unsubscribe = subscribeToChat(chatId, (message) => {
      dispatch(receiveMessage({ chatId, message }));
    });

    return () => unsubscribe();
  }, [chatId, dispatch]);

  return (
    <View>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    </View>
  );
};

export default ChatScreen;
