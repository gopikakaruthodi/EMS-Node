const PORT=3000
const http= require ("http")
const fs= require ("fs")
const url= require ("url")
const queryString=require("querystring")
const {MongoClient,ObjectId}=require("mongodb")

// connect to database
const client=new MongoClient("mongodb://127.0.0.1:27017/")


const app=http.createServer(async(req,res)=>{
    console.log(typeof(req.url));
    const path = url.parse(req.url)
    console.log(path);

    // create database
    const db=client.db("Employee");
    // create collection
    const collection=db.collection("staff");


    if(path.pathname=="/"){
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(fs.readFileSync("../client-side/index.html"))
    }

    else if(path.pathname=="/client-side/css/index.css"){
        res.writeHead(200,{"Content-Type":"text/css"});
        res.end(fs.readFileSync("../client-side/css/index.css"));

    }
    else if(path.pathname=="/add"){
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(fs.readFileSync("../client-side/pages/add.html"));

    }
    else if(path.pathname=="/css/add.css"){
        res.writeHead(200,{"Content-Type":"text/css"});
        res.end(fs.readFileSync("../client-side/css/add.css"));

    }
    else if(path.pathname=="/client-side/js/index.js"){
        res.writeHead(200,{"Content-Type":"text/js"});
        res.end(fs.readFileSync("../client-side/js/index.js"));

    }
    console.log(req.method);

    // add data

    if(path.pathname=="/submit" && req.method=="POST" ){
        
        let body="";
        req.on("data",(chunk)=>{
            // console.log(chunk);
            body+=chunk.toString();
            // console.log(body);
              
        });
        
        req.on("end",async()=>{
           if(body!=null){
            const formData=queryString.parse(body);
            console.log(formData); 

            // insert data to database
            existData=await collection.findOne({ID:formData.ID})
            if(existData){
                res.end("ID Already Exist"); 
                
            }
            else{
                collection.insertOne(formData).then(()=>{
                    console.log("Success");     
                }).catch((error)=>{
                    console.log(error);                
                });

                // res.end("ID Already Exist");
                
            }
           }

        });
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(fs.readFileSync("../client-side/index.html"));

    }
    // display
     if(path.pathname=="/getEmployee" && req.method=="GET"){
       let data=await collection.find().toArray();
        // console.log(data);
        let jsonData=JSON.stringify(data);
        // console.log(jsonData);

        res.writeHead(200,{"Content-Type":"text/json"});
        res.end(jsonData);   

    }

    // update

    if(path.pathname=="/update" && req.method=="PUT"){
        console.log("update on process");
        
        let body=""
        req.on("data",(chunk)=>{
            // console.log(chunk);
            body+=chunk.toString();
            console.log(body); 
        })

        req.on("end",async()=>{
            let uData=JSON.parse(body);
            console.log(uData);
            updateData={name:uData.name,designation:uData.designation,salary:uData.salary,experience:uData.experience}
            // let _id=new ObjectId(uData.ID)
            let ID=uData.id;
            console.log(ID);
            

            await collection.updateOne({ID},{$set:updateData}).then(()=>{
                res.writeHead(200,{"Content-Type":"text/plain"})
                res.end("Updated")
                
            }).catch(()=>{
                res.writeHead(404,{"Content-Type":"text/plain"})
                res.end("Fail");
                
            })
            

        })
    }

    // Delete

    if(path.pathname=="/delete" && req.method=="DELETE"){
        let body=""
        req.on("data",(chunk)=>{
            body+=chunk.toString();
            console.log(body);
            
        })
        req.on("end",async()=>{
            let ID=body;
            await collection.deleteOne({ID}).then(()=>{
                res.writeHead(200,{"Content-Type":"text/plain"})
                res.end("Successfully Deleted")
            }).catch(()=>{
                res.writeHead(404,{"Content-Type":"text/plain"})
                res.end("Fail");
            })    
        })
            
    }
        

});

client.connect().then(()=>{
    app.listen(PORT,()=>{
        console.log(`http://localhost:${PORT}`);
    });

}).catch((error)=>{
    console.log(error);
});





