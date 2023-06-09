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
/**
 * 
 * @export
 * @interface RoomTO
 */
export interface RoomTO {
    /**
     * 
     * @type {number}
     * @memberof RoomTO
     */
    number?: number;
    /**
     * 
     * @type {number}
     * @memberof RoomTO
     */
    floor?: number;
    /**
     * 
     * @type {number}
     * @memberof RoomTO
     */
    buildingId?: number;
    /**
     * 
     * @type {number}
     * @memberof RoomTO
     */
    places?: number;
    /**
     * 
     * @type {string}
     * @memberof RoomTO
     */
    roomType?: RoomTORoomTypeEnum;
    /**
     * 
     * @type {boolean}
     * @memberof RoomTO
     */
    projector?: boolean;
}


/**
 * @export
 */
export const RoomTORoomTypeEnum = {
    LectureRoom: 'LECTURE_ROOM',
    Workshop: 'WORKSHOP',
    ComputersRoom: 'COMPUTERS_ROOM',
    ChemistryLaboratory: 'CHEMISTRY_LABORATORY',
    Office: 'OFFICE'
} as const;
export type RoomTORoomTypeEnum = typeof RoomTORoomTypeEnum[keyof typeof RoomTORoomTypeEnum];


/**
 * Check if a given object implements the RoomTO interface.
 */
export function instanceOfRoomTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function RoomTOFromJSON(json: any): RoomTO {
    return RoomTOFromJSONTyped(json, false);
}

export function RoomTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): RoomTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'number': !exists(json, 'number') ? undefined : json['number'],
        'floor': !exists(json, 'floor') ? undefined : json['floor'],
        'buildingId': !exists(json, 'buildingId') ? undefined : json['buildingId'],
        'places': !exists(json, 'places') ? undefined : json['places'],
        'roomType': !exists(json, 'roomType') ? undefined : json['roomType'],
        'projector': !exists(json, 'projector') ? undefined : json['projector'],
    };
}

export function RoomTOToJSON(value?: RoomTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'number': value.number,
        'floor': value.floor,
        'buildingId': value.buildingId,
        'places': value.places,
        'roomType': value.roomType,
        'projector': value.projector,
    };
}

