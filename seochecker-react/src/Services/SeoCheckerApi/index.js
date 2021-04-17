const API_BASE_ADDRESS = 'https://localhost:5001';

export default class SeoCheckerApi {
	static check(keyword, url) {
		const uri = `${API_BASE_ADDRESS}/SeoCheck?keyword=${keyword}&url=${url}`
		return fetch(uri, {
			method: 'GET',
		});
	}
}
