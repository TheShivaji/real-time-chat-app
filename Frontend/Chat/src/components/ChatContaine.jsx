import { useChatStore } from "../store/useChatStore";
import { User, MoreVertical, Send, Image as ImageIcon } from "lucide-react";

const ChatContainer = () => {
  
  const { selectedUser } = useChatStore();

  return (
    <div className="flex flex-col w-full h-full">

      {/* 1. Chat Header (Ab Theme-Compatible aur Dynamic hai) */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-base-300 bg-base-100 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          {/* Dynamic Profile Pic */}
          <div className="w-10 h-10 rounded-full bg-base-300 overflow-hidden border-2 border-primary/20">
            <img
              src={selectedUser?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png"; }}
            />
          </div>
          <div>
            {/* 🔥 Dynamic Name: John Doe ki jagah ab asli naam aayega */}
            <h3 className="font-semibold text-base-content">{selectedUser?.fullName || "User"}</h3>
            <p className="text-xs text-success font-medium">Online</p>
          </div>
        </div>
        <button className="text-base-content/50 hover:text-base-content transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* 2. Messages Area (Ab Theme ka bg-base-200 lega) */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-base-200">
        {/* Dummy Receiver Message */}
        <div className="flex justify-start">
          <div className="bg-base-100 border border-base-300 text-base-content px-4 py-2 rounded-2xl rounded-tl-none shadow-sm max-w-[70%]">
            <p>Bhai, kaisa hai? Cloudinary integration ho gaya?</p>
            <span className="text-[10px] opacity-50 mt-1 block">10:42 AM</span>
          </div>
        </div>

        {/* Dummy Sender Message */}
        <div className="flex justify-end">
          <div className="bg-primary text-primary-content px-4 py-2 rounded-2xl rounded-tr-none shadow-sm max-w-[70%]">
            <p>Haan bhai! Ekdum smooth chal raha hai. Abhi UI par kaam chalu hai.</p>
            <span className="text-[10px] opacity-70 mt-1 block text-right">10:45 AM</span>
          </div>
        </div>
      </div>

      {/* 3. Message Input Area (Theme-Compatible) */}
      <div className="p-4 bg-base-100 border-t border-base-300">
        <form className="flex items-center gap-2">
          <button type="button" className="p-2 text-base-content/50 hover:text-primary transition-colors rounded-full hover:bg-base-200">
            <ImageIcon className="w-5 h-5" />
          </button>

          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-base-200 text-base-content px-4 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />

          <button
            type="submit"
            className="p-3 bg-primary text-primary-content rounded-full hover:brightness-90 transition-all shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatContainer;
