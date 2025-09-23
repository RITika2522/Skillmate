"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface User {
  name: string
  email: string
  skills: string[]
  skillsToLearn?: string[]
  bio?: string
  company?: string
  qualification?: string
}

const API_URL = "http://skillmate.centralindia.cloudapp.azure.com:5000";

const EditProfile: React.FC = () => {
  const [userData, setUserData] = useState<User>({
    name: "",
    email: "",
    skills: [],
    skillsToLearn: [],
    bio: "",
    company: "",
    qualification: "",
  })

  const [skillInput, setSkillInput] = useState("")
  const [skillToLearnInput, setSkillToLearnInput] = useState("")
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/users/me`, {
          withCredentials: true,
        })
        setUserData(res.data.user)
      } catch (err) {
        console.error("Failed to fetch user:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  // Add skill to known skills
  const addSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim() !== "") {
      if (!userData.skills.includes(skillInput.trim())) {
        setUserData({ ...userData, skills: [...userData.skills, skillInput.trim()] })
      }
      setSkillInput("")
      e.preventDefault()
    }
  }

  // Add skill to learn
  const addSkillToLearn = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillToLearnInput.trim() !== "") {
      if (!userData.skillsToLearn?.includes(skillToLearnInput.trim())) {
        setUserData({
          ...userData,
          skillsToLearn: [...(userData.skillsToLearn || []), skillToLearnInput.trim()],
        })
      }
      setSkillToLearnInput("")
      e.preventDefault()
    }
  }

  // Remove skill
  const removeSkill = (skill: string) => {
    setUserData({ ...userData, skills: userData.skills.filter((s) => s !== skill) })
  }

  const removeSkillToLearn = (skill: string) => {
    setUserData({
      ...userData,
      skillsToLearn: userData.skillsToLearn?.filter((s) => s !== skill),
    })
  }

  const handleCancel = () => {
    navigate("/home")
  }

  const handleEdit = async () => {
    try {
      await axios.put(
        `${API_URL}/api/users/update`,
        {
          ...userData,
        },
        { withCredentials: true }
      )
      alert("Profile updated successfully!")
      navigate("/home")
    } catch (err) {
      console.error("Failed to update profile:", err)
      alert("Error updating profile")
    }
  }

  if (loading)
    return (
      <p className="text-gray-500 text-center mt-10">Loading profile...</p>
    )

  return (
    <div className="flex justify-center py-10 bg-gray-50 min-h-screen">
      <Card className="w-full max-w-2xl bg-white shadow-xl rounded-2xl">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold text-indigo-700">
            Edit Profile
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={userData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Skills Known */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="skills">Skills Known</Label>
            <div className="flex flex-wrap gap-2">
              {userData.skills.map((skill) => (
                <Badge
                  key={skill}
                  className="flex items-center gap-1 cursor-pointer"
                  variant="secondary"
                >
                  {skill} <X className="w-3 h-3" onClick={() => removeSkill(skill)} />
                </Badge>
              ))}
            </div>
            <Input
              placeholder="Type skill and press Enter"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={addSkill}
            />
          </div>

          {/* Skills to Learn */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="skillsToLearn">Skills to Learn</Label>
            <div className="flex flex-wrap gap-2">
              {userData.skillsToLearn?.map((skill) => (
                <Badge
                  key={skill}
                  className="flex items-center gap-1 cursor-pointer"
                  variant="secondary"
                >
                  {skill}{" "}
                  <X className="w-3 h-3" onClick={() => removeSkillToLearn(skill)} />
                </Badge>
              ))}
            </div>
            <Input
              placeholder="Type skill and press Enter"
              value={skillToLearnInput}
              onChange={(e) => setSkillToLearnInput(e.target.value)}
              onKeyDown={addSkillToLearn}
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={userData.bio || ""}
              onChange={handleChange}
              placeholder="Tell something about yourself"
              className="resize-none"
              rows={4}
            />
          </div>

          {/* Company & Qualification */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                value={userData.company || ""}
                onChange={handleChange}
                placeholder="Company name"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="qualification">Qualification</Label>
              <Input
                id="qualification"
                name="qualification"
                value={userData.qualification || ""}
                onChange={handleChange}
                placeholder="Your qualification"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 mt-4">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleEdit}>Edit</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default EditProfile
