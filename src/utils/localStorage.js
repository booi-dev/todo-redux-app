
const getDataFromLS = () => {
    console.log('get from LS');
    // const dataList = [];
    // Object.values(localStorage).forEach((d) => {
    //     dataList.push(JSON.parse(d));
    // });
    // return dataList;
    return Object.values(localStorage);
};

const addDataToLS = (d) => {
    console.log('add to LS', d);
    localStorage.setItem(`${d.id}`, JSON.stringify(d));
};

const deleteDataFromLS = (d) => {
    console.log('delete from LS', d.id);
    localStorage.removeItem(d.id);
};

const toggleDataCompleteLS = (d) => {
    console.log('toggle LS', d.task);
    localStorage.setItem(d.id, JSON.stringify({
        ...d,
        isComplete: !d.isComplete
    }));
};

const updateDataLS = (d) => {
    console.log('update LS', d);
    localStorage.setItem(d.id, JSON.stringify(d));
};

const clearDataLS = () => {
    console.log('clear LS');
    localStorage.clear();
};

export {
    getDataFromLS,
    addDataToLS,
    deleteDataFromLS,
    toggleDataCompleteLS,
    updateDataLS,
    clearDataLS
};
