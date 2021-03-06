import axios, { AxiosResponse } from 'axios'
import { request } from 'https';
import { IActivity } from '../models/activity';
import {resolve} from "url";

axios.defaults.baseURL = 'https://localhost:5001/api'

const responseBody = (response: AxiosResponse) => response.data;

const sleep  = (ms: number) => (response:AxiosResponse) => new Promise<AxiosResponse>(resolve=>setTimeout(()=>resolve(response),ms));

const requests = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.put(url).then(responseBody)
}

const Activities = {
    list: (): Promise<IActivity[]> => requests.get('/activities'),
    details: (id: string) => requests.get(`/activities/${id}`),
    create: (activity: IActivity) => requests.post('/activities', activity),
    update: (activity: IActivity) => requests.put(`activities/${activity.id}`, activity),
    delete: (id: string) => requests.del(`/activities/${id}`)
}

export default {
    Activities
}