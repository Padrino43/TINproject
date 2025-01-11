USE gunrange;

-- foreign keys
ALTER TABLE Contestant
    DROP FOREIGN KEY Lista_zawodnikow_Osoba;

ALTER TABLE Contestant
    DROP FOREIGN KEY Lista_zawodnikow_Zawody;

-- tables
DROP TABLE Person;

DROP TABLE User;

DROP TABLE Contestant;

DROP TABLE Contests;

-- End of file.



