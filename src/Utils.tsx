
/**
 * Conver a time string with format H:m(m):s(s).fff into H:mm:ss.fff
 * ex: 1:2:3.45 => 1:02:03.450
 * @param time string to parse
 */
export function normalizeTime(time: string) {
	var hours = "0";
	var mins = "00";
	var secs = "00";
	var msecs = "000";
	var tokens = time.split(".");
	if (tokens.length == 2) {
		msecs = this.padZeros(3, tokens[1], true);
	}
	if (tokens.length > 0) {
		tokens = tokens[0].split(":");
		if (tokens.length === 3) {
			hours = tokens[0];
			mins = this.padZeros(2, tokens[1]);
			secs = this.padZeros(2, tokens[2]);
		}
	}
	return hours + ":" + mins + ":" + secs + "." + msecs;
}

/**
 * Fill a string with a number of '0' chars
 * @param size number of characters to fill
 * @param s the string to be filled
 * @param right if want the zeroes be added from the right
 */
export function padZeros(size: number, s: string, right?: boolean) {
	while (s.length < size) {
		s = right ? s + "0" : "0" + s;
	}
	return s;
}
