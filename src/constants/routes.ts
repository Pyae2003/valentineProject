export const contentsPath = "/contents"
export const reasonPath = "/reasonPath"
export const aboutUsPath = "/about-us"
export const newsPath = "/newsPath"

export const loginPath = "/login"
export const dashboard = "/dashboard"
export const addmusic = "/dashboard/addmusic"

export const dashboardQuery = (query : string) => `/dashboard?title=${encodeURIComponent(query)}`