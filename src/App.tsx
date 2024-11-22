import Labs from "./Labs";
import Kanbas from "./Kanbas";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Kanbas/store";

export default function App() {
  return (
    <HashRouter>
      <Provider store={store}>
          <Routes>
            <Route path="/" element={<Navigate to="Labs" />} />
            <Route path="/Labs/*" element={<Labs />} />
            <Route path="/Kanbas/*" element={<Kanbas />} />
            {/* <Route path ="/Landing" element={<Landing/>}/> */}
          </Routes>
      </Provider>
    </HashRouter>
  );
}
