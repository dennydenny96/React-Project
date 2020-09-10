const User = require('../models/user-model')
const bcrypt = require('bcrypt');
const { response } = require('express');
const saltRounds = 10;
createUser = async (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user',
        })
    }

    const user = new User(body)

    if (!user) {
        return res.status(400).json({ success: false, error: err })
    }
    
    const hashPassword = await bcrypt.hash(body.password, saltRounds);
    
    user.password = hashPassword;
    
    user
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'User created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'User not created!',
            })
        })
}

updateUser = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
        
    const hashPassword = await bcrypt.hash(body.password, saltRounds);

    User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            })
        }
        user.firstname = body.firstname
        user.lastname = body.lastname
        user.username = body.username
        user.email = body.email
        user.password = hashPassword;
        user
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'User updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'User not updated!',
                })
            })
    })
}

deleteUser = async (req, res) => {
    await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }

        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}

getUserById = async (req, res) => {
    await User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}

getUsers = async (req, res) => {
    try{
        const body = req.query;
        const resPerPage = parseInt(body.pageSize); // results per page
        const pages = parseInt(body.page); // Page 

        // --------------------- Filtered ---------------------
        const filtered = body.filtered !== undefined ? body.filtered : undefined
        let findLike = {}
        if(filtered){
            filtered.map((element, i)=>{
                const parseFiltered = JSON.parse(element);
                findLike[parseFiltered.id] = new RegExp(parseFiltered.value, "i") 
            })
        }
        
        // --------------------- Sorted ---------------------
        const sorted = body.sorted != undefined ? body.sorted : '{}'
        const parseSorted = JSON.parse(sorted)
        const sortedId = parseSorted.id;
        const sortedBy = (parseSorted.desc != undefined) ? parseSorted.desc ? "desc" : "asc" : undefined;
        const foundUsers = await User.find(findLike)
            .sort({
                [sortedId]: sortedBy
            })
            .skip((pages) * resPerPage)
            .limit(resPerPage);
        
        const dataUsers = foundUsers.length > 0 ? foundUsers : [{}];
        const numOfUsers = await User.countDocuments();
        return res.status(200).json({ success: true, data: dataUsers, pages: Math.ceil(numOfUsers / resPerPage), recordsTotal: numOfUsers})
    } catch (err){
        throw new Error(err);
    }
}




module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    getUserById,
}