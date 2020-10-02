import * as React from "react";
import CircuitTimes from "../api/CircuitTimes";
import { normalizeTime } from "../Utils";
import Classification from "./Classification";

export interface IAppProps { }

export interface IDriverResults {
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

interface IAppState {
	driversResults: IDriverResults[]
	races: IRace[]
	ladder: ILadderScore[]
}

export default class App extends React.Component<IAppProps, IAppState> {

	static SCORE_VALUES = [26, 18, 15, 12, 10, 8, 6, 4, 2, 1];

	constructor(props: IAppProps) {
		super(props);
		this.state = {
			driversResults: [],
			races: [],
			ladder: []
		}
	}

	componentDidMount() {
		let circuitTimes = new CircuitTimes();
		circuitTimes.requestCircuitTimes().then(this.processData);
	}

	render() {
		return (
			<div>
				<h1>World Kart Championship :)</h1>
				<Classification drivers={this.state.driversResults} races={this.state.races} ladder={this.state.ladder} />
			</div>
		);
	}

	private processData = (result: string) => {
		const results: IDriverResults[] = JSON.parse(result);
		const races = this.buildRaces(results);
		const ladder = this.buildLadder(races);

		this.setState({
			driversResults: results,
			races,
			ladder
		});
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

	private buildRaces(results: IDriverResults[]) {
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

	private scoreRaces(races: IRace[]) {
		for (let i = 0; i < races.length; i++) {
			const race = races[i];
			var sortedRacePositions = race.positions.sort(this.sortRaceTimes);
			for (let j = 0; j < sortedRacePositions.length; j++) {
				const racePosition = sortedRacePositions[j];
				racePosition.position = j + 1;
				racePosition.score = App.SCORE_VALUES[j] ? App.SCORE_VALUES[j] : 0;
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
