import * as Utils from "../Utils";

describe('Utils test suit', () => {
	test('normalizeTime', () => {
		expect(Utils.normalizeTime("")).toBe("0:00:00.000");
		expect(Utils.normalizeTime("1:1:1")).toBe("1:01:01.000");
		expect(Utils.normalizeTime("1:1:1.1")).toBe("1:01:01.100");
		expect(Utils.normalizeTime("12:30:4.56")).toBe("12:30:04.560");
		expect(Utils.normalizeTime("1:")).toBe("0:00:00.000");
		expect(Utils.normalizeTime("1:0:0.02")).toBe("1:00:00.020");
	});

	test('padZeros', () => {
		expect(Utils.padZeros(2, "")).toBe("00");
		expect(Utils.padZeros(2, "1")).toBe("01");
		expect(Utils.padZeros(2, "1", true)).toBe("10");
		expect(Utils.padZeros(0, "")).toBe("");
		expect(Utils.padZeros(-1, "")).toBe("");
		expect(Utils.padZeros(0, "123")).toBe("123");
		expect(Utils.padZeros(-1, "123")).toBe("123");
		expect(Utils.padZeros(5, "123")).toBe("00123");
		expect(Utils.padZeros(5, "123", true)).toBe("12300");
	});
});