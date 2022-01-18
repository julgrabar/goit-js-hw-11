import checkLostImages from './index';
const axios = require('axios').default;
const refs = {
    loadMoreBtn: document.querySelector('.load-more')
}
export default class GalleryService{
    constructor(){
        this.page=0;
        this.requestResult="";
        this.searchRequest="";
    }
    

    async findImages(){
        this.page+=1;
        const response = await axios.get(`https://pixabay.com/api/?key=25268338-c83be630200395a9374b8c8e0&q=${this.searchRequest}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`);
        checkLostImages(response.data);
        return response.data;
        
    }   
}
