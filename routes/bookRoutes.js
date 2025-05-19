import bookController from "../controllers/bookController.js"
import {Router} from "express"
const router = Router();
import fs from "fs"

router.post("/books",bookController.createBook)
router.get("/books",bookController.getAllBooks)
 //router.get('/books/:id',bookController.getBookById)
  router.put ('/books/:id', bookController.updateBook);
// router.delete ('/books/:id', bookController.deleteBook);



export default router