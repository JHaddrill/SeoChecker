const API_BASE_ADDRESS = 'https://localhost:5001';

export default class SeoCheckerApi {
	static check(keyword, url, engine) {
		const uri = `${API_BASE_ADDRESS}/SeoCheck?keyword=${keyword}&url=${url}&SearchEngine=${engine}`
		return fetch(uri, {
			method: 'GET',
		});
	}
}
