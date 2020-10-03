import * as React from "react";
import CircuitTimes, { IDriver } from "../models/CircuitTimes";

export interface IDriverProps {
	driver: IDriver
	circuitTimes: CircuitTimes
}

export default class DriverPage extends React.Component<IDriverProps, {}> {

	render() {
		const driver = this.props.driver;
		return (
			<div>
				<h1>Driver Page</h1>
				<section>
					<div>name: {driver.name}</div>
					<div>age: {driver.age}</div>
					<div>picture: {driver.picture}</div>
					<div>team: {driver.team}</div>
				</section>
			</div>
		);
	}
}