const limitationStr = (str, num) => {
	if (str.length <= num) return str;

	return `${str.substr(0, num)}...`;
}

export default limitationStr;