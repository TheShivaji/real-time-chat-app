import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    // bg-base-200 use kiya taaki teri dark/light theme apne aap apply ho
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-200">
      <div className="max-w-md text-center space-y-6">

        {/* 🔥 Naya Animation: Bada box pulse karega, chhota box bounce karega */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            {/* Main background pulse */}
            <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center animate-pulse">
              <MessageSquare className="w-12 h-12 text-primary" />
            </div>
            {/* Chhota floating icon */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center animate-bounce shadow-lg">
              <MessageSquare className="w-4 h-4 text-primary-content" />
            </div>
          </div>
        </div>

        {/* Text bhi ab theme ke hisaab se color badlega */}
        <h2 className="text-3xl font-bold text-base-content">
          Welcome to ChatPro!
        </h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
