const express=require('express')
const port=9000
const path=require('path')

const db=require('./config/mongoose')

const Contact=require('./models/contact');
const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


var contactList=[
    {
        name:'pankaj',
        phone:"02900190"
    },
    {
        name:"tony",
        phone:"029"
    },
]


// adding to the database
app.post('/contact-list',function(req,res){
    // console.log(req.body);
   // console.log(req.body.name);
   // contactList.push({
    //  name:req.body.name,
    //  phone:req.body.Phone
    //});
    console.log(req.body)
    Contact.create({
        name:req.body.name,
        phone:req.body.Phone

    },function(err,newContact){
        if(err){
             return console.log('error in creating a contact');
             }
        console.log('*********',newContact);
        return res.redirect('back')
        })
})



// rendering files
app.get('/',function(req,res){
    //return res.render('home',{
    //    title:'my contact list',
    //    contact_list:contactList
    //    });

    Contact.find({},function(err,contacts){
        if(err){
            console.log('error occured while displaying ',err)
            return
        }
        return res.render('home',{
           title :'my contact list',
           contact_list : contacts 
        });
    });
});


//deleting contact
 app.get('/delete-contact',function(req,res){
    
    // let phone=req.params.phone;
    // let contactIndex =contactList.findIndex(contact =>(contact.phone == phone));
    // if ( contactIndex != -1){
    //     contactList.splice(contactIndex,1);
    // }
    // return res.redirect('back');
    
    console.log(req.query)
    let id=req.query.id;

    Contact.findByIdAndDelete(id,function(err){
        if (err){
            return console.log('error occured at deletion',err)
        }
        return res.redirect('back');
    })
    
 })


//port check
app.listen(port,function(err){
    if(err){
        console.log('error in running the server');
    }
    console.log('server is up :',port);
})


