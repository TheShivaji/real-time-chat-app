import { useEffect } from "react";
import{ useChatStore} from "../store/useChatStore"
import SidebarSkeleton from "./SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  // Store se functions aur state nikal li
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

  // Component load hote hi API call marega
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // Agar data fetch ho raha to hai component
  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-full sm:w-80 border-r border-base-300 flex flex-col bg-base-100 transition-all duration-200 shrink-0">

      {/* Header */}
      <div className="border-b border-base-300 w-full p-4 flex items-center gap-2 h-16 shrink-0">
        <Users className="w-6 h-6 text-base-content" />
        <span className="font-bold text-xl hidden sm:block text-base-content">Chats</span>
      </div>

      {/* Users List */}
      <div className="overflow-y-auto w-full py-3 scrollbar-thin scrollbar-thumb-base-300">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 hover:bg-base-200 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-200 border-l-4 border-primary" : ""}
            `}
          >
            <div className="relative mx-auto sm:mx-0">
              <img
                src={user.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                alt={user.fullName}
                className="w-12 h-12 rounded-full object-cover border border-base-300"
              />
              {/* Online Indicator (Abhi static hai, baad mein Socket se connect karenge) */}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-base-300 rounded-full ring-2 ring-base-100"></span>
            </div>

            <div className="hidden sm:block text-left min-w-0 flex-1">
              <div className="font-medium text-base-content truncate">{user.fullName}</div>
              <div className="text-sm text-base-content/50 truncate">Offline</div>
            </div>
          </button>
        ))}

        {users.length === 0 && (
          <div className="text-center text-base-content/50 py-4">No users found</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
