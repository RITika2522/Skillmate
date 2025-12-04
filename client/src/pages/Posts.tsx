import axios from "axios"
import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Navbar from "@/components/Navbar"

interface Post {
  _id: string
  title: string
  content: string
}

const API_URL = "http://skillmate.centralindia.cloudapp.azure.com:5000"

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    axios.get(`${API_URL}/api/posts/readPost`, { withCredentials: true })
      .then((res) => {
        console.log("POST RESPONSE:", res.data)
        setPosts(res.data)
      })
      .catch((err) => {
        console.error("ERROR FETCHING POSTS:", err)
      })
  }, [])

  return (
    <>
        <Navbar />
        <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">All Posts</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.isArray(posts) ? (
            posts.map((post) => (
                <Card key={post._id}>
                <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>{post.content}</CardContent>
                </Card>
            ))
            ) : (
            <p>No posts found</p>
            )}
        </div>
        </div>
    </>
  )
}
