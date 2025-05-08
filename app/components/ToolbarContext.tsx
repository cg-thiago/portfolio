"use client";
import React, { createContext, useContext, useState } from "react";

const ToolbarContext = createContext({
  hoverText: "",
  setHoverText: (text: string) => {},
  toolbarIcon: null,
  setToolbarIcon: (icon: React.ReactNode) => {},
});

export function ToolbarProvider({ children }: { children: React.ReactNode }) {
  const [hoverText, setHoverText] = useState("");
  const [toolbarIcon, setToolbarIcon] = useState<React.ReactNode>(null);
  return (
    <ToolbarContext.Provider value={{ hoverText, setHoverText, toolbarIcon, setToolbarIcon }}>
      {children}
    </ToolbarContext.Provider>
  );
}

export function useToolbar() {
  return useContext(ToolbarContext);
} 