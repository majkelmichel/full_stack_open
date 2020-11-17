import axios from 'axios';
const baseUrl = `http://localhost:3001/persons`

const getAll = () => {
    return axios.get(baseUrl)
}

const newRecord = (record) => {
    return axios.post(baseUrl, record)
}

const deleteRecord = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const getOne = (id) => {
    return axios.get(`${baseUrl}/${id}`)
}

const replaceNumber = (person) => {
    return axios.put(`${baseUrl}/${person.id}`, person)
}

export default { getAll, newRecord, deleteRecord, replaceNumber, getOne }