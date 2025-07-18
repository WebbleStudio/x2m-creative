"use client";

import { useRef, useState } from "react";

type Props = {
  onUpload: (url: string) => void;
};

export default function UploadImage({ onUpload }: Props) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await uploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await uploadFile(e.target.files[0]);
    }
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);
    
    // Usa sempre URL relativo - il browser lo risolverà automaticamente
    const apiUrl = '/api/upload';
      
    const res = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });
    setUploading(false);
    if (res.ok) {
      const data = await res.json();
      onUpload(data.url);
    } else {
      setError("Errore durante l'upload dell'immagine");
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all ${
        dragActive ? "border-creative-blue bg-creative-blue/10" : "border-gray-300"
      }`}
      onDragOver={e => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={e => {
        e.preventDefault();
        setDragActive(false);
      }}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      style={{ minHeight: 80 }}
    >
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={handleChange}
      />
      {uploading ? (
        <span className="text-creative-blue">Caricamento...</span>
      ) : (
        <span>Trascina qui un’immagine o clicca per selezionarla</span>
      )}
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </div>
  );
} 