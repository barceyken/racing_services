import * as React from "react";
import { Link } from "react-router-dom";
import CircuitTimes, { ILadderScore } from "../models/CircuitTimes";
import "../less/classification.less"
import App from "./App";

export interface IClassificationProps {
	circuitTimes: CircuitTimes
}

export default class ClassificationPage extends React.Component<IClassificationProps, {}> {

	render() {
		var items = this.props.circuitTimes.ladder.map((ladderItem, index) => this.ClassificationItem(index, ladderItem))

		return (
			<div className="classification-page">
				<h1>Global Classification</h1>
				<ul>
					{items}
				</ul>
				<br />
			</div>
		);
	}

	private ClassificationItem = (index: number, item: ILadderScore) => {
		const driver = this.props.circuitTimes.drivers.find(driver => driver._id == item.driverId);
		const driverLink = App.routeDriverLink(driver._id);
		return (
			<li className="classification-item" key={driver._id}>
				<div className="position">{index + 1}</div>
				<div className="score">{item.totalScore}</div>
				<Link className="driver-data" to={driverLink}>
					<img className="driver-thumbnail" src={driver.picture} />
					<div className="driver-info">
						<div className="driver-name">{driver.name}</div>
						<div className="driver-team">{driver.team}</div>
					</div>
				</Link>
			</li>
		);
	}

}
