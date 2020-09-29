import * as React from "react";
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

interface IAppState {
	driversResults: IDriverResults[]
}

export default class App extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);
		this.state = {
			driversResults: []
		}
	}

	componentDidMount() {
		this.fetchData();
	}

	render() {
		return (
			<div>
				<h1>World Kart Championship :)</h1>
				<Classification results={this.state.driversResults} />
			</div>
		);
	}

	private processData(result: string) {
		const results: IDriverResults[] = JSON.parse(result);

		for (let i = 0; i < results.length; i++) {
			const driver = results[i];
			for (let j = 0; j < driver.races.length; j++) {
				const race = driver.races[j];
				race.time = normalizeTime(race.time);
			}
		}

		this.setState({
			driversResults: results
		});
	}

	private fetchData() {
		// De momento los datos se obtienen de un fichero
		this.loadJSON('data.json', (result: string) => {
			this.processData(result)
		});
	}

	private loadJSON(filePath: string, callback: Function) {
		var request = new XMLHttpRequest();
		// request.overrideMimeType("application/json");
		request.open('GET', filePath, true);
		request.onreadystatechange = function () {
			if (request.readyState == 4 && request.status == 200) {
				callback(request.responseText);
			}
		};
		request.send(null);
	}

}
