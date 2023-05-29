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


import * as runtime from '../runtime';
import type {
  Building,
  BuildingWithRoomsResponse,
} from '../models';
import {
    BuildingFromJSON,
    BuildingToJSON,
    BuildingWithRoomsResponseFromJSON,
    BuildingWithRoomsResponseToJSON,
} from '../models';

export interface Create2Request {
    building: Building;
}

export interface Delete2Request {
    id: number;
}

export interface DeleteByNameRequest {
    name: string;
}

export interface One3Request {
    id: number;
}

export interface OneByNameRequest {
    name: string;
}

export interface OneWithRoomsRequest {
    id: number;
}

/**
 * 
 */
export class BuildingControllerApi extends runtime.BaseAPI {

    /**
     */
    async all2Raw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Building>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/reservation/buildings/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(BuildingFromJSON));
    }

    /**
     */
    async all2(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Building>> {
        const response = await this.all2Raw(initOverrides);
        return await response.value();
    }

    /**
     */
    async allWithRoomsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<BuildingWithRoomsResponse>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/reservation/buildings/rooms`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(BuildingWithRoomsResponseFromJSON));
    }

    /**
     */
    async allWithRooms(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<BuildingWithRoomsResponse>> {
        const response = await this.allWithRoomsRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async create2Raw(requestParameters: Create2Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Building>> {
        if (requestParameters.building === null || requestParameters.building === undefined) {
            throw new runtime.RequiredError('building','Required parameter requestParameters.building was null or undefined when calling create2.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/reservation/buildings/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: BuildingToJSON(requestParameters.building),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BuildingFromJSON(jsonValue));
    }

    /**
     */
    async create2(requestParameters: Create2Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Building> {
        const response = await this.create2Raw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async delete2Raw(requestParameters: Delete2Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Building>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling delete2.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/reservation/buildings/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BuildingFromJSON(jsonValue));
    }

    /**
     */
    async delete2(requestParameters: Delete2Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Building> {
        const response = await this.delete2Raw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async deleteByNameRaw(requestParameters: DeleteByNameRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Building>> {
        if (requestParameters.name === null || requestParameters.name === undefined) {
            throw new runtime.RequiredError('name','Required parameter requestParameters.name was null or undefined when calling deleteByName.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/reservation/buildings/name/{name}`.replace(`{${"name"}}`, encodeURIComponent(String(requestParameters.name))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BuildingFromJSON(jsonValue));
    }

    /**
     */
    async deleteByName(requestParameters: DeleteByNameRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Building> {
        const response = await this.deleteByNameRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async one3Raw(requestParameters: One3Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Building>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling one3.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/reservation/buildings/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BuildingFromJSON(jsonValue));
    }

    /**
     */
    async one3(requestParameters: One3Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Building> {
        const response = await this.one3Raw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async oneByNameRaw(requestParameters: OneByNameRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Building>> {
        if (requestParameters.name === null || requestParameters.name === undefined) {
            throw new runtime.RequiredError('name','Required parameter requestParameters.name was null or undefined when calling oneByName.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/reservation/buildings/name/{name}`.replace(`{${"name"}}`, encodeURIComponent(String(requestParameters.name))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BuildingFromJSON(jsonValue));
    }

    /**
     */
    async oneByName(requestParameters: OneByNameRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Building> {
        const response = await this.oneByNameRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async oneWithRoomsRaw(requestParameters: OneWithRoomsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BuildingWithRoomsResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling oneWithRooms.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/reservation/buildings/rooms/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BuildingWithRoomsResponseFromJSON(jsonValue));
    }

    /**
     */
    async oneWithRooms(requestParameters: OneWithRoomsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BuildingWithRoomsResponse> {
        const response = await this.oneWithRoomsRaw(requestParameters, initOverrides);
        return await response.value();
    }

}