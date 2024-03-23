const fs=require('fs');

//reading files 

// fs.readFile('./docs/blog1.txt',(err,data)=>
// {
//     if(err)
//     {
//         console.log(err);
//     }
//     console.log(data);
//     console.log(data.toString());
// });
// console.log('i am printed first since above func  is asyn.');





//writing files

// fs.writeFile('./docs/blog1.txt','hello world',()=>
// {
//     console.log('file was written');
// });

// fs.writeFile('./docs/blog2.txt','hello world',()=>
// {
//     console.log('blog 2 file did not exist but is was created same as in file');
// });






//directories

// if(!fs.existsSync('./assets'))
// {
// fs.mkdir('./assets',(err)=>{
//     if(err)
//     {
//         console.log(err);
//     }
//     console.log('folder created');
// });
// }
// else
// {
//     fs.rmdir('./assets',(err)=>{
//         if(err)
//         {
//             console.log(err);
//         }
//         console.log('folder deleted');
//     });
// }




//deleting files
if(fs.existsSync('./docs/deleteme.txt'))
{
    fs.unlink('./docs/deleteme.txt',(err)=>
    {
        if(err)
        console.log(err);
    console.log('file deleted');
    });
}