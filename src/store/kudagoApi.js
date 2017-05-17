
const corsProxy = 'https://cors-anywhere.herokuapp.com/';


export const defaultUrlApi = {
    proxy: corsProxy,
    head: 'https://kudago.com/public-api/v1.3/places/?',
    lang: 'lang=&',
    size: 'page_size=100',
    fields: '&fields=id,title,images,description',
    expand: '&expand=',
    orderBy: '&order_by=location',
    textFormat: '&text_format=text',
    ids: '&ids=',
    location: '&location=spb',
    hasShowings: '&has_showings=',
    showingSince: '&showing_since=1444385206',
    showingUntil: '&showing_until=1444385206',
    categories: '&categories=',
    lon: '&lon=30.3571127',
    lat: '&lat=59.932721900000004',
    radius: '&radius='
};


