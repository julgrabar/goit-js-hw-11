export default function checkLostImages(response){
    const lostImages=response.totalHits - galleryService.page*40;
    if(lostImages>0){
        refs.loadMoreBtn.classList.remove('visually-hidden');
    }else{
        refs.loadMoreBtn.classList.add('visually-hidden');
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
    } }