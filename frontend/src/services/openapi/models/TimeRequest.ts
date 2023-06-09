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
 * @interface TimeRequest
 */
export interface TimeRequest {
    /**
     * 
     * @type {Date}
     * @memberof TimeRequest
     */
    date?: Date;
}

/**
 * Check if a given object implements the TimeRequest interface.
 */
export function instanceOfTimeRequest(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function TimeRequestFromJSON(json: any): TimeRequest {
    return TimeRequestFromJSONTyped(json, false);
}

export function TimeRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): TimeRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'date': !exists(json, 'date') ? undefined : (new Date(json['date'])),
    };
}

export function TimeRequestToJSON(value?: TimeRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'date': value.date === undefined ? undefined : (value.date.toISOString().substr(0,10)),
    };
}

