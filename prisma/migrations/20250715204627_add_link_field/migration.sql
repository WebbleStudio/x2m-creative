-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Progetto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titolo" TEXT NOT NULL,
    "descrizione" TEXT NOT NULL,
    "immagine" TEXT NOT NULL,
    "visibile" BOOLEAN NOT NULL DEFAULT false,
    "inEvidenza" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "link" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
