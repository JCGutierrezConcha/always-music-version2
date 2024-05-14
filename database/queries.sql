DROP TABLE IF EXISTS STUDENTS;

CREATE TABLE STUDENTS (
	id VARCHAR PRIMARY KEY,
	nombre VARCHAR(50) NOT NULL,
	rut VARCHAR(12) NOT NULL,
	curso VARCHAR(50) NOT NULL,
	nivel VARCHAR(3) NOT NULL
);

INSERT INTO STUDENTS (id, nombre, rut, curso, nivel)
VALUES 
('z-FrmrjC3B-ttWgg5n7Tu','Jose Silva', '15.279.443-6', 'Piano', '3'),
('b-FrmrjC4R-ttWgg5n7Tu','Florencia Duarte', '9.715.866-4', 'Trompeta', '5'),
('A-FrmrjC3B-ttWgg5n8Te','Antonia Pardo', '18.122.754-5', 'Guitarra', '4');

SELECT * FROM STUDENTS;