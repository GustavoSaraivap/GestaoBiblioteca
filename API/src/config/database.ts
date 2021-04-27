import mongoose from "mongoose";

mongoose
.connect("mongodb://topicos:topicos@topicoscluster-shard-00-00.anhe0.mongodb.net:27017,topicoscluster-shard-00-01.anhe0.mongodb.net:27017,topicoscluster-shard-00-02.anhe0.mongodb.net:27017/dbTopicos?ssl=true&replicaSet=atlas-14htlw-shard-0&authSource=admin&retryWrites=true&w=majority",
 {useNewUrlParser: true, useUnifiedTopology: true})
.then(() =>{
    console.log("Conexao feita")
})
.catch((erro) =>{
    console.log(`Erro: ${erro}`)
});

export{mongoose};