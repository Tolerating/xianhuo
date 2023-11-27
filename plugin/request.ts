const BASEURL = 'http://localhost:8080/api';
const request = (url = '', data = {}, type = 'GET', header = {}) => {
	if (uni.getStorageSync("Authorization") != "") {
		header.Authorization = uni.getStorageSync("Authorization");
	}
	return new Promise((resolve, reject) => {
		uni.request({
			method: type,
			url: BASEURL + url,
			data: data,
			header: header,
			dataType: 'json',
		}).then(response => {
			let [error, res] = response;
			resolve(res.data);
		}).catch(error => {
			let [err, res] = error;
			reject(err);
		});
	});
}
export default request;
