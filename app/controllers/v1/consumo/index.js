'use strict';

const Consumo = require('./lib');
const consumo = new Consumo();
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
 *   Consumo:
 *     type: object
 *     required:
 *       - tipo
 *       - desc
 *       - qtde
 *     properties:
 *       tipo:
 *         type: string
 *       desc:
 *         type: string
 *       qtde:
 *         type: integer
 */
module.exports = (app) => {
/**
 * @swagger
 * /v1/consumo:
 *   post:
 *     summary: Adicionar um Consumo
 *     description: Rota que adiciona uma consumo como um objeto array JSON
 *     tags:
 *       - Consumo
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: "Adicione um consumo na caixa de texto ao lado como um objeto array JSON"
 *         required: true
 *         schema:
 *           "$ref": "#/definitions/Consumo"
 *     responses:
 *       200:
 *         description: "Operacao Realizada com Sucesso"
 *       400:
 *         description: "Operacao não Realizada"
 */
app.post('/v1/consumo', (req, res) => {
  const tipo = req.body.tipo.trim();
	if(!tipo){
    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/consumo => Parameter:tipo => Message:Erro Chave ou Parametro Nulo => code:300V1C => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
    res.status(400).send(JSON.stringify([{Route:'POST /v1/consumo',Key:'tipo',Message:'Erro Chave ou Parametro Nulo',code:'300V1C',ErrorLevel:'Chave ou Parametro Nulo'}]));
  return false;
  }
	else if(tipo.length > 45){
    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/consumo => Parameter:tipo => Message:Erro no Parametro => code:301V1C => ErrorLevel:Parametro tipo maximo 45 caracteres',"\x1b[22m\x1b[0m");
		res.status(400).send(JSON.stringify([{Route:'POST /v1/consumo',Parameter:'tipo',Message:'Erro no Parametro',code:'301V1C',ErrorLevel:'Parametro tipo maximo 45 caracteres'}]));
	return false;
  }
  else {
    const desc = req.body.desc.trim();
    if(!desc){
      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/consumo => Parameter:desc => Message:Erro Chave ou Parametro Nulo => code:303V1C => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
      res.status(400).send(JSON.stringify([{Route:'POST /v1/consumo',Key:'desc',Message:'Erro Chave ou Parametro Nulo',code:'303V1C',ErrorLevel:'Chave ou Parametro Nulo'}]));
    return false;
    }
    else if(desc.length > 45){
      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/consumo => Parameter:desc => Message:Erro no Parametro => code:304V1C => ErrorLevel:Parametro desc maximo 45 caracteres',"\x1b[22m\x1b[0m");
      res.status(400).send(JSON.stringify([{Route:'POST /v1/consumo',Parameter:'desc',Message:'Erro no Parametro',code:'304V1C',ErrorLevel:'Parametro desc maximo 45 caracteres'}]));
    return false;
    }
    else{
      const qtde = req.body.qtde;
      if(!qtde){
        console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/consumo => Parameter:qtde => Message:Erro Chave ou Parametro Nulo => code:305V1C => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
        res.status(400).send(JSON.stringify([{Route:'POST /v1/consumo',Key:'qtde',Message:'Erro Chave ou Parametro Nulo',code:'305V1C',ErrorLevel:'Chave ou Parametro Nulo'}]));
      return false;
      }
      else if(qtde.length > 11){
        console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/consumo => Parameter:qtde => Message:Erro no Parametro => code:306V1C => ErrorLevel:Parametro qtde maximo 11 caracteres',"\x1b[22m\x1b[0m");
        res.status(400).send(JSON.stringify([{Route:'POST /v1/consumo',Parameter:'qtde',Message:'Erro no Parametro',code:'306V1C',ErrorLevel:'Parametro qtde maximo 11 caracteres'}]));
      return false;
      }
      else{
         const ObjectArrayConsumoList = {'data':dateHour,'hora':dthrHour,'tipo':tipo,'dt_hr':dthrFormat,'desc':desc,'qtde':qtde,'produto_id_produto':1,'cliente_id_cliente':1
          };
         consumo.add(ObjectArrayConsumoList).then((data) => {
           console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:POST /v1/consumo => Message:Cadastro realizado com sucesso => HTTP_Status_Code: 200',"\x1b[22m\x1b[0m");
           res.status(200).send(JSON.stringify([{Route:'/v1/consumo',Message:'Cadastro realizado com sucesso',HTTP_Status_Code: 200,Result:data}]));
           const ObjectArrayTblogList = {'data':dateHour,'hora':dthrHour,'descricao':'INSERT Tb Consumo:'+data.seq,'tipo':'INSERT','tabela':'mtdcontrol.consumo','dt_hr':dthrFormat,'desc_compl':JSON.stringify([{Route:'POST /v1/consumo',Message:'Cadastro realizado com sucesso',HTTP_Status_Code: 200,'seq':data.seq}]),'usuario_id_usuario':1}
           tblog.add(ObjectArrayTblogList).then((data) => {
             console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:POST /v1/consumo => Message:Log inserido com sucesso => Descricao: '+data.descricao+'',"\x1b[22m\x1b[0m");
           }).catch((error) => {
             console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/consumo => Message:Erro ao inserir o log => Error:'+error+'',"\x1b[22m\x1b[0m");
           });
         }).catch((error) => {
           console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/consumo => Message:Cadastro não realizado => HTTP_Status_Code: 400 => Result:'+error+'',"\x1b[22m\x1b[0m");
           res.status(400).send(JSON.stringify([{Route:'POST /v1/consumo',Message:'Cadastro não realizado',HTTP_Status_Code: 400,Result:error}]));
           const ObjectArrayTblogList = {'data':dateHour,'hora':dthrHour,'descricao':'INSERT Tb Consumo','tipo':'INSERT','tabela':'mtdcontrol.consumo','dt_hr':dthrFormat,'desc_compl':JSON.stringify([{Route:'POST /v1/consumo',Message:'Cadastro não realizado',HTTP_Status_Code: 400,'Error':error}]),'usuario_id_usuario':1}
           tblog.add(ObjectArrayTblogList).then((data) => {
             console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:POST /v1/consumo => Message:Log inserido com sucesso => Descricao: '+data.descricao+'',"\x1b[22m\x1b[0m");
           }).catch((error) => {
             console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/consumo => Message:Erro ao inserir o log => Error:'+error+'',"\x1b[22m\x1b[0m");
           });
         });
      }//END: else qtde
    }//END: else desc
  }//END: else tipo
});

  /**
   * @swagger
   * /v1/consumo:
   *   get:
   *     summary: Listar todos os consumos
   *     description: Rota que lista todos os consumos como um objeto array JSON
   *     tags:
   *       - Consumo
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: "Operacao Realizada com Sucesso"
   *         schema:
   *           type: array
   *           items:
   *             "$ref": "#/definitions/Consumo"
   */
app.get('/v1/consumo', (req, res) => {
  consumo.list().then((data) => {
    console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:GET /v1/consumo => Message:Select realizado com sucesso => HTTP_Status_Code: 200',"\x1b[22m\x1b[0m");
    res.status(200).send(JSON.stringify([{Route:'GET /v1/consumo',Message:'Select realizado com sucesso',HTTP_Status_Code: 200,Result:data}]));
  }).catch((error) => {
    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:GET /v1/consumo => Message:Select não realizado => HTTP_Status_Code: 400',"\x1b[22m\x1b[0m");
    res.status(400).send(JSON.stringify([{Route:'GET /v1/consumo',Message:'Select não realizado',HTTP_Status_Code: 400,Result:error}]));
  });
});

  /**
   * @swagger
   * /v1/consumo/{seq}:
   *   get:
   *     summary: Listar Consumo especifico
   *     description: Rota que lista dados de um consumo especifico por meio do parametro {seq} como um objeto array JSON
   *     tags:
   *       - Consumo
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: seq
   *         in: path
   *         description: "seq"
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: "Operacao Realizada com Sucesso"
   *         schema:
   *           "$ref": "#/definitions/Consumo"
   *       404:
   *         description: "Select Consumo não encontrado"
   *       400:
   *         description: "Select Consumo não realizado"
   */
app.get('/v1/consumo/:seq', (req, res) => {
  consumo.get(req.params.seq).then((data) => {
    if(data == null) {
      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:GET /v1/consumo/{seq} => Message:Select consumo:'+req.params.seq+', não encontrado => HTTP_Status_Code: 404',"\x1b[22m\x1b[0m");
      res.status(404).send(JSON.stringify([{Route:'GET /v1/consumo/{seq}',Message:'Select consumo:'+req.params.seq+' ,não encontrado',HTTP_Status_Code: 404,Result:data}]));
    return false;
    }
    else{
      console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:GET /v1/consumo/{seq} => Message:Select consumo:'+data.seq+', realizado com sucesso => HTTP_Status_Code: 200',"\x1b[22m\x1b[0m");
      res.status(200).send(JSON.stringify([{Route:'GET /v1/consumo/{seq}',Message:'Select consumo:'+data.seq+' ,realizado com sucesso',HTTP_Status_Code: 200,Result:data}]));
    }
    }).catch((error) => {
      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:GET /v1/consumo/{seq} => Message:Select consumo:'+req.params.seq+', não realizado => HTTP_Status_Code: 400',"\x1b[22m\x1b[0m");
      res.status(400).send(JSON.stringify([{Route:'GET /v1/consumo/{seq}',Message:'Select consumo:'+req.params.seq+', não realizado',HTTP_Status_Code: 400,Result:error}]));
    });
});

  /**
   * @swagger
   * /v1/consumo/{seq}:
   *   delete:
   *     summary: Remover Consumo especifico
   *     description: Rota que remove dados de um consumo especifico por meio do parametro {seq} como um objeto array JSON
   *     tags:
   *       - Consumo
   *     parameters:
   *       - name: seq
   *         in: path
   *         description: "seq"
   *         required: true
   *         type: integer
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: "Operacao Realizada com Sucesso"
   *       404:
   *         description: "Delete consumo não encontrado"
   *       400:
   *         description: "Delete consumo não realizado"
   */
  app.delete('/v1/consumo/:seq', (req, res) => {
    consumo.remove(req.params.seq).then((data) => {
      if(data <= 0){
        console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:DELETE /v1/consumo/{seq} => Message:Delete consumo:'+req.params.seq+', não encontrado => HTTP_Status_Code: 404',"\x1b[22m\x1b[0m");
        res.status(404).send(JSON.stringify([{Route:'DELETE /v1/consumo/{seq}',Message:'Delete consumo:'+req.params.seq+' ,não encontrado',HTTP_Status_Code: 404,Result:data}]));
      return false;
      }
      else{
        console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:DELETE /v1/consumo/{seq} => Message:Delete consumo:'+req.params.seq+', realizado com sucesso => HTTP_Status_Code: 200',"\x1b[22m\x1b[0m");
        res.status(200).send(JSON.stringify([{Route:'DELETE /v1/consumo/{seq}',Message:'Delete consumo:'+req.params.seq+' ,realizado com sucesso',HTTP_Status_Code: 200,Result:data}]));
        const ObjectArrayTblogList = {'data':dateHour,'hora':dthrHour,'descricao':'DELETE Tb Consumo:'+req.params.seq,'tipo':'DELETE','tabela':'mtdcontrol.consumo','dt_hr':dthrFormat,'desc_compl':JSON.stringify([{Route:'DELETE /v1/consumo/{seq}',Message:'Delete realizado com sucesso',HTTP_Status_Code: 200,'seq':req.params.seq}]),'usuario_id_usuario':1}
        tblog.add(ObjectArrayTblogList).then((data) => {
            console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:DELETE /v1/consumo/{seq} => Message:Log inserido com sucesso => Descricao: '+data.descricao+'',"\x1b[22m\x1b[0m");
        }).catch((error) => {
            console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:DELETE /v1/consumo/{seq} => Message:Erro ao inserir o log => Error:'+error+'',"\x1b[22m\x1b[0m");
        });
      }
     }).catch((error) => {
      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:GET /v1/consumo/{seq} => Message:Delete consumo:'+req.params.seq+', não realizado => HTTP_Status_Code: 400',"\x1b[22m\x1b[0m");
      res.status(400).send(JSON.stringify([{Route:'DELETE /v1/consumo/{seq}',Message:'Delete consumo:'+req.params.seq+', não realizado',HTTP_Status_Code: 400,Result:error}]));
      });
  });

  /**
   * @swagger
   * /v1/consumo/{seq}:
   *   patch:
   *     summary: Atualizar Consumo especifico
   *     description: Rota que atualiza dados de um consumo especifico por meio do parametro {seq} como um objeto array JSON
   *     tags:
   *       - Consumo
   *     parameters:
   *       - name: seq
   *         in: path
   *         description: "seq"
   *         required: true
   *         type: integer
   *       - in: body
   *         name: body
   *         description: "Adicione um consumo na caixa de texto ao lado como um objeto array JSON"
   *         required: true
   *         schema:
   *           "$ref": "#/definitions/Consumo"
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: "Operacao Realizada com Sucesso"
   *       404:
   *         description: "Update consumo não encontrado"
   *       400:
   *         description: "Update consumo não realizado"
   */
app.patch('/v1/consumo/:seq', (req, res) => {
  const tipo = req.body.tipo.trim();
	if(!tipo){
    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/consumo/{seq} => Parameter:tipo => Message:Erro Chave ou Parametro Nulo => code:300V1C => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
    res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/consumo/{seq}',Key:'tipo',Message:'Erro Chave ou Parametro Nulo',code:'300V1C',ErrorLevel:'Chave ou Parametro Nulo'}]));
  return false;
  }
	else if(tipo.length > 45){
    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/consumo/{seq} => Parameter:tipo => Message:Erro no Parametro => code:301V1C => ErrorLevel:Parametro tipo maximo 45 caracteres',"\x1b[22m\x1b[0m");
		res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/consumo/{seq}',Parameter:'tipo',Message:'Erro no Parametro',code:'301V1C',ErrorLevel:'Parametro tipo maximo 45 caracteres'}]));
	return false;
  }
  else {
    const desc = req.body.desc.trim();
    if(!desc){
      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/consumo/{seq} => Parameter:desc => Message:Erro Chave ou Parametro Nulo => code:303V1C => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
      res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/consumo/{seq}',Key:'desc',Message:'Erro Chave ou Parametro Nulo',code:'303V1C',ErrorLevel:'Chave ou Parametro Nulo'}]));
    return false;
    }
    else if(desc.length > 45){
      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/consumo/{seq} => Parameter:desc => Message:Erro no Parametro => code:304V1C => ErrorLevel:Parametro desc maximo 45 caracteres',"\x1b[22m\x1b[0m");
      res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/consumo/{seq}',Parameter:'desc',Message:'Erro no Parametro',code:'304V1C',ErrorLevel:'Parametro desc maximo 45 caracteres'}]));
    return false;
    }
    else{
      const qtde = req.body.qtde;
      if(!qtde){
        console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/consumo/{seq} => Parameter:qtde => Message:Erro Chave ou Parametro Nulo => code:305V1C => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
        res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/consumo/{seq}',Key:'qtde',Message:'Erro Chave ou Parametro Nulo',code:'305V1C',ErrorLevel:'Chave ou Parametro Nulo'}]));
      return false;
      }
      else if(qtde.length > 11){
        console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/consumo/{seq} => Parameter:qtde => Message:Erro no Parametro => code:306V1C => ErrorLevel:Parametro qtde maximo 11 caracteres',"\x1b[22m\x1b[0m");
        res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/consumo/{seq}',Parameter:'qtde',Message:'Erro no Parametro',code:'306V1C',ErrorLevel:'Parametro qtde maximo 11 caracteres'}]));
      return false;
      }
      else{
        consumo.update(req.params.seq, req.body).then((data) => {
          if(data <= 0){
            console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/consumo/{seq} => Message:Update consumo:'+req.params.seq+', não encontrado => HTTP_Status_Code: 404',"\x1b[22m\x1b[0m");
            res.status(404).send(JSON.stringify([{Route:'UPDATE /v1/consumo/{seq}',Message:'Update consumo:'+req.params.seq+' ,não encontrado',HTTP_Status_Code: 404,Result:data}]));
          return false;
          }
          else{
            console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/consumo/{seq} => Message:Update consumo:'+req.params.seq+', realizado com sucesso => HTTP_Status_Code: 200',"\x1b[22m\x1b[0m");
            res.status(200).send(JSON.stringify([{Route:'UPDATE /v1/consumo/{seq}',Message:'Update consumo:'+req.params.seq+' ,realizado com sucesso',HTTP_Status_Code: 200,Result:data}]));
            const ObjectArrayTblogList = {'data':dateHour,'hora':dthrHour,'descricao':'UPDATE Tb Consumo:'+req.params.seq,'tipo':'UPDATE','tabela':'mtdcontrol.consumo','dt_hr':dthrFormat,'desc_compl':JSON.stringify([{Route:'UPDATE /v1/consumo/{seq}',Message:'Update realizado com sucesso',HTTP_Status_Code: 200,'seq':req.params.seq}]),'usuario_id_usuario':1}
            tblog.add(ObjectArrayTblogList).then((data) => {
                console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/consumo/{seq} => Message:Log inserido com sucesso => Descricao: '+data.descricao+'',"\x1b[22m\x1b[0m");
            }).catch((error) => {
                console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/consumo/{seq} => Message:Erro ao inserir o log => Error:'+error+'',"\x1b[22m\x1b[0m");
            });
          }
        }).catch((error) => {
          console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/consumo/{seq} => Message:Update consumo:'+req.params.seq+', não realizado => HTTP_Status_Code: 400',"\x1b[22m\x1b[0m");
          res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/consumo/{seq}',Message:'Update consumo:'+req.params.seq+', não realizado',HTTP_Status_Code: 400,Result:error}]));
        });
      }//END: else qtde
    }//END: else desc
  }//END: else tipo
});

};
