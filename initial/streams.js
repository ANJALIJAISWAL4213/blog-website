const fs=require('fs');
const readStream=fs.createReadStream('./docs/blog3.txt',{encoding:'utf8'});
const writeStream=fs.createWriteStream('./docs/blog4.txt');
// readStream.on('data',(chunk)=>
// {
//     console.log('----NEW CHUNK----');
//     // console.log(chunk.toString());
//     //we don't need to use toString after encoding
//     console.log(chunk);

//     writeStream.write('\nNEW CHUNK\n');
//     writeStream.write(chunk);
// });

readStream.pipe(writeStream);