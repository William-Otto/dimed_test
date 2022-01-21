import { http } from './config';

export function getFirstPage () {
    return http.get(`/api/3/action/datastore_search?resource_id=cb96a73e-e18b-4371-95c5-2cf20e359e6c`)
}

export function getPage (link) {
    return http.get(`${link}`)
}