import { useEffect, useState } from "react";
import { SiGooglegemini } from "react-icons/si";
import { FaFileCsv, FaFilePdf, FaFileSignature, FaPlus } from "react-icons/fa6";
import Backdrop from "./Backdrop";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import LogInLogOut from "./LogInLogOut";

function Home() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setLoading] = useState(true);

  let BACKEND_URL = "";
  //Change to false if in production
  false
    ? (BACKEND_URL = "http://localhost:3001")
    : (BACKEND_URL = "https://csv-to-slides-web-app.onrender.com");

  //Calls the passport auth/google endpoint
  const handleLogin = () => {
    window.location.href = `${BACKEND_URL}/auth/google`;
  };

  //Handle Logout
  const handleLogOut = () => {
    window.location.href = `${BACKEND_URL}/auth/logout`;
  };

  //Checks if the user is authenticated
  useEffect(() => {
    const checkAuth = async (attempt = 1) => {
      //Sets a delay
      await new Promise((r) => setTimeout(r, 5000));

      try {
        const response = await fetch(`${BACKEND_URL}/api/auth/user`, {
          credentials: "include",
        });

        if (!response.ok) {
          if (attempt < 3) {
            return setTimeout(() => checkAuth(attempt + 1), 300 * attempt);
          }
          setIsAuthenticated(false);
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <>
      <Navbar />
      <Backdrop />
      <div
        id="hero"
        className="pageSection flex flex-col justify-center items-center text-4xl/[100%] md:text-5xl/[100%]"
      >
        <h1 className="w-[50%] mb-[3%] text-center font-bold text-white font-serif">
          Design Your <b>Short-Form</b> Pitch Deck Template with AI
        </h1>
        <h2 className="w-[55%] text-center text-[53%]/[130%] text-gray-300">
          Use AI to <b className="text-white">compress</b> your current
          pitch-deck into a <b className="text-white">2-minute presentation</b>.
          AI keeps your message concise, compelling, and clear.
        </h2>
        <div
          id="LogInContainer"
          className="absolute top-[75%] w-[22%] flex justify-center"
          onClick={() => (isAuthenticated ? handleLogOut() : handleLogin())}
        >
          {isLoading ? (
            <LogInLogOut status={null} />
          ) : isAuthenticated ? (
            <LogInLogOut status={2} />
          ) : (
            <LogInLogOut status={1} />
          )}
        </div>
        <div
          id="geminiLogo"
          className="absolute top-[83%] w-1/2 h-[10%] flex justify-center items-center"
        >
          <SiGooglegemini className="h-[45%]" />
          <span className="text-[32%] ml-[1%] text-gray-300">
            {" "}
            Powered by Google Gemini
          </span>
        </div>
      </div>
      <div
        id="How It Works"
        className="pageSection w-full flex flex-col justify-center items-center text-3xl/[100%] md:text-5xl/[100%] font-serif"
      >
        <p className="text-[80%] mt-[2%] mb-[5%] font-bold border-b-2 border-gray-500">
          How it works
        </p>
        <div className="flex justify-center w-[80%] h-[15%] text-gray-200">
          <div className=" h-full w-[20%] flex justify-center items-center text-center">
            <span className="text-[300%]">1.</span>
          </div>
          <div className=" h-full w-full text-[50%] flex items-end">
            <p>
              Provide Gemini with context related to your industry/solution.
              <b> Upload a PDF file</b> of your current pitch-deck, or{" "}
              <b>fill out a form</b> about your company. (Both only take a few
              moments)
            </p>
          </div>
        </div>
        <span className="w-[70%] my-[1%]">|</span>
        <div className="flex justify-center w-[80%] h-[15%] text-gray-200">
          <div className=" h-full w-[20%] flex justify-center items-center text-center">
            <span className="text-[300%]">2.</span>
          </div>
          <div className=" h-full w-full text-[50%] flex items-end">
            <p>
              Gemini will generate a <b>text-based outline</b> for a{" "}
              <b>condensed version</b> of your pitch deck. Review it and share
              your feedback—ensuring the content, tone, and wording align with
              your expectations.
            </p>
          </div>
        </div>
        <span className="w-[70%] my-[1%]">|</span>
        <div className="flex justify-center w-[80%] h-[15%] text-gray-200">
          <div className=" h-full w-[20%] flex justify-center items-center text-center">
            <span className="text-[300%]">3.</span>
          </div>
          <div className=" h-full w-full text-[50%] flex items-end">
            <p>
              Give Gemini the go-ahead to <b>build your full slide deck</b>.
              It’ll be waiting in your Google Drive!
            </p>
          </div>
        </div>
      </div>
      <div
        id="Get Started"
        className="pageSection w-full flex flex-col justify-center items-center text-5xl/[100%] font-serif"
      >
        <p className="text-[70%] mt-[2%] w-[70%] text-center font-bold">
          Choose an option below to get started:
        </p>
        <p className="text-[40%] text-gray-200 w-[70%] text-center">
          You must sign in with Google before you can access these tools
        </p>

        <div className="w-[70%] h-[65%] my-[2%] flex flex-col items-center">
          <div
            id="cards-container"
            className="flex items-end justify-around w-[120%] h-[85%] my-[2%]"
          >
            <div
              id="card"
              className={`w-[27%] border-1 border-gray-500 h-full rounded-3xl flex flex-col justify-center items-center hover:-translate-y-1 transition-all duration-400 hover:outline-2 ${
                isAuthenticated
                  ? "bg-blue-800 hover:-translate-y-1 hover:cursor-pointer"
                  : "bg-gray-700 opacity-50 hover:cursor-not-allowed"
              }`}
              onClick={() =>
                isAuthenticated &&
                navigate("/chat", {
                  state: {
                    type: "uploadFile",
                  },
                })
              }
            >
              <FaPlus className="my-[6%]" />
              <h1 className="text-center text-[55%] font-bold">
                Upload a PDF file
              </h1>
              <p className="text-[36%] mt-[1%] mb-[8%] text-center leading-[120%] px-[9%]">
                (Long-form Pitch Deck, Company Profile, or Executive Summary)
              </p>
              <FaFilePdf className="size-[40%]" />
            </div>
            <div
              id="card"
              className={`w-[27%] border-1 border-gray-500 h-full rounded-3xl flex flex-col justify-center items-center hover:-translate-y-1 transition-all duration-400 hover:outline-2 ${
                isAuthenticated
                  ? "bg-blue-800 hover:-translate-y-1 hover:cursor-pointer"
                  : "bg-gray-700 opacity-50 hover:cursor-not-allowed"
              }`}
              onClick={() => isAuthenticated && navigate("/form")}
            >
              <FaPlus className="my-[6%]" />
              <h1 className="text-center text-[55%] font-bold">
                Fill out a short form
              </h1>
              <p className="text-[36%] mt-[1%] mb-[8%] text-center leading-[120%] px-[9%]">
                (Only takes a few moments)
              </p>
              <FaFileSignature className="size-[40%]" />
            </div>
            <div
              id="card"
              className={`w-[27%] border-1 border-gray-500 h-full rounded-3xl flex flex-col justify-center items-center hover:-translate-y-1 transition-all duration-400 hover:outline-2 ${
                isAuthenticated
                  ? "bg-blue-800 hover:-translate-y-1 hover:cursor-pointer"
                  : "bg-gray-700 opacity-50 hover:cursor-not-allowed"
              }`}
              onClick={() =>
                isAuthenticated &&
                navigate("/chat", {
                  state: {
                    type: "uploadFile",
                  },
                })
              }
            >
              <FaPlus className="my-[6%]" />
              <h1 className="text-center text-[55%] font-bold">
                Upload a CSV file
              </h1>
              <p className="text-[36%] mt-[1%] mb-[8%] text-center leading-[120%] px-[9%]">
                (If you have a database of individual companies)
              </p>
              <FaFileCsv className="size-[40%]" />
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-400 underline hover:text-blue-500">
          <a
            href="http://www.linkedin.com/in/gabriel-ramirez-80550a311"
            target="_blank"
          >
            Created by: Gabriel Ramirez
          </a>
        </p>
      </div>
    </>
  );
}

export default Home;
