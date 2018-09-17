'use strict';

const Produto = require('./lib');
const produto = new Produto();
const Tblog = require('./lib/log.js');
const tblog = new Tblog();
const dateHour = new Date();
const dia=dateHour.getDate();
const mes=dateHour.getMonth();
const ano=dateHour.getFullYear();
const hora=dateHour.getHours();
const min=dateHour.getMinutes();
const seg=dateHour.getSeconds();
const dthrData=ano+'-'+(mes+1)+'-'+dia;
const dthrHour=hora+':'+ min+':'+seg;
const dthrFormat=dthrData + ' ' + dthrHour;


/**
 * @swagger
 * definition:
 *   Produto:
 *     type: object
 *     required:
 *       - descricao
 *       - desc_compl
 *       - ativo
 *     properties:
 *       descricao:
 *         type: string
 *       desc_compl:
 *         type: string
 *       ativo:
 *         type: string
 */
module.exports = (app) => {
/**
 * @swagger
 * /v1/produto:
 *   post:
 *     summary: Adicionar um Produto
 *     description: Rota que adiciona uma produto como um objeto array JSON
 *     tags:
 *       - Produto
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: "Adicione um produto na caixa de texto ao lado como um objeto array JSON"
 *         required: true
 *         schema:
 *           "$ref": "#/definitions/Produto"
 *     responses:
 *       200:
 *         description: "Operacao Realizada com Sucesso"
 *       400:
 *         description: "Operacao não Realizada"
 */
app.post('/v1/produto', (req, res) => {
  const descricao = req.body.descricao.trim();
	if(!descricao){
    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/produto => Parameter:descricao => Message:Erro Chave ou Parametro Nulo => code:300V1P => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
    res.status(400).send(JSON.stringify([{Route:'POST /v1/produto',Key:'descricao',Message:'Erro Chave ou Parametro Nulo',code:'300V1P',ErrorLevel:'Chave ou Parametro Nulo'}]));
  return false;
  }
	else if(descricao.length > 60){
    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/produto => Parameter:descricao => Message:Erro no Parametro => code:301V1P => ErrorLevel:Parametro descricao maximo 60 caracteres',"\x1b[22m\x1b[0m");
		res.status(400).send(JSON.stringify([{Route:'POST /v1/produto',Parameter:'descricao',Message:'Erro no Parametro',code:'301V1P',ErrorLevel:'Parametro descricao maximo 60 caracteres'}]));
	return false;
  }
  else {
    const desc_compl = req.body.desc_compl.trim();
    if(!desc_compl){
      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/produto => Parameter:desc_compl => Message:Erro Chave ou Parametro Nulo => code:303V1P => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
      res.status(400).send(JSON.stringify([{Route:'POST /v1/produto',Key:'desc_compl',Message:'Erro Chave ou Parametro Nulo',code:'303V1P',ErrorLevel:'Chave ou Parametro Nulo'}]));
    return false;
    }
    else{
      const ativo = req.body.ativo.trim();
      if(!ativo){
        console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/produto => Parameter:ativo => Message:Erro Chave ou Parametro Nulo => code:305V1P => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
        res.status(400).send(JSON.stringify([{Route:'POST /v1/produto',Key:'ativo',Message:'Erro Chave ou Parametro Nulo',code:'305V1P',ErrorLevel:'Chave ou Parametro Nulo'}]));
      return false;
      }
      else if(ativo.length > 1){
        console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/produto => Parameter:ativo => Message:Erro no Parametro => code:306V1P => ErrorLevel:Parametro ativo maximo 1 caracteres',"\x1b[22m\x1b[0m");
        res.status(400).send(JSON.stringify([{Route:'POST /v1/produto',Parameter:'ativo',Message:'Erro no Parametro',code:'306V1P',ErrorLevel:'Parametro ativo maximo 1 caracteres'}]));
      return false;
      }
      else{
         const ObjectArrayProdutoList = {'descricao':descricao,'desc_compl':desc_compl,'ativo':ativo,'dt_alteracao':dateHour,'dt_ativacao':dateHour,'cliente_id_cliente':1};
         produto.add(ObjectArrayProdutoList).then((data) => {
           console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:POST /v1/produto => Message:Cadastro realizado com sucesso => HTTP_Status_Code: 200',"\x1b[22m\x1b[0m");
           res.status(200).send(JSON.stringify([{Route:'/v1/produto',Message:'Cadastro realizado com sucesso',HTTP_Status_Code: 200,Result:data}]));
           const ObjectArrayTblogList = {'data':dateHour,'hora':dthrHour,'descricao':'INSERT Tb Produto:'+data.id_produto,'tipo':'INSERT','tabela':'mtdcontrol.produto','dt_hr':dthrFormat,'desc_compl':JSON.stringify([{Route:'POST /v1/produto',Message:'Cadastro realizado com sucesso',HTTP_Status_Code: 200,'id_produto':data.id_produto}]),'usuario_id_usuario':1}
           tblog.add(ObjectArrayTblogList).then((data) => {
             console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:POST /v1/produto => Message:Log inserido com sucesso => Descricao: '+data.descricao+'',"\x1b[22m\x1b[0m");
           }).catch((error) => {
             console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/produto => Message:Erro ao inserir o log => Error:'+error+'',"\x1b[22m\x1b[0m");
           });
         }).catch((error) => {
           console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/produto => Message:Cadastro não realizado => HTTP_Status_Code: 400 => Result:'+error+'',"\x1b[22m\x1b[0m");
           res.status(400).send(JSON.stringify([{Route:'POST /v1/produto',Message:'Cadastro não realizado',HTTP_Status_Code: 400,Result:error}]));
           const ObjectArrayTblogList = {'data':dateHour,'hora':dthrHour,'descricao':'INSERT Tb Produto','tipo':'INSERT','tabela':'mtdcontrol.produto','dt_hr':dthrFormat,'desc_compl':JSON.stringify([{Route:'POST /v1/produto',Message:'Cadastro não realizado',HTTP_Status_Code: 400,'Error':error}]),'usuario_id_usuario':1}
           tblog.add(ObjectArrayTblogList).then((data) => {
             console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:POST /v1/produto => Message:Log inserido com sucesso => Descricao: '+data.descricao+'',"\x1b[22m\x1b[0m");
           }).catch((error) => {
             console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/produto => Message:Erro ao inserir o log => Error:'+error+'',"\x1b[22m\x1b[0m");
           });
         });
      }//END: else ativo
    }//END: else desc_compl
  }//END: else descricao
});

  /**
   * @swagger
   * /v1/produto:
   *   get:
   *     summary: Listar todos os Produtos
   *     description: Rota que lista todos os produtos como um objeto array JSON
   *     tags:
   *       - Produto
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: "Operacao Realizada com Sucesso"
   *         schema:
   *           type: array
   *           items:
   *             "$ref": "#/definitions/Produto"
   */
app.get('/v1/produto', (req, res) => {
  produto.list().then((data) => {
    console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:GET /v1/produto => Message:Select realizado com sucesso => HTTP_Status_Code: 200',"\x1b[22m\x1b[0m");
    res.status(200).send(JSON.stringify([{Route:'GET /v1/produto',Message:'Select realizado com sucesso',HTTP_Status_Code: 200,Result:data}]));
  }).catch((error) => {
    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:GET /v1/produto => Message:Select não realizado => HTTP_Status_Code: 400',"\x1b[22m\x1b[0m");
    res.status(400).send(JSON.stringify([{Route:'GET /v1/produto',Message:'Select não realizado',HTTP_Status_Code: 400,Result:error}]));
  });
});

  /**
   * @swagger
   * /v1/produto/{id_produto}:
   *   get:
   *     summary: Listar Produto especifico
   *     description: Rota que lista dados de um produto especifico por meio do parametro {id_produto} como um objeto array JSON
   *     tags:
   *       - Produto
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id_produto
   *         in: path
   *         description: "id_produto"
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: "Operacao Realizada com Sucesso"
   *         schema:
   *           "$ref": "#/definitions/Produto"
   *       404:
   *         description: "Select Produto não encontrado"
   *       400:
   *         description: "Select Produto não realizado"
   */
app.get('/v1/produto/:id_produto', (req, res) => {
  produto.get(req.params.id_produto).then((data) => {
    if(data == null) {
      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:GET /v1/produto/{id_produto} => Message:Select produto:'+req.params.id_produto+', não encontrado => HTTP_Status_Code: 404',"\x1b[22m\x1b[0m");
      res.status(404).send(JSON.stringify([{Route:'GET /v1/produto/{id_produto}',Message:'Select produto:'+req.params.id_produto+' ,não encontrado',HTTP_Status_Code: 404,Result:data}]));
    return false;
    }
    else{
      console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:GET /v1/produto/{id_produto} => Message:Select produto:'+data.id_produto+', realizado com sucesso => HTTP_Status_Code: 200',"\x1b[22m\x1b[0m");
      res.status(200).send(JSON.stringify([{Route:'GET /v1/produto/{id_produto}',Message:'Select produto:'+data.id_produto+' ,realizado com sucesso',HTTP_Status_Code: 200,Result:data}]));
    }
    }).catch((error) => {
      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:GET /v1/produto/{id_produto} => Message:Select produto:'+req.params.id_produto+', não realizado => HTTP_Status_Code: 400',"\x1b[22m\x1b[0m");
      res.status(400).send(JSON.stringify([{Route:'GET /v1/produto/{id_produto}',Message:'Select produto:'+req.params.id_produto+', não realizado',HTTP_Status_Code: 400,Result:error}]));
    });
});

  /**
   * @swagger
   * /v1/produto/{id_produto}:
   *   delete:
   *     summary: Remover Produto especifico
   *     description: Rota que remove dados de um produto especifico por meio do parametro {id_produto} como um objeto array JSON
   *     tags:
   *       - Produto
   *     parameters:
   *       - name: id_produto
   *         in: path
   *         description: "id_produto"
   *         required: true
   *         type: integer
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: "Operacao Realizada com Sucesso"
   *       404:
   *         description: "Delete produto não encontrado"
   *       400:
   *         description: "Delete produto não realizado"
   */
  app.delete('/v1/produto/:id_produto', (req, res) => {
    produto.remove(req.params.id_produto).then((data) => {
      if(data <= 0){
        console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:DELETE /v1/produto/{id_produto} => Message:Delete produto:'+req.params.id_produto+', não encontrado => HTTP_Status_Code: 404',"\x1b[22m\x1b[0m");
        res.status(404).send(JSON.stringify([{Route:'DELETE /v1/produto/{id_produto}',Message:'Delete produto:'+req.params.id_produto+' ,não encontrado',HTTP_Status_Code: 404,Result:data}]));
      return false;
      }
      else{
        console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:DELETE /v1/produto/{id_produto} => Message:Delete produto:'+req.params.id_produto+', realizado com sucesso => HTTP_Status_Code: 200',"\x1b[22m\x1b[0m");
        res.status(200).send(JSON.stringify([{Route:'DELETE /v1/produto/{id_produto}',Message:'Delete produto:'+req.params.id_produto+' ,realizado com sucesso',HTTP_Status_Code: 200,Result:data}]));
        const ObjectArrayTblogList = {'data':dateHour,'hora':dthrHour,'descricao':'DELETE Tb Produto:'+req.params.id_produto,'tipo':'DELETE','tabela':'mtdcontrol.produto','dt_hr':dthrFormat,'desc_compl':JSON.stringify([{Route:'DELETE /v1/produto/{id_produto}',Message:'Delete realizado com sucesso',HTTP_Status_Code: 200,'id_produto':req.params.id_produto}]),'usuario_id_usuario':1}
        tblog.add(ObjectArrayTblogList).then((data) => {
            console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:DELETE /v1/produto/{id_produto} => Message:Log inserido com sucesso => Descricao: '+data.descricao+'',"\x1b[22m\x1b[0m");
        }).catch((error) => {
            console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:DELETE /v1/produto/{id_produto} => Message:Erro ao inserir o log => Error:'+error+'',"\x1b[22m\x1b[0m");
        });
      }
     }).catch((error) => {
      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:GET /v1/produto/{id_produto} => Message:Delete produto:'+req.params.id_produto+', não realizado => HTTP_Status_Code: 400',"\x1b[22m\x1b[0m");
      res.status(400).send(JSON.stringify([{Route:'DELETE /v1/produto/{id_produto}',Message:'Delete produto:'+req.params.id_produto+', não realizado',HTTP_Status_Code: 400,Result:error}]));
      });
  });

  /**
   * @swagger
   * /v1/produto/{id_produto}:
   *   patch:
   *     summary: Atualizar Produto especifico
   *     description: Rota que atualiza dados de um produto especifico por meio do parametro {id_produto} como um objeto array JSON
   *     tags:
   *       - Produto
   *     parameters:
   *       - name: id_produto
   *         in: path
   *         description: "id_produto"
   *         required: true
   *         type: integer
   *       - in: body
   *         name: body
   *         description: "Adicione um produto na caixa de texto ao lado como um objeto array JSON"
   *         required: true
   *         schema:
   *           "$ref": "#/definitions/Produto"
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: "Operacao Realizada com Sucesso"
   *       404:
   *         description: "Update produto não encontrado"
   *       400:
   *         description: "Update produto não realizado"
   */
app.patch('/v1/produto/:id_produto', (req, res) => {
  const descricao = req.body.descricao.trim();
	if(!descricao){
    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/produto/{id_produto} => Parameter:descricao => Message:Erro Chave ou Parametro Nulo => code:300V1P => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
    res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/produto/{id_produto}',Key:'descricao',Message:'Erro Chave ou Parametro Nulo',code:'300V1P',ErrorLevel:'Chave ou Parametro Nulo'}]));
  return false;
  }
	else if(descricao.length > 60){
    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/produto/{id_produto} => Parameter:descricao => Message:Erro no Parametro => code:301V1P => ErrorLevel:Parametro descricao maximo 60 caracteres',"\x1b[22m\x1b[0m");
		res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/produto/{id_produto}',Parameter:'descricao',Message:'Erro no Parametro',code:'301V1P',ErrorLevel:'Parametro descricao maximo 60 caracteres'}]));
	return false;
  }
  else {
    const desc_compl = req.body.desc_compl.trim();
    if(!desc_compl){
      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/produto/{id_produto} => Parameter:desc_compl => Message:Erro Chave ou Parametro Nulo => code:303V1P => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
      res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/produto/{id_produto}',Key:'desc_compl',Message:'Erro Chave ou Parametro Nulo',code:'303V1P',ErrorLevel:'Chave ou Parametro Nulo'}]));
    return false;
    }
    else{
      const ativo = req.body.ativo.trim();
      if(!ativo){
        console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/produto/{id_produto} => Parameter:ativo => Message:Erro Chave ou Parametro Nulo => code:305V1P => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
        res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/produto/{id_produto}',Key:'ativo',Message:'Erro Chave ou Parametro Nulo',code:'305V1P',ErrorLevel:'Chave ou Parametro Nulo'}]));
      return false;
      }
      else if(ativo.length > 1){
        console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/produto/{id_produto} => Parameter:ativo => Message:Erro no Parametro => code:306V1P => ErrorLevel:Parametro nome_cli maximo 1 caracteres',"\x1b[22m\x1b[0m");
        res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/produto/{id_produto}',Parameter:'ativo',Message:'Erro no Parametro',code:'306V1P',ErrorLevel:'Parametro nome_cli maximo 1 caracteres'}]));
      return false;
      }
      else{
        produto.update(req.params.id_produto, req.body).then((data) => {
          if(data <= 0){
            console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/produto/{id_produto} => Message:Update produto:'+req.params.id_produto+', não encontrado => HTTP_Status_Code: 404',"\x1b[22m\x1b[0m");
            res.status(404).send(JSON.stringify([{Route:'UPDATE /v1/produto/{id_produto}',Message:'Update produto:'+req.params.id_produto+' ,não encontrado',HTTP_Status_Code: 404,Result:data}]));
          return false;
          }
          else{
            console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/produto/{id_produto} => Message:Update produto:'+req.params.id_produto+', realizado com sucesso => HTTP_Status_Code: 200',"\x1b[22m\x1b[0m");
            res.status(200).send(JSON.stringify([{Route:'UPDATE /v1/produto/{id_produto}',Message:'Update produto:'+req.params.id_produto+' ,realizado com sucesso',HTTP_Status_Code: 200,Result:data}]));
            const ObjectArrayTblogList = {'data':dateHour,'hora':dthrHour,'descricao':'UPDATE Tb Produto:'+req.params.id_produto,'tipo':'UPDATE','tabela':'mtdcontrol.produto','dt_hr':dthrFormat,'desc_compl':JSON.stringify([{Route:'UPDATE /v1/produto/{id_produto}',Message:'Update realizado com sucesso',HTTP_Status_Code: 200,'id_produto':req.params.id_produto}]),'usuario_id_usuario':1}
            tblog.add(ObjectArrayTblogList).then((data) => {
                console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/produto/{id_produto} => Message:Log inserido com sucesso => Descricao: '+data.descricao+'',"\x1b[22m\x1b[0m");
            }).catch((error) => {
                console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/produto/{id_produto} => Message:Erro ao inserir o log => Error:'+error+'',"\x1b[22m\x1b[0m");
            });
          }
        }).catch((error) => {
          console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/produto/{id_produto} => Message:Update produto:'+req.params.id_produto+', não realizado => HTTP_Status_Code: 400',"\x1b[22m\x1b[0m");
          res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/produto/{id_produto}',Message:'Update produto:'+req.params.id_produto+', não realizado',HTTP_Status_Code: 400,Result:error}]));
        });
      }//END: else ativo
    }//END: else desc_compl
  }//END: else descricao
});

};
