const Sequelize = require('sequelize');
const model = require('../models');
const { Op } = require('sequelize')
const financa = model.Financa;

module.exports = {
    async create(req, res){
        try {
            const { 
                data,
                categoria_id,
                titulo,
                valor
             } = req.body
            const Financa = await financa.create({ 
                data,
                categoria_id,
                titulo,
                valor
            })

            return res.json({ msg: "Finança cadastrada com sucesso" })
        } catch (error) {
            return response.json({ msg: "Não foi possivel cadastrar a Finança" + error })
        }
    },
    async update(req, res){
        try {
            const { id } = req.params;
            const {
                data,
                categoria_id,
                titulo,
                valor
            } = req.body

            const Financa = await financa.update({ 
                data,
                categoria_id,
                titulo,
                valor
            }, { where: { id } })
            return res.json({ msg: "Finança alterada com sucesso" })


        } catch (error) {
            return response.json({ msg: "Erro ao alterar a Finança" + error })
        }
    },
    async findAll(req, res){
        try {
            //paginação para mostrar os dados
            const {page} = req.params;
            const limite = 5;

            const Financa = await financa.findAndCountAll({
                order:[
                    ['data', 'ASC'],
                ],
                include:{
                    all:true
                },
                limit: limite,
                offset: parseInt(page)
            })
            return res.json(Financa)

        } catch (error) {
            return res.json({ msg: 'Erro ao mostrar as finanças '+ error })
        }
    },
    async findAllDate(req, res){
        try {
            //paginação para mostrar os dados
            const {page, dataInicial, dataFinal } = req.params;
            const limite = 5;

            const Financa = await financa.findAndCountAll({
                limit: limite,
                offset: parseInt(page),
                where:{
                    data:{
                        [Op.gte]: dataInicial,
                        [Op.lte] : dataFinal
                    }
                }
            })
            return res.json(Financa)

        } catch (error) {
            return res.json({ msg: 'Erro ao mostrar as finanças '+ error })
        }
    },
    async delete(req, res){
        try {
            const { id } = req.params;
            const Finance = await financa.destroy({
                where:{
                    id: id
                }
            })

            return res.json({ msg:"Deletado com sucesso" })
        } catch (error) {
            return res.json({ msg:"Falha ao deletar "+ error })
        }
    },
    async findById (req, res){

        try {
            const{ id } = req.params;
            let saldo = 0;
            let soma = 0;
    
            const Financa = await financa.findAll({
                where:{
                    categoria_id: parseInt(id)
                },
                include:{
                    all: true
                }
            });
    
            if (financa.length === 0){
                return res.json({ saldo })
            }else{
                for(soma of Financa){
                    saldo = saldo + soma.valor
                }
                return res.json({ saldo })
            }

        } catch (error) {
            return res.json({ msg:"Erro ao listar finanças por categoria "+ error })
        }
    }
}