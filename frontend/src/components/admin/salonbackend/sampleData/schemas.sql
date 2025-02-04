-- USER DATA TABLE
CREATE TABLE users (
    userId SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(50),
    status VARCHAR(50) DEFAULT 'Active',
    dateJoined DATE NOT NULL,
    country VARCHAR(100),
    address TEXT
);

-- PARTNER DATA TABLE
CREATE TABLE partners (
    partnerId SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(50),
    status VARCHAR(50) DEFAULT 'Active',
    dateJoined DATE NOT NULL,
    country VARCHAR(100),
    address TEXT,
    businessName VARCHAR(255),
    duration VARCHAR(50),
    break VARCHAR(50),
    verified BOOLEAN DEFAULT FALSE,
    document TEXT
);

-- SERVICE DATA TABLE
CREATE TABLE services (
    serviceId SERIAL PRIMARY KEY,
    partnerId INT REFERENCES partners(partnerId) ON DELETE CASCADE,
    serviceName VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    duration VARCHAR(50)
);

-- PACKAGE DATA TABLE
CREATE TABLE packages (
    packageId SERIAL PRIMARY KEY,
    partnerId INT REFERENCES partners(partnerId) ON DELETE CASCADE,
    packageName VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    duration VARCHAR(50),
    includedServices TEXT[] -- Array of included services
);

-- SALES DATA TABLE
CREATE TABLE sales (
    orderId SERIAL PRIMARY KEY,
    userId INT REFERENCES users(userId) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'Pending',
    date DATE NOT NULL,
    price NUMERIC(10, 2) NOT NULL
);

-- MESSAGE DATA TABLE
CREATE TABLE messages (
    messageId SERIAL PRIMARY KEY,
    senderId INT, -- ID of the sender (user or partner)
    receiverId INT, -- ID of the receiver (user or partner)
    text TEXT,
    image TEXT, -- URL or path to the image if any
    disputeId INT REFERENCES disputes(disputeId) ON DELETE SET NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DISPUTE DATA TABLE
CREATE TABLE disputes (
    disputeId SERIAL PRIMARY KEY,
    userType VARCHAR(50) NOT NULL, -- User or Partner
    name VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'Inprogress',
    date DATE NOT NULL,
    userId INT REFERENCES users(userId) ON DELETE CASCADE
);