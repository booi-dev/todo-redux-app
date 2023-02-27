import { useState, useEffect } from "react";

function useLocalStorage() {

    const [data, setData] = useState([]);

    useEffect(() => () => {
        const dataList = [];
        Object.values(localStorage).forEach((d) => {
            dataList.push(JSON.parse(d));
        });
        setData(dataList);
    }, []);

    const getDataFromLS = () => data;

    const addDataToLS = (d) => {
        localStorage.setItem(`${d.id}`, JSON.stringify(d));
    };

    const deleteDataFromLS = (d) => {
        localStorage.removeItem(d.id);
    };

    const clearDataLS = () => {
        localStorage.clear();
    };

    const toggleDataCompleteLS = (d) => {
        console.log(d.id);
        localStorage.setItem(d.id, JSON.stringify({
            ...d,
            isComplete: !d.isComplete
        }));
    };

    return [getDataFromLS, addDataToLS, deleteDataFromLS, clearDataLS, toggleDataCompleteLS];
}

export default useLocalStorage;