import {Routes, Route, useNavigate } from "react-router-dom";
import styles from "./styles/Main.module.css"
import Dashboard from './pages/Dashboard'
import LightsOn from "./pages/LightsOn"
import Reflex from "./pages/Reflex"
import TTT from "./pages/TTT"
import Blanko from './pages/Blanko'
import Slido from './pages/Slido'
import './App.css'


function App() {
  const navigate = useNavigate();

  localStorage.setItem("X", 0)
  localStorage.setItem("O", 0)

  return (
    <div className={styles.container}>
      <div className={styles.navBar}>
        <p className={styles.link} onClick={() => navigate("/")}>Dashboard</p>
        <p className={styles.link} onClick={() => navigate("/blanko")}>Blanko</p>
        <p className={styles.link} onClick={() => navigate("/slido")}>Slido</p>
        <p className={styles.link} onClick={() => navigate("/lightson")}>Lights On</p>
        <p className={styles.link} onClick={() => navigate("/Reflex")}>Reflex</p>
        <p className={styles.link} onClick={() => navigate("/tictactoe")}>TicTacToe</p>
      </div>

      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Reflex" element={<Reflex />} />
          <Route path="/tictactoe" element={<TTT />} />
          <Route path="/lightson" element={<LightsOn />} />
          <Route path="/blanko" element={<Blanko />} />
          <Route path="/slido" element={<Slido />} />
        </Routes>
      </div>
    </div>
  );
}


export default App
