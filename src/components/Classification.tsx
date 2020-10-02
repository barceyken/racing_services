import * as React from "react";
import { IDriverResults, ILadderScore, IRace, IRacePosition } from "./App";

export interface IClassificationProps {
	drivers: IDriverResults[]
	races: IRace[]
	ladder: ILadderScore[]
}

export default class Classification extends React.Component<IClassificationProps, {}> {
	constructor(props: IClassificationProps) {
		super(props);
	}

	render() {
		var results = this.props.drivers.map(result => this.renderDrivers(result));
		var races = this.props.races.map(race => this.renderRaceItem(race));
		var ladder = this.renderLadder(this.props.ladder);

		return (
			<div>
				{ladder}
				<br />
				{results}
				<br />
				{races}
			</div>
		);
	}

	private renderLadder(ladder: ILadderScore[]): JSX.Element {
		return (
			<div>
				{ladder.map((ladderItem, index) => this.LadderItem(index, ladderItem))}
			</div>
		);
	}

	private LadderItem = (index: number, item: ILadderScore) => {
		let driver = this.props.drivers.find(driver => driver._id == item.driverId);
		return (
			<div>
				<div>{index}</div>
				<div>{item.totalScore}</div>
				<div>{driver.name}</div>
			</div>
		);
	}

	private renderDrivers(drivers: IDriverResults): JSX.Element {
		return (
			<div key={drivers._id}>
				{/* <div>_id: {driverResults._id}</div> */}
				<div>name: {drivers.name}</div>
				<div>age: {drivers.age}</div>
				<div>picture: {drivers.picture}</div>
				<div>team: {drivers.team}</div>
				{/* <div>{driverResults.races.map(race => (<div key={race.name}>{race.name} - {race.time}</div>))}</div> */}
				<br />
			</div>
		);
	}

	private renderRaceItem(race: IRace): JSX.Element {
		var positions = race.positions.map(position => this.renderRacePosition(position));
		return (
			<div key={race.name}>
				<h1>{race.name}</h1>
				{positions}
			</div>
		);
	}

	private renderRacePosition(position: IRacePosition): JSX.Element {
		return (
			<div key={position.driverId} style={{ display: "flex" }}>
				<div>position:{position.position}</div>
				<div>score:{position.score}</div>
				<div>driverId:{position.driverId}</div>
				<div>time:{position.time}</div>
			</div>
		);
	}

}

