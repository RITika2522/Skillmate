import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 👈 import this
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
      setTab("login"); // after register → switch to login tab
    } catch (error: any) {
      console.error("Registration error:", error.response?.data || error.message);
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

            {/* Login Form */}
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
              </div>
            </TabsContent>

            {/* Register Form */}
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
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
