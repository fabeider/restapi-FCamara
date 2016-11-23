let exec = require('child_process').exec
let command = 'mongoimport --db test --collection users --type json --file ./seeds/users.json --jsonArray'
exec(command, (err, stdout, stderr) => {
  // check for errors or if it was succesfuly
  if (err)
  	console.log(err);
  else
  	console.log("Created users!!!");
})

command = 'mongoimport --db test --collection products --type json --file ./seeds/products.json --jsonArray'
exec(command, (err, stdout, stderr) => {
  // check for errors or if it was succesfuly
  if (err)
  	console.log(err);
  else
  	console.log("Created products!!!");
})