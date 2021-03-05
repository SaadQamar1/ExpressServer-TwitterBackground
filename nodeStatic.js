var express = require('express');
const app = express();
const session = require('express-session');
app.set('view engine', 'express')
app.set('view engine' , 'ejs')
const port = 3000;
app.use(express.urlencoded({extended: true}))
const flash = require('express-flash')
app.use(express.json());
const bcrypt = require('bcrypt')
const passport = require('passport')
var bodyParser = require('body-parser')
var io = require('socket.io')(express);
var mongoose = require('mongoose');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

var Message = mongoose.model('Message',{
  name : String,
  message : String
})

var dbUrl = 'mongodb://username:password@ds257981.mlab.com:57981/simple-chat'


//Getting and sending messages
app.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  })
})

app.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  })
})

app.post('/messages', (req, res) => {
  var message = new Message(req.body);
  message.save((err) =>{
    if(err)
      sendStatus(500);
    io.emit('message', req.body);
    res.sendStatus(200);
  })
})


app.use(flash())

//Using passport to provide each user with an id
const giveInitialpassport = require('./extensionPassport');
const { response } = require('express');
giveInitialpassport(
    passport,
    email => signedUpUsers.find(username => username.email === email),
    id => signedUpUsers.find(username => username.id === id)
)

//This sets all the initials for the server to start up.
app.use(express.static('public'));
let signedUpUsers = []


app.use(session({
    secret: 'i love coding',
    cookie: {
        secret: 'i love pasta',
        maximumAgeOfCookie: 10000000000000,
    },
    resave: true,
    saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())
//Getting and osting all functions displayed in the server
app.get('/forgotPass1', forgotPass1)
app.get('/login', login)
app.get('/allUserExamples/:userID', user1)
app.get('/LoggingOut', LoggingOut)

app.post('/searchUser', searchUser)
app.post('/LoggingOut', LoggingOut)
app.post('/login', login)
app.post('/forgotPass1', forgotPass1)
app.get('forgettingPassword', forgettingPassword)
app.post('forgettingPassword', forgettingPassword)


app.use('/', function(req, res, next) {
    console.log(req.session);
    next()
})


//Signing up and using bcrypt to provide an encrypted password
app.get('/signUp', ensureNotAuthenticated, (req,res) => {
    res.render('signUp.html')
})

app.post('/signUp', ensureNotAuthenticated, async (req, res) => {
    try {
      const passHash = await bcrypt.hash(req.body.password, 10)
      signedUpUsers.push({
        id: Date.now().toString(),
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordSafety: passHash
      })
      res.status(200)
      res.redirect('/login.html')
    } catch {
      res.redirect('/signUp')
    }
    console.log(signedUpUsers)
  })

  io.on('connection', () =>{
    console.log('a user is connected')
  })
  

//Using mongoose to send messages between two users
  mongoose.connect(dbUrl ,{useMongoClient : true} ,(err) => {
    console.log('mongodb connected',err);
  })

//********************************* REST API **********************************************

app.get('/api/signedUpUsers', (req, res) => {
    res.send(signedUpUsers);
});

//********************************* REST API **********************************************

//Different pages with different hastags
app.get('/', (req, res) => {
    res.sendFile('./mainPage.html', { root: __dirname });
});

app.get('/', (req, res) => {
    res.sendFile('./forgotPass.html', { root: __dirname });
    Response.query.email;
    Response.query.number;
});

app.get('/', (req, res) => {
    res.sendFile('./login.html', { root: __dirname });
    Response.query.username;
    Response.query.password;
});

app.get('/', (req, res) => {
    res.sendFile('./signUp.html', { root: __dirname });
});

app.get('/', (req, res) => {
    res.sendFile('./UserProfile.html', { root: __dirname });
});


//These are the get requests in order to obtain the different HTML files

app.get('/loggedinsuccess', function(req, res){
    fs.readFile(__dirname + "/" + "loggedinsuccess.html", 'utf8', function(err, data){
        console.log(data);
        res.end(data); 
    });
})

app.get('/forgotPass', function(req, res){
    fs.readFile(__dirname + "/" + "forgotPass.html", 'utf8', function(err, data){
        console.log(data);
        res.end(data); 
    });
})


app.get('/forgotpasswordsuccess', function(req, res){
    fs.readFile(__dirname + "/" + "forgotpasswordsuccess.html", 'utf8', function(err, data){
        console.log(data);
        res.end(data); 
    });
})

app.get('/notloggedin', function(req, res){
    fs.readFile(__dirname + "/" + "notloggedin.html", 'utf8', function(err, data){
        console.log(data);
        res.end(data); 
    });
})

app.get('/successfullyloggedout', function(req, res){
    fs.readFile(__dirname + "/" + "loggedinsuccess.html", 'utf8', function(err, data){
        console.log(data);
        res.end(data); 
    });
})

app.get('/loggedinnotsuccess', function(req, res){
    fs.readFile(__dirname + "/" + "loggedinsuccess.html", 'utf8', function(err, data){
        console.log(data);
        res.end(data); 
    });
})

app.get('/alreadyloggedin', function(req, res){
    fs.readFile(__dirname + "/" + "alreadyloggedin.html", 'utf8', function(err, data){
        console.log(data);
        res.end(data); 
    });
})

app.get('/User1', function(req, res){
    fs.readFile(__dirname + "/" + "User1.html", 'utf8', function(err, data){
        console.log(data);
        res.end(data); 
    });
})

app.get('/login', function(req, res){
    console.log("This will display into user info userAccount.");
    console.log(req.url);
    console.log("The entered username is: "+ req.query.username);
    console.log("The entered password is: "+ req.query.password);
    res.sendFile(path.join(__dirname, "./public", "login.html"));
})

app.get('/mainPage', function(req, res){
    fs.readFile(__dirname + "/" + "mainPage.html", 'utf8', function(err, data){
        console.log(data);
        res.end(data); 
    });
})

app.get('/signUp', function(req, res){
    fs.readFile(__dirname + "/" + "signUp.html", 'utf8', function(err, data){
        console.log(data);
        res.end(data);
    });
})

app.get('/', ensureAuthentication, (req, res) => {
    res.render('mainPage.html', { name: req.user.username })
})


//This function is used to search for a user from the list of users created
function searchUser(req, res){
    console.log("Searching for Contributing User...");
    let userChosen = req.body.userChosen;
    if(userChosen === "KingPin123"){
        res.redirect('/User1.html');
        console.log("User found!");
    }
    else if(userChosen === "") {
        res.redirect('/UserProfile.html');
        console.log("Select a User...") 
    }
    else{
        res.redirect('/UserProfile.html');
        console.log("Invalid input, try again..."); 
    }
}


//Function to ensure authentification is accepted to be redirected to the login page
function ensureAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login.html')
}

function ensureNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/mainPage.html')
    }
    next()
}


//Allowing a user to post a tweet
router.post('/signedUpUsers/:user/tweets', (req, res) => {
    const userAccount = db[req.params.user];
    // Check if userAccount exists
    if (!userAccount) {
      return res.status(404).json({ error: 'User does not exist' });
    }
    // Check mandatory requests parameters
    if (!req.body.date || !req.body.object || !req.body.length) {
      return res.status(400).json({ error: 'Missing parameters' });
    }
    // Convert length to number if needed
    let length = req.body.length;
    if (length && typeof length !== 'number') {
      length = parseFloat(length);
    }
    // Check that length is a valid number
    if (length == '') {
      return res.status(400).json({ error: 'Cannot Post empty tweet!' });
    }
    // Generates an ID for the tweet
    const id = crypto
      .createHash('md5')
      .update(req.body.date + req.body.object + req.body.length)
      .digest('hex');
    // Add tweet
    const tweet = {
      id,
      date: req.body.date,
      object: req.body.object,
      length,
    };
    userAccount.tweets.push(tweet);
    // Update balance
    userAccount.balance += tweet.length;
    return res.status(201).json(tweet);
  });
  

//Allowing a user to delete a tweet
router.tweetDelete('/signedUpUsers/:user/tweets/:id', (req, res) => {
    const userAccount = db[req.params.user];
    // Check if userAccount exists
    if (!userAccount) {
      return res.status(404).json({ error: 'User does not exist' });
    }
    const tweetNumber = userAccount.tweets.findIndex(
      (tweet) => tweet.id === req.params.id
    );
    // Check if tweet exists
    if (tweetNumber === -1) {
      return res.status(404).json({ error: 'Transaction does not exist' });
    }
    // Remove tweet
    userAccount.tweet.splice(tweetNumber, 1);
    res.sendStatus(204);
  });

//Function allows users to login their account if information entered is right
function login(req, res, next){
    if(req.session.loggedin){
        res.redirect('/alreadyloggedin.html');
        console.log("You are already logged on!")
		return;
    }
	console.log(req.body.username);
	let password = req.body.password;
	let username = req.body.username;
	const getUser = signedUpUsers.find((user) => user.username === username);
    console.log("**** BELOW is a representation of the current user on search... ****");
    console.log(getUser);
    if(getUser){
		if(getUser.password === password){
            req.session.username = username;
            req.session.loggedin = true;
            res.redirect('/loggedinsuccess.html');
            console.log("You have Successfully logged in, Enjoy!");
		}else{
            res.redirect('/loggedinnotsuccess.html');
		}
	}else{
        res.redirect( '/loggedinnotsuccess.html');
		return;
    }
}


//Function used if password is forgotten by the user
function forgotPass1(req, res) {
    req.session.destroy();
    res.redirect('/forgotpasswordsuccess.html');
    console.log("Email was sent.");
}

function forgettingPassword(req, res) {
    req.session.destroy();
    res.redirect('/forgotpasswordsuccess.html');
    console.log("Email resent link was sent.");    
}

function user1(req , res){
    console.log("***********************");
    console.log(" Obtaining User ");
    console.log("***********************");
    let userID = req.params.userID;
    allUserExamples.forEach(u => {
        if(userID == u.Givenid){
            console.log("********************");
            console.log(" User Found !");
            console.log("********************")
            req.status(200); window.location.href("mainPage.html", {user: u, session: req.session}
            )
        }
    })
}

//Allows a user to log out but still stay on the website
function LoggingOut(req, res){
    if(req.session.loggedin == true) {
        req.session.destroy();
        res.redirect('/successfullyloggedout.html')
        console.log('Logged Out...')
    }
    else {
        console.log("Never logged in.")
        res.redirect('/notloggedin.html')
    }
}

app.listen(port, () => console.log(`Running on port ${port}`));
