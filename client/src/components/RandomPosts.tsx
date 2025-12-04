import { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    name: string;
    profilePicture?: string;
  };
}

const API_URL = "http://skillmate.centralindia.cloudapp.azure.com:5000";

export default function RandomPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();
  const viewportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/posts/random`);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching random posts:", err);
      }
    };
    fetchPosts();
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = viewportRef.current;
    if (!el) return;
    const scrollAmount = 350;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative p-4 mt-12">
      <h2 className="text-3xl font-bold mb-1 text-left">Featured Posts</h2>
      <hr />

      {/* Left arrow */}
      <Button
        size="icon"
        variant="outline"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-md"
        onClick={() => scroll("left")}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <div
        ref={viewportRef}
        className="flex gap-6 px-2 py-4 overflow-hidden scroll-smooth"
      >
        {posts.map((post) => (
          <Card
            key={post._id}
            className="group w-20 min-w-[20rem] shadow-lg rounded-2xl border flex-shrink-0 
                       transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] 
                       hover:bg-black"
          >
            <CardHeader className="flex items-center space-x-4 px-4 pt-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={post.author?.profilePicture ?? "/default-avatar.png"}
                  alt={post.author?.name || "User"}
                />
                <AvatarFallback className="text-lg">
                  {post.author?.name?.charAt(0) ?? "U"}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl font-semibold group-hover:text-white">
                {post.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2 px-4 pb-6 text-sm">
              <p className="line-clamp-4 group-hover:text-white">
                {post.content}
              </p>
              <p className="text-xs text-gray-500 group-hover:text-gray-300">
                by {post.author?.name || "Unknown"}
              </p>
            </CardContent>
          </Card>
        ))}

        <Card className="w-20 min-w-[20rem] shadow-lg rounded-2xl border flex-shrink-0 
                     flex flex-col items-center justify-center transition-colors duration-200 
                     hover:bg-black hover:text-white hover:cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center h-full gap-4 py-8">
            <p className="text-xl font-semibold text-center">Want to see more?</p>
            <Button onClick={() => navigate("/posts")} className="bg-white text-black border border-transparent hover:border-white hover:bg-transparent hover:text-white transition-all duration-200">
                  View More Posts
                </Button>
          </CardContent>
        </Card>
      </div>

      {/* Right arrow */}
      <Button
        size="icon"
        variant="outline"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-md"
        onClick={() => scroll("right")}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
}
