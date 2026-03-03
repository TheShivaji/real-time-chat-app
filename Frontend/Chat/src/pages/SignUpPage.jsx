import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export const SignUpPage = () => {






  const [showPassword, setShowPassword] = useState(false);


  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });


  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Fill your name!");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Fill your email");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Fill email in proper format");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required!");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return false;
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;

    signup(formData);

    console.log("Form submitted with:", formData);
  };

  return (


    <div className='min-h-screen grid lg:grid-cols-2 bg-base-200'>


      <div className='flex flex-col items-center justify-center p-6 sm:p-12'>
        <div className='w-full max-w-md p-8 rounded-2xl shadow-xl bg-base-100'>

          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-base-content'>
              Create Account
            </h1>
            <p className='text-gray-500 mt-2'>Join <span className='text-primary font-semibold'>ChatPro</span> today</p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='label'>
                <span className='text-base label-text font-medium'>Full Name</span>
              </label>
              <input
                type='text'
                placeholder='John Doe'
                className='w-full input input-bordered focus:border-primary'
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                
              />
            </div>
            <div>
              <label className='label'>
                <span className='text-base label-text font-medium'>Email</span>
              </label>
              <input
                type='email'
                placeholder='john@example.com'
                className='w-full input input-bordered focus:border-primary'
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}

              />
            </div>
            <div>
              <label className='label'>
                <span className='text-base label-text font-medium'>Password</span>
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='••••••••'
                  className='w-full input input-bordered focus:border-primary pr-10'
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}

                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-primary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className='btn btn-primary w-full mt-6'
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <span className='loading loading-spinner'></span>
                  Creating Account...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          <div className='text-center mt-6'>
            <p className='text-sm text-gray-500'>
              Already have an account?{" "}
              <Link to="/login" className='text-primary hover:underline font-semibold'>
                Sign in
              </Link>
            </p>
          </div>

        </div>
      </div>
      <div className='hidden lg:flex items-center justify-center bg-base-300 p-12'>
        <div className='max-w-md text-center'>
          <div className="text-8xl mb-6 animate-bounce">💬</div>
          <h2 className='text-3xl font-bold mb-4'>Connect with your team</h2>
          <p className='text-gray-500 text-lg'>Real-time messaging, perfectly synced across all your devices.</p>
        </div>
      </div>

    </div>
  );
};

export default SignUpPage;
