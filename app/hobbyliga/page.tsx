export default function Hobbyliga() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Hobbyliga Tabelle</h1>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Team</th>
            <th className="p-2 border">Spiele</th>
            <th className="p-2 border">Punkte</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border">FC Harti</td>
            <td className="p-2 border">5</td>
            <td className="p-2 border">12</td>
          </tr>
          <tr>
            <td className="p-2 border">SV Tal</td>
            <td className="p-2 border">5</td>
            <td className="p-2 border">10</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}