const { GenerateSample, RowNumber, RandomNumber, RandomYear } = require("./main");

describe("GenerateSample", function () {
    test('function exists', () => {
        expect(GenerateSample).not.toBeUndefined();
    });

    test('if first argument is not a array error', () => {
        expect(() => {
            let sample = GenerateSample();
        }).toThrow();
        expect(() => {
            let sample = GenerateSample();
        }).toThrowError(/^First Argument is Not An Array.$/);
    });

    test('if second argument is not a number error', () => {
        expect(() => {
            let sample = GenerateSample([]);
        }).toThrow();
        expect(() => {
            let sample = GenerateSample([]);
        }).toThrowError(/^Second Argument is Not An Number.$/);
    });

    test('([], 10) => [].length=10 ', () => {
        let sample = GenerateSample([], 10);
        expect(sample.length).toBe(10);
        expect(Object.keys(sample[0]).length).toBe(0);
    });

    test('([{id}], 10) => [{id}].length=10 ', () => {
        let sample = GenerateSample([{ key: "id", type: (index) => { return index; }}], 10);
        expect(sample.length).toBe(10);
        expect(sample[0]).not.toBeNull();
        expect(Object.keys(sample[0]).length).toBe(1);
        expect(sample[0].id).not.toBeNull();
        expect(sample[0].id).toBe(0);
        for (let i = 0; i < 10; i++) {
            expect(sample[i].id).toBe(i);
        }
    });

    test('([{digit}], 10) => [{digit}].length=10 ', () => {
        let sample = GenerateSample([{ key: "digit", type: (index) => { return Math.floor(Math.random() * 10); }}], 10);
        expect(sample.length).toBe(10);
        expect(sample[0]).not.toBeNull();
        expect(Object.keys(sample[0]).length).toBe(1);
        expect(sample[0].digit).not.toBeNull();
        expect(sample[0].digit).toEqual(expect.any(Number));
    });
});

describe("RowNumber", function () {
    test('RowNumber is a function', () => {
        expect(RowNumber).not.toBeUndefined();
        expect(RowNumber).not.toBeNull();
        expect(RowNumber).toEqual(expect.any(Function));
    });

    test('RowNumber is a function (value:!Number) => null', () => {
        let result = RowNumber('c');
        expect(result).not.toBeUndefined();
        expect(result).toBeNull();
    });

    test('RowNumber is a function (value:Number) => value', () => {
        let result = RowNumber(100);

        expect(result).not.toBeUndefined();
        expect(result).not.toBeNull();
        expect(result).toEqual(expect.any(Number));
        expect(result).toEqual(100);
    });

    test('([{id:RowNumber}], 10) throws "Type of entity can\'t be a function."', () => {
        expect(() => {
            let sample = GenerateSample([
                { key: "id", type: (index) => RowNumber }
            ], 10);
        }).toThrow();
        expect(() => {
            let sample = GenerateSample([
                { key: "id", type: (index) => RowNumber }
            ], 10);
        }).toThrowError(/^Type of entity can't be a function.$/);
    });

    test('([{digit:fn], 10) [fn has been called 10 times] ', () => {
        let fun = jest.fn();
        let sample = GenerateSample([
            {
                key: "digit",
                type: (index) => { fun(); return index; }
            }
        ], 10);
        expect(fun).toHaveBeenCalledTimes(10);
    });

    test('([{id:RowNumber()}], 10) => [{id:Number}].length=10', () => {
        let sample = GenerateSample([
            { key: "id", type: (index) => RowNumber(index) }
        ], 10);
        expect(sample.length).toBe(10);
        expect(sample[0]).not.toBeNull();
        expect(Object.keys(sample[0]).length).toBe(1);
        expect(sample[0].id).not.toBeNull();
        expect(sample[0].id).toBe(0);
        for (let i = 0; i < 10; i++) {
            expect(sample[i].id).toBe(i);
        }
    });
});

describe('RandomNumber', function () {
    test('RandomNumber is a function', () => {
        expect(RandomNumber).not.toBeUndefined();
        expect(RandomNumber).not.toBeNull();
        expect(RandomNumber).toEqual(expect.any(Function));
    });

    test('RandomNumber is a function (min:!Number, _) throws', () => {
        expect(() => {
            let result = RandomNumber('c', 1);
        }).toThrowError(/^First Argument is Not An Number.$/);
    });

    test('RandomNumber is a function (min:Number, max: !Number) throws', () => {
        expect(() => {
            let result = RandomNumber(1, 'c');
        }).toThrowError(/^Second Argument is Not An Number.$/);
    });

    test('RandomNumber is a function (min:Number, max: Number) min > max throws', () => {
        expect(() => {
            let result = RandomNumber(10, 5);
        }).toThrowError(/^Second Argument is Greater Than First Argument.$/);
    });

    test('RandomNumber is a function (min:Number, max: Number) min = max throws', () => {
        expect(() => {
            let result = RandomNumber(5, 5);
        }).toThrowError(/^Second Argument is Greater Than First Argument.$/);
    });

    test('RandomNumber is a function (min:Number, max: Number) => value:Number between (inclusive)min and max', () => {
        let result = RandomNumber(0, 10);

        expect(result).not.toBeUndefined();
        expect(result).not.toBeNull();
        expect(result).toEqual(expect.any(Number));
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThan(10);
    });

    test('([{digit:RandomNumber(0,20}], 10) => [{digit:Number}].length=10 ', () => {
        let sample = GenerateSample([
            {
                key: "digit",
                type: (index) => RandomNumber(0, 20)
            }
        ], 10);
        expect(sample.length).toBe(10);
        expect(sample[0]).not.toBeNull();
        expect(Object.keys(sample[0]).length).toBe(1);
        expect(sample[0].digit).not.toBeNull();
        expect(sample[0].digit).toEqual(expect.any(Number));
    });
});

describe('RandomYear', function () {
    test('RandomYear is a function', () => {
        expect(RandomYear).not.toBeUndefined();
        expect(RandomYear).not.toBeNull();
        expect(RandomYear).toEqual(expect.any(Function));
    });

    test('RandomYear is a function (start:!Number, _) throws', () => {
        expect(() => {
            let result = RandomYear('c', 1);
        }).toThrowError(/^First Argument is Not An Number.$/);
    });

    test('RandomYear is a function (start:Number, end: !Number) throws', () => {
        expect(() => {
            let result = RandomYear(1, 'c');
        }).toThrowError(/^Second Argument is Not An Number.$/);
    });

    test('RandomYear is a function (start:Number, end: Number) start > end throws', () => {
        expect(() => {
            let result = RandomYear(2010, 2000);
        }).toThrowError(/^Second Argument is Greater Than First Argument.$/);
    });

    test('RandomYear is a function (start:Number, end: Number) start = end throws', () => {
        expect(() => {
            let result = RandomYear(2000, 2000);
        }).toThrowError(/^Second Argument is Greater Than First Argument.$/);
    });

    test('RandomYear is a function (start:Number, end: Number) => value:Number between (inclusive)start and end', () => {
        let result = RandomYear(2000, 2020);

        expect(result).not.toBeUndefined();
        expect(result).not.toBeNull();
        expect(result).toEqual(expect.any(Number));
        expect(result).toBeGreaterThanOrEqual(2000);
        expect(result).toBeLessThan(2020);
    });

    test('([{year:RandomYear(2000,2020}], 10) => [{year:Number}].length=10 ', () => {
        let sample = GenerateSample([
            {
                key: "year",
                type: (index) => RandomYear(2000, 2020)
            }
        ], 10);
        expect(sample.length).toBe(10);
        expect(sample[0]).not.toBeNull();
        expect(Object.keys(sample[0]).length).toBe(1);
        expect(sample[0].year).not.toBeNull();
        expect(sample[0].year).toEqual(expect.any(Number));
    });
});