import { useChatStore } from "../store/useChatStore"; 
import NoChatSelected from "../components/Nochatseleced";
import ChatContainer from "../components/ChatContaine";
import Sidebar from "../components/Sidebar";

const HomePage = () => {

  const { selectedUser } = useChatStore();

  return (
    <div className="h-[calc(100vh-100px)] w-full bg-base-100 flex overflow-hidden text-base-content">


      <Sidebar />


      <div className="flex-1 bg-base-200 flex flex-col h-full overflow-hidden">

        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
      </div>

    </div>
  );
};

export default HomePage;
