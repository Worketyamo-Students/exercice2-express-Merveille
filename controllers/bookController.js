import {Transform} from 'stream'
 import fs from 'fs'

 const generateId = () => Math.floor(Math.random() * 1000000);
 let books = [
    {
        "id":2,
        "nom": "munyal",
        "date": "1 janvier2013"
    }

 ];

const bookController = {
    createBook: (req, res) => {
        const { nom, date } = req.body;
        const id = generateId();

        fs.readFile("./database.json", "utf8", (err, data) => {
            if (err) {
                console.error("Erreur lors de la lecture du fichier :", err);
                return res.status(500).send("Erreur serveur.");
            }

           
            try {
                books = JSON.parse(data); 
            } catch (parseError) {
                console.error("Erreur de parsing :", parseError);
            // on continue avec une liste vide
            }
            books.push({ id, nom, date });
            fs.writeFile("./database.json", JSON.stringify(books, null, 5), "utf8", (writeErr) => {
                if (writeErr) {
                    console.error("Erreur lors de l'écriture du fichier :", writeErr);
                    return res.status(500).send("Erreur lors de l'enregistrement.");
                }

                console.log("Livre ajouté avec succès !");
                res.status(201).send(books);
            });
        });
    },

    getAllBooks: (req, res) => {
        fs.readFile("./database.json", "utf8", (err, data) => {
            if (err) {
                console.error("Erreur lors de la lecture :", err);
                return res.status(500).send("Erreur serveur.");
            }

           const lecture = fs.createReadStream('database.json', 'utf8')
           const ecriture = fs.createWriteStream('database.csv','utf8')
           
           lecture.pipe(ecriture)
           
            res.send(books);
        });
    },

    updateBook: (req,res) => {
        const {nom,date} = req.body;
        const {id} = req.params;

            books.map((item) => {
                if(item.id === parseInt(id)){
                    item.nom = nom;
                    item.date = date;
                    
                     res.status(200).send(books)
                }
       })
        const lecture = fs.createReadStream('database.json', 'utf8')
        const ecriture = fs.createWriteStream('database.csv','utf8')
           
           lecture.pipe(ecriture)
    }


  }
  //console.log(books)
 export default bookController;
