import * as React from "react";
import CircuitTimes, { IDriver, ILadderScore, IRace, IRacePosition } from "../models/CircuitTimes";
import "../less/driver.less"

export interface IDriverProps {
	driver: IDriver
	circuitTimes: CircuitTimes
}

export default class DriverPage extends React.Component<IDriverProps, {}> {

	render() {
		const driver = this.props.driver;
		return (
			<div className="driver-page">
				<section className="driver-data">
					<img className="driver-thumbnail" src={driver.picture} />
					<div>
						<div className="driver-name">{driver.name}</div>
						<div className="driver-team">{driver.team}</div>
						<div className="driver-age">{driver.age}</div>
					</div>
				</section>
				<section className="driver-classifications">
					{this.renderDriverRaceTimes()}
					{this.renderGlobalClassification()}
					{this.renderRaces()}
				</section>
			</div>
		);
	}

	private renderDriverRaceTimes = () => {
		const times = this.props.circuitTimes.races.map((race) => this.driverRaceTime(race))
		return (
			<div className="race-times">
				<h2>Race Times</h2>
				<table>
					<thead className="race-times-item" key="headers">
						<tr>
							<th className="race-name">RACE</th>
							<th className="driver-position">POS</th>
							<th className="driver-time">TIME</th>
						</tr>
					</thead>
					<tbody>
						{times}
					</tbody>
				</table>
			</div>
		);
	}

	private driverRaceTime = (race: IRace) => {
		const position = race.positions.find(position => position.driverId == this.props.driver._id);

		return (
			<tr className="race-times-item" key={race.name}>
				<td className="race-name">{race.name}</td>
				<td className="driver-position">{position.position}</td>
				<td className="driver-time">{position.time}</td>
			</tr>
		);
	}

	private renderGlobalClassification = () => {
		var items = this.props.circuitTimes.ladder.map((ladderItem, index) => this.renderDriverClassification(index, ladderItem))
		return (
			<div className="ladder-positions">
				<h2>Ladder Positions</h2>
				<table>
					<thead className="ladder-position" key="headers">
						<tr>
							<th className="position">POS</th>
							<th className="driver-name">DRIVER</th>
							<th className="driver-name">PTS</th>
						</tr>
					</thead>
					<tbody>
						{items}
					</tbody>
				</table>
			</div>
		);
	}

	private renderDriverClassification = (position: number, ladderScore: ILadderScore) => {
		const driver = this.props.circuitTimes.getDriver(ladderScore.driverId);
		const currentDriverStyle = this.props.driver._id == driver._id ? "highlight" : "";
		return (
			<tr className={"ladder-position " + currentDriverStyle} key={ladderScore.driverId}>
				<td className="position">{position + 1}</td>
				<td className="driver-name">{driver.name}</td>
				<td className="driver-name">{ladderScore.totalScore}</td>
			</tr>
		);
	}

	private renderRaces = () => {
		return this.props.circuitTimes.races.map((race) => this.renderRace(race))
	}

	private renderRace = (race: IRace) => {
		const positions = race.positions.map((position) => this.renderRaceResult(position))
		return (
			<div className="ladder-positions">
				<h2>{race.name}</h2>
				<table>
					<thead>
						<tr>
							<th className="position">POS</th>
							<th className="driver-name">DRIVER</th>
							<th className="driver-team">TEAM</th>
							<th className="driver-time">TIME</th>
							<th className="driver-time">PTS</th>
						</tr>
					</thead>
					<tbody>
						{positions}
					</tbody>
				</table>
			</div>
		);
	}

	private renderRaceResult = (position: IRacePosition) => {
		const driver = this.props.circuitTimes.getDriver(position.driverId);
		const currentDriverStyle = this.props.driver._id == driver._id ? "highlight" : "";
		return (
			<tr className={"race-times-item " + currentDriverStyle} key={position.driverId}>
				<td className="position">{position.position}</td>
				<td className="driver-name">{driver.name}</td>
				<td className="driver-team">{driver.team}</td>
				<td className="driver-time">{position.time}</td>
				<td className="driver-time">{position.score}</td>
			</tr>
		);
	}
}
