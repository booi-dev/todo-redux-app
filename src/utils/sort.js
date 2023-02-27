const sortArray = ([...array]) => array.sort((a, b) => (a.dateOfCreation < b.dateOfCreation) ? 1 : -1);

export default sortArray;