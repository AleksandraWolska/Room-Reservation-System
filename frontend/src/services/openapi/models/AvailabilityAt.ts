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
 * @interface AvailabilityAt
 */
export interface AvailabilityAt {
    /**
     * 
     * @type {Date}
     * @memberof AvailabilityAt
     */
    timeId?: Date;
    /**
     * 
     * @type {boolean}
     * @memberof AvailabilityAt
     */
    isFree?: boolean;
}

/**
 * Check if a given object implements the AvailabilityAt interface.
 */
export function instanceOfAvailabilityAt(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AvailabilityAtFromJSON(json: any): AvailabilityAt {
    return AvailabilityAtFromJSONTyped(json, false);
}

export function AvailabilityAtFromJSONTyped(json: any, ignoreDiscriminator: boolean): AvailabilityAt {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'timeId': !exists(json, 'timeId') ? undefined : (new Date(json['timeId'])),
        'isFree': !exists(json, 'isFree') ? undefined : json['isFree'],
    };
}

export function AvailabilityAtToJSON(value?: AvailabilityAt | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'timeId': value.timeId === undefined ? undefined : (value.timeId.toISOString()),
        'isFree': value.isFree,
    };
}

