const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@des Get all contacts
//@route GET /api/contacts
//@acess public

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
})

//@des create contact
//@route POST /api/contacts/:id
//@acess public
const createContact = asyncHandler(async (req, res) => {

    console.log("the req data is ", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const newContact = await Contact.create({
        // name:name;,
        // email:email,
        // phone:phone, in es6 if if key value and and requested value is same then we can write write like this
        name, email, phone,user_id:req.user.id
    });
    res.status(200).json(newContact);
})

//@des get contact
//@route GET /api/contacts/:id
//@acess public
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    res.status(200).json(contact);
})

//@des create contact
//@route PUT /api/contacts/:id
//@acess public
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user_id){
        res.status(403);
        throw new Error("User don't have permission to update other contacts")
    }

    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body, {
        new: true
    }
    );
    res.status(200).json(updateContact);
})

//@des create contact
//@route DELETE /api/contacts/:id
//@acess public
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user_id){
        res.status(403);
        throw new Error("User don't have permission to delete other contacts")
    }

    await contact.deleteOne({_id:req.params.id});
    res.status(200).json(contact);
})



module.exports = { getContacts, createContact, getContact, updateContact, deleteContact }