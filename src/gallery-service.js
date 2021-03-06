const axios = require('axios').default;
export default class GalleryService{
    constructor(){
        this.page=0;
        this.requestResult="";
        this.searchRequest="";
        this.perPage=40;
    }
    

    async findImages(){
        this.page+=1;
        const response = await axios.get(`https://pixabay.com/api/?key=25268338-c83be630200395a9374b8c8e0&q=${this.searchRequest}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.perPage}&page=${this.page}`);
        return response.data;   
    }   
}
