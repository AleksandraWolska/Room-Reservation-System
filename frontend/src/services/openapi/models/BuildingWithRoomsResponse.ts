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
import type { Building } from './Building';
import {
    BuildingFromJSON,
    BuildingFromJSONTyped,
    BuildingToJSON,
} from './Building';
import type { Room } from './Room';
import {
    RoomFromJSON,
    RoomFromJSONTyped,
    RoomToJSON,
} from './Room';

/**
 * 
 * @export
 * @interface BuildingWithRoomsResponse
 */
export interface BuildingWithRoomsResponse {
    /**
     * 
     * @type {Building}
     * @memberof BuildingWithRoomsResponse
     */
    building?: Building;
    /**
     * 
     * @type {Array<Room>}
     * @memberof BuildingWithRoomsResponse
     */
    rooms?: Array<Room>;
    /**
     * 
     * @type {number}
     * @memberof BuildingWithRoomsResponse
     */
    roomsCount?: number;
}

/**
 * Check if a given object implements the BuildingWithRoomsResponse interface.
 */
export function instanceOfBuildingWithRoomsResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function BuildingWithRoomsResponseFromJSON(json: any): BuildingWithRoomsResponse {
    return BuildingWithRoomsResponseFromJSONTyped(json, false);
}

export function BuildingWithRoomsResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): BuildingWithRoomsResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'building': !exists(json, 'building') ? undefined : BuildingFromJSON(json['building']),
        'rooms': !exists(json, 'rooms') ? undefined : ((json['rooms'] as Array<any>).map(RoomFromJSON)),
        'roomsCount': !exists(json, 'roomsCount') ? undefined : json['roomsCount'],
    };
}

export function BuildingWithRoomsResponseToJSON(value?: BuildingWithRoomsResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'building': BuildingToJSON(value.building),
        'rooms': value.rooms === undefined ? undefined : ((value.rooms as Array<any>).map(RoomToJSON)),
        'roomsCount': value.roomsCount,
    };
}
