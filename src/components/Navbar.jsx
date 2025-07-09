import "/src/index.css";
import { FaGithub, FaLinkedin, FaInfoCircle } from "react-icons/fa";
import FadeInOnScroll from "../UIComponents/FadeInScroll";
function Navbar() {
  return (
    <>
      <div className="flex  hover:scale-105 hover:shadow-lg transition-all duration-300">
        <FadeInOnScroll>
           <a href="https://quick3d.vercel.app"><img className="h-10 sm:h-10 md:h-12 lg:h-14 object-contain" src="/navImg.png"></img></a>
        </FadeInOnScroll>
      
      </div>

      <div className="flex-1"></div>

      <div className="flex gap-4 text-2xl p-2">
        <a
          href="https://github.com/Dheeraj-Chintala"
          target="_blank"
          rel="noopener noreferrer"
          title="Developer-GitHub"
        >
          <FaGithub className="hover:scale-150 hover:shadow-lg transition-all duration-200" />
        </a>
        <a
          href="https://www.linkedin.com/in/dheeraj-kumar-a34066250/"
          target="_blank"
          rel="noopener noreferrer"
          title="Developer-LinkedIn"
        >
          <FaLinkedin className="hover:scale-150 hover:shadow-lg transition-all duration-200" />
        </a>
        <a href="#Info" rel="noopener noreferrer" title="Info">
          <FaInfoCircle className="hover:scale-150 hover:shadow-lg transition-all duration-200" />
        </a>
      </div>
    </>
  );
}
export default Navbar;
