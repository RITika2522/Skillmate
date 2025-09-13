import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-indigo-700">
      <Card className="w-[500px] text-center bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl">
        <CardHeader>
          {/* Project Name */}
          <CardTitle className="text-5xl font-bold text-indigo-700">
            Skillmate
          </CardTitle>

          {/* Slogan Line */}
          <CardDescription className="text-lg text-gray-600 mt-2">
            Empower your skills, connect with opportunities
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button
            size="lg"
            className="mt-6"
            onClick={() => navigate("/auth")}
          >
            Click Me
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Hero;
