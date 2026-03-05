import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  // dummy iteam ka arry banay hai loader ke liye revision 
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full w-full sm:w-80 border-r border-base-300 flex flex-col bg-base-100 transition-all duration-200 shrink-0">
      {/* Header */}
      <div className="border-b border-base-300 w-full p-5 flex items-center gap-2 h-16 shrink-0">
        <Users className="w-6 h-6 text-base-content" />
        <span className="font-medium hidden sm:block text-base-content">Chats</span>
      </div>

      {/* Skeleton Contacts List */}
      <div className="overflow-y-auto w-full py-3">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-3 flex items-center gap-3">
            {/* Avatar skeleton */}
            <div className="relative mx-auto sm:mx-0">
              <div className="skeleton w-12 h-12 rounded-full shrink-0"></div>
            </div>

            {/* User info skeleton - hidden on small screens */}
            <div className="hidden sm:block text-left min-w-0 flex-1">
              <div className="skeleton h-4 w-32 mb-2"></div>
              <div className="skeleton h-3 w-16"></div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
