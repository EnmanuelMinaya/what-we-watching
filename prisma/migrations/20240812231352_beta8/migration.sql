/*
  Warnings:

  - You are about to drop the `Watchlist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ShowToWatchlist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserToWatchlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ShowToWatchlist" DROP CONSTRAINT "_ShowToWatchlist_A_fkey";

-- DropForeignKey
ALTER TABLE "_ShowToWatchlist" DROP CONSTRAINT "_ShowToWatchlist_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserToWatchlist" DROP CONSTRAINT "_UserToWatchlist_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserToWatchlist" DROP CONSTRAINT "_UserToWatchlist_B_fkey";

-- DropTable
DROP TABLE "Watchlist";

-- DropTable
DROP TABLE "_ShowToWatchlist";

-- DropTable
DROP TABLE "_UserToWatchlist";

-- CreateTable
CREATE TABLE "ShowList" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "visibility" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "ShowList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ShowToShowList" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ShowToShowList_AB_unique" ON "_ShowToShowList"("A", "B");

-- CreateIndex
CREATE INDEX "_ShowToShowList_B_index" ON "_ShowToShowList"("B");

-- AddForeignKey
ALTER TABLE "ShowList" ADD CONSTRAINT "ShowList_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShowToShowList" ADD CONSTRAINT "_ShowToShowList_A_fkey" FOREIGN KEY ("A") REFERENCES "Show"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShowToShowList" ADD CONSTRAINT "_ShowToShowList_B_fkey" FOREIGN KEY ("B") REFERENCES "ShowList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
