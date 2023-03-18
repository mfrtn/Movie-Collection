-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_userId_fkey";

-- DropForeignKey
ALTER TABLE "CollectionRates" DROP CONSTRAINT "CollectionRates_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "MoviesOnCollections" DROP CONSTRAINT "MoviesOnCollections_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "MoviesOnCollections" DROP CONSTRAINT "MoviesOnCollections_movieId_fkey";

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoviesOnCollections" ADD CONSTRAINT "MoviesOnCollections_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoviesOnCollections" ADD CONSTRAINT "MoviesOnCollections_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionRates" ADD CONSTRAINT "CollectionRates_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
