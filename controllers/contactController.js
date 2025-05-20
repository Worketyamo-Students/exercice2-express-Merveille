import {Transform} from 'stream'
 import fs from 'fs'

 const generateId = () => Math.floor(Math.random() * 1000000);
 let contacts = [
    {
        "id":0,
        "nom": "diane",
        "numero": 668799785
    }

 ];

const contactController = {
    createContact: (req, res) => {
        const { nom, numero } = req.body;
        const id = generateId();

        fs.readFile("./database.json", "utf8", (err, data) => {
            if (err) {
                console.error("Erreur lors de la lecture du fichier :", err);
                return res.status(500).send("Erreur serveur.");
            }

           
            try {
                contacts = JSON.parse(data); 
            } catch (parseError) {
                console.error("Erreur de parsing :", parseError);
            // on continue avec une liste vide
            }
            contacts.push({ id, nom, numero });
            fs.writeFile("./database.json", JSON.stringify(contacts, null, 5), "utf8", (writeErr) => {
                if (writeErr) {
                    console.error("Erreur lors de l'écriture du fichier :", writeErr);
                    return res.status(500).send("Erreur lors de l'enregistrement.");
                }


                console.log("Livre ajouté avec succès !");
                res.status(201).send(contacts);
            });
            //fs.writeFile("./database.csv", JSON.stringify(contacts, null, 5), "utf8")
           const lecture = fs.createReadStream('database.json', 'utf8')
           const ecriture = fs.createWriteStream('database.csv','utf8')
           
           lecture.pipe(ecriture)
           res.send(contacts);
        });
    },

    getAllcontacts: (req, res) => {
        fs.readFile("./database.json", "utf8", (err, data) => {
            if (err) {
                console.error("Erreur lors de la lecture :", err);
                return res.status(500).send("Erreur serveur.");
            }

           const lecture = fs.createReadStream('database.json', 'utf8')
           const ecriture = fs.createWriteStream('database.csv','utf8')
           
           lecture.pipe(ecriture)
           
            res.send(contacts);
        });
    },

    updateContact: (req,res) => {
        const {nom,numero} = req.body;
        const {id} = req.params;

            contacts.map((item) => {
                if(item.id === parseInt(id)){
                    item.nom = nom;
                    item.numero = numero;
                    
                     res.status(200).send(contacts)
                }
       })
        const lecture = fs.createReadStream('database.json', 'utf8')
        const ecriture = fs.createWriteStream('database.csv','utf8')
           
           lecture.pipe(ecriture)

    }, 
    
    deleteBook:(req,res)=>{
        const {id} = req.params;
            if(!id) return res.status(400).json({error:" id manquant"})
            contacts.map((book,index)=>{
                if (book.id===parseInt(id)){
                    contacts.splice(index,1)
                    res.status(200).send(contacts)
                    
                }
            })
        }


  }
  //console.log(contacts)
 export default contactController;
