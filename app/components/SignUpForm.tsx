"use client";
import { useState, useRef } from "react";

export default function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);
    setFeedback(null); // clear previous feedback

    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setFeedback("Danke für deine Anmeldung! Wir melden uns bald bei dir.");
        formRef.current.reset();
      } else {
        setFeedback("Fehler beim Senden. Bitte probiere es später erneut.");
      }
    } catch (err) {
      setFeedback("Fehler beim Senden. Bitte probiere es später erneut.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="anmeldung"
      className="max-w-4xl mx-auto py-20 px-6 bg-white rounded-xl shadow-lg text-gray-900"
    >
      <h2 className="text-4xl font-extrabold text-[#781c12] text-center">
        Jetzt Team Anmelden!
      </h2>
      <p className="text-center mb-10 text-gray-500 text-lg transition">
        Die Anmeldung wird erst mit der Überweisung des Nenngeldes finalisiert.
      </p>

      <form ref={formRef} className="space-y-8" onSubmit={handleSubmit}>
        {[
          { id: "name", label: "Name", type: "text", placeholder: "Max Mustermann" },
          { id: "email", label: "E-Mail", type: "email", placeholder: "deine@email.com" },
          { id: "phone", label: "Telefonnummer", type: "tel", placeholder: "+43 660 1234567" },
          { id: "teamName", label: "Teamname", type: "text", placeholder: "Name deines Teams" },
        ].map(({ id, label, type, placeholder }) => (
          <div key={id}>
            <label htmlFor={id} className="block mb-2 font-semibold text-gray-800">
              {label}
            </label>
            <input
              name={id}
              id={id}
              type={type}
              placeholder={placeholder}
              required
              className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-hidden focus:ring-2 focus:ring-[#781c12] transition"
            />
          </div>
        ))}

        <div>
          <label htmlFor="message" className="block mb-2 font-semibold text-gray-800">
            Nachricht
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Was du uns noch sagen möchtest..."
            className="w-full rounded-md border border-gray-300 px-4 py-3 h-32 resize-none focus:outline-hidden focus:ring-2 focus:ring-[#781c12] transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#781c12] text-white font-extrabold py-4 rounded-xl text-xl hover:bg-[#a62c1a] transition disabled:opacity-50"
        >
          {loading ? "Senden..." : "Jetzt anmelden"}
        </button>

        {feedback && (
          <p className="mt-4 text-center text-gray-500 text-lg transition">
            {feedback}
          </p>
        )}
      </form>
    </section>
  );
}
