import axios from 'axios';

const getAll = () => {
    return axios.get('http://localhost:3001/persons')
}

const newRecord = (record) => {
    return axios.post('http://localhost:3001/persons', record)
}

const deleteRecord = (id) => {
    return axios.delete(`http://localhost:3001/persons/${id}`)
}

export default { getAll, newRecord, deleteRecord }