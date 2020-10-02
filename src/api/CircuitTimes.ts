

export default class CircuitTimes {

	requestCircuitTimes() {
		// De momento los datos se obtienen de un fichero
		return this.request('data.json');
	}

	private request(url: string, method?: string, body?: Document | BodyInit | null, headers?: ObjectMap) {
		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();
			xhr.open(method || "GET", url);
			if (headers) {
				Object.keys(headers).forEach(key => {
					xhr.setRequestHeader(key, headers[key]);
				});
			}
			xhr.onload = () => {
				if (xhr.status >= 200 && xhr.status < 300) {
					resolve(xhr.response);
				} else {
					reject(xhr.statusText);
				}
			};
			xhr.onerror = () => reject(xhr.statusText);
			xhr.send(body);
		});
	};
}
