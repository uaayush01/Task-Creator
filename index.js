const express=require('express')
const app=express()
const path=require('path')
const fs = require('fs');
const { log } = require('console');
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:  true}));
app.use(express.static(path.join(__dirname,"public")))

app.get('/',function(req,res){
    fs.readdir(`./files`,function(err,files){
        res.render("index",{files:files})
        console.log(files)
    })
})

app.get('/files/:filename',function(req,res){
    fs.readFile(`files/${req.params.filename}`,"utf-8",function(err, filedata){
        res.render('show' ,{filename:req.params.filename,filedata:filedata})
    })
})

app.post('/edit',function(req,res){
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,function(err){
        res.redirect('/')
    })
})
app.post('/create',function(req,res){
    fs.writeFile(`./files/${req.body.title.split('').join('')}.txt`,req.body.details,function(err){
        res.redirect("/")
    })
   
})
app.get('/edit/:filename',function(req,res){
    res.render('edit',{filename:req.params.filename})
})
// delete file
app.delete('/delete/:filename', function(req, res) {
    const filePath = `./files/${req.params.filename}`;
    
    fs.unlink(filePath, function(err) {
      if (err) {
        console.error(`Error deleting file: ${err}`);
        return res.status(500).send('Error deleting file');
      }
      res.send('File deleted successfully');
    });
  });
  


app.listen(3000)