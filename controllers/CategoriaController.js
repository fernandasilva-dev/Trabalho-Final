import Categoria from '../models/Categoria.js'

class CategoriaController {
    index = async (req, res) => {
        //let despesas = await Despesa.findAll({ include: 'categoria' })

        if (!req.user) {
            return res.status(401).send("Usuário não autenticado!")
        }
        let categorias = await Categoria.findAll({
            where: { usuario_id: req.user.id },
        })

        res.render('categorias/index', { categorias: categorias })
    }

    cadastrar = async (req, res) => {
        let categorias = await Categoria.findAll() // Busca todas as categorias do banco
        res.render('categorias/cadastro', { categorias }) // Passa as categorias para a view
    }

    salvar = async (req, res) => {
        try {
            console.log("Dados recebidos:", req.body);
    
            if (!req.user) {
                return res.status(401).send("Usuário não autenticado!");
            }
    
            let categoria = {
                nome: req.body.nome,
                usuario_id: req.user.id  // Adicione o ID do usuário autenticado
            };
    
            await Categoria.create(categoria);
            console.log("Categoria cadastrada com sucesso!");
            res.redirect("/categoria");
        } catch (error) {
            console.error("Erro ao cadastrar categoria:", error);
            res.status(500).send("Erro ao salvar categoria");
        }
    };    

    editar = async (req, res) => {
        const id = req.params.id; // Captura o ID da URL
        const categoria = await Categoria.findOne({
            where: { id, usuario_id: req.user.id }
        });
    
        if (!categoria) {
            return res.status(404).send("Categoria não encontrada!");
        }
    
        const categorias = await Categoria.findAll(); // Opcional: Se você precisar passar outras categorias
        res.render('categorias/editar', { categoria, categorias });
    };
    

    atualizar = async (req, res) => {
        let id = req.params.id

        let categoria = await Categoria.findByPk(id)
        if (!categoria) {
            return res.status(404).send("Categoria não encontrada!")
        }
        await Categoria.update(
            {
                nome: req.body.nome
            },
            { where: { id, usuario_id: req.user.id } }
        )

        console.log(`categoria atualizada com successo!`)
        res.redirect("/categoria")
    }

    excluir = async (req, res) => {
        let id = req.params.id

        let categoria = await Categoria.findOne({ where: { id, usuario_id: req.user.id } })
        if (!categoria) {
            return res.status(404).send("Categoria não encontrada!")
        }

        await Categoria.destroy({ where: { id, usuario_id: req.user.id } })

        console.log(`Categoria excluída com sucesso!`)
        res.redirect("/categoria")
    }
}


export default new CategoriaController()