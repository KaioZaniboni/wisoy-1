
  INSERT into fazendas values 
(NULL, 15000, 1000, 34, 'Rua Padre André'), (NULL, 15000, 90, 3, 'Rua Andrade Lopes'),
(NULL, 15001, 1500, 50 , 'Rua Fernando Moreira'),
(NULL, 15002, 400, 14, 'Rua Cornelius Frederick'), (NULL, 15002, 700, 24, 'Avenida Sapopemba'),
(NULL, 15003, 630, 21, 'Rua Engenheiro Alberto Nilman'),
(NULL, 15004, 10000, 334, 'Rua Coronel Armando');

INSERT INTO SENSORES VALUES 
(NULL, 1, '2021-03-11', '86.1638, -80.4437'), 
(NULL, 2, '2021-03-16', '-57.0430, -157.2459'),
(NULL, 3, '2021-01-25', '42.1108, 7.6416'), 
(NULL, 4, '2021-03-11', '70.2003, -165.4415'),
(NULL, 5, '2021-03-11', '-75.3722, -176.6609'), 
(NULL, 6, '2021-02-28', '-34.8391, 157.6925'),
(NULL, 7, '2021-01-02', '22.5029, 136.9261');

INSERT INTO HIST_SENSOR VALUES
  (null, 1000, '13.47%', '2021-03-11 14:55'),
  (null, 1001, '13.39%', '2021-03-17'), 
  (null, 1002, '14.98%', '2021-01-27'),
  (null, 1003, '13.09%', '2021-03-14'), 
  (null, 1004, '14.01%', '2021-03-30'),
  (null, 1005, '13.57%', '2021-02-28'), 
  (null, 1006, '13.08%', '2021-01-07');

INSERT INTO COLABORADORES VALUES
(NULL, 'Jonas Florencio', 'M', '2002-03-30', 'jonas_florencio@wisoy.com.br', 'jonas_wisoy', 
'Jo54@p12', '11955250037', '503032217', '33299400574', 'Rua Professor Otavio Fernandes', '88833397', '2021-02-01'),
(NULL, 'Amanda Fruteiro', 'F', '2002-01-07', 'amanda_fruteiro@wisoy.com.br', 'amanda_wisoy', 
'Am01#dsC', '11944064307', '243555719', '46955749916', 'Rua Enfermeira Luiza Alegreti', '77433397', '2021-02-01'),
(NULL, 'Matheus Vieck', 'M', '1998-02-13', 'matheus_vieck@wisoy.com.br', 'matheus_wisoy', 
'Ma37#f13', '11955250037', '530075995', '46933797734', 'Rua Soldado Peixoto', '74421388', '2021-02-01');

/*INSERT INTO OCORRENCIAS VALUES
(NULL, 15000, 5000, 'Fazenda da Rua Andrade Lopes problema no sensor.', '2021-03-27'),
(NULL, 15000, 5000, 'Fazenda da Rua Padre André precisa trocar sensor 86.1638, -80.4437', '2021-03-28'),
(NULL, 15001, 5001, 'Fazenda da Rua Cornelius Frederick precisa de mais 2 sensores', '2021-04-10');*/