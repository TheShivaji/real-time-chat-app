import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { MoreVertical, Send, Image as ImageIcon } from "lucide-react";
import ChatHeader from "./Chatheader";

const ChatContainer = () => {
  const {
    selectedUser,
    messages,
    getMessages,
    isMessagesLoading,
    addMessage, // (future socket use)
  } = useChatStore();

  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  // 🔥 Fetch messages when user changes
  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  // 🔥 Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔥 Send message handler
  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    // temporary optimistic UI
    addMessage({
      _id: Date.now(),
      text,
      senderId: "me",
      createdAt: new Date(),
    });

    setText("");

    // 👉 yaha API call add karega (next step)
  };

  return (
    <div className="flex flex-col w-full h-full">

      {/* Header */}
      <ChatHeader />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-base-200">
        {isMessagesLoading ? (
          <p>Loading...</p>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderId === "me";

            return (
              <div
                key={msg._id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-[70%] ${
                    isMe
                      ? "bg-primary text-white rounded-tr-none"
                      : "bg-base-100 border rounded-tl-none"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="text-[10px] opacity-60">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            );
          })
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-base-100">
        <form onSubmit={handleSend} className="flex gap-2">
          <button type="button">
            <ImageIcon className="w-5 h-5" />
          </button>

          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-full bg-base-200"
          />

          <button type="submit" className="p-2 bg-primary rounded-full">
            <Send className="w-4 h-4 text-white" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatContainer;