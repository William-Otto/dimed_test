import axios from 'axios'

export const http = axios.create({
    baseURL: 'https://dadosabertos.poa.br'
})