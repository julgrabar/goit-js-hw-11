import './css/styles.css';
import Notiflix from 'notiflix';
import GalleryService from './gallery-service'

const galleryService = new GalleryService();


const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')
}



refs.searchForm.addEventListener('submit', onSearchSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearchSubmit(event){
    event.preventDefault();
    refs.loadMoreBtn.classList.add('visually-hidden');
    galleryService.page=0;
    refs.galleryContainer.innerHTML='';

    galleryService.searchRequest = event.currentTarget.searchQuery.value.trim();
    if(!galleryService.searchRequest){return}
    try{
        const response = await galleryService.findImages();
            if(response.totalHits===0){
                    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
                    refs.loadMoreBtn.classList.add('visually-hidden');
                    return;
                }
                checkLostImages(response);
                makeGalleryCards(response);
                Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`)

        } catch (error) {
            console.log(error.message);
        }
   }



async function onLoadMore(){
    try{
    const response = await galleryService.findImages();
    checkLostImages(response);
    makeGalleryCards(response);   
    } catch (error) {
        console.log(error.message);
    }
     
}




function makeGalleryCards(requestResult){
    const markup= requestResult.hits.map(card=>{
    return `<div class="photo-card">
    <img src="${card.webformatURL}" alt="${card.tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b><br>
        ${card.likes}
      </p>
      <p class="info-item">
        <b>Views</b><br>
        ${card.views}
      </p>
      <p class="info-item">
        <b>Comments</b><br>
        ${card.comments}
      </p>
      <p class="info-item">
        <b>Downloads</b><br>
        ${card.downloads}
      </p>
    </div>
  </div>`})
.join('');
refs.galleryContainer.insertAdjacentHTML('beforeend',markup);
}


 function checkLostImages(response){
    const lostImages=response.totalHits - galleryService.page*40;
    if(lostImages>0){
        refs.loadMoreBtn.classList.remove('visually-hidden');
    }else if (response.totalHits!==0){
        refs.loadMoreBtn.classList.add('visually-hidden');
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
    } }