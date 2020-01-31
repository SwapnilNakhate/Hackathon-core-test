const express = require('express');
const bodyParser= require('body-parser');
var github = require('octonode');
const app = express()
const port = 3000
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


var client = github.client({
  username: 'ashish9308',
  password: 'Samsungashi12!'
  });


var ghme = client.me();

app.post('/createrepo', function (req, res) {
 var repodata = req.body;
 ghme.repo(repodata, function (error, result, request) {
    if (result) {
        var reponame = req.body.reponame;
        var userList = req.body.userlist;
        var gherepo = client.repo(reponame);
        for (users of userList) {
         gherepo.addCollaborator(users,function (error, result, request) {
            console.log(request);
            if (result) {
                console.log(result);
                return;
            }
         })
}      
}
     res.send(result.html_url)
    
});
})

app.post('/revokeaccess', function (req, res) {
var repodata = req.body;
ghme.repo(repodata, function (error, result, request) {
        var reponame = req.body.reponame;
        console.log(reponame);
        var userList = req.body.userlist;
        console.log(userList)
        var gherepo = client.repo(reponame);
    
        for (users of userList) {
        console.log(users);
        gherepo.removeCollaborator(users,function (error, result, request) {
            console.log(request);
            if (result) {
                console.log("inside result");
                console.log(result);
                return;
            }
         })
}      
     res.send("Access Revoked")
    
});
})



app.listen(port, () => console.log(`Github Repo listening on port ${port}!`))