export const apiEndpoint = import.meta.env.VITE_API_URL;
export const webUrl = import.meta.env.VITE_API_WEB;

export const endpoints = {
    user: `${apiEndpoint}/user`,
    signup: `${apiEndpoint}/user/sign-up`,
    signin: `${apiEndpoint}/user/sign-in`,
    signout: `${apiEndpoint}/user/sign-out`,
    refresh: `${apiEndpoint}/refresh`,
    oauth: `${apiEndpoint}/oauth`,
    performances: `${apiEndpoint}/performances`,
    performance: `${apiEndpoint}/performance`,
    searchPerformance: `${apiEndpoint}/search/performances`,
    getAutoComplete: `${apiEndpoint}/search/performances/autocomplete`

}

export const googleOauthApi = {
    uri: `https://accounts.google.com/o/oauth2/v2/auth`,
    clientId: `1085637831125-5pm146uki559a93ao5gdhd6bel91pmf0.apps.googleusercontent.com`,
    redirectUri: `${webUrl}/signin/google/callback`,
}

export const kakaoOauthApi = {
    uri: `https://kauth.kakao.com/oauth/authorize`,
    clientId: `f7b6f4aed2edf392e73a697adee24827`,
    redirectUri: `${webUrl}/signin/kakao/callback`
}

export const naverOauthApi = {
    uri: `https://nid.naver.com/oauth2.0/authorize`,
    clientId: `aYP4gwQE8RjQby7a7Umc`,
    redirectUri: `${webUrl}/signin/naver/callback`
}
