-- Table schema

DROP TABLE IF EXISTS GraffitiData;

CREATE TABLE GraffitiData (
	ID SERIAL PRIMARY KEY,
    creation_date DATE NOT NULL,
    status VARCHAR(30),
    completion_date DATE,
    type_of_service_request VARCHAR(120),
    surface_type  VARCHAR(120),
    graffiti_location VARCHAR(120),
    zip INT,
    ward INT,
    community_area INT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION
);