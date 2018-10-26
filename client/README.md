This project seeks to copy the features of the instagram web app.

In order to install this project on your local machine run the following code.

$ cd desktop
$ git clone https://github.com/ssiperko/Instagram-clone.git
$ cd Instagram2
$ npm install
$ nodemon server.js

In a separate terminal window
$ cd desktop/dev/client
$ npm start

In order to get the project functioning fully you will need to create accounts for mongo Atlas, json webtoken, and Cloudinary.

Add your passwords to the nodemon.json file in the root directory.
{
  "env": {
    "MONGO_ATLAS_PW" : "**password here**",
    "JWT_KEY" : "**password here**"
  }
}

In the app.js file in the root directory enter your Cloudinary and Atlas credentials.

here
cloudinary.config({
    cloud_name: 'cloudinary info here',
    api_key: 'cloudinary info here',
    api_secret: 'cloudinary info here'
});

and here
mongoose.connect( "mongo atlas info here", { useNewUrlParser: true });
