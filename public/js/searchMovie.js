
import { showAlert } from './alerts.js';

export const getMovieQuery = async (...arrayParams) => {
  // Constructing the search params for get request
  var index = ['Title=', 'Year=', 'Genre='];
  var args = [];
  //var args =[`Title=${arrayParams[0]}`, `Year=${arrayParams[1]}`, `Genre=${arrayParams[2]}`];
  // console.log(arrayParams);
  for(var i=0; i <arrayParams.length; i++) {
    if(arrayParams[i] != null && arrayParams[i] != '' && i!=0) {
      args.push(`&${index[i]}${arrayParams[i]}`); 
      

    }
    else if (arrayParams[i] != null && arrayParams[i] != '') {
      args.push(`${index[i]}${arrayParams[i]}`); 
    }
  }
  args = args.join('');
  // console.log(args);
  window.location.href = `http://127.0.0.1:8000/api/v1/movies/getMovies/?${args}`;
    

  
};
export const getPersonQuery = async (personName) => {
  // Constructing the search params for get request
 

  // Sending the Get Request
  try {
    const res = await axios({
      method: 'GET',
      url: `http://127.0.0.1:8000/api/v1/people/?Name=${personName}`,
      
    });
   
    if (res.data.status === 'success') {
      const personObj = res.data.data[0];
      return personObj;
    }

  } catch (err) {
    showAlert('error', err.response.data);
  }

};



document.querySelector('.search-form').addEventListener('submit', e => {
  e.preventDefault();
  const Title= document.getElementById('search-term').value;
  const Year = document.getElementById('search-Year').value;
  const Genre = document.getElementById('search-Genre').value;

  

  (async (res, req) => {

    var movieObj = await getMovieQuery(Title, Year, Genre);
    document.getElementById('form-Container').style.display = 'none';

    //window.location.href = 'http://127.0.0.1:8000/movies'

    
  })();
});


document.querySelector('.search-form-person').addEventListener('submit', e => {
  e.preventDefault();
  
  const personName= document.getElementById('search-pName').value;
  const movieName = document.getElementById('search-mName').value;

  (async () => {

    var personObj = await getPersonQuery(personName);
    
    document.getElementById('form-Container-person').style.display = 'none';
    window.location.href = `http://127.0.0.1:8000/person/${personObj.Name}`;
    
 
  })();

});


