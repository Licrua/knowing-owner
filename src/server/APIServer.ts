import axios from 'axios';
import { CreateRowData, ToServerData } from '../dataStructure';

const apiUrl = ' http://185.244.172.108:8081/v1/outlay-rows/entity/';
const eID = 126551;


/* export const createEntity = async () => {
    try {
        const response = await axios.post(apiUrl+'create');
        eID = response.data.eID; // Возвращаем полученный eID
        console.log('eID', eID)
    } catch (error) {
        console.error('Error creating entity:', error);
        throw error;
    }
}; */

// Функция для получения списка строк по eID
export const fetchRowList = async () => {
    try {
        const response = await axios.get(apiUrl+`${eID}/row/list`);
        return response.data; // Возвращаем полученные данные
    } catch (error) {
        console.error('Error fetching row list:', error);
        throw error;
    }
};

// Функция для создания строки по eID
export const createRow = async ( data: CreateRowData) => {
    try {
        const response = await axios.post(apiUrl+`${eID}/row/create`, data);
        return response.data; // Возвращаем данные созданной строки
    } catch (error) {
        console.error('Error creating row:', error);
        throw error;
    }
};

export const updateRow = async (data: ToServerData, rID: number) =>{
    try {
        const response = await axios.post(apiUrl+`${eID}/row/${rID}/update`, data);
        return response.data; // Возвращаем данные созданной строки
    } catch (error) {
        console.error('Error updating row:', error);
        throw error;
    }
};

export const deleteRow = async ( rID: number) => {
    try {
        const response = await axios.delete(apiUrl+`${eID}/row/${rID}/delete`);
        return response.data; // Возвращаем данные созданной строки
    } catch (error) {
        console.error('Error delete row:', error);
        throw error;
    }
}