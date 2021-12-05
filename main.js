(() => {
    let output = {};

    output.GenerateSample = function(input_list, input_count){
        if (!Array.isArray(input_list)){
            return null;
        }

        if (!Number.isInteger(input_count)){
            return null;
        }

        let output_array = [];
        for (let i = 0; i < input_count; i++) {
            let item = {};
            input_list.forEach((input_item) => {
                let key = input_item.key;
                let value = input_item.type(i);
                item[key] = value;
            });
            output_array.push(item);
        }
        return output_array;
    };

    module.exports = output;
})()