import CircuitTimes from "../models/CircuitTimes";

class CircuitTimesTest extends CircuitTimes {
	testParseData(jsonData: string) {
		this.parseData(jsonData);
	}
}

describe('CircuitTimes test suit', () => {

	test("Parse Real Data", () => {
		let times = new CircuitTimesTest();
		const jsonData = require('../../data.json');
		times.testParseData(JSON.stringify(jsonData));
		expect(times.drivers.length).toBe(22);
		expect(times.races.length).toBe(10);
		expect(times.ladder.length).toBe(22);
		expect(times.getDriver("5f3a3c5f4984bd9be6a6f655")._id).toBe("5f3a3c5f4984bd9be6a6f655");
		expect(times.getDriver("")).toBe(undefined);
		expect(times.getDriver("123")).toBe(undefined);
	});

	test("Parse Empty Response", () => {
		let times = new CircuitTimesTest();
		times.testParseData("");
		expect(times.drivers.length).toBe(0);
		expect(times.races.length).toBe(0);
		expect(times.ladder.length).toBe(0);
	});

	test("Parse Empty Object", () => {
		let times = new CircuitTimesTest();
		times.testParseData("{}");
		expect(times.drivers.length).toBe(0);
		expect(times.races.length).toBe(0);
		expect(times.ladder.length).toBe(0);
	});
});