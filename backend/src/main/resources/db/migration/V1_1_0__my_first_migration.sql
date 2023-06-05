CREATE TABLE IF NOT EXISTS user
(
    id        INT          NOT NULL,
    firstname VARCHAR(255) NULL,
    lastname  VARCHAR(255) NULL,
    email     VARCHAR(255) NULL,
    password  VARCHAR(255) NULL,
    `role`    VARCHAR(255) NULL,
    CONSTRAINT pk_user PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS building
(
    id        INT          NOT NULL,
    name      VARCHAR(255) NULL,
    latitude  DOUBLE       NULL,
    longitude DOUBLE       NULL,
    CONSTRAINT pk_building PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS room
(
    id          INT    NOT NULL,
    number      INT    NULL,
    floor       INT    NULL,
    building_id INT    NOT NULL,
    places      INT    NULL,
    room_type   INT    NULL,
    projector   BIT(1) NOT NULL,
    CONSTRAINT pk_room PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS reservation
(
    id            INT      NOT NULL,
    created_at    datetime NULL,
    reserved_from datetime NULL,
    reserved_to   datetime NULL,
    user_id       INT      NULL,
    room_id       INT      NULL,
    CONSTRAINT pk_reservation PRIMARY KEY (id)
);

ALTER TABLE building
    ADD CONSTRAINT uc_building_name UNIQUE (name);

ALTER TABLE reservation
    ADD CONSTRAINT FK_RESERVATION_ON_ROOM FOREIGN KEY (room_id) REFERENCES room (id);

ALTER TABLE reservation
    ADD CONSTRAINT FK_RESERVATION_ON_USER FOREIGN KEY (user_id) REFERENCES user (id);

ALTER TABLE user
    ADD CONSTRAINT uc_user_email UNIQUE (email);

ALTER TABLE room
    ADD CONSTRAINT FK_ROOM_ON_BUILDING FOREIGN KEY (building_id) REFERENCES building (id);