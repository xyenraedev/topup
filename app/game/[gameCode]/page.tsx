// Halaman detail per game — sengaja dikosongkan karena desainnya belum ada.
// Setiap GameCard di landing page sudah mengarah ke sini via /game/[gameCode].
//
// Catatan: kalau project kamu pakai Next.js 15+, tipe `params` berubah jadi
// Promise. Kalau nanti ada error terkait itu, ganti signature-nya jadi:
//
//   export default async function GameDetailPage({
//     params,
//   }: {
//     params: Promise<{ gameCode: string }>;
//   }) {
//     const { gameCode } = await params;
//     ...
//   }

interface GameDetailPageProps {
  params: {
    gameCode: string;
  };
}

export default function GameDetailPage({ params }: GameDetailPageProps) {
  const { gameCode } = params;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-24 text-center">
      <p className="text-sm font-medium text-blue-400">Halaman Detail Game</p>
      <h1 className="mt-2 font-display text-2xl font-bold text-foreground">
        {gameCode}
      </h1>
      <p className="mt-3 max-w-sm text-sm text-muted-foreground">
        Desain untuk halaman ini belum tersedia. Bangun UI top up per layanan
        (service) di sini menggunakan data dari GET /api/service?product_code=...
      </p>
    </main>
  );
}
