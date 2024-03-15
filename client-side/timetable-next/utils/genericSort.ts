export default function genericSort<T>(key: keyof T, isAsc: boolean, inputA: T, inputB: T): 1 | -1 {
    const aArg = inputA[key];
    const bArg = inputB[key];

    if (typeof aArg === "string" && typeof bArg === "string") {
        const aInt = Number.parseInt(aArg);
        const bInt = Number.parseInt(bArg);
        if (Number.isInteger(aInt) && Number.isInteger(bInt)) {
            const res = aInt > bInt ? 1 : -1;
            return isAsc ? res : ((res * -1) as 1 | -1);
        }

        const aStr = aArg.toString().toUpperCase();
        const bStr = bArg.toString().toUpperCase();

        const res = aStr > bStr ? 1 : -1;
        return isAsc ? res : ((res * -1) as 1 | -1);
    } else {
        const res = aArg > bArg ? 1 : -1;
        return isAsc ? res : ((res * -1) as 1 | -1);
    }
}
