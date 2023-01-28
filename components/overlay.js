import styled from "styled-components";
import styles from "../styles/overlay.module.css";

export default function Overlay() {
  return (
    <div className={styles.container}>
      <h1>Spin Me!</h1>
      <p>Try it, it is really fun!!!</p>
    </div>
  );
}
