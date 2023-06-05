CREATE SCHEMA 'room_reservation';

CREATE TABLE `Users` (
                         `id` integer PRIMARY KEY,
                         `name` varchar(255),
                         `surname` varchar(255),
                         `email` varchar(255) UNIQUE
);

CREATE TABLE `Buildings` (
                             `id` integer PRIMARY KEY,
                             `name` varchar(255) UNIQUE,
                             `latitude` double,
                             `longitude` double
);

CREATE TABLE `Rooms` (
                         `id` integer PRIMARY KEY,
                         `number` integer,
                         `building_id` integer,
                         `places_number` integer
);

CREATE TABLE `Reservations` (
                                `id` integer PRIMARY KEY,
                                `user_id` integer,
                                `room_id` integer,
                                `created_at` datetime,
                                `reservated_from` datetime,
                                `reservated_to` datetime
);

CREATE TABLE `Accessories` (
                               `room_id` integer,
                               `name` varchar(255),
                               `value` varchar(255),
                               PRIMARY KEY (`room_id`, `name`)
);

ALTER TABLE `Reservations` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

ALTER TABLE `Reservations` ADD FOREIGN KEY (`room_id`) REFERENCES `Rooms` (`id`);

ALTER TABLE `Rooms` ADD FOREIGN KEY (`building_id`) REFERENCES `Buildings` (`id`);

ALTER TABLE `Accessories` ADD FOREIGN KEY (`room_id`) REFERENCES `Rooms` (`id`);
