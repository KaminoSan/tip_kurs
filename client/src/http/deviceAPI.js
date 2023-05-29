import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device', device)
    return data
}

export const fetchDevices = async (typeId, page, limit = 5) => {
    const {data} = await $host.get('api/device', {
        params: {
            typeId, page, limit
        }
    })
    return data
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device/' + id)
    return data
}

export const createCenter = async (center) => {
    const {data} = await $authHost.post('api/center', center)
    return data
}

export const fetchCenter = async () => {
    const {data} = await $authHost.get('api/center')
    return data
}

export const addToLog = async (log) => {
    const {data} = await $authHost.post('api/log', log)
    return data
}

export const fetchLog = async (page, limit = 5) => {
    const {data} = await $authHost.get('api/log', {
        params: {
            page, limit
        }
    })
    return data
}
