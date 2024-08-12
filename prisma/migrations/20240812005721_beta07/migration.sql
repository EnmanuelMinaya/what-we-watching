/*
  Warnings:

  - You are about to drop the column `dateAdded` on the `Watchlist` table. All the data in the column will be lost.
  - You are about to drop the column `lastWatchedEpisode` on the `Watchlist` table. All the data in the column will be lost.
  - You are about to drop the column `showId` on the `Watchlist` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Watchlist` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Watchlist` table. All the data in the column will be lost.
  - You are about to drop the `TVShow` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Watchlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visibility` to the `Watchlist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Watchlist" DROP CONSTRAINT "Watchlist_showId_fkey";

-- DropForeignKey
ALTER TABLE "Watchlist" DROP CONSTRAINT "Watchlist_userId_fkey";

-- AlterTable
ALTER TABLE "Watchlist" DROP COLUMN "dateAdded",
DROP COLUMN "lastWatchedEpisode",
DROP COLUMN "showId",
DROP COLUMN "status",
DROP COLUMN "userId",
ADD COLUMN     "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "visibility" TEXT NOT NULL;

-- DropTable
DROP TABLE "TVShow";

-- CreateTable
CREATE TABLE "Show" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "numSeasons" INTEGER NOT NULL,
    "averageRating" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Show_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserToWatchlist" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ShowToWatchlist" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToWatchlist_AB_unique" ON "_UserToWatchlist"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToWatchlist_B_index" ON "_UserToWatchlist"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ShowToWatchlist_AB_unique" ON "_ShowToWatchlist"("A", "B");

-- CreateIndex
CREATE INDEX "_ShowToWatchlist_B_index" ON "_ShowToWatchlist"("B");

-- AddForeignKey
ALTER TABLE "_UserToWatchlist" ADD CONSTRAINT "_UserToWatchlist_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToWatchlist" ADD CONSTRAINT "_UserToWatchlist_B_fkey" FOREIGN KEY ("B") REFERENCES "Watchlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShowToWatchlist" ADD CONSTRAINT "_ShowToWatchlist_A_fkey" FOREIGN KEY ("A") REFERENCES "Show"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShowToWatchlist" ADD CONSTRAINT "_ShowToWatchlist_B_fkey" FOREIGN KEY ("B") REFERENCES "Watchlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
