
CREATE DATABASE medcare;
USE medcare;

-- =========================
-- TABELA DE USUÁRIOS
-- =========================
CREATE TABLE usuarios (
    id_usuarios INT AUTO_INCREMENT PRIMARY KEY,
    nome_usuario VARCHAR(45) NOT NULL,
    email_usuario VARCHAR(45) NOT NULL UNIQUE,
    senha_usuario VARCHAR(45) NOT NULL,
    data_nascimento_usuario DATE NULL,
    peso_usuario DECIMAL(10,2) NULL,
    altura_usuario DECIMAL(10,2) NULL
);

-- =========================
-- TABELA DE MÉDICOS
-- =========================
CREATE TABLE medicos (
    id_medicos INT AUTO_INCREMENT PRIMARY KEY,
    nome_medico VARCHAR(45) NOT NULL,
    crm CHAR(13) NOT NULL UNIQUE,
    senha_medico VARCHAR(45) NOT NULL,
    data_nascimento_medico DATE NOT NULL,
    especialidade VARCHAR(45) NOT NULL
);

INSERT INTO medicos (nome_medico, crm, senha_medico, data_nascimento_medico, especialidade) VALUES
('Dr. João Silva',  '1234567890123', 'senha123', '1975-03-15', 'Clínico Geral'),
('Dra. Ana Costa',  '2234567890123', 'senha123', '1980-07-22', 'Cardiologista'),
('Dr. Pedro Rocha', '3234567890123', 'senha123', '1985-11-10', 'Pediatra'),
('Dra. Marta Lima', '4234567890123', 'senha123', '1978-02-05', 'Dermatologista'),
('Dr. Carlos Mendes','5234567890123','senha123', '1972-09-18', 'Ortopedista'),
('Dra. Sofia Nogueira','6234567890123','senha123','1983-12-30','Ginecologista'),
('Dr. Ricardo Dias','7234567890123','senha123','1977-06-25','Oftalmologista');


-- =========================
-- TABELA DE AGENDAMENTOS
-- =========================
CREATE TABLE agendamento (
    id_agendamento INT AUTO_INCREMENT PRIMARY KEY,
    data_agendamento DATETIME NOT NULL,
    id_medicos INT NOT NULL,
    id_usuarios INT NOT NULL,
    tipo_consulta TINYINT NOT NULL, -- Pode ser ENUM no futuro
    motivo_consulta VARCHAR(250) NOT NULL,
    anamnese VARCHAR(10000) NULL,

    -- Chaves estrangeiras
    CONSTRAINT fk_agendamento_medico FOREIGN KEY (id_medicos) REFERENCES medicos(id_medicos),
    CONSTRAINT fk_agendamento_usuario FOREIGN KEY (id_usuarios) REFERENCES usuarios(id_usuarios)
);
