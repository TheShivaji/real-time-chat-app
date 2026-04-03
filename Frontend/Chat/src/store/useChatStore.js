import { create } from "zustand";
import { axiosInstance } from "../lib/authInstance";
import { toast } from "sonner";

export const useChatStore = create((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,


  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/user");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },


  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
sendMessage: async ({ text, image }) => {
  const { selectedUser, messages } = get();

  if (!selectedUser?._id) return;

  try {
    const res = await axiosInstance.post(
      `/message/send/${selectedUser._id}`,
      { text, image }
    );

    // UI update
    set({
      messages: [...messages, res.data],
    });

  } catch (error) {
    console.error(error);
    throw error;
  }
},
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
