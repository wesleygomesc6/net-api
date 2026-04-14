-- CreateTable
CREATE TABLE "alunos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nascimento" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "disciplinas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "professores" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nascimento" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "turmas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "disciplina_id" INTEGER NOT NULL,
    "professor_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "turmas_disciplina_id_fkey" FOREIGN KEY ("disciplina_id") REFERENCES "disciplinas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "turmas_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "professores" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_tuma_alunos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_tuma_alunos_A_fkey" FOREIGN KEY ("A") REFERENCES "alunos" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_tuma_alunos_B_fkey" FOREIGN KEY ("B") REFERENCES "turmas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "alunos_email_key" ON "alunos"("email");

-- CreateIndex
CREATE UNIQUE INDEX "disciplinas_codigo_key" ON "disciplinas"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "professores_email_key" ON "professores"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_tuma_alunos_AB_unique" ON "_tuma_alunos"("A", "B");

-- CreateIndex
CREATE INDEX "_tuma_alunos_B_index" ON "_tuma_alunos"("B");
