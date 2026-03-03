import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';

const ProfilePage = () => {
  const { authUser, isUpdating, updateProfile } = useAuthStore();


  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if(!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image)
      await updateProfile ({profilePic:base64Image})
    }
  }

  return (
    <div className='min-h-[calc(100vh-64px)] bg-base-200 py-6 px-4 sm:px-6 lg:px-8 flex justify-center items-start pt-10'>
      <div className='w-full max-w-sm'>
        <div className='bg-base-100 rounded-3xl shadow-xl overflow-hidden border border-base-300'>

          <div className='bg-base-300/50 px-6 py-4 border-b border-base-300'>
            <h1 className='text-xl font-bold text-base-content'>Profile Settings</h1>
            <p className='text-sm text-gray-500'>Your personal information</p>
          </div>

          <div className='p-6'>

            {/*  AVATAR SECTION  */}
            <div className='flex flex-col items-center mb-6'>
              <div className='relative'>
                <div className='w-28 h-28 rounded-full border-4 border-base-200 shadow-lg overflow-hidden bg-primary/10 flex items-center justify-center'>
                  <img
                    src={selectedImg || authUser?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    alt="Profile"
                    className='w-full h-full object-cover'
                  />
                </div>


                <label
                  htmlFor="avatar-upload"
                  className={`absolute bottom-0 right-0 bg-primary text-primary-content p-2 rounded-full shadow-lg cursor-pointer transition-all hover:scale-105
                    ${isUpdating ? "animate-pulse pointer-events-none" : ""}`
                  }
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {/* Asli jadoo yahan hai: Hidden file input */}
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdating}
                  />
                </label>
              </div>
              <p className='text-xs text-gray-500 mt-2'>
                {isUpdating ? "Uploading..." : "Click camera to update photo"}
              </p>
            </div>


            <div className='space-y-4'>
              <div>
                <label className='label py-1'><span className='text-sm label-text font-medium text-gray-500'>Full Name</span></label>
                <div className='relative'>
                  <input type='text' className='w-full input input-bordered bg-base-200 text-base-content/70 cursor-not-allowed pr-10' value={authUser?.fullName || "Loading..."} readOnly />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                  </div>
                </div>
              </div>
              <div>
                <label className='label py-1'><span className='text-sm label-text font-medium text-gray-500'>Email Address</span></label>
                <div className='relative'>
                  <input type='email' className='w-full input input-bordered bg-base-200 text-base-content/70 cursor-not-allowed pr-10' value={authUser?.email || "Loading..."} readOnly />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-base-300">
              <h3 className="text-base font-medium text-base-content mb-3">Account Information</h3>
              <div className="flex justify-between items-center py-2 border-b border-base-200">
                <span className="text-sm text-gray-500">Member Since</span>
                <span className="text-sm font-medium text-base-content">{authUser?.createdAt ? new Date(authUser.createdAt).toLocaleDateString() : "Just Now"}</span>
              </div>
              <div className="flex justify-between items-center py-2 ">
                <span className="text-sm text-gray-500">Account Status</span>
                <span className="text-sm text-success font-medium flex items-center gap-1 animate-bounce">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                  Active
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
