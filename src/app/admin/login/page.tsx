"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Email o password non corretti");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-main-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center mb-2 text-main-black">Login Admin</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-creative-blue"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-creative-blue"
          required
        />
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        <button
          type="submit"
          className="bg-main-black text-white rounded py-2 font-semibold hover:bg-main-black/80 transition"
          disabled={loading}
        >
          {loading ? "Accesso..." : "Accedi"}
        </button>
      </form>
    </div>
  );
} 