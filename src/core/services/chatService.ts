import axios from "axios";
import { io } from "socket.io-client";

const API_URL = "http://localhost:3000/api/chats";

export const createChat = async (chatName: string) => {
  const response = await axios.post(API_URL, { name: chatName });
  return response.data;
};

export const fetchChats = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const deleteChat = async (chatId: string) => {
  const response = await axios.delete(`${API_URL}/${chatId}`);
  return response.data;
};

export const getChatMessages = async (chatId: string) => {
  const response = await axios.get(`${API_URL}/${chatId}/messages`);
  return response.data;
};

const socket = io("http://localhost:3000");

export const subscribeToChat = (
  chatId: string,
  callback: (message: string) => void
) => {
  socket.emit("join", chatId);
  socket.on("message", callback);

  return () => {
    socket.off("message", callback);
    socket.emit("leave", chatId);
  };
};
