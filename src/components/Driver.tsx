import * as React from "react";
import { useParams } from "react-router-dom";
import { IDriverResults, ILadderScore, IRace, IRacePosition } from "./App";

export interface IDriverProps {
	driver: IDriverResults
	races: IRace[]
	ladder: ILadderScore[]
}

export default class DriverPage extends React.Component<IDriverProps, {}> {

	render() {
		// TODO React Hooks es incompatible con las clases, cambiar a funciones?
		// let { driverId } = useParams<IDriverUrlParams>();
		// const driver = this.getDriver(driverId);
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