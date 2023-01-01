import { Route, Routes } from "react-router-dom";
import GsForm from "../components/GsForm";
import Main from "../components/Main";
import Plants from "../components/Plants";
import PlantView from "../components/PlantView";
const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/plants" element={<Plants />}></Route>
      <Route path="/plant/:id" element={<PlantView />}></Route>
      <Route path="/validate" element={<GsForm />}></Route>
    </Routes>
  );
};

export default Routers;
