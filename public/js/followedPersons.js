const eventFollow = document.querySelector('.followedPerson-btn');
if (eventFollow) {
  document.querySelector('.followedPerson-btn').addEventListener('click', e => {
    const personName = e.target.name;
    const userId = document.getElementById('userId').textContent;
    if (e.target.innerHTML.includes('Un')) {
      (async () => {
        
        const data = {userId, personName};
        const options = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        };
        fetch(`/api/v1/users/deleteFollowedPerson`, options).then(response => {
          // console.log(response);
        });
      })();
      
    }
    else {
      (async () => {
        
        const data = {userId, personName};
        const options = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        };
        fetch(`/api/v1/users/addFollowedPerson`, options).then(response => {
          // console.log(response);
        });
      })();
    }
    
    
  
  })
}




document.querySelector('.btn-People').addEventListener('click', e => {
  window.location.href = 'http://127.0.0.1:8000/getFollowedPeople';
  
  

});