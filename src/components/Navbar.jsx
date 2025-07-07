import "/src/index.css";
import { FaGithub, FaLinkedin, FaInfoCircle } from "react-icons/fa";
import { LuRotate3D } from "react-icons/lu";
import FadeInOnScroll from "../UIComponents/FadeInScroll";
function Navbar() {
  return (
    <>
      <div className="flex px-3 hover:scale-105 hover:shadow-lg transition-all duration-300">
        <FadeInOnScroll>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LuRotate3D className="h-10 w-10 " />
          </a>
        </FadeInOnScroll>
        <FadeInOnScroll>
          <h1 className="text-3xl font-croboto">QUICK 3D</h1>
        </FadeInOnScroll>
      </div>

      <div className="flex-1"></div>

      <div className="flex gap-4 text-2xl p-5">
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
