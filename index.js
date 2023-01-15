const express=require("express")
const cors=require("cors")
const User=require("./config")
let error=""
const app=express()
app.use(express.json())
app.use(cors());
// var pushdata = []
app.post("/create", async(req,res)=>{
    const data=req.body
    console.log(data)
    // User.auth().createUserWithEmailAndPassword()

    await User.auth().createUserWithEmailAndPassword(data.email, data.password).then(async(datadaftar)=>{
        // return res.status(200).json(datadaftar)
        console.log(datadaftar.user.uid)
        await User.firestore().collection("Data User").doc(datadaftar.user.uid).set(data)
        res.send("Data Berhasil Didaftarkan")
    }).catch(function (error){
        // let errorcode = error.code;
        // let errorMessage = error.message;
        // if(errorcode === ""){
        console.log(error)
        // }
        res.send("ADA KESALAHAN SILAHKAN COBA LAGI")
    })
    // await User.auth().createUserWithEmailAndPassword(data.nama, data.alamat).catch(function(error){
    //    res.send(error)
    //    console.log(error)

    // });



})

app.post("/login", async(req,res)=>{
    const data=req.body
    console.log(data)
    // User.auth().createUserWithEmailAndPassword()
    await User.auth().signInWithEmailAndPassword(data.nama, data.alamat).catch(function(error){
       res.send(error)
       console.log(error)
    });
    // await User.firestore().collection("Data User").doc(`${data.nama}`).set(data)
})


app.get("/get", async(req,res)=>{
    const snapshot = await User.firestore().collection("Data User").get();
    const list = snapshot.docs.map((doc)=>({id:doc.id,...doc.data()}))
    res.send(list);
})

app.put("/update", async (req,res)=>{
    const id = req.body.id;
    console.log("Before Deleting ID",req.body);
    delete req.body.id;
    console.log("After Deleting ID",req.body);
    const data = req.body;
    await User.firestore().collection("Data User").doc(id).update(data);
    res.send("Data Di Update")
})

app.post("/hapus", async (req,res)=>{
    const id = req.body.id;
    console.log(req.body)
    console.log(req.body.id)
    await User.firestore().collection("Data User").doc(id).delete();
    // console.log(req.body.email)
    // const uid = "s1P5a2dJQcTqDLcKxG5raEtNK1E3";
    // await User.auth().delete(uid)
    res.send({msg: "Data Terhapus"})
})

// app.get("/", async(req,res)=>{
//     const snapshot = await User.get();
//     snapshot.forEach(element => {
//         console.log(element.data())
//         pushdata.push(element.data())
//     });
//     res.send(pushdata)
// })
app.listen(4000, ()=>console.log("App Running port 4000"))