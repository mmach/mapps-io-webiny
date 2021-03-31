/* eslint-disable @typescript-eslint/no-unused-vars */
const DateDiff = {
    inDays: function (d1, d2) {
        const t2 = d2.getTime();
        const t1 = d1.getTime();
        return parseInt((t2 - t1) / (24 * 3600 * 1000));
    },

    inWeeks: function (d1, d2) {
        const t2 = d2.getTime();
        const t1 = d1.getTime();

        return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
    },

    inMonths: function (d1, d2) {
        const d1Y = d1.getFullYear();
        const d2Y = d2.getFullYear();
        const d1M = d1.getMonth();
        const d2M = d2.getMonth();

        return d2M + 12 * d2Y - (d1M + 12 * d1Y);
    },

    inYears: function (d1, d2) {
        return d2.getFullYear() - d1.getFullYear();
    }
};

const stack = [];
const operation = {
    sum: (b, a, type) => {
        let res = 0;
        switch (type) {
            case "string":
                res = a + b;
                break;

            default:
                res = Number(a) + Number(b);
        }

        return res;
    },
    diff: (b, a, type) => {
        let res = 0;
        switch (type) {
            case "day":
                res = DateDiff.inDays(new Date(b), new Date(a));
                break;
            default:
                res = Number(a) - Number(b);
        }
        return res;
    },
    mul: (b, a, type) => {
        return Number(a) * Number(b);
    },
    per: (b, a, type) => {
        return Number(a) / Number(b);
    },
    exp: (b, a, type) => {
        return Number(a) ^ Number(b);
    },
    eq: (b, a, type) => {
        return Number(a) == Number(b);
    },
    and: (b, a, type) => {
        return a && b;
    },
    or: (b, a, type) => {
        return a || b;
    },
    gte: (b, a, type) => {
        return Number(a) >= Number(b);
    },
    gt: (b, a, type) => {
        return Number(a) > Number(b);
    },
    lt: (b, a, type) => {
        return Number(a) < Number(b);
    },
    lte: (b, a, type) => {
        return Number(a) <= Number(b);
    }
};

const t = "#Warehouse_reservation_in_days_:# #8/14/2020# #8/29/2020# +:string +:string"
    .split(" ")
    .reduce((prev, item) => {
        if (item[0] == "#" && item[item.length - 1] == "#") {
            item = item.replace(/#/g, "").replace("$", "");
            stack.push(item);
            return 0;
        } else {
            let result = 0;
            const type = item.split(":").length == 2 ? item.split(":")[1] : "number";
            switch (item.split(":")[0]) {
                case "+":
                    result = operation.sum(stack.pop(), stack.pop(), type);
                    break;
                case "-":
                    result = operation.diff(stack.pop(), stack.pop(), type);
                    break;
                case "*":
                    result = operation.mul(stack.pop(), stack.pop(), type);
                    break;
                case "/":
                    result = operation.per(stack.pop(), stack.pop(), type);
                    break;
                case "^":
                    result = operation.per(stack.pop(), stack.pop(), type);
                    break;
                case "=":
                    result = operation.eq(stack.pop(), stack.pop(), type);
                    break;
                case "&":
                    result = operation.and(stack.pop(), stack.pop(), type);
                    break;
                case ">":
                    result = operation.gt(stack.pop(), stack.pop(), type);
                    break;
                case "<":
                    result = operation.lt(stack.pop(), stack.pop(), type);
                    break;
                case "<=":
                    result = operation.lte(stack.pop(), stack.pop(), type);
                    break;
                case ">=":
                    result = operation.gte(stack.pop(), stack.pop(), type);
                    break;
                case "|":
                    result = operation.or(stack.pop(), stack.pop(), type);
                    break;
                default:
                    "";
            }
            stack.push(result);
            return result;
        }
    }, stack);

