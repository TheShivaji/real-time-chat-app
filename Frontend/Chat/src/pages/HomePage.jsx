import { useChatStore } from "../store/useChatStore"; // 🔥 Tera store import kiya
import NoChatSelected from "../components/Nochatseleced";
import ChatContainer from "../components/ChatContaine"; // Apne file ka naam match kar lena
import Sidebar from "../components/Sidebar";

const HomePage = () => {
  // 🔥 Asli magic: Store se selectedUser nikal liya!
  const { selectedUser } = useChatStore();

  return (
    <div className="h-[calc(100vh-100px)] w-full bg-base-100 flex overflow-hidden text-base-content">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Chat Area */}
      <div className="flex-1 bg-base-200 flex flex-col h-full overflow-hidden">

        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
      </div>

    </div>
  );
};

export default HomePage;
