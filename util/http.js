import axios from "axios";

const BACKEND_URL = 'https://flutterapp-419b8-default-rtdb.asia-southeast1.firebasedatabase.app'

export async function storeExpense(expenseData) {
    const response = axios.post(BACKEND_URL + '/expenses.json', expenseData);
    const id = response.date.name
    return id;
}

export async function fetchExpenses() {
    const response = await axios.get(BACKEND_URL + '/expenses.json',);
    const expenses = [];
    console.log('fetchExpenses ' + response.data)
    for (const key in response.data) {
        console.log('amount ' + response.data[key].amount)
        console.log('date ' + new Date(response.data[key].date))
        console.log('description ' + response.data[key].description)
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        };
        expenses.push(expenseObj);
    }
    return expenses;
}

export function updateExpense(id, expenseData) {
    return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
    return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}