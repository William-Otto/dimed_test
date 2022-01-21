import { http } from './config';

export function getFirstPage () {
    return http.get(`/api/3/action/datastore_search?resource_id=c8cf58cf-649c-49b1-af78-d0e0beeb6332`)
}

export function getPage (link) {
    return http.get(`${link}`)
}