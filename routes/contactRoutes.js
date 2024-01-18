const express=require("express");
const router=express.Router();
const app=express()
const{getContacts,createContact,getContact,updateContact,deleteContact}=require("../controllers/contactController");
const validateToken = require("../middleware/validTokenHandler");


// router.get(("/"),getContacts)
// router.post(("/"),createContact)
// router.get(("/:id"),getContact)
// router.put(("/:id"),updateContact)
// router.delete(("/:id"),deleteContact)

//////compressed way to write them

router.use(validateToken);

router.get(("/"),getContacts).post(("/"),createContact)

router.get(("/:id"),getContact).put(("/:id"),updateContact).delete(("/:id"),deleteContact)


module.exports=router;

