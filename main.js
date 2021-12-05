(() => {
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

        return Math.floor(Math.random() * (max - min + 1) + min)
    };

    module.exports = output;
})()