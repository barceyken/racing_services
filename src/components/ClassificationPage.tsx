import * as React from "react";
import { Link } from "react-router-dom";
import CircuitTimes, { IDriver, ILadderScore, IRace, IRacePosition } from "../models/CircuitTimes";
import "../less/classification.less"

export interface IClassificationProps {
	circuitTimes: CircuitTimes
}

export default class ClassificationPage extends React.Component<IClassificationProps, {}> {

	render() {
		var items = this.props.circuitTimes.ladder.map((ladderItem, index) => this.ClassificationItem(index, ladderItem))

		return (
			<div className="classification-page">
				<h1>Classification</h1>
				<ul>
					{items}
				</ul>
				<br />
			</div>
		);
	}

	private ClassificationItem = (index: number, item: ILadderScore) => {
		const driver = this.props.circuitTimes.drivers.find(driver => driver._id == item.driverId);
		const linkUrl = "/driver/" + driver._id;
		return (
			<li className="classification-item" key={driver._id}>
				<div className="position">{index + 1}</div>
				<div className="score">{item.totalScore}</div>
				<img className="driver-thumbnail" src={driver.picture} />
				<div>
					<Link className="driver-name" to={linkUrl}>{driver.name}</Link>
					<div className="driver-team">{driver.team}</div>
				</div>
			</li>
		);
	}

}

