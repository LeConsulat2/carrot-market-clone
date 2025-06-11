-- CreateTable
CREATE TABLE "LiveStream" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "stream_key" TEXT NOT NULL,
    "stream_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "LiveStream_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "LiveStream_stream_key_key" ON "LiveStream"("stream_key");

-- CreateIndex
CREATE UNIQUE INDEX "LiveStream_stream_id_key" ON "LiveStream"("stream_id");
