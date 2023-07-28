const BASE_URL = document.querySelector('.img-upload__form').action;

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

let retryesCount = 3;

const DELAY_FOR_RETRY = 5000;

const load = async(route, method = Method.GET, body = null) => {
  const response = await fetch(route, { method, body });
  if (!response.ok) {
    throw new Error();
  }
  return response.json();
};

///повторная отправка запроса
const setDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

console.log(setTimeout);

const loadWhitRetry = async(route, errorText, method = Method.GET, body = null) => {
  try {
    return await load(`${BASE_URL}${route}`, method, body);
  } catch(err){
    if (retryesCount > 0) {
      await setDelay(DELAY_FOR_RETRY);
      return loadWhitRetry(route, errorText, method, body, --retryesCount);
    }
    throw new Error(errorText);
  }
};
/////
const getData = () => loadWhitRetry(Route.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export { getData, sendData };
