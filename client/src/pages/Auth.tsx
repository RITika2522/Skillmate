import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

// 🔹 Google Icon
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 
      1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 
      3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 
      7.28-2.66l-3.57-2.77c-.98.66-2.23 
      1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 
      20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 
      8.55 1 10.22 1 12s.43 3.45 
      1.18 4.93l3.66-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 
      4.21 1.64l3.15-3.15C17.45 2.09 
      14.97 1 12 1 7.7 1 3.99 3.47 
      2.18 7.07l3.66 2.84c.87-2.6 
      3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
    <path d="M1 1h22v22H1z" fill="none" />
  </svg>
);

// 🔹 Google Login Button
const GoogleLoginButton = () => (
  <a href="http://localhost:5000/api/users/google" className="w-full">
    <Button
      variant="outline"
      className="w-full flex items-center justify-center gap-2"
    >
      <GoogleIcon />
      Sign in with Google
    </Button>
  </a>
);

const Auth: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    skills: "",
  });

  const [tab, setTab] = useState("login");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🚀 Register
  const handleRegister = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          ...formData,
          skills: formData.skills.split(",").map((s) => s.trim()),
        }
      );
      console.log("Registered:", data);
      setTab("login");
    } catch (error: any) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
    }
  };

  // 🚀 Login
  const handleLogin = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      console.log("Logged in:", data);

      navigate("/home");
    } catch (error: any) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-500 to-purple-700">
      <Card className="w-[400px] bg-white shadow-xl rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-indigo-700">
            Welcome to Skillmate
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="grid grid-cols-2 w-full mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            {/* 🔹 Login Form */}
            <TabsContent value="login">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                </div>
                <Button className="w-full" onClick={handleLogin}>
                  Login
                </Button>

                {/* OR Divider */}
                <div className="flex items-center my-2">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="px-2 text-sm text-gray-500">OR</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Google Login */}
                <GoogleLoginButton />
              </div>
            </TabsContent>

            {/* 🔹 Register Form */}
            <TabsContent value="register">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                </div>
                <div>
                  <Label htmlFor="skills">Skills</Label>
                  <Input
                    id="skills"
                    name="skills"
                    type="text"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="e.g. React, Node, MongoDB"
                  />
                </div>
                <Button className="w-full" onClick={handleRegister}>
                  Register
                </Button>

                {/* OR Divider */}
                <div className="flex items-center my-2">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="px-2 text-sm text-gray-500">OR</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Google Register/Login */}
                <GoogleLoginButton />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;

