import axios from 'axios';
const baseUrl = '/api/code';

const validate = async (join_code) => {
    const response = await axios.get(`${baseUrl}/validate/${join_code}`);
    const valid = response.data.valid;
    return valid;
}

const create = async () => {
    const response = await axios.post(baseUrl);
    return response.data;
}

export default{ create, validate };