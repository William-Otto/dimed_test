import { http } from './config';

export function getLinesBuses() {
    return http.get(`/api/3/action/datastore_search?resource_id=c8cf58cf-649c-49b1-af78-d0e0beeb6332`)
}

export function getLinesAllotments() {
    return http.get(`/api/3/action/datastore_search?resource_id=cb96a73e-e18b-4371-95c5-2cf20e359e6c`)
}

export function getPage(link) {
    return http.get(`${link}`)
}