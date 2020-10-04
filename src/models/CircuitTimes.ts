import CircuitTimesService from "../api/CircuitTimesService";
import { normalizeTime } from "../Utils";

export interface IDriver {
	_id: string,
	picture: string,
	age: number,
	name: string,
	team: string,
	races: Array<{
		name: string,
		time: string
	}>
}

export interface IRace {
	name: string
	positions: IRacePosition[]
}

export interface IRacePosition {
	driverId: string
	time: string
	position: number
	score: number
}

export interface ILadderScore {
	driverId: string
	totalScore: number
}


export default class CircuitTimes {

	static SCORE_VALUES = [26, 18, 15, 12, 10, 8, 6, 4, 2, 1];
	drivers: IDriver[];
	races: IRace[];
	ladder: ILadderScore[];

	constructor() {
		this.drivers = [];
		this.races = [];
		this.ladder = [];
	}

	fetchData(): Promise<void> {
		let circuitTimesService = new CircuitTimesService();
		return circuitTimesService.requestCircuitTimes().then(this.parseData);
	}

	getDriver(driverId: string): IDriver {
		for (let i = 0; i < this.drivers.length; i++) {
			const driver = this.drivers[i];
			if (driver._id == driverId) {
				return driver;
			}
		}
	}

	protected parseData = (response: string): void => {
		try {
			var data = JSON.parse(response);
			if (data instanceof Array) {
				this.drivers = data;
				this.races = this.buildRaces(this.drivers);
				this.ladder = this.buildLadder(this.races);
			}
		} catch (error) {
			console.log(error);
		}
	}

	private buildLadder(races: IRace[]): ILadderScore[] {
		let ladder: Map<string, ILadderScore> = new Map();
		for (let i = 0; i < races.length; i++) {
			const race = races[i];
			for (let j = 0; j < race.positions.length; j++) {
				const position = race.positions[j];
				if (!ladder.has(position.driverId)) {
					ladder.set(position.driverId, {
						driverId: position.driverId,
						totalScore: 0
					});
				}
				ladder.get(position.driverId).totalScore += position.score;
			}
		}
		var list = Array.from(ladder.values());
		return list.sort((a, b) => b.totalScore - a.totalScore);
	}

	private buildRaces(results: IDriver[]): IRace[] {
		let races: IRace[] = [];
		for (let i = 0; i < results.length; i++) {
			const driver = results[i];
			for (let j = 0; j < driver.races.length; j++) {
				const race = driver.races[j];
				race.time = normalizeTime(race.time);
				// Creamos la carrera si no existe
				if (!races[j]) {
					races[j] = {
						name: race.name,
						positions: []
					}
				}
				races[j].positions.push({
					driverId: driver._id,
					time: race.time,
					position: 0,
					score: 0
				});
			}
		}
		this.scoreRaces(races);
		return races;
	}

	private scoreRaces(races: IRace[]): void {
		for (let i = 0; i < races.length; i++) {
			const race = races[i];
			var sortedRacePositions = race.positions.sort(this.sortRaceTimes);
			for (let j = 0; j < sortedRacePositions.length; j++) {
				const racePosition = sortedRacePositions[j];
				racePosition.position = j + 1;
				racePosition.score = CircuitTimes.SCORE_VALUES[j] ? CircuitTimes.SCORE_VALUES[j] : 0;
			}
			race.positions = sortedRacePositions;
		}
	}

	private sortRaceTimes(a: IRacePosition, b: IRacePosition): number {
		var valA = parseInt(a.time.replace(/\:|\./, ""));
		var valB = parseInt(b.time.replace(/\:|\./, ""));
		return valA - valB;
	}

}
