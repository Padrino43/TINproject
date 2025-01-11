CREATE DATABASE IF NOT EXISTS gunrange;
USE gunrange;

-- tables
-- Table: Osoba
CREATE TABLE Person (
   id int  NOT NULL,
   name nvarchar(20)  NOT NULL,
   surname nvarchar(20)  NOT NULL,
   startingDate date  NOT NULL,
   CONSTRAINT Osoba_pk PRIMARY KEY (id)
);

-- Table: Uzytkownik
CREATE TABLE User (
    id int  NOT NULL,
    email nvarchar(40)  NOT NULL,
    password nvarchar(100)  NOT NULL,
    salt nvarchar(20)  NOT NULL,
    CONSTRAINT Uzytkownik_pk PRIMARY KEY (id)
);

-- Table: Zawodnik
CREATE TABLE Contestant (
      id int  NOT NULL,
      contest int  NOT NULL,
      score int  NOT NULL,
      CONSTRAINT Zawodnik_pk PRIMARY KEY (id,contest)
);

-- Table: Zawody
CREATE TABLE Contests (
    id int  NOT NULL,
    name nvarchar(50)  NOT NULL,
    start timestamp  NOT NULL,
    finish timestamp  NOT NULL,
    CONSTRAINT Zawody_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: Lista_zawodnikow_Osoba (table: Zawodnik)
ALTER TABLE Contestant ADD CONSTRAINT Lista_zawodnikow_Osoba FOREIGN KEY Lista_zawodnikow_Osoba (id)
    REFERENCES Person (Id);

-- Reference: Lista_zawodnikow_Zawody (table: Zawodnik)
ALTER TABLE Contestant ADD CONSTRAINT Lista_zawodnikow_Zawody FOREIGN KEY Lista_zawodnikow_Zawody (contest)
    REFERENCES Contests (id);

-- example data
INSERT INTO Person (id, name, surname, startingDate) VALUES (1, 'Michael', 'Kozacki', '2024-10-30');
INSERT INTO Person (id, name, surname, startingDate) VALUES (2, 'Stephan', 'Gepard', '2024-09-30');
INSERT INTO Person (id, name, surname, startingDate) VALUES (3, 'Gregory', 'Djung', '2024-08-30');
INSERT INTO Person (id, name, surname, startingDate) VALUES (4, 'Alexandra', 'Thomas', '2024-10-10');
INSERT INTO Person (id, name, surname, startingDate) VALUES (5, 'Julia', 'Batory', '2024-10-20');

INSERT INTO Contests (id, name, start, finish) VALUES (1, 'Zawody Otwarte', '2024-10-30 20:00:00', '2024-10-30 22:00:00');
INSERT INTO Contests (id, name, start, finish) VALUES (2, 'Zawody Otwarte', '2024-10-31 08:00:00', '2024-10-31 10:00:00');
INSERT INTO Contests (id, name, start, finish) VALUES (3, 'Zawody o puchar prezesa', '2024-11-01 10:30:00', '2024-11-01 13:30:00');
INSERT INTO Contests (id, name, start, finish) VALUES (4, 'Zawody dynamiczne', '2024-11-02 14:00:00', '2024-11-02 17:00:00');
INSERT INTO Contests (id, name, start, finish) VALUES (5, 'Zawody Otwarte', '2024-11-03 17:30:00', '2024-11-03 19:30:00');
INSERT INTO Contests (id, name, start, finish) VALUES (6, 'Zawody o puchar prezesa', '2024-11-04 20:00:00', '2024-11-04 22:30:00');
INSERT INTO Contests (id, name, start, finish) VALUES (7, 'Zawody dynamiczne', '2024-11-05 08:30:00', '2024-11-05 12:30:00');
INSERT INTO Contests (id, name, start, finish) VALUES (8, 'Zawody Otwarte', '2024-11-06 13:00:00', '2024-11-06 15:00:00');
INSERT INTO Contests (id, name, start, finish) VALUES (9, 'Zawody o puchar prezesa', '2024-11-07 15:30:00', '2024-11-07 19:00:00');
INSERT INTO Contests (id, name, start, finish) VALUES (10, 'Zawody dynamiczne', '2024-11-08 20:30:00', '2024-11-08 23:00:00');
INSERT INTO Contests (id, name, start, finish) VALUES (11, 'Zawody Otwarte', '2024-09-30 09:00:00', '2024-09-30 11:30:00');

INSERT INTO Contestant (id, contest, score) VALUES (1, 1, 85);
INSERT INTO Contestant (id, contest, score) VALUES (2, 1, 90);
INSERT INTO Contestant (id, contest, score) VALUES (3, 1, 72);
INSERT INTO Contestant (id, contest, score) VALUES (4, 2, 88);
INSERT INTO Contestant (id, contest, score) VALUES (5, 2, 91);
INSERT INTO Contestant (id, contest, score) VALUES (1, 2, 83);
INSERT INTO Contestant (id, contest, score) VALUES (2, 3, 76);
INSERT INTO Contestant (id, contest, score) VALUES (3, 3, 69);
INSERT INTO Contestant (id, contest, score) VALUES (5, 3, 88);
INSERT INTO Contestant (id, contest, score) VALUES (1, 4, 92);
INSERT INTO Contestant (id, contest, score) VALUES (3, 4, 77);
INSERT INTO Contestant (id, contest, score) VALUES (4, 4, 86);
INSERT INTO Contestant (id, contest, score) VALUES (2, 5, 85);
INSERT INTO Contestant (id, contest, score) VALUES (4, 5, 93);
INSERT INTO Contestant (id, contest, score) VALUES (5, 5, 89);
INSERT INTO Contestant (id, contest, score) VALUES (1, 6, 80);
INSERT INTO Contestant (id, contest, score) VALUES (2, 6, 88);
INSERT INTO Contestant (id, contest, score) VALUES (3, 6, 81);
INSERT INTO Contestant (id, contest, score) VALUES (4, 7, 87);
INSERT INTO Contestant (id, contest, score) VALUES (5, 7, 85);
INSERT INTO Contestant (id, contest, score) VALUES (3, 7, 80);
INSERT INTO Contestant (id, contest, score) VALUES (1, 8, 82);
INSERT INTO Contestant (id, contest, score) VALUES (4, 8, 79);
INSERT INTO Contestant (id, contest, score) VALUES (5, 8, 88);
INSERT INTO Contestant (id, contest, score) VALUES (2, 9, 85);
INSERT INTO Contestant (id, contest, score) VALUES (3, 9, 76);
INSERT INTO Contestant (id, contest, score) VALUES (5, 9, 84);
INSERT INTO Contestant (id, contest, score) VALUES (1, 10, 90);
INSERT INTO Contestant (id, contest, score) VALUES (4, 10, 78);
INSERT INTO Contestant (id, contest, score) VALUES (5, 10, 82);
INSERT INTO Contestant (id, contest, score) VALUES (2, 11, 87);
INSERT INTO Contestant (id, contest, score) VALUES (3, 11, 81);
INSERT INTO Contestant (id, contest, score) VALUES (5, 11, 90);

INSERT INTO User (id, email, password, salt) VALUES (1, 'test@test.pl', 'b662ce397f7ef9f18ea3e3bb1a61dc87', 'L%WQ%INe-lnRE#aw#^gr');
-- End of file.

