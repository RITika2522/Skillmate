"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Search } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const API_URL = "http://skillmate.centralindia.cloudapp.azure.com:5000";

export default function Navbar() {
  const [postTitle, setPostTitle] = useState("")
  const [postContent, setPostContent] = useState("")
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<{ name: string; profilePicture?: string } | null>(null)
  const navigate = useNavigate()

  // Fetch logged-in user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/users/me`, {
          withCredentials: true,
        })
        setUser(res.data.user)
      } catch (err) {
        console.error("Failed to fetch user info:", err)
      }
    }
    fetchUser()
  }, [])

  const handlePostSubmit = async () => {
    try {
      await axios.post(
        `${API_URL}/api/posts/createPost`,
        { title: postTitle, content: postContent },
        { withCredentials: true }
      )

      toast.success("Post created successfully 🎉", {
        description: "Your post has been published!",
      })

      setPostTitle("")
      setPostContent("")
      setOpen(false)
    } catch (error) {
      console.error("Failed to create post:", error)

      toast.error("Failed to create post", {
        description: "Please try again later.",
      })
    }
  }

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/api/users/logout`, {}, { withCredentials: true })
      navigate("/auth")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md px-6 py-3 flex items-center justify-between z-50">
      {/* Left Side - Logo */}
      <div
        onClick={() => navigate("/home")}
        className="text-2xl font-bold text-blue-600 cursor-pointer hover:opacity-80 transition"
      >
        SkillMate
      </div>

      {/* Center - Search Bar */}
      <div className="flex-1 max-w-md px-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search..."
            className="w-full pl-10 pr-4 rounded-full"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        {/* Create Post Button */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Plus className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a Post</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col space-y-4">
              <Input
                placeholder="Post Title"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
              />
              <textarea
                placeholder="Write your post..."
                className="border rounded-md p-2 w-full"
                rows={4}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
              <Button onClick={handlePostSubmit}>Post</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Mates Button */}
        <Button variant="ghost" onClick={() => navigate("/mates")}>
          Mates
        </Button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              {user ? (
                <>
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={user.profilePicture || "/default-avatar.png"}
                      alt={user.name}
                    />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline">{user.name}</span>
                </>
              ) : (
                <span>Profile</span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              Edit Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
