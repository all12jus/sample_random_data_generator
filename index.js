(() => {
    const RandExp = require('randexp');
    let output = {};

    output.GenerateSample = function(input_list, input_count){
        if (!Array.isArray(input_list)){
            throw "First Argument is Not An Array.";
        }

        if (!Number.isInteger(input_count)){
            throw "Second Argument is Not An Number.";
        }

        let output_array = [];
        for (let i = 0; i < input_count; i++) {
            let item = {};
            input_list.forEach((input_item) => {
                let key = input_item.key;
                let value = input_item.type(i);
                if (typeof value === "function"){
                    throw "Type of entity can't be a function.";
                }
                item[key] = value;
            });
            output_array.push(item);
        }
        return output_array;
    };

    output.RowNumber = function (index) {
        if (!Number.isInteger(index)){
            return null;
        }
        return index;
    };

    output.RandomNumber = function (min, max) {
        if (!Number.isInteger(min)){
            throw "First Argument is Not An Number.";
        }

        if (!Number.isInteger(max)){
            throw "Second Argument is Not An Number.";
        }

        if (min >= max){
            throw "Second Argument is Greater Than First Argument.";
        }

        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    output.RandomYear = function (min, max) {
        if (!Number.isInteger(min)){
            throw "First Argument is Not An Number.";
        }

        if (!Number.isInteger(max)){
            throw "Second Argument is Not An Number.";
        }

        if (min >= max){
            throw "Second Argument is Greater Than First Argument.";
        }
        return Math.floor(Math.random() * (max - min + 1) + min)
    };

    output.RandomRegEx = function (expression) {
        if (expression === undefined || expression === null || expression instanceof RandExp !== true){
            throw "First Argument is Not An RandExp.";
        }
        console.log(expression);
        console.log(expression instanceof RandExp);
        return expression.gen();
    }

    output.RandomEmail = function () {
        const email_regex = new RandExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);
        return email_regex.gen();
    }

    output.RandomDate = function (start, end) {

        if (start === undefined || start === null || start instanceof Date !== true){
            throw "First Argument is Not An Date.";
        }

        if (end === undefined || end === null || end instanceof Date !== true){
            throw "Second Argument is Not An Date.";
        }

        if (start.getTime() >= end.getTime()){
            throw "Second Argument is Greater Than First Argument.";
        }

        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    module.exports = output;
})()