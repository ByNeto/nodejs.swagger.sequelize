'use strict';

const Usuario = require('./lib');
const usuario = new Usuario();
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
 *   Usuario:
 *     type: object
 *     required:
 *       - nome
 *       - pass
 *     properties:
 *       nome:
 *         type: string
 *       pass:
 *         type: string
 */
module.exports = (app) => {
/**
 * @swagger
 * /v1/usuario:
 *   post:
 *     summary: Adicionar Usuario
 *     description: Adiciona um objeto usuario no formato JSON
 *     tags:
 *       - Usuario
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: "Adicione um usuario na caixa de texto ao lado como um objeto array JSON"
 *         required: true
 *         schema:
 *           "$ref": "#/definitions/Usuario"
 *     responses:
 *       200:
 *         description: "Operacao Realizada com Sucesso"
 */
app.post('/v1/usuario', (req, res) => {
    const nome = req.body.nome.trim();
    if(!nome){
        console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/usuario => Parameter:nome => Message:Erro Chave ou Parametro Nulo => code:300V1U => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
        res.status(400).send(JSON.stringify([{Route:'POST /v1/usuario',Key:'nome',Message:'Erro Chave ou Parametro Nulo',code:'300V1U',ErrorLevel:'Chave ou Parametro Nulo'}]));
    return false;
    }
    else if(nome.length > 50){
        console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/usuario => Parameter:nome => Message:Erro no Parametro => code:301V1U => ErrorLevel:Parametro nome maximo 50 caracteres',"\x1b[22m\x1b[0m");
        res.status(400).send(JSON.stringify([{Route:'POST /v1/usuario',Parameter:'nome',Message:'Erro no Parametro',code:'301V1U',ErrorLevel:'Parametro nome maximo 50 caracteres'}]));
    return false;
    }
    else{
        const pass = req.body.pass.trim();
        if(!pass){
            console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/usuario => Parameter:pass => Message:Erro Chave ou Parametro Nulo => code:302V1U => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
            res.status(400).send(JSON.stringify([{Route:'POST /v1/usuario',Key:'pass',Message:'Erro Chave ou Parametro Nulo',code:'302V1U',ErrorLevel:'Chave ou Parametro Nulo'}]));
        return false;
        }
        else if(pass.length > 45){
            console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/usuario => Parameter:pass => Message:Erro no Parametro => code:303V1U => ErrorLevel:Parametro pass maximo 45 caracteres',"\x1b[22m\x1b[0m");
            res.status(400).send(JSON.stringify([{Route:'POST /v1/usuario',Parameter:'pass',Message:'Erro no Parametro',code:'303V1U',ErrorLevel:'Parametro pass maximo 45 caracteres'}]));
        return false;
        }
        else{
            const ObjectArrayUsuarioList = {'nome':nome,'pass':pass,'ativo':'S','dt_expira':dateHour};
            usuario.add(ObjectArrayUsuarioList).then((data) => {
                console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:POST /v1/usuario => Message:Cadastro realizado com sucesso => HTTP_Status_Code: 200',"\x1b[22m\x1b[0m");
                res.status(200).send(JSON.stringify([{Route:'POST /v1/usuario',Message:'Cadastro realizado com sucesso',HTTP_Status_Code: 200,Result:data}]));
                const ObjectArrayTblogList = {'data':dateHour,'hora':dthrHour,'descricao':'INSERT Tb Usuario:'+data.id_usuario,'tipo':'INSERT','tabela':'mtdcontrol.usuario','dt_hr':dthrFormat,'desc_compl':JSON.stringify([{Route:'POST /v1/usuario',Message:'Cadastro realizado com sucesso',HTTP_Status_Code: 200,'id_usuario':data.id_usuario}]),'usuario_id_usuario':1}
                tblog.add(ObjectArrayTblogList).then((data) => {
                    console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:POST /v1/usuario => Message:Log inserido com sucesso => Descricao: '+data.descricao+'',"\x1b[22m\x1b[0m");
                }).catch((error) => {
                    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/usuario => Message:Erro ao inserir o log => Error:'+error+'',"\x1b[22m\x1b[0m");
                });
            }).catch((error) => {
                console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/usuario => Message:Cadastro não realizado => HTTP_Status_Code: 400 => Result:'+error+'',"\x1b[22m\x1b[0m");
                res.status(400).send(JSON.stringify([{Route:'/v1/usuario',Message:'Cadastro não realizado',HTTP_Status_Code: 400,Result:error}]));
                const ObjectArrayTblogList = {'data':dateHour,'hora':dthrHour,'descricao':'INSERT Tb Usuario','tipo':'INSERT','tabela':'mtdcontrol.usuario','dt_hr':dthrFormat,'desc_compl':JSON.stringify([{Route:'POST /v1/usuario',Message:'Cadastro não realizado',HTTP_Status_Code: 400,'Error':error}]),'usuario_id_usuario':1}
                tblog.add(ObjectArrayTblogList).then((data) => {
                    console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:POST /v1/usuario => Message:Log inserido com sucesso => Descricao: '+data.descricao+'',"\x1b[22m\x1b[0m");
                }).catch((error) => {
                    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/usuario => Message:Erro ao inserir o log => Error:'+error+'',"\x1b[22m\x1b[0m");
                });
            });
        }
    }
});

 /**
  * @swagger
  * /v1/usuario:
  *   get:
  *     summary: Listar todos os Usuario
  *     description: Listar todo usuario como um array JSON
  *     tags:
  *       - Usuario
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: "Operacao Realizada com Sucesso"
  *         schema:
  *           type: array
  *           items:
  *             "$ref": "#/definitions/Usuario"
  */
app.get('/v1/usuario', (req, res) => {
  usuario.list().then((data) => {
    console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:GET /v1/usuario => Message:Select realizado com sucesso => HTTP_Status_Code: 200',"\x1b[22m\x1b[0m");
    res.status(200).send(JSON.stringify([{Route:'GET /v1/usuario',Message:'Select realizado com sucesso',HTTP_Status_Code: 200,Result:data}]));
  }).catch((error) => {
      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:GET /v1/usuario => Message:Select não realizado => HTTP_Status_Code: 400',"\x1b[22m\x1b[0m");
      res.status(400).send(JSON.stringify([{Route:'GET /v1/usuario',Message:'Select não realizado',HTTP_Status_Code: 400,Result:error}]));
    });
});

 /**
  * @swagger
  * /v1/usuario/{id_usuario}:
  *   get:
  *     summary: Listar Usuario especifico
  *     description: Rota que lista dados de um usuario especifico por meio do parametro {id_usuario} como um objeto array JSON
  *     tags:
  *       - Usuario
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: id_usuario
  *         in: path
  *         description: "id_usuario"
  *         required: true
  *         type: integer
  *     responses:
  *       200:
  *         description: "Operacao Realizada com Sucesso"
  *         schema:
  *           "$ref": "#/definitions/Usuario"
  *       404:
  *         description: "Select usuario não encontrado"
  *       400:
  *         description: "Select usuario não realizado"
  */
app.get('/v1/usuario/:id_usuario', (req, res) => {
  usuario.get(req.params.id_usuario).then((data) => {
    if(data == null) {
      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:GET /v1/usuario/{id_usuario} => Message:Select usuario:'+req.params.id_usuario+', não encontrado => HTTP_Status_Code: 404',"\x1b[22m\x1b[0m");
      res.status(404).send(JSON.stringify([{Route:'GET /v1/usuario/{id_usuario}',Message:'Select usuario:'+req.params.id_usuario+' ,não encontrado',HTTP_Status_Code: 404,Result:data}]));
    return false;
    } 
    else{
      console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:GET /v1/usuario/{id_usuario} => Message:Select usuario:'+data.id_usuario+', realizado com sucesso => HTTP_Status_Code: 200',"\x1b[22m\x1b[0m");
      res.status(200).send(JSON.stringify([{Route:'GET /v1/usuario/{id_usuario}',Message:'Select usuario:'+data.id_usuario+' ,realizado com sucesso',HTTP_Status_Code: 200,Result:data}]));
    }
  })
  .catch((error) => {
    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:GET /v1/usuario/{id_usuario} => Message:Select usuario:'+req.params.id_usuario+', não realizado => HTTP_Status_Code: 400',"\x1b[22m\x1b[0m");
    res.status(400).send(JSON.stringify([{Route:'GET /v1/usuario/{id_usuario}',Message:'Select usuario:'+req.params.id_usuario+', não realizado',HTTP_Status_Code: 400,Result:error}]));
  });
});

 /**
  * @swagger
  * /v1/usuario/{id_usuario}:
  *   delete:
  *     summary: Remover Usuario especifico
  *     description: Rota que remove dados de um usuario especifico por meio do parametro {id_usuario} como um objeto array JSON
  *     tags:
  *       - Usuario
  *     parameters:
  *       - name: id_usuario
  *         in: path
  *         description: "id_usuario"
  *         required: true
  *         type: integer
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: "Operacao Realizada com Sucesso"
  *       404:
  *         description: "Delete usuario não encontrado"
  *       400:
  *         description: "Delete usuario não realizado"
  */
app.delete('/v1/usuario/:id_usuario', (req, res) => {
  usuario.remove(req.params.id_usuario).then((data) => {
      if(data <= 0){
        console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:DELETE /v1/usuario/{id_usuario} => Message:Delete usuario:'+req.params.id_usuario+', não encontrado => HTTP_Status_Code: 404',"\x1b[22m\x1b[0m");
        res.status(404).send(JSON.stringify([{Route:'DELETE /v1/usuario/{id_usuario}',Message:'Delete usuario:'+req.params.id_usuario+' ,não encontrado',HTTP_Status_Code: 404,Result:data}]));
      return false;
      }
      else{
        console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:DELETE /v1/usuario/{id_usuario} => Message:Delete usuario:'+req.params.id_usuario+', realizado com sucesso => HTTP_Status_Code: 200',"\x1b[22m\x1b[0m");
        res.status(200).send(JSON.stringify([{Route:'DELETE /v1/usuario/{id_usuario}',Message:'Delete usuario:'+req.params.id_usuario+' ,realizado com sucesso',HTTP_Status_Code: 200,Result:data}]));
        const ObjectArrayTblogList = {'data':dateHour,'hora':dthrHour,'descricao':'DELETE Tb Usuario:'+req.params.id_usuario,'tipo':'DELETE','tabela':'mtdcontrol.usuario','dt_hr':dthrFormat,'desc_compl':JSON.stringify([{Route:'DELETE /v1/usuario/{id_usuario}',Message:'Delete realizado com sucesso',HTTP_Status_Code: 200,'id_usuario':req.params.id_usuario}]),'usuario_id_usuario':1}
        tblog.add(ObjectArrayTblogList).then((data) => {
            console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:DELETE /v1/usuario/{id_usuario} => Message:Log inserido com sucesso => Descricao: '+data.descricao+'',"\x1b[22m\x1b[0m");
        }).catch((error) => {
            console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:DELETE /v1/usuario/{id_usuario} => Message:Erro ao inserir o log => Error:'+error+'',"\x1b[22m\x1b[0m");
        });
      }
    }).catch((error) => {
      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:GET /v1/usuario/{id_usuario} => Message:Delete usuario:'+req.params.id_usuario+', não realizado => HTTP_Status_Code: 400',"\x1b[22m\x1b[0m");
      res.status(400).send(JSON.stringify([{Route:'DELETE /v1/usuario/{id_usuario}',Message:'Delete usuario:'+req.params.id_usuario+', não realizado',HTTP_Status_Code: 400,Result:error}]));
    });
});

  /**
   * @swagger
   * /v1/usuario/{id_usuario}:
   *   patch:
   *     summary: Atualizar Usuario especifico
   *     description: Rota que atualiza dados de um usuario especifico por meio do parametro {id_usuario} como um objeto array JSON
   *     tags:
   *       - Usuario
   *     parameters:
   *       - name: id_usuario
   *         in: path
   *         description: "id_usuario"
   *         required: true
   *         type: integer
   *       - in: body
   *         name: body
   *         description: "Adicione um usuario na caixa de texto ao lado como um objeto array JSON"
   *         required: true
   *         schema:
   *           "$ref": "#/definitions/Usuario"
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: "Operacao Realizada com Sucesso"
   *       404:
   *         description: "Update usuario não encontrado"
   *       400:
   *         description: "Update usuario não realizado"
   */
app.patch('/v1/usuario/:id_usuario', (req, res) => {
  const nome = req.body.nome.trim();
  if(!nome){
    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/usuario/{id_usuario} => Parameter:nome => Message:Erro Chave ou Parametro Nulo => code:304V1U => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
    res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/usuario/{id_usuario}',Key:'nome',Message:'Erro Chave ou Parametro Nulo',code:'304V1U',ErrorLevel:'Chave ou Parametro Nulo'}]));
  return false;
  }
  else if(nome.length > 50){
    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/usuario/{id_usuario} => Parameter:nome => Message:Erro no Parametro => code:305V1U => ErrorLevel:Parametro nome maximo 50 caracteres',"\x1b[22m\x1b[0m");
    res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/usuario/{id_usuario}',Parameter:'nome',Message:'Erro no Parametro',code:'305V1U',ErrorLevel:'Parametro nome maximo 50 caracteres'}]));
  return false;
  }
  else{
    const pass = req.body.pass.trim();
    if(!pass){
      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/usuario/{id_usuario} => Parameter:pass => Message:Erro Chave ou Parametro Nulo => code:306V1U => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
      res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/usuario/{id_usuario}',Key:'pass',Message:'Erro Chave ou Parametro Nulo',code:'306V1U',ErrorLevel:'Chave ou Parametro Nulo'}]));
    return false;
    }
    else if(pass.length > 45){
      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/usuario/{id_usuario} => Parameter:pass => Message:Erro no Parametro => code:307V1U => ErrorLevel:Parametro pass maximo 45 caracteres',"\x1b[22m\x1b[0m");
      res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/usuario/{id_usuario}',Parameter:'pass',Message:'Erro no Parametro',code:'307V1U',ErrorLevel:'Parametro pass maximo 45 caracteres'}]));
    return false;
    }
    else{
      usuario.update(req.params.id_usuario, req.body).then((data) => {
        if(data <= 0){
          console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/usuario/{id_usuario} => Message:Update usuario:'+req.params.id_usuario+', não encontrado => HTTP_Status_Code: 404',"\x1b[22m\x1b[0m");
          res.status(404).send(JSON.stringify([{Route:'UPDATE /v1/usuario/{id_usuario}',Message:'Update usuario:'+req.params.id_usuario+' ,não encontrado',HTTP_Status_Code: 404,Result:data}]));
        return false;
        }
        else{
          console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/usuario/{id_usuario} => Message:Update usuario:'+req.params.id_usuario+', realizado com sucesso => HTTP_Status_Code: 200',"\x1b[22m\x1b[0m");
          res.status(200).send(JSON.stringify([{Route:'UPDATE /v1/usuario/{id_usuario}',Message:'Update usuario:'+req.params.id_usuario+' ,realizado com sucesso',HTTP_Status_Code: 200,Result:data}]));
          const ObjectArrayTblogList = {'data':dateHour,'hora':dthrHour,'descricao':'UPDATE Tb Usuario:'+req.params.id_usuario,'tipo':'UPDATE','tabela':'mtdcontrol.usuario','dt_hr':dthrFormat,'desc_compl':JSON.stringify([{Route:'UPDATE /v1/usuario/{id_usuario}',Message:'Update realizado com sucesso',HTTP_Status_Code: 200,'id_usuario':req.params.id_usuario}]),'usuario_id_usuario':1}
          tblog.add(ObjectArrayTblogList).then((data) => {
              console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/usuario/{id_usuario} => Message:Log inserido com sucesso => Descricao: '+data.descricao+'',"\x1b[22m\x1b[0m");
          }).catch((error) => {
              console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/usuario/{id_usuario} => Message:Erro ao inserir o log => Error:'+error+'',"\x1b[22m\x1b[0m");
          });
        }
      }).catch((error) => {
        console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/usuario/{id_usuario} => Message:Update usuario:'+req.params.id_usuario+', não realizado => HTTP_Status_Code: 400',"\x1b[22m\x1b[0m");
        res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/usuario/{id_usuario}',Message:'Update usuario:'+req.params.id_usuario+', não realizado',HTTP_Status_Code: 400,Result:error}]));
      });
    }
  }
});

};