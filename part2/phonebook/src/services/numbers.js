import axios from 'axios';

const getAll = () => {
    return axios.get('http://localhost:3001/persons')
}

const newRecord = (record) => {
    return axios.post('http://localhost:3001/persons', record)
}

export default { getAll, newRecord }