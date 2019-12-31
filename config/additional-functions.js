const isNull = (obj) => {
    if (
        obj === undefined || obj === "undefined"
        || obj === null || obj === "null"
    ) return true;
    else return false;
}

const isAnyNull = (...objs) => {
    console.log(objs);
    let returnedValue = false;

    for (let index = 0; index < objs.length; index++) {
        const element = objs[index];
        if (isNull(element)){
            returnedValue = true;
            break;
        }
    }

    return returnedValue;
}

module.exports = {
    isNull, isAnyNull
}