/*
  Warnings:

  - You are about to drop the `Aluno` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Disciplina` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Professor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Turma` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TurmaAlunos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Turma` DROP FOREIGN KEY `Turma_disciplinaId_fkey`;

-- DropForeignKey
ALTER TABLE `Turma` DROP FOREIGN KEY `Turma_professorId_fkey`;

-- DropForeignKey
ALTER TABLE `_TurmaAlunos` DROP FOREIGN KEY `_TurmaAlunos_A_fkey`;

-- DropForeignKey
ALTER TABLE `_TurmaAlunos` DROP FOREIGN KEY `_TurmaAlunos_B_fkey`;

-- DropTable
DROP TABLE `Aluno`;

-- DropTable
DROP TABLE `Disciplina`;

-- DropTable
DROP TABLE `Professor`;

-- DropTable
DROP TABLE `Turma`;

-- DropTable
DROP TABLE `_TurmaAlunos`;

-- CreateTable
CREATE TABLE `alunos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `nascimento` DATE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `alunos_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `disciplinas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `disciplinas_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `professores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `nascimento` DATE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `professores_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `turmas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `disciplina_id` INTEGER NOT NULL,
    `professor_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_tuma_alunos` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_tuma_alunos_AB_unique`(`A`, `B`),
    INDEX `_tuma_alunos_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `turmas` ADD CONSTRAINT `turmas_disciplina_id_fkey` FOREIGN KEY (`disciplina_id`) REFERENCES `disciplinas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `turmas` ADD CONSTRAINT `turmas_professor_id_fkey` FOREIGN KEY (`professor_id`) REFERENCES `professores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_tuma_alunos` ADD CONSTRAINT `_tuma_alunos_A_fkey` FOREIGN KEY (`A`) REFERENCES `alunos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_tuma_alunos` ADD CONSTRAINT `_tuma_alunos_B_fkey` FOREIGN KEY (`B`) REFERENCES `turmas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
