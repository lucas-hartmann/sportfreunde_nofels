import Header from "@/app/components/Header";

export default function Altherren() {
  return (
    <main className="min-h-svh bg-white text-neutral-900">
      {/* Header / Hero */}
      <Header title="ALTHERREN" image="/headers/altherren.webp" position="80% 10%"/>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-14">
        {/* Intro Card */}
        <section className="rounded-2xl border border-neutral-200 bg-white shadow-sm p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">Seit über 20 Jahren</span>
            <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">35–65+ Jahre</span>
            <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">Bewegung & Spaß</span>
          </div>

          <div className="prose prose-neutral max-w-none">
            <p>
              Die Altherren der Sportfreunde Nofels bestehen schon seit mehr als 20 Jahren und haben sich zum Ziel gesetzt,
              Bewegung und Spaß zu vereinen, und dem Hobby Fußball, so lange der Körper mitspielt, zu frönen. Unsere AH Mitglieder
              bewegen sich mittlerweile im Alter von 35 bis 65 und sogar leicht darüber……
            </p>
          </div>
        </section>

        {/* Image area (space for 1–2 images) */}
        <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Replace the src values with your real images. If you only need one image, delete the second block. */}
          <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
            <img
              src="/altherren/ah1.webp"
              alt="Mannschaftsfoto"
              className="h-64 sm:h-80 md:h-72 w-full object-cover"
            />
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 md:block">
            <img
              src="/altherren/ah2.webp"
              alt="Mannschaftsfoto"
              className="h-64 sm:h-80 md:h-72 w-full object-cover"
            />
          </div>
                    <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
            <img
              src="/altherren/ah5.webp"
              alt="Hubert Moosbrugger"
              className="h-64 sm:h-80 md:h-72 w-full object-cover"
            />
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 md:block">
            <img
              src="/altherren/ah4.webp"
              alt="SGeselliges Beisammensein"
              className="h-64 sm:h-80 md:h-72 w-full object-cover"
            />
          </div>
        </section>

        {/* Sections */}
        <section className="mt-8 grid gap-6">
          {/* Sommer */}
          <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">April – September: Fußball am Freitag</h2>
            <p className="mt-3 text-neutral-700 leading-relaxed">
              Von April bis Ende September wird wöchentlich am Freitagabend beim Sportplatz Äuele in Nofels Fußball gespielt. Ohne Stress
              und Hektik, aber mit dem nötigen Ehrgeiz, wird dem Ball nachgejagt. Anschließend geht es nahtlos über zu einem gemütlichen Hock
              und Plausch untereinander, wobei das Kulinarische nicht zu kurz kommen darf.
            </p>
          </div>

          {/* Jassen & Ausflüge */}
          <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">Jassen, Gemeinschaft & Ausflüge</h2>
            <p className="mt-3 text-neutral-700 leading-relaxed">
              Weiters werden schon seit Jahren nach dem Sport die Jasskarten gemischt und es folgen intensive und humorvolle Jassrunden.
              Das wurde schon vor vielen Jahren von unserem, leider viel zu früh verstorbenen, Mitglied Hubert Moosbrugger ins Leben gerufen.
              Das Sackgeld wird von unserem Kassier verwaltet und jedes Jahr entsteht daraus ein schöner, interessanter und vor allem lustiger Ausflug.
            </p>
            <p className="mt-3 text-neutral-700 leading-relaxed">
              So sind von München bis Freiburg und Südtirol, aber auch im Ländle, schon unzählige Ausflüge entstanden, die uns zu Fußballspielen,
              Oktoberfesten und sonstigen Veranstaltungen geführt haben.
            </p>
          </div>

          {/* Winter */}
          <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">Oktober – März: Hallenfußball am Mittwoch</h2>
            <p className="mt-3 text-neutral-700 leading-relaxed">
              Auch im Winter ist unsere AH Truppe aktiv. So treffen wir uns ab Oktober bis Ende März wöchentlich am Mittwoch in der Halle,
              um den Hallenfußball zu zelebrieren. Auch da wird natürlich danach gejasst und das gemütliche Zusammensein genossen.
            </p>
          </div>

          {/* Engagement */}
          <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">Engagement im Verein</h2>
            <p className="mt-3 text-neutral-700 leading-relaxed">
              Selbstverständlich beteiligen sich die aktiven Mitglieder auch bei sonstigen Veranstaltungen der Sportfreunde Nofels –
              wie z.&nbsp;B. dem jährlich stattfindenden Beachsoccer Turnier.
            </p>
          </div>
        </section>

        {/* Quick Facts */}
        <section className="mt-8">
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold">Kurzinfos</h3>
            <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
              <div className="rounded-xl border border-neutral-200 bg-white p-4">
                <dt className="font-medium text-neutral-700">Trainings Zeitraum Sommer</dt>
                <dd className="text-neutral-600">April – Ende September, Freitagabend, Sportplatz Äuele in Nofels</dd>
              </div>
              <div className="rounded-xl border border-neutral-200 bg-white p-4">
                <dt className="font-medium text-neutral-700">Trainings Zeitraum Winter</dt>
                <dd className="text-neutral-600">Oktober – Ende März, Mittwochabend, Halle der Volksschule Nofels</dd>
              </div>
              <div className="rounded-xl border border-neutral-200 bg-white p-4">
                <dt className="font-medium text-neutral-700">Gemeinschaft</dt>
                <dd className="text-neutral-600">Gemütlicher Hock, Jassrunden, jährliche Ausflüge</dd>
              </div>
              <div className="rounded-xl border border-neutral-200 bg-white p-4">
                <dt className="font-medium text-neutral-700">Alter</dt>
                <dd className="text-neutral-600">35–65+ Jahre</dd>
              </div>
            </dl>
          </div>
        </section>
      </div>
    </main>
  );
}

