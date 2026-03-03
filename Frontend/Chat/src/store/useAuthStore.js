import { create } from "zustand"
import { axiosInstance } from "../lib/authInstance"
import { toast } from "sonner"
export const useAuthStore = create((set) => ({
  authUser: null,
  isSignup: false,
  isLogin: false,
  isChecking: true,
  isUpdating: false,
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
      const errorMessage = (error.response?.data?.message || "Something went wrong!");
      toast.error(errorMessage)
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully! 🎉");
    } catch (error) {
      console.log("Login Error:", error);
      toast.error(error.response?.data?.message || "Invalid credentials");
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null })
      toast.success("Logged out successfully")
    } catch (error) {
      toast.error(error.response.data.message)
    }
  },
  updateProfile: async (data) => {
    set({isUpdating:true});
    try {
      const res = await axiosInstance.put("/auth/update-profile" , data)
      set({ authUser:res.data})
      toast.success("Profile updated succesfully")
    } catch (error) {
      console.log("error in update profile:" , error)
      toast.error(error.response.data.message)
    }finally{
      set({isUpdating:false})
    }
  }
}))
