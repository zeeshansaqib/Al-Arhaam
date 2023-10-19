import { throwError } from "rxjs";
import { ajax, AjaxResponse } from "rxjs/ajax";
import { catchError } from "rxjs/operators";

// @ts-ignore
// export const baseURL = "https://naveedtazeen.com";
export const baseURL = "http://localhost:8081/api/";
const requestHeader = (is_required = false) => {
  let headers = {};
  if (!is_required) {
    headers = {
      // You can remove this line when sending FormData
      // "Content-Type": "multipar  t/form-data",
    };
  }

  return headers;
};

const handleError = (operation: string) => (err: AjaxResponse<object>) => {
  const errMsg = `Error in ${operation}()`;

  if (err.status === 401) {
    localStorage.clear();
    window.location.href = "/auth/login";
  }
  return throwError(() => console.error(errMsg));
};

export const SignUp = (data: any) => {
  return ajax({
    // headers: requestHeader(),
    method: "POST",
    // withCredentials: false,
    url: `${baseURL}sign-up`,
    body:data
  }).pipe(catchError(handleError("CheckAppointmentDate")));
};
export const login = (data: any) => {
  return ajax({
    // headers: requestHeader(),
    method: "POST",
    // withCredentials: false,
    url: `${baseURL}login`,
    body:data
  }).pipe(catchError(handleError("CheckAppointmentDate")));
};

export const PostData = (data: { password: string }) => {
  const formData = new FormData();
  formData.append("password", data.password);

  return ajax({
    headers: requestHeader(), // 'Content-Type' is not required when sending FormData
    method: "POST",
    url: `${baseURL}/Server/login.php`,
    body: formData,
  }).pipe(catchError(handleError("PostData")));
};
export const DisableDays = (date: string) => {
  // const formData = new FormData();
  // formData.append('password', data.password);

  return ajax({
    headers: requestHeader(), // 'Content-Type' is not required when sending FormData
    method: "POST",
    url: `${baseURL}/Server/disable-book.php?date=${date}`,
    // body: formData,
  }).pipe(catchError(handleError("PostData")));
};
export const getAllAppointments = () => {
  return ajax({
    // headers: requestHeader(),
    method: "GET",
    url: `${baseURL}/Server/getall.php`,
    // body: formData,
  }).pipe(catchError(handleError("PostData")));
};
export const GetBookedAppointments = (phone: any) => {
  return ajax({
    // headers: requestHeader(),
    method: "GET",
    url: `${baseURL}/Server/getapbyphone.php?phone=${phone}`,
  }).pipe(catchError(handleError("PostData")));
};
export const GetAvailablity = (date: any) => {
  return ajax({
    // headers: requestHeader(),
    method: "GET",
    url: `${baseURL}/Server/checkdate.php?date=${date}`,
  }).pipe(catchError(handleError("PostData")));
};
export const bookAppointment = (data: any) => {
  return ajax({
    // headers: requestHeader(),
    method: "POST",
    url: `${baseURL}/Server/book.php`,
    body: data,
  }).pipe(catchError(handleError("PostData")));
};
export const getLogs = () => {
  return ajax({
    // headers: requestHeader(),
    method: "GET",
    url: `${baseURL}/Server/getlogs.php`,
  
  }).pipe(catchError(handleError("PostData")));
};
export const getDisableDays = () => {
  return ajax({
    // headers: requestHeader(),
    method: "GET",
    url: `${baseURL}/Server/fetch_rules.php`,
  
  }).pipe(catchError(handleError("PostData")));
};
