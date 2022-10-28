class Arr {
    addElementToArrayFromDataByKey(data, arr, key) {
        data.forEach((el) => {
            if (!arr.includes(el[key]) && el[key] != false) {
                arr.push(el[key])
            }
        })
    }
}

export const newArr = new Arr()