export const contentsPath = "/contents"
export const reasonPath = "/reasonPath"
export const aboutUsPath = "/about-us"
export const newsPath = "/news-path"

export const loginPath = "/log-in"
export const dashboard = "/dashboard"
export const blindbox = "/blindbox"

export const addmusic = "/dashboard/addmusic"
export const allmusic = "/dashboard/allmusic"

export const ourPhotosPath = "/dashboard/our-photos"
export const viewPath = (id : string) => `/dashboard/our-photos/views/${id}`
export const addPath = "/dashboard/our-photos/added"

export const ourCouplePhotoPath = "/dashboard/ourcouple-photos"
export const SaveCouplePhotoPath = "/dashboard/ourcouple-photos/added"
export const viewSaveCouplePath = (id : string) => `/dashboard/ourcouple-photos/views/${id}`


export const ourSweetieMemoryPath = "/dashboard/oursweeties-memory"
export const SaveMemoryPath = "/dashboard/oursweeties-memory/added"

export const dashboardQuery = (query : string) => `/dashboard?title=${encodeURIComponent(query)}`