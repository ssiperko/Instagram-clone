export const addUser = ({email, fullName, userName, password}) => {
  const data = {
    "email" : email.toLowerCase(),
    "name" : fullName,
    "username" : userName.toLowerCase(),
    "password" : password
  };
  console.log(data);
  const URL = "http://localhost:5000/accounts/signup";
  const init = {
      body: JSON.stringify(data),
      method : 'POST',
      headers: {
          'content-type': 'application/json'
      }
  }
  console.log(init);
  return fetch(URL, init)
  .then((res)=>{
    return res.json()
  }).then((res)=> {
    return res;
  });
};

export const loginUser = (email, password) => {
  const data = {
    "email" : email.toLowerCase(),
    "password" : password
  };
  const URL = "http://localhost:5000/accounts/login";
  const init = {
      body: JSON.stringify(data),
      method : 'POST',
      headers: {
          'content-type': 'application/json'
      }
  }
  return fetch(URL, init)
  .then((res)=>{
    return res.json()
  }).then((res)=> {
    console.log(res.username, res.id + " this is the response");
    localStorage.setItem('authToken', res.token);
    localStorage.setItem('authUser', res.username);
    localStorage.setItem('authUserId', res.id);
    console.log('POOP');
    return res;
  });
};

export const loadUserProfile = (username) => {
  const token = localStorage.getItem('authToken');
  const URL = `http://localhost:5000/accounts/profile/${username}`;
  const init = {
      method : 'GET',
      headers: {
          'content-type': 'application/json',
          'authorization' : 'bearer '+ token
      }
  };
  return fetch(URL, init).then((res)=>{
    return res.json()
  }).then((res)=> {
    return res;
  });
}

export const loadUserFeed = (username) => {
  const URL = `http://localhost:5000/post/${username}`;
  const init = {
      method : 'GET',
      headers: {
          'content-type': 'application/json'
      }
  };
  return fetch(URL, init).then((res)=>{
    return res.json()
  }).then((res)=> {
    return res;
  });
};

export const createComment = (postData) => {
  const token = localStorage.getItem('authToken');
  const data = postData;
  const URL = "http://localhost:5000/post/comment";
  const init = {
      body: JSON.stringify(data),
      method : 'POST',
      headers: {
          'content-type': 'application/json',
          'authorization' : 'bearer '+ token
      }
  }
  return fetch(URL, init).then((res)=>{
    return res.json()
  }).then((res)=> {
    return res;
  });
}

export const likePost = (like_data) => {
  const token = localStorage.getItem('authToken');
  const data = like_data;
  const URL = `http://localhost:5000/post/like`;
  const init = {
      body: JSON.stringify(data),
      method : 'POST',
      headers: {
          'content-type': 'application/json',
          'authorization' : 'bearer '+ token
      }
  }
  return fetch(URL, init).then((res)=>{
    return res.json()
  }).then((res)=> {
    return res;
  });
}

export const followUser = (follow_data) => {
  const token = localStorage.getItem('authToken');
  const data = follow_data;
  const URL = `http://localhost:5000/accounts/follow`;
  const init = {
      body: JSON.stringify(data),
      method : 'POST',
      headers: {
          'content-type': 'application/json',
          'authorization' : 'bearer '+ token
      }
  }
  return fetch(URL, init).then((res)=>{
    return res.json()
  }).then((res)=> {
    return res;
  });
}

export const addfollower = (follower_data) => {
  const token = localStorage.getItem('authToken');
  const data = follower_data;
  const URL = `http://localhost:5000/accounts/addfollower`;
  const init = {
      body: JSON.stringify(data),
      method : 'POST',
      headers: {
          'content-type': 'application/json',
          'authorization' : 'bearer '+ token
      }
  }
  return fetch(URL, init).then((res)=>{
    return res.json()
  }).then((res)=> {
    return res;
  });
}

export const explore = () => {
  const URL = `http://localhost:5000/post/explore`;
  const init = {
      method : 'GET',
      headers: {
          'content-type': 'application/json'
      }
  };
  return fetch(URL, init).then((res)=>{
    return res.json()
  }).then((res)=> {
    console.log(res);
    return res;
  });
}

export const updateProfile = (users_data) => {
  const data = users_data;
  const token = localStorage.getItem('authToken');
  const id = localStorage.getItem('authUserId');
  const url = `http://localhost:5000/accounts/update/${id}`;
  const init = {
      body: JSON.stringify(data),
      method : 'PATCH',
      headers: {
          'content-type': 'application/json',
          'authorization' : 'bearer '+ token
      }
  }
  fetch(url, init)
  .then((result)=>{
    return result.json();
  })
  .then((result)=>{
    console.log(result);
  })
}
