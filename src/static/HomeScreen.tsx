import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchChatsThunk } from "../core/redux/chatSlice";
import { View, FlatList } from "react-native";
import CreateChatForm from "../shared/components/CreateChatForm";
import ChatItem from "../shared/components/ChatItem";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state: any) => state.chats.chats);

  useEffect(() => {
    dispatch(fetchChatsThunk());
  }, [dispatch]);

  return (
    <View>
      <CreateChatForm />
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatItem chat={item} />}
      />
    </View>
  );
};

export default HomeScreen;
