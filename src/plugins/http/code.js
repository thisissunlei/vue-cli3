function handleCode(response) {
  console.log('codeRes', response);
  if (!response.data || response.data.code === undefined) {
    console.error('response错误', response);
    return;
  }
  if (response.data.code === 0 || response.data.code === 200 || response.data.code === 1) {
    return response;
  }
  switch (response.data.code) {
    case 401:
      // const redirectUrl = encodeURIComponent(window.location.href);
      // window.location.href = `/new/login.html?RU=${redirectUrl}`;
      // return ;
      break;
    case 404:
      response.data.msg = "发出的请求针对的是不存在的记录"
      break;
    case 500:
      response.data.msg = "服务器发生错误，请检查服务器"
      break;
    case 502:
      response.data.msg = "'网关错误"
      break;
    case 504:
      response.data.msg = "网关超时"
      break;
    case 503:
      response.data.msg = "'服务不可用，服务器暂时过载或维护"
      break;
    case -4011:
      response.data.msg = "test2333"
    default:
      break;
  }
  return Promise.reject(response);
}

export default handleCode;
