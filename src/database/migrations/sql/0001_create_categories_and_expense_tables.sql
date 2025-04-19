CREATE TABLE
    IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY,
        value TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL UNIQUE,
        color TEXT NULL UNIQUE
    );

CREATE TABLE
    IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        amount NUMERIC NOT NULL,
        spentDate TEXT NOT NULL,
        note TEXT NULL,
        categoryId INTEGER NOT NULL,
        FOREIGN KEY (categoryId) REFERENCES categories (id) ON DELETE CASCADE ON UPDATE NO ACTION
    );