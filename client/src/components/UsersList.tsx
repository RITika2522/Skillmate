import { useEffect, useState } from "react"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

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

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/profile") // backend API
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

  if (loading) return <p className="text-gray-500">Loading users...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="p-6 flex flex-wrap gap-6 justify-center">
      {users.length > 0 ? (
        users.map((user) => (
          <Card key={user._id} className="w-full max-w-sm shadow-lg rounded-2xl border">
            <CardHeader className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage
                  src={user.profilePicture || "/default-avatar.png"}
                  alt={user.name}
                />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-lg font-semibold">{user.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium">✅ Skills:</p>
                <p className="text-sm text-muted-foreground">
                  {user.skills?.length > 0 ? user.skills.join(", ") : "No skills listed"}
                </p>
              </div>
              <div>
                <p className="font-medium">🎓 Qualification:</p>
                <p className="text-sm text-muted-foreground">
                  {user.qualification || "Not specified"}
                </p>
              </div>
              {user.bio && (
                <div>
                  <p className="font-medium">💬 Bio:</p>
                  <p className="text-sm text-muted-foreground">{user.bio}</p>
                </div>
              )}
              {user.company && (
                <div>
                  <p className="font-medium">🏢 Company:</p>
                  <p className="text-sm text-muted-foreground">{user.company}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-gray-500">No users found</p>
      )}
    </div>
  )
}
