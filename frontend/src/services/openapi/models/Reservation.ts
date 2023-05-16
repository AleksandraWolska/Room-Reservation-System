/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { Room } from './Room';
import {
    RoomFromJSON,
    RoomFromJSONTyped,
    RoomToJSON,
} from './Room';
import type { User } from './User';
import {
    UserFromJSON,
    UserFromJSONTyped,
    UserToJSON,
} from './User';

/**
 * 
 * @export
 * @interface Reservation
 */
export interface Reservation {
    /**
     * 
     * @type {number}
     * @memberof Reservation
     */
    id?: number;
    /**
     * 
     * @type {Date}
     * @memberof Reservation
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof Reservation
     */
    reservedFrom?: Date;
    /**
     * 
     * @type {Date}
     * @memberof Reservation
     */
    reservedTo?: Date;
    /**
     * 
     * @type {User}
     * @memberof Reservation
     */
    user?: User;
    /**
     * 
     * @type {Room}
     * @memberof Reservation
     */
    room?: Room;
}

/**
 * Check if a given object implements the Reservation interface.
 */
export function instanceOfReservation(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ReservationFromJSON(json: any): Reservation {
    return ReservationFromJSONTyped(json, false);
}

export function ReservationFromJSONTyped(json: any, ignoreDiscriminator: boolean): Reservation {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'createdAt': !exists(json, 'createdAt') ? undefined : (new Date(json['createdAt'])),
        'reservedFrom': !exists(json, 'reservedFrom') ? undefined : (new Date(json['reservedFrom'])),
        'reservedTo': !exists(json, 'reservedTo') ? undefined : (new Date(json['reservedTo'])),
        'user': !exists(json, 'user') ? undefined : UserFromJSON(json['user']),
        'room': !exists(json, 'room') ? undefined : RoomFromJSON(json['room']),
    };
}

export function ReservationToJSON(value?: Reservation | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'createdAt': value.createdAt === undefined ? undefined : (value.createdAt.toISOString()),
        'reservedFrom': value.reservedFrom === undefined ? undefined : (value.reservedFrom.toISOString()),
        'reservedTo': value.reservedTo === undefined ? undefined : (value.reservedTo.toISOString()),
        'user': UserToJSON(value.user),
        'room': RoomToJSON(value.room),
    };
}

