import dateUtils  from 'vue-dateutils';
function dateFormat(time,fmt) {
	if(!time || time == '-'){
		return '-'
	}
	let format = fmt || 'YYYY-MM-dd HH:mm:ss'

    return dateUtils.dateToStr(format, new Date(time))
}
export default dateFormat;
