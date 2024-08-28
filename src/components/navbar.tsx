"use client";
//TODO
//ADD MY LOGO
//FIX PACKAGE
import { useLayoutEffect, useState } from "react";
import { Button } from "./ui/button";
import Github from "./logos/GitHub";
//import pkg from "@/package.json";

export const Nav = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useLayoutEffect(() => {
    const el = document.documentElement;

    if (el.classList.contains("dark")) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  const toggleDark = () => {
    const el = document.documentElement;
    el.classList.toggle("dark");
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div
      className={
        "z-50 flex h-14 items-center border-b border-border bg-card px-4 py-2"
      }
    >
      <div>{/** TODO * put logo here */}</div>
      <div className={"ml-auto flex items-center gap-1"}>
        <Button
          onClick={() => {
            //TODO
            //How do I replace this?
            //window.open(pkg.homepage, "_blank", "noopener noreferrer");
          }}
          variant={"ghost"}
          className={"ml-auto flex items-center gap-1.5"}
        >
          <span>
            <Github className={"size-4"} />
          </span>
          <span>Star on GitHub</span>
        </Button>
        <Button
          onClick={toggleDark}
          variant={"ghost"}
          className={"ml-auto flex items-center gap-1.5"}
        >
          <span>{isDarkMode ? "sun" : "moon"}</span>
          <span>{isDarkMode ? "Light" : "Dark"} Mode</span>
        </Button>
      </div>
    </div>
  );
};

export default Nav;
