// prisma/seed.ts
// Jalankan: npx tsx prisma/seed.ts (semua data lama dihapus dulu)
import prisma from "../src/config/prisma";

const main = async () => {
  // 1. Kosongkan tabel dan kembalikan id ke 1
  await prisma.$executeRaw`TRUNCATE "Product" RESTART IDENTITY`;

  // 2. Data awal dari soal minggu 9
  await prisma.product.createMany({
    data: [
      { name: "Buku", price: 15000 },
      { name: "Pulpen", price: 5000 },
    ],
  });

  console.log("Seed selesai:", await prisma.product.count(), "produk");
};

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
