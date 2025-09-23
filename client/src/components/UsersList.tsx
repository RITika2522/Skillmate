import { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface User {
  _id: string;
  name: string;
  profilePicture?: string;
  skills: string[];
  skillsToLearn?: string[];
}

const API_URL = "http://skillmate.centralindia.cloudapp.azure.com:5000";

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const viewportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_URL}/api/users/random`);
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Unable to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
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

  if (loading) return <p className="text-gray-500">Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="relative p-4">
      <h2 className="text-3xl font-bold mb-6 text-left">Grow Your Network</h2>
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
        {users.length > 0 ? (
          <>
            {users.map((user) => (
              <Card
                key={user._id}
                className="group w-20 min-w-[20rem] shadow-lg rounded-2xl border flex-shrink-0 
                           transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] 
                           hover:bg-black"
              >
                <CardHeader className="flex items-center space-x-4 px-4 pt-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={user.profilePicture || "/default-avatar.png"}
                      alt={user.name}
                    />
                    <AvatarFallback className="text-lg">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-2xl font-semibold group-hover:text-white">
                    {user.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3 px-4 pb-6 text-sm">
                  {/* Skills known */}
                  <div>
                    <p className="font-medium group-hover:text-white">✅ Skills:</p>
                    <p className="mt-1 group-hover:text-white">
                      {user.skills.length > 0 ? user.skills.join(", ") : "No skills listed"}
                    </p>
                  </div>

                  {/* Skills to learn */}
                  <div>
                    <p className="font-medium group-hover:text-white">🎯 Skills to Learn:</p>
                    <p className="mt-1 group-hover:text-white">
                      {user.skillsToLearn?.length
                        ? user.skillsToLearn.join(", ")
                        : "No skills listed"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* "Meet More Mates" card */}
            <Card
              className="w-20 min-w-[20rem] shadow-lg rounded-2xl border flex-shrink-0 
                         flex flex-col items-center justify-center transition-colors duration-200 
                         hover:bg-black hover:text-white hover:cursor-pointer"
            >
              <CardContent className="flex flex-col items-center justify-center h-full gap-4 py-8">
                <p className="text-xl font-semibold text-center">Want to see more?</p>
                <Button onClick={() => navigate("/mates")}>Meet More Mates</Button>
              </CardContent>
            </Card>
          </>
        ) : (
          <p className="text-gray-500">No users found</p>
        )}
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
