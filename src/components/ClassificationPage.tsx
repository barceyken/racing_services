import * as React from "react";
import { Link } from "react-router-dom";
import CircuitTimes, { IDriver, ILadderScore, IRace, IRacePosition } from "../models/CircuitTimes";

export interface IClassificationProps {
	circuitTimes: CircuitTimes
}

export default class ClassificationPage extends React.Component<IClassificationProps, {}> {

	render() {
		var results = this.props.circuitTimes.drivers.map(result => this.renderDrivers(result));
		var races = this.props.circuitTimes.races.map(race => this.renderRaceItem(race));
		var ladder = this.renderLadder(this.props.circuitTimes.ladder);

		return (
			<div>
				<h1>Classification</h1>
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
		const driver = this.props.circuitTimes.drivers.find(driver => driver._id == item.driverId);
		const linkUrl = "/driver/" + driver._id;
		return (
			<div key={driver._id}>
				<div>{index}</div>
				<div>{item.totalScore}</div>
				<Link to={linkUrl}>{driver.name}</Link>
			</div>
		);
	}

	private renderDrivers(driver: IDriver): JSX.Element {
		return (
			<div key={driver._id}>
				{/* <div>_id: {driverResults._id}</div> */}
				<div>name: {driver.name}</div>
				<div>age: {driver.age}</div>
				<div>picture: {driver.picture}</div>
				<div>team: {driver.team}</div>
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

