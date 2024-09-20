import User from "../models/userModel.js";
import bcrypt from 'bcrypt';

export const createUser = async (req, res) => {
    const {nome, email, senha} = req.body;

    const salt = await bcrypt.genSalt(12);
    const senhaHash = await bcrypt.hash(senha, salt);

    const user = {nome, email, senha: senhaHash};

    try {
        const sameEmail = await User.findOne({where: {email}});

        if(sameEmail){
            return res.status(403).json({message: "Já existe um usuario com este email"});
        }

        const userCreated = await User.create(user)
        res.status(201).json({message: "Usuario criado!", userCreated});
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Erro ao criar usuario" });
    }
}

export const login = async (req, res) => {
    const {email, senha} = req.body;
    try{
        const user = await User.findOne({where: {email}});
        if(!user){
            return res.status(404).json({message: "Não foi encontrado nenhum usuario com este email"});
        }

        const usuario = user.dataValues;

        const compararSenha = await bcrypt.compare(senha, usuario.senha);

        if(!compararSenha){
            return res.status(403).json({message: "A senha não condiz!"})
        }

        res.status(200).json({message: "Usuario logado com sucesso!"})
    }catch(err){
        console.error(err);
        res.status(500).json({message: "Erro ao logar com o usuario"});
    }
}

export const getUser = async (req, res) => {
    try{
        const Users = await User.findAll();
        res.status(200).json(Users);
    }catch(err){
        console.error(err);
        res.status(500).json({message: "Erro ao buscar os usuarios"});
    }
}