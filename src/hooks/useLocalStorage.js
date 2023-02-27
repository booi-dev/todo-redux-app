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
        localStorage.remove(d.id);
    };

    return [getDataFromLS, addDataToLS, deleteDataFromLS];

}

export default useLocalStorage;