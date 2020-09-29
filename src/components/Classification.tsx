import * as React from "react";
import { IDriverResults } from "./App";

export interface IClassificationProps {
	results: IDriverResults[]
}

export default class Classification extends React.Component<IClassificationProps, {}> {
	constructor(props: IClassificationProps) {
		super(props);
	}

	render() {
		var items = this.props.results.map(this.renderResultItem);
		return (
			<div>
				{items}
			</div>
		);
	}

	private renderResultItem(driverResults: IDriverResults): JSX.Element {
		return (
			<div key={driverResults._id}>
				<div>_id: {driverResults._id}</div>
				<div>age: {driverResults.age}</div>
				<div>name: {driverResults.name}</div>
				<div>picture: {driverResults.picture}</div>
				<div>team: {driverResults.team}</div>
				<div>{driverResults.races.map(race => (<div key={race.name}>{race.name} - {race.time}</div>))}</div>
				<br />
			</div>
		);
	}

}

