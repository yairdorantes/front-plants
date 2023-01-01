import { Link } from "react-router-dom";
import flower from "../media/flower2.png";
const Main = () => {
  return (
    <div className="main-container h-screen">
      <div className="container mx-auto z-20 relative">
        <h1 className="mb-4 pt-5 text-center text-4xl font-extrabold tracking-tight leading-none  md:text-5xl lg:text-6xl ">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-400 from-sky-400">
            Freedom
          </span>
        </h1>

        <Link to="plants">
          <div className="card mx-auto w-64 mt-20 bg-secondary text-primary-content">
            <div className="card-body">
              <img src={flower} alt="" />
              <div className="text-center font-black text-2xl">Plants</div>
              {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Main;
