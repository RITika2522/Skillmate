import Navbar from "@/components/Navbar"
import Banner from "@/components/Banner"
import UsersList from "@/components/UsersList"
import RandomPosts from "@/components/RandomPosts"

export default function Home() {
  return (
    <div>
      <Navbar />
      <Banner />
      <UsersList />
      <RandomPosts />
    </div>
  )
}
