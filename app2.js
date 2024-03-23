const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const Blog = require('./models/blog');
const app=express();



//register view engine
app.set('view engine','ejs');

//connect to mongodb
const dbURI='mongodb+srv://iit2023260:1jp2LyC4b9CILdLZ@cluster0.w6kdewx.mongodb.net/';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));




//app.listen(3000);

app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
  });

  app.use((req, res, next) => {
    console.log('in the next middleware');
    next();
  });


  app.use(express.static('public'));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));
//app.use(morgan('tiny'));








// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//       title: 'new blog',
//       snippet: 'about my new blog',
//       body: 'more about my new blog'
//     })
  
//     blog.save()
//       .then(result => {
//         res.send(result);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   });


//   app.get('/all-blogs', (req, res) => {
//     Blog.find()
//       .then(result => {
//         res.send(result);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   });


//   app.get('/single-blog', (req, res) => {
//     Blog.findById('5ea99b49b8531f40c0fde689')
//       .then(result => {
//         res.send(result);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   });


//routing
app.get('/',(req,res)=>{
    //res.send('<p>home page</p>');
    //res.sendFile('./views/index.html',{root:__dirname});

// const blogs = [
//     {title:'dusk till dawn',snippet:'zayn malik and anonymous'},
//     {title:'dusk till dawn',snippet:'zayn malik and anonymous'},
//     {title:'dusk till dawn',snippet:'zayn malik and anonymous'}
// ]

//     res.render('index',{title:'Home',blogs});



    res.redirect('/blogs')
});


app.use((req, res, next) => {
    console.log('in the next middleware');
    next();
  });


app.get('/about',(req,res)=>{
   // res.send('<p>about page</p>');
   //res.sendFile('./views/about.html',{root:__dirname});
   res.render('about',{title:'About'});
});


//redirect is not needed with ejs
// app.get('/about-us',(req,res)=>{
//     res.redirect('./about');
//  });

//blog routes
app.get('/blogs',(req,res)=>
{
      Blog.find().sort({createdAt:-1})
      .then((result) => {
        res.render('index',{title:'All Blogs',blogs: result })
      })
      .catch(err => {
        console.log(err);
      })
})


app.get('/blogs/:id',(req,res)=>
{
  const id=req.params.id;
  //console.lof(id);
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
      console.log(err);
    });
})




app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});



app.get('/blogs/create',(req,res)=>
{
    res.render('create',{title:'Create a new blog'});
})


app.post('/blogs', (req, res) => {
  // console.log(req.body);
  const blog = new Blog(req.body);

  blog.save()
    .then(result => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    });
});


 //this has to be at last
 app.use((req,res)=>
 {
    //res.sendFile('./views/404.html',{root:__dirname});
    //res.status(404).sendFile('./views/404.html',{root:__dirname});

    // res.render('404');
    res.status(404).render('404',{title:'404'});
 });