import * as React from "react";
import ClassificationPage from "./ClassificationPage";
import DriverPage from "./DriverPage";
import { Route, Switch, useParams, HashRouter } from "react-router-dom";
import CircuitTimes from "../models/CircuitTimes";

export interface IAppProps { }

interface IAppState {
	dataLoaded: boolean
}

export default class App extends React.Component<IAppProps, IAppState> {

	private circuitTimes: CircuitTimes;

	constructor(props: IAppProps) {
		super(props);
		this.state = {
			dataLoaded: false
		}
		this.circuitTimes = new CircuitTimes();
	}

	componentDidMount() {
		this.circuitTimes.fetchData().then(this.generateAppState);
	}

	render() {
		return (
			<HashRouter>
				<div>
					<h1>World Kart Championship :)</h1>
				</div>
				{ this.state.dataLoaded ?
					<Switch>
						<Route exact path="/">
							<ClassificationPage circuitTimes={this.circuitTimes} />
						</Route>
						<Route path="/driver/:driverId">
							<this.renderDriverPage />
						</Route>
					</Switch>
					:
					// TODO loading component
					<div>Loading...</div>}
			</HashRouter>
		);
	}

	private renderDriverPage = () => {
		let { driverId } = useParams<{ driverId: string }>();
		const driver = this.circuitTimes.getDriver(driverId)
		if (driver) {
			return <DriverPage driver={driver} circuitTimes={this.circuitTimes} />
		} else {
			// TODO empty driver page.
			return <div>Driver not found</div>
		}
	}

	private generateAppState = () => {
		this.setState({
			dataLoaded: true
		});
	}

}
