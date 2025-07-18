"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import UploadImage from "@/components/features/upload/UploadImage";

interface Progetto {
  id: string;
  titolo: string;
  descrizione: string;
  immagine: string;
  link?: string;  // Campo opzionale per il link
  visibile: boolean;
  in_evidenza: boolean;
  created_at: string;
}

export default function DashboardPage() {
  return (
    <SessionProvider>
      <DashboardContent />
    </SessionProvider>
  );
}

// Helper function per ottenere l'URL API corretto
function getApiUrl(endpoint: string) {
  // Per client-side (dashboard), usa sempre URL relativi
  return endpoint;
}

function DashboardContent() {
  const { status } = useSession();
  const router = useRouter();
  const [progetti, setProgetti] = useState<Progetto[]>([]);
  const [loading, setLoading] = useState(true);
  const [titolo, setTitolo] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [immagine, setImmagine] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const maxEvidenza = 3;
  const inEvidenzaCount = progetti.filter(p => p.in_evidenza).length;
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitolo, setEditTitolo] = useState("");
  const [editDescrizione, setEditDescrizione] = useState("");
  const [editImmagine, setEditImmagine] = useState("");
  const [editLink, setEditLink] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchProgetti();
    }
    // eslint-disable-next-line
  }, [status]);

  async function fetchProgetti() {
    setLoading(true);
    try {
      const res = await fetch(getApiUrl("/api/progetti"));
      const data = await res.json();
      setProgetti(data);
    } catch (error) {
      console.error('Errore caricamento progetti dashboard:', error);
      setProgetti([]);
    }
    setLoading(false);
  }

  async function handleAddProgetto(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!titolo || !descrizione || !immagine) {
      setError("Tutti i campi sono obbligatori");
      return;
    }
    const nuovoProgetto = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2),
      titolo,
      descrizione,
      immagine,
      link,
      visibile: true,
      in_evidenza: false,
    };
    const res = await fetch(getApiUrl("/api/progetti"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuovoProgetto),
    });
    if (res.ok) {
      setTitolo("");
      setDescrizione("");
      setImmagine("");
      setLink("");
      setImagePreview("");
      setShowAddForm(false);
      setSuccess("Progetto aggiunto con successo!");
      setTimeout(() => setSuccess(""), 3000);
      fetchProgetti();
    } else {
      setError("Errore durante l'aggiunta del progetto");
    }
  }

  async function handleToggle(id: string, field: "visibile" | "in_evidenza", value: boolean) {
    if (field === "in_evidenza" && value && inEvidenzaCount >= maxEvidenza) {
      setError("Puoi selezionare al massimo 3 progetti in evidenza.");
      setTimeout(() => setError(""), 3000);
      return;
    }
    
    // Mappa il nome del campo per l'API
    const apiField = field === "in_evidenza" ? "inEvidenza" : field;
    
    await fetch(getApiUrl(`/api/progetti/${id}`), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [apiField]: value }),
    });
    fetchProgetti();
  }

  function startEdit(p: Progetto) {
    setEditId(p.id);
    setEditTitolo(p.titolo);
    setEditDescrizione(p.descrizione);
    setEditImmagine(p.immagine);
    setEditLink(p.link || "");
  }

  function cancelEdit() {
    setEditId(null);
    setEditTitolo("");
    setEditDescrizione("");
    setEditImmagine("");
    setEditLink("");
  }

  async function handleEditSave(id: string) {
    setError("");
    setSuccess("");
    if (!editTitolo || !editDescrizione || !editImmagine) {
      setError("Tutti i campi sono obbligatori");
      return;
    }
    const res = await fetch(getApiUrl(`/api/progetti/${id}`), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titolo: editTitolo, descrizione: editDescrizione, immagine: editImmagine, link: editLink }),
    });
    if (res.ok) {
      setSuccess("Progetto aggiornato con successo!");
      setTimeout(() => setSuccess(""), 3000);
      cancelEdit();
      fetchProgetti();
    } else {
      setError("Errore durante la modifica del progetto");
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Sei sicuro di voler eliminare questo progetto?")) return;
    await fetch(getApiUrl(`/api/progetti/${id}`), { method: "DELETE" });
    setSuccess("Progetto eliminato con successo!");
    setTimeout(() => setSuccess(""), 3000);
    fetchProgetti();
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-main-black">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          <p className="text-white/60">Caricamento dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-main-black text-white mt-[70px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-black/80 to-black/40 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Dashboard Progetti
              </h1>
              <p className="text-white/60 mt-1">Gestisci i tuoi progetti in evidenza</p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-all duration-200 backdrop-blur-sm border border-white/20"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm font-medium">Totale Progetti</p>
                <p className="text-3xl font-bold text-white mt-1">{progetti.length}</p>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm font-medium">In Evidenza</p>
                <p className="text-3xl font-bold text-white mt-1">{inEvidenzaCount}/3</p>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm font-medium">Visibili</p>
                <p className="text-3xl font-bold text-white mt-1">{progetti.filter(p => p.visibile).length}</p>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Add Project Button */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">I Tuoi Progetti</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {showAddForm ? 'Chiudi' : '+ Nuovo Progetto'}
          </button>
        </div>

        {/* Add Project Form */}
        {showAddForm && (
          <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 mb-8 backdrop-blur-sm border border-white/10">
            <h3 className="text-xl font-semibold mb-6 text-white">Aggiungi Nuovo Progetto</h3>
            <form onSubmit={handleAddProgetto} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Titolo</label>
                  <input
                    type="text"
                    placeholder="Inserisci il titolo del progetto"
                    value={titolo}
                    onChange={e => setTitolo(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Link (opzionale)</label>
                  <input
                    type="url"
                    placeholder="https://esempio.com"
                    value={link}
                    onChange={e => setLink(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Immagine</label>
                <UploadImage
                  onUpload={url => {
                    setImmagine(url);
                    setImagePreview(url);
                  }}
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Descrizione</label>
                <textarea
                  placeholder="Descrivi il progetto"
                  value={descrizione}
                  onChange={e => setDescrizione(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  required
                />
              </div>
              {imagePreview && (
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Anteprima</label>
                  <img src={imagePreview} alt="Anteprima" className="w-48 h-32 object-cover rounded-xl border border-white/20" />
                </div>
              )}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Aggiungi Progetto
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all duration-200"
                >
                  Annulla
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Projects Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              <p className="text-white/60">Caricamento progetti...</p>
            </div>
          </div>
        ) : progetti.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Nessun progetto</h3>
            <p className="text-white/60">Inizia aggiungendo il tuo primo progetto</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {progetti.map((p) => (
              <div key={p.id} className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-200 group">
                {editId === p.id ? (
                  <form onSubmit={e => { e.preventDefault(); handleEditSave(p.id); }} className="space-y-4">
                    <input
                      type="text"
                      value={editTitolo}
                      onChange={e => setEditTitolo(e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <textarea
                      value={editDescrizione}
                      onChange={e => setEditDescrizione(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      required
                    />
                    <input
                      type="url"
                      placeholder="https://esempio.com"
                      value={editLink}
                      onChange={e => setEditLink(e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <UploadImage
                      onUpload={url => setEditImmagine(url)}
                    />
                    {editImmagine && (
                      <img src={editImmagine} alt="Anteprima" className="w-full h-32 object-cover rounded-lg" />
                    )}
                    <div className="flex gap-2">
                      <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">Salva</button>
                      <button type="button" onClick={cancelEdit} className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors">Annulla</button>
                    </div>
                  </form>
                ) : (
                  <>
                    {/* Project Image */}
                    {p.immagine && (
                      <div className="relative mb-4">
                        <img src={p.immagine} alt={p.titolo} className="w-full h-40 object-cover rounded-xl" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"></div>
                      </div>
                    )}
                    
                    {/* Project Info */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-white line-clamp-2">{p.titolo}</h3>
                      <p className="text-white/70 text-sm line-clamp-3">{p.descrizione}</p>
                      {p.link && (
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          <a 
                            href={p.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 text-sm truncate"
                          >
                            {p.link}
                          </a>
                        </div>
                      )}
                      
                      {/* Toggle Switches */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-4">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${p.visibile ? 'bg-blue-600' : 'bg-white/20'}`}>
                              <input
                                type="checkbox"
                                checked={p.visibile}
                                onChange={e => handleToggle(p.id, "visibile", e.target.checked)}
                                className="sr-only"
                              />
                              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${p.visibile ? 'translate-x-6' : 'translate-x-1'}`} />
                            </div>
                            <span className="text-white/80 text-sm font-medium">Visibile</span>
                          </label>
                          
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${p.in_evidenza ? 'bg-blue-600' : 'bg-white/20'}`}>
                              <input
                                type="checkbox"
                                checked={p.in_evidenza}
                                onChange={e => handleToggle(p.id, "in_evidenza", e.target.checked)}
                                disabled={!p.in_evidenza && inEvidenzaCount >= maxEvidenza}
                                className="sr-only"
                              />
                              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${p.in_evidenza ? 'translate-x-6' : 'translate-x-1'}`} />
                            </div>
                            <span className="text-white/80 text-sm font-medium">In Evidenza</span>
                          </label>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => startEdit(p)}
                          className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors text-sm"
                        >
                          Modifica
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg font-medium transition-colors text-sm"
                        >
                          Elimina
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* View All Projects Button */}
        <div className="flex justify-center mt-12">
          <a
            href="/progetti"
            className="px-6 py-3 rounded-full bg-white/40 text-white font-semibold text-sm backdrop-blur-sm transition hover:bg-white/60 drop-shadow"
          >
            Vai ai Progetti
          </a>
        </div>

        {/* Notifications */}
        {(error || success) && (
          <div className={`fixed bottom-6 right-6 px-6 py-4 rounded-xl shadow-lg backdrop-blur-sm border transition-all duration-300 ${
            error ? 'bg-red-600/20 border-red-500/30 text-red-300' : 'bg-green-600/20 border-green-500/30 text-green-300'
          }`}>
            {error || success}
          </div>
        )}
      </div>
    </div>
  );
}