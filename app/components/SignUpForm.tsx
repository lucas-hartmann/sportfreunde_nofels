import Image from "next/image";

export default function SingUpForm() {
  return (
    <section
        id="anmeldung"
        className="max-w-4xl mx-auto py-20 px-6 bg-white rounded-xl shadow-lg text-gray-900"
      >
        <h2 className="text-4xl font-extrabold mb-10 text-[#781c12] text-center">
          Team-Anmeldung
        </h2>

        <form
          className="space-y-8"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Danke für deine Anmeldung! Wir melden uns bald bei dir.");
          }}
        >
          {[
            {
              id: "name",
              label: "Name",
              type: "text",
              placeholder: "Max Mustermann",
            },
            {
              id: "email",
              label: "E-Mail",
              type: "email",
              placeholder: "deine@email.com",
            },
            {
              id: "phone",
              label: "Telefonnummer",
              type: "tel",
              placeholder: "+43 660 1234567",
            },
            {
              id: "teamName",
              label: "Teamname",
              type: "text",
              placeholder: "Name deines Teams",
            },
          ].map(({ id, label, type, placeholder }) => (
            <div key={id}>
              <label
                htmlFor={id}
                className="block mb-2 font-semibold text-gray-800"
              >
                {label}
              </label>
              <input
                name={id}
                id={id}
                type={type}
                placeholder={placeholder}
                required
                className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-hidden focus:ring-2 focus:ring-[#781c12]"
              />
            </div>
          ))}

          <div>
            <label
              htmlFor="message"
              className="block mb-2 font-semibold text-gray-800"
            >
              Nachricht
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Was du uns noch sagen möchtest..."
              className="w-full rounded-md border border-gray-300 px-4 py-3 h-32 resize-none focus:outline-hidden focus:ring-2 focus:ring-[#781c12]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#781c12] text-white font-extrabold py-4 rounded-xl text-xl hover:bg-[#a62c1a] transition"
          >
            Jetzt anmelden
          </button>
        </form>
      </section>
  );
}
