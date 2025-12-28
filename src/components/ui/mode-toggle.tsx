"use client"
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

import { useEffect, useState } from "react"

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)       // Ensures the component is mounted before rendering .prevents the hydration 
  }, []);

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  }
  console.log("Current theme:", theme);

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
        
        
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
