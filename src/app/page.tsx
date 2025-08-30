import { NavigationMenuDemo } from "@/components/Home/Navbar";

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="w-full flex justify-between items-center flex-shrink-0">
       <NavigationMenuDemo />
      </div>
      <div className="flex-1 w-full overflow-y-auto">
        <div className="h-[200vh] bg-green-300">
             <div className="w-full h-[calc(100vh-3rem)] bg-gray-500">a</div>
        </div>
      </div>
    </div>
  );
}