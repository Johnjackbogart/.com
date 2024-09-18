"use client";

import { Canvas } from "@react-three/fiber";

export default function ThreeCanvas({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <Canvas>{children}</Canvas>;
}
