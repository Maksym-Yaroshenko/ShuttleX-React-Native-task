import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createChat, fetchChats, deleteChat } from "../services/chatService";

export const createChatThunk = createAsyncThunk(
  "chats/createChat",
  async (chatName: string) => {
    const chat = await createChat(chatName);
    return chat;
  }
);

export const fetchChatsThunk = createAsyncThunk(
  "chats/fetchChats",
  async () => {
    const chats = await fetchChats();
    return chats;
  }
);

export const deleteChatThunk = createAsyncThunk(
  "chats/deleteChat",
  async (chatId: string) => {
    await deleteChat(chatId);
    return chatId;
  }
);

const chatSlice = createSlice({
  name: "chats",
  initialState: {
    chats: [],
    messages: {},
    status: "idle",
    error: null,
  },
  reducers: {
    receiveMessage: (state, action) => {
      const { chatId, message } = action.payload;
      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }
      state.messages[chatId].push(message);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChatThunk.fulfilled, (state, action) => {
        state.chats.push(action.payload);
      })
      .addCase(fetchChatsThunk.fulfilled, (state, action) => {
        state.chats = action.payload;
      })
      .addCase(deleteChatThunk.fulfilled, (state, action) => {
        state.chats = state.chats.filter((chat) => chat.id !== action.payload);
      });
  },
});

export const { receiveMessage } = chatSlice.actions;
export default chatSlice.reducer;
