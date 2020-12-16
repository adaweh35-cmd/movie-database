


const searchForm =document.querySelector('.search-form-review');
if (searchForm) {
  searchForm.addEventListener('submit', e => {
    e.preventDefault();
    
    const movieId = document.getElementById('movieId').textContent;
    const scoreVal= document.getElementById('search-Score').value;
    const summaryVal = document.getElementById('search-Summary').value;
    const reviewVal = document.getElementById('search-Review').value;
 
  
    (async () => {
      
      const data = {scoreVal, summaryVal, reviewVal, movieId};
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      fetch(`api/v1/movies/${movieId}/reviews`, options).then(response => {
        // console.log(response);
      });
      
      document.getElementById('form-Container-review').style.display = 'none';
    })();
  
  });
}  
  