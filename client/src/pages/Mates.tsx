import { useEffect, useState } from "react"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Navbar from "@/components/Navbar" 

interface User {
  _id: string
  name: string
  email: string
  profilePicture?: string
  skills: string[]
  qualification: string
  bio?: string
  company?: string
}

const API_URL = "http://skillmate.centralindia.cloudapp.azure.com:5000";

export default function Mates() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_URL}/api/users/all`) // ✅ corrected endpoint
        if (!res.ok) throw new Error("Failed to fetch users")
        const data = await res.json()
        setUsers(data)
      } catch (err) {
        console.error("Error fetching users:", err)
        setError("Unable to load users")
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  if (loading) return <p className="text-gray-500 text-center mt-10">Loading mates...</p>
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>

  return (
    <>
      {/* ✅ Navbar stays on top */}
      <Navbar />

      <div className="p-8 pt-24">  {/* ⬅️ added pt-24 to push content below navbar */}
      {/* Heading */}
      {/* <h2 className="text-3xl font-bold mb-8 text-center">Meet More Mates</h2> */}

        {/* Users Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.length > 0 ? (
            users.map((user) => (
              <Card
                key={user._id}
                className="group shadow-lg rounded-2xl border transition-transform duration-300 ease-out 
                           hover:-translate-y-1 hover:scale-[1.01] hover:bg-black"
              >
                <CardHeader className="flex items-center space-x-4 px-4 pt-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage
                      src={user.profilePicture || "/default-avatar.png"}
                      alt={user.name}
                    />
                    <AvatarFallback className="text-lg">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl font-semibold group-hover:text-white">
                    {user.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3 px-4 pb-6 text-sm">
                  <div>
                    <p className="font-medium group-hover:text-white">✅ Skills:</p>
                    <p className="mt-1 group-hover:text-white">
                      {user.skills?.length > 0 ? user.skills.join(", ") : "No skills listed"}
                    </p>
                  </div>

                  <div>
                    <p className="font-medium group-hover:text-white">🎓 Qualification:</p>
                    <p className="mt-1 group-hover:text-white">
                      {user.qualification || "Not specified"}
                    </p>
                  </div>

                  {user.bio && (
                    <div>
                      <p className="font-medium group-hover:text-white">💬 Bio:</p>
                      <p className="mt-1 group-hover:text-white">{user.bio}</p>
                    </div>
                  )}

                  {user.company && (
                    <div>
                      <p className="font-medium group-hover:text-white">🏢 Company:</p>
                      <p className="mt-1 group-hover:text-white">{user.company}</p>
                    </div>
                  )}

                  <div className="mt-3">
                    <p className="text-xs text-muted-foreground group-hover:text-white/80">Email</p>
                    <p className="text-sm group-hover:text-white">{user.email}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-gray-500">No mates found</p>
          )}
        </div>
      </div>
    </>
  )
}
