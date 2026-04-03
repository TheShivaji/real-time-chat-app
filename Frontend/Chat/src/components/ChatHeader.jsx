import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  // 🔥 VERY IMPORTANT: null guard
  if (!selectedUser) return null;

  // 🔥 Safe check (no crash)
  const isOnline =
    Array.isArray(onlineUsers) &&
    onlineUsers.includes(selectedUser._id);

  return (
    <div className="p-2.5 border-b border-base-300 bg-base-100">
      <div className="flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-3">

          {/* Avatar */}
          <div className="relative">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName || "User"}
              className="w-10 h-10 rounded-full object-cover"
              onError={(e) => (e.target.src = "/avatar.png")}
            />

            {/* 🔥 Online dot */}
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-base-100 ${
                isOnline ? "bg-green-500" : "bg-gray-400"
              }`}
            />
          </div>

          {/* User Info */}
          <div>
            <h3 className="font-medium">
              {selectedUser.fullName || "User"}
            </h3>

            <p className="text-sm text-base-content/70">
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <button
          onClick={() => setSelectedUser(null)}
          className="p-2 rounded-full hover:bg-base-200 transition"
        >
          <X className="w-5 h-5" />
        </button>

      </div>
    </div>
  );
};

export default ChatHeader;