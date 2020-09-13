# GuestBook
 Guestbook app where you can write a message for the newly married couple
## installation 

Use the package manager [yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/) to install the project

#### for ALL  (_Backend TEAM & Frontend TEAM_)
```
1) clone the project
2) cd to the root folder 
3) npm install to install server dependencices
4) then also from the root folder  npm run clientinstall to install the front end dependencies
```

#### for server only
```
5) cd to the root folder
6) npm install 
7) to run the server 'npm run server'
```

### run both server and frontend
```
8) from the root folder run "npm run dev"
```


### Functions in the App
```
1. user can login and register
2. only logged in user can see the messages and add a new messages
3. only the owner of the message can edit his own message and delete it
4. any logged in user can add a reply for any message
```



### Technologies and packages used
_Main technologies_
```
- used Node.js and express to initalize server and create endpoints(apis)

-used MongoDb to create the databases 

-used React to create the frontend and implement views to use the apis

```

_Security_
```
- used jwt (json web token) to authorize the user and created an auth middleware for some private routes to check if the user has the credentials

- created a private route for our home page so no one who is not authorized can acess the page
```

_StateManagment_
```
-used React context to create a context that has state and reducers functions to organize our state in the app
```


