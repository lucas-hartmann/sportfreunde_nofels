"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
type Score = { home: number | null; away: number | null };
type Match = {
	id?: number;
	home: string;
	away: string;
	day?: string | null;
	date?: string | null;
	time?: string | null;
	location?: string | null;
	note?: string | null;
	score?: Score;
};
type Matchday = { id: number; name: string; matches: Match[] };
function Toast({
	kind,
	message,
}: {
	kind: "success" | "error";
	message: string;
}) {
	const bg = kind === "success" ? "bg-[#781c12]" : "bg-red-600";
	return (
		<div
			className={`fixed top-6 right-6 ${bg} text-white px-4 py-2 rounded-lg shadow-lg z-50`}
		>
			{message}
		</div>
	);
}
export default function HobbyligaEditPage() {
	const { status } = useSession();
	const router = useRouter();
	const [matchdaysData, setMatchdaysData] = useState<Matchday[]>([]);
	const [loading, setLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);
	const [toast, setToast] = useState<{
		kind: "success" | "error";
		message: string;
	} | null>(null);
	const initialRef = useRef<Matchday[] | null>(null);
	const [fetchError, setFetchError] = useState<string | null>(null);
	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/auth/signin?callbackUrl=/hobbyliga/edit");
		}
	}, [status, router]);
	useEffect(() => {
		const load = async () => {
			try {
				const res = await fetch("/api/matchdays");
				if (!res.ok) throw new Error("Fehler beim Laden der Spieldaten");
				const data: Matchday[] = await res.json();
				setMatchdaysData(data);
				initialRef.current = data;
			} catch (e: any) {
				setFetchError(e?.message || "Unbekannter Fehler");
			} finally {
				setLoading(false);
			}
		};
		if (status === "authenticated") load();
	}, [status]);
	const hasChanges = useMemo(() => {
		if (!initialRef.current) return false;
		try {
			return (
				JSON.stringify(initialRef.current) !== JSON.stringify(matchdaysData)
			);
		} catch {
			return true;
		}
	}, [matchdaysData]);
	const handleScoreChange = (
		matchdayId: number,
		matchIndex: number,
		team: "home" | "away",
		value: number | "",
	) => {
		setMatchdaysData((prev) =>
			prev.map((md) =>
				md.id === matchdayId
					? {
							...md,
							matches: md.matches.map((m, idx) =>
								idx === matchIndex
									? {
											...m,
											score: {
												...(m.score || { home: null, away: null }),
												[team]:
													value === ""
														? null
														: Number.isNaN(value)
															? null
															: value,
											},
										}
									: m,
							),
						}
					: md,
			),
		);
	};
	const handleReset = () => {
		if (initialRef.current) setMatchdaysData(initialRef.current);
	};
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSaving(true);
		setToast(null);
		try {
			const res = await fetch("/api/matchdays", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(matchdaysData),
			});
			if (!res.ok) throw new Error("Speichern fehlgeschlagen");
			initialRef.current = matchdaysData;
			setToast({
				kind: "success",
				message: "Ergebnisse erfolgreich gespeichert",
			});
		} catch (e: any) {
			setToast({ kind: "error", message: e?.message || "Unbekannter Fehler" });
		} finally {
			setIsSaving(false);
			setTimeout(() => setToast(null), 1200);
		}
	};
	if (status === "loading" || loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				{" "}
				<div className="flex items-center gap-3 text-gray-600">
					{" "}
					<span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-transparent" />{" "}
					<p>Lade Spielpläne</p>{" "}
				</div>{" "}
			</div>
		);
	}
	if (status === "unauthenticated") return null;
	return (
		<div className="mt-20 pb-28">
			{" "}
			<header className="px-6">
				{" "}
				<h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900">
					Ergebnis Editor
				</h1>{" "}
				<p className="text-center text-gray-500 mt-2">
					Trage die Ergebnisse der Spiele pro Spieltag ein.
				</p>{" "}
			</header>{" "}
			{fetchError && (
				<div className="mx-auto max-w-4xl mt-6 px-4">
					{" "}
					<div className="rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-3">
						{fetchError}
					</div>{" "}
				</div>
			)}{" "}
			<form
				onSubmit={handleSubmit}
				className="mx-auto max-w-4xl mt-6 px-4 flex flex-col gap-6"
			>
				{" "}
				{matchdaysData.map((md) => {
					const played = md.matches.filter(
						(m) =>
							(m.score?.home ?? null) !== null &&
							(m.score?.away ?? null) !== null,
					).length;
					return (
						<section
							key={md.id}
							className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
						>
							{" "}
							<details>
								{" "}
								<summary className="cursor-pointer list-none px-4 sm:px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
									{" "}
									<span className="font-semibold text-lg text-gray-800">
										{md.name}
									</span>{" "}
									<span className="text-sm text-gray-500">
										{played}/{md.matches.length} Spiele erfasst
									</span>{" "}
								</summary>{" "}
								<div className="divide-y divide-gray-100">
									{" "}
									{md.matches.map((match, idx) => (
										<div key={idx} className="px-4 sm:px-6 py-3">
											{" "}
											<div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto_auto_1fr] items-center gap-2 sm:gap-4">
												{" "}
												<span
													className="font-medium text-sm sm:text-base truncate"
													title={match.home}
												>
													{" "}
													{match.home}{" "}
												</span>{" "}
												<label
													className="sr-only"
													htmlFor={`home-${md.id}-${idx}`}
												>
													{" "}
													Heimteam Tore{" "}
												</label>{" "}
												<input
													id={`home-${md.id}-${idx}`}
													inputMode="numeric"
													type="number"
													min={0}
													step={1}
													value={match.score?.home ?? ""}
													onChange={(e) =>
														handleScoreChange(
															md.id,
															idx,
															"home",
															e.target.value === ""
																? ""
																: parseInt(e.target.value),
														)
													}
													className="border border-gray-300 px-2 py-1.5 sm:py-2 text-sm sm:text-base rounded w-14 sm:w-16 text-center focus:outline-none focus:ring-2 focus:ring-[#781c12] focus:border-[#781c12]"
												/>{" "}
												<span className="text-center text-sm sm:text-base text-gray-500">
													:
												</span>{" "}
												<label
													className="sr-only"
													htmlFor={`away-${md.id}-${idx}`}
												>
													{" "}
													Auswärtsteam Tore{" "}
												</label>{" "}
												<input
													id={`away-${md.id}-${idx}`}
													inputMode="numeric"
													type="number"
													min={0}
													step={1}
													value={match.score?.away ?? ""}
													onChange={(e) =>
														handleScoreChange(
															md.id,
															idx,
															"away",
															e.target.value === ""
																? ""
																: parseInt(e.target.value),
														)
													}
													className="border border-gray-300 px-2 py-1.5 sm:py-2 text-sm sm:text-base rounded w-14 sm:w-16 text-center focus:outline-none focus:ring-2 focus:ring-[#781c12] focus:border-[#781c12]"
												/>{" "}
												<span
													className="font-medium text-sm sm:text-base truncate text-right"
													title={match.away}
												>
													{" "}
													{match.away}{" "}
												</span>{" "}
												<div className="sm:col-span-5 mt-1 text-gray-500 text-xs sm:text-sm flex flex-wrap items-center gap-x-2 gap-y-1">
													{" "}
													{match.day && (
														<span className="rounded-full bg-gray-100 px-2 py-0.5">
															{match.day}
														</span>
													)}{" "}
													{(match.date || match.time) && (
														<span className="rounded-full bg-gray-100 px-2 py-0.5">
															{[formatDate(match.date), formatTime(match.time)]
																.filter(Boolean)
																.join(" ")}
														</span>
													)}{" "}
													{match.location && (
														<span className="rounded-full bg-gray-100 px-2 py-0.5">
															{match.location}
														</span>
													)}{" "}
													{match.note && (
														<span className="rounded-full bg-amber-100 text-amber-800 px-2 py-0.5">
															{match.note}
														</span>
													)}{" "}
												</div>{" "}
											</div>{" "}
										</div>
									))}{" "}
								</div>{" "}
							</details>{" "}
						</section>
					);
				})}{" "}
				{/* Bottom action area */}{" "}
				<div className="mt-4 pt-4 border-t border-gray-200">
					{" "}
					<div className="flex justify-end gap-3">
						{" "}
						<button
							type="button"
							onClick={handleReset}
							disabled={!hasChanges || isSaving}
							className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
						>
							{" "}
							Zurücksetzen{" "}
						</button>{" "}
						<button
							type="submit"
							disabled={!hasChanges || isSaving}
							className="inline-flex items-center gap-2 bg-[#781c12] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#a62c1a] disabled:opacity-50"
						>
							{" "}
							{isSaving && (
								<span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
							)}{" "}
							Speichern{" "}
						</button>{" "}
					</div>{" "}
				</div>{" "}
			</form>{" "}
			{toast && <Toast kind={toast.kind} message={toast.message} />}{" "}
		</div>
	);
}

function formatDate(d?: string | null): string | null {
	if (!d) return null;
	if (d.includes(".")) return d;
	if (/^\d{4}-\d{2}-\d{2}/.test(d)) {
		const [y, m, day] = d.split("-");
		return `${day}.${m}.${y}`;
	}
	return d;
}

function formatTime(t?: string | null): string | null {
	if (!t) return null;
	const m = t.match(/^(\d{2}:\d{2})/);
	return m ? m[1] : t;
}
