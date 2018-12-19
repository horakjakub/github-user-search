function getLabeledArray(arr) {
    return arr ? arr.map((item) => ({ label: item })) : [];
}

export default getLabeledArray;
