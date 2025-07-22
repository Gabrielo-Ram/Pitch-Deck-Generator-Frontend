import { TiHome } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };

  const navigatePolicy = () => {
    navigate("/privacy-policy");
  };

  return (
    <div className="border-b-2 border-gray-700 absolute w-screen h-[10%] flex items-center justify-between overflow-hidden">
      <h1 className="text-3xl font-bold px-[5%]">
        <div onClick={navigateHome} className="hover:cursor-pointer">
          AI Pitch-Deck Template Generator
        </div>
      </h1>

      <div className="flex justify-between w-1/4 h-full items-center px-[5%]">
        <div
          onClick={navigatePolicy}
          className="flex justify-center items-center h-[70%] hover:cursor-pointer hover:text-blue-500"
        >
          <p className="underline ">Privacy Policy</p>
        </div>
        <div onClick={navigateHome} className="h-[70%] px-[5%]">
          <TiHome className="border-2 size-full rounded-2xl hover:bg-blue-600 hover:cursor-pointer hover:outline-2 hover:rounded-lg transition-all duration-200" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
