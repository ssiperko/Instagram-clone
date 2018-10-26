const cloudinary = require('cloudinary');
const fetch = require('node-fetch');


function photoUploader(req, res) {
  console.log(req);
  cloudinary.uploader.upload_stream((result) => {
    let data = {
      profilePic : result.secure_url
    };
    /*
    console.log(data);
    const URL = `http://localhost:8000/post/update/${}`;
    const init = {
        body: JSON.stringify(data),
        method : 'POST',
        headers: {
            'content-type': 'application/json'
        }
    };
    fetch(URL, init)
      .then((res)=>{
          return res.json()})
      .then((res)=> {
          console.log('we did it');
    });
    */
  }).end(req.file.buffer);
}

module.exports = photoUploader;
