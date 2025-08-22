import prisma from "../DB/db.config.js"

export const fetchUsers = async (req, res) => {

    const {name, email} = req.body;

    const allUsers= await prisma.user.findMany({
        select: {
            name: true, 
            email:true
        }
    })

    return res.json({status:200, data:allUsers, message: "Fetched all the users"})
}

export const fetchUser = async (req, res) => {
    const userID = req.params.id;
    const {name, email, password} = req.body;

    const fetchUser = await prisma.user.findUnique({
        where : { id: Number(userID) },
    })

    if(!fetchUser){
        return res.status(404).json({message: "User doesn't exist"})
    }

    return res.json({status:200, data:fetchUser, message: "User data fetched"})
}

export const createUser = async (req, res) => {
    const { email, password, name } = req.body;

    const findUser = await prisma.user.findUnique({
        where: {
            email:email
        }
    });

    if(findUser){
        return res.status(404).json({status: 404, message: "Email already exists. Please use a different ID"})
    }

    const newUser = await prisma.user.create({
        data : {
            name:name,
            email:email,
            password:password
        }
    });

    return res.json({status:200, data: newUser, message: "User created"})
}

export const updateUser = async (req, res) => {

    const userID = req.params.id;
    const {name, email, password} = req.body;

    await prisma.user.update({
        where : {
            id: Number(userID)
        },
        data : {
            name,
            email,
            password,
        }
    });

    return res.status(200).json({status:200, message: "User details updated"})
}

export const deleteUser = async (req, res) => {
    const userID = req.params.id;

    const delUser = await prisma.user.delete({
        where: { id: Number(userID) }
    });

    return res.json({status: 200, message: "User deleted successfully"})
}