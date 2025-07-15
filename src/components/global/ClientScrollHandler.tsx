"use client";
import { useEffect } from "react";

export default function ClientScrollHandler() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 400);
    }
  }, []);
  return null;
} 