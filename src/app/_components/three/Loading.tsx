import React from "react";
import { Html, useProgress } from "@react-three/drei";

function CustomLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={styles.loader}>
        <div style={styles.barContainer}>
          <div style={{ ...styles.bar, width: `${progress}%` }}></div>
        </div>
        <p style={styles.text}>{progress.toFixed(2)}% loaded</p>
      </div>
    </Html>
  );
}

const styles = {
  loader: {
    display: "flex",
    alignItems: "center",
  },
  barContainer: {
    width: "200px",
    height: "10px",
    background: "#ddd",
    borderRadius: "5px",
    overflow: "hidden",
    marginBottom: "10px",
  },
  bar: {
    height: "100%",
    background: "#4caf50",
    transition: "width 0.3s",
  },
  text: {
    fontSize: "14px",
    color: "#555",
  },
};

export default function Loading() {
  return <CustomLoader />;
}
