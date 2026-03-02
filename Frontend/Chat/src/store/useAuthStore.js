import { create } from "zustand"
import { axiosInstance } from "../lib/authInstance"
export const useAuthStore = create((set) => ({
  authUser: null,
  isSignup: false,
  isLogin: false,
  isChecking: true,
  checkauth: async () => {
    try {
      const res = await axiosInstance.get("/auth/Check")
      set({authUser:res.data})
    } catch (error) {
      console.log("Error in axiosInstance" , error.message)
      set({authUser:null})
    }finally{
      set({isChecking:false});
    }
  }
}))
