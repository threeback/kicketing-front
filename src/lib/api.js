export const apiEndpoint = import.meta.env.VITE_API_URL;

export const endpoints = {
    signup: `${apiEndpoint}/user/sign-up`,
    signin: `${apiEndpoint}/user/sign-in`,
    refresh: `${apiEndpoint}/refresh`,
    oauth: `${apiEndpoint}/oauth`,
}