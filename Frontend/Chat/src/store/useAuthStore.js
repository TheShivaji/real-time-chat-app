import { create } from "zustand"
import { axiosInstance } from "../lib/authInstance"
import { toast } from "sonner"
export const useAuthStore = create((set) => ({
  authUser: null,
  isSignup: false,
  isLogin: false,
  isChecking: true,
  checkauth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check")
      set({ authUser: res.data })
    } catch (error) {
      console.log("Error in axiosInstance", error.message)
      set({ authUser: null })
    } finally {
      set({ isChecking: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });

      toast.success("Account created successfully! ");

    } catch (error) {

      console.log("Error in signup:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      set({ isSigningUp: false });
    }
  },
  logout: async () =>{
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser:null })
      toast.success("Logged out successfully")
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}))
