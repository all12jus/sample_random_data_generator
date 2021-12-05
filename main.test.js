const { GenerateSample } = require("./main");

test('function exists', () => {
    expect(GenerateSample).not.toBeUndefined();
});

test('if first argument is not a array error', () => {
    let sample = GenerateSample();
    expect(sample).toBeNull();
});

test('if second argument is not a number error', () => {
    let sample = GenerateSample([]);
    expect(sample).toBeNull();
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