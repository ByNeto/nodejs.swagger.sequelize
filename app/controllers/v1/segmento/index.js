'use strict';

const Segmento = require('./lib');
const segmento = new Segmento();
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
 *   Segmento:
 *     type: object
 *     required:
 *       - desc_segmento
 *     properties:
 *       desc_segmento:
 *         type: string
 */
module.exports = (app) => {
/**
 * @swagger
 * /v1/segmento:
 *   post:
 *     summary: Adicionar Segmento
 *     description: Adiciona um objeto segmento no formato JSON
 *     tags:
 *       - Segmento
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: "Adicione um segmento na caixa de texto ao lado como um objeto array JSON"
 *         required: true
 *         schema:
 *           "$ref": "#/definitions/Segmento"
 *     responses:
 *       200:
 *         description: "Operacao Realizada com Sucesso"
 */
app.post('/v1/segmento', (req, res) => {
    const desc_segmento = req.body.desc_segmento.trim();
    if(!desc_segmento){
        console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/segmento => Parameter:segmento => Message:Erro Chave ou Parametro Nulo => code:300V1S => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
        res.status(400).send(JSON.stringify([{Route:'POST /v1/segmento',Key:'desc_segmento',Message:'Erro Chave ou Parametro Nulo',code:'300V1S',ErrorLevel:'Chave ou Parametro Nulo'}]));
    return false;
    }
    else if(desc_segmento.length > 45){
        console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/segmento => Parameter:segmento => Message:Erro no Parametro => code:301V1S => ErrorLevel:Parametro nome maximo 45 caracteres',"\x1b[22m\x1b[0m");
        res.status(400).send(JSON.stringify([{Route:'POST /v1/segmento',Parameter:'segmento',Message:'Erro no Parametro',code:'301V1S',ErrorLevel:'Parametro nome maximo 45 caracteres'}]));
    return false;
    }
    else{
        const ObjectArraySegmentoList = {'desc_segmento':desc_segmento};
        segmento.add(ObjectArraySegmentoList).then((data) => {
            console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:POST /v1/segmento => Message:Cadastro realizado com sucesso => HTTP_Status_Code: 200',"\x1b[22m\x1b[0m");
            res.status(200).send(JSON.stringify([{Route:'POST /v1/segmento',Message:'Cadastro realizado com sucesso',HTTP_Status_Code: 200,Result:data}]));
            const ObjectArrayTblogList = {'data':dateHour,'hora':dthrHour,'descricao':'INSERT Tb Segmento:'+data.id_segmento,'tipo':'INSERT','tabela':'mtdcontrol.segmento','dt_hr':dthrFormat,'desc_compl':JSON.stringify([{Route:'POST /v1/segmento',Message:'Cadastro realizado com sucesso',HTTP_Status_Code: 200,'id_segmento':data.id_segmento}]),'usuario_id_usuario':1}
            tblog.add(ObjectArrayTblogList).then((data) => {
                console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:POST /v1/segmento => Message:Log inserido com sucesso => Descricao: '+data.descricao+'',"\x1b[22m\x1b[0m");
            }).catch((error) => {
                console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/segmento => Message:Erro ao inserir o log => Error:'+error+'',"\x1b[22m\x1b[0m");
            });
        }).catch((error) => {
            console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/segmento => Message:Cadastro não realizado => HTTP_Status_Code: 400 => Result:'+error+'',"\x1b[22m\x1b[0m");
            res.status(400).send(JSON.stringify([{Route:'/v1/segmento',Message:'Cadastro não realizado',HTTP_Status_Code: 400,Result:error}]));
            const ObjectArrayTblogList = {'data':dateHour,'hora':dthrHour,'descricao':'INSERT Tb Segmento','tipo':'INSERT','tabela':'mtdcontrol.segmento','dt_hr':dthrFormat,'desc_compl':JSON.stringify([{Route:'POST /v1/segmento',Message:'Cadastro não realizado',HTTP_Status_Code: 400,'Error':error}]),'usuario_id_usuario':1}
            tblog.add(ObjectArrayTblogList).then((data) => {
                console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:POST /v1/segmento => Message:Log inserido com sucesso => Descricao: '+data.descricao+'',"\x1b[22m\x1b[0m");
            }).catch((error) => {
                console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/segmento => Message:Erro ao inserir o log => Error:'+error+'',"\x1b[22m\x1b[0m");
            });
        });
    }

});

 /**
  * @swagger
  * /v1/segmento:
  *   get:
  *     summary: Listar todos os Segmento
  *     description: Listar todo segmento como um array JSON
  *     tags:
  *       - Segmento
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: "Operacao Realizada com Sucesso"
  *         schema:
  *           type: array
  *           items:
  *             "$ref": "#/definitions/Segmento"
  */
app.get('/v1/segmento', (req, res) => {
  segmento.list().then((data) => {
    console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:GET /v1/segmento => Message:Select realizado com sucesso => HTTP_Status_Code: 200',"\x1b[22m\x1b[0m");
    res.status(200).send(JSON.stringify([{Route:'GET /v1/segmento',Message:'Select realizado com sucesso',HTTP_Status_Code: 200,Result:data}]));
  }).catch((error) => {
      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:GET /v1/segmento => Message:Select não realizado => HTTP_Status_Code: 400',"\x1b[22m\x1b[0m");
      res.status(400).send(JSON.stringify([{Route:'GET /v1/segmento',Message:'Select não realizado',HTTP_Status_Code: 400,Result:error}]));
    });
});

 /**
  * @swagger
  * /v1/segmento/{id_segmento}:
  *   get:
  *     summary: Listar Segmento especifico
  *     description: Rota que lista dados de um segmento especifico por meio do parametro {id_segmento} como um objeto array JSON
  *     tags:
  *       - Segmento
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: id_segmento
  *         in: path
  *         description: "id_segmento"
  *         required: true
  *         type: integer
  *     responses:
  *       200:
  *         description: "Operacao Realizada com Sucesso"
  *         schema:
  *           "$ref": "#/definitions/Segmento"
  *       404:
  *         description: "Select segmento não encontrado"
  *       400:
  *         description: "Select segmento não realizado"
  */
app.get('/v1/segmento/:id_segmento', (req, res) => {
  segmento.get(req.params.id_segmento).then((data) => {
    if(data == null) {
      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:GET /v1/segmento/{id_segmento} => Message:Select segmento:'+req.params.id_segmento+', não encontrado => HTTP_Status_Code: 404',"\x1b[22m\x1b[0m");
      res.status(404).send(JSON.stringify([{Route:'GET /v1/segmento/{id_segmento}',Message:'Select segmento:'+req.params.id_segmento+' ,não encontrado',HTTP_Status_Code: 404,Result:data}]));
    return false;
    } 
    else{
      console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:GET /v1/segmento/{id_segmento} => Message:Select segmento:'+data.id_segmento+', realizado com sucesso => HTTP_Status_Code: 200',"\x1b[22m\x1b[0m");
      res.status(200).send(JSON.stringify([{Route:'GET /v1/segmento/{id_segmento}',Message:'Select segmento:'+data.id_segmento+' ,realizado com sucesso',HTTP_Status_Code: 200,Result:data}]));
    }
  })
  .catch((error) => {
    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:GET /v1/segmento/{id_segmento} => Message:Select segmento:'+req.params.id_segmento+', não realizado => HTTP_Status_Code: 400',"\x1b[22m\x1b[0m");
    res.status(400).send(JSON.stringify([{Route:'GET /v1/segmento/{id_segmento}',Message:'Select segmento:'+req.params.id_segmento+', não realizado',HTTP_Status_Code: 400,Result:error}]));
  });
});

 /**
  * @swagger
  * /v1/segmento/{id_segmento}:
  *   delete:
  *     summary: Remover Segmento especifico
  *     description: Rota que remove dados de um segmento especifico por meio do parametro {id_segmento} como um objeto array JSON
  *     tags:
  *       - Segmento
  *     parameters:
  *       - name: id_segmento
  *         in: path
  *         description: "id_segmento"
  *         required: true
  *         type: integer
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: "Operacao Realizada com Sucesso"
  *       404:
  *         description: "Delete segmento não encontrado"
  *       400:
  *         description: "Delete segmento não realizado"
  */
app.delete('/v1/segmento/:id_segmento', (req, res) => {
  segmento.remove(req.params.id_segmento).then((data) => {
      if(data <= 0){
        console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:DELETE /v1/segmento/{id_segmento} => Message:Delete segmento:'+req.params.id_segmento+', não encontrado => HTTP_Status_Code: 404',"\x1b[22m\x1b[0m");
        res.status(404).send(JSON.stringify([{Route:'DELETE /v1/segmento/{id_segmento}',Message:'Delete segmento:'+req.params.id_segmento+' ,não encontrado',HTTP_Status_Code: 404,Result:data}]));
      return false;
      }
      else{
        console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:DELETE /v1/segmento/{id_segmento} => Message:Delete segmento:'+req.params.id_segmento+', realizado com sucesso => HTTP_Status_Code: 200',"\x1b[22m\x1b[0m");
        res.status(200).send(JSON.stringify([{Route:'DELETE /v1/segmento/{id_segmento}',Message:'Delete segmento:'+req.params.id_segmento+' ,realizado com sucesso',HTTP_Status_Code: 200,Result:data}]));
        const ObjectArrayTblogList = {'data':dateHour,'hora':dthrHour,'descricao':'DELETE Tb segmento:'+req.params.id_segmento,'tipo':'DELETE','tabela':'mtdcontrol.segmento','dt_hr':dthrFormat,'desc_compl':JSON.stringify([{Route:'DELETE /v1/segmento/{id_segmento}',Message:'Delete realizado com sucesso',HTTP_Status_Code: 200,'id_segmento':req.params.id_segmento}]),'usuario_id_usuario':1}
        tblog.add(ObjectArrayTblogList).then((data) => {
            console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:DELETE /v1/segmento/{id_segmento} => Message:Log inserido com sucesso => Descricao: '+data.descricao+'',"\x1b[22m\x1b[0m");
        }).catch((error) => {
            console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:DELETE /v1/segmento/{id_segmento} => Message:Erro ao inserir o log => Error:'+error+'',"\x1b[22m\x1b[0m");
        });
      }
    }).catch((error) => {
      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:GET /v1/segmento/{id_segmento} => Message:Delete segmento:'+req.params.id_segmento+', não realizado => HTTP_Status_Code: 400',"\x1b[22m\x1b[0m");
      res.status(400).send(JSON.stringify([{Route:'DELETE /v1/segmento/{id_segmento}',Message:'Delete segmento:'+req.params.id_segmento+', não realizado',HTTP_Status_Code: 400,Result:error}]));
    });
});

  /**
   * @swagger
   * /v1/segmento/{id_segmento}:
   *   patch:
   *     summary: Atualizar Segmento especifico
   *     description: Rota que atualiza dados de um segmento especifico por meio do parametro {id_segmento} como um objeto array JSON
   *     tags:
   *       - Segmento
   *     parameters:
   *       - name: id_segmento
   *         in: path
   *         description: "id_segmento"
   *         required: true
   *         type: integer
   *       - in: body
   *         name: body
   *         description: "Adicione um segmento na caixa de texto ao lado como um objeto array JSON"
   *         required: true
   *         schema:
   *           "$ref": "#/definitions/Segmento"
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: "Operacao Realizada com Sucesso"
   *       404:
   *         description: "Update segmento não encontrado"
   *       400:
   *         description: "Update segmento não realizado"
   */
app.patch('/v1/segmento/:id_segmento', (req, res) => {
  const desc_segmento = req.body.desc_segmento.trim();
  if(!desc_segmento){
    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/segmento/{id_segmento} => Parameter:desc_segmento => Message:Erro Chave ou Parametro Nulo => code:304V1S => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
    res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/segmento/{id_segmento}',Key:'desc_segmento',Message:'Erro Chave ou Parametro Nulo',code:'304V1S',ErrorLevel:'Chave ou Parametro Nulo'}]));
  return false;
  }
  else if(desc_segmento.length > 45){
    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/segmento/{id_segmento} => Parameter:desc_segmento => Message:Erro no Parametro => code:305V1S => ErrorLevel:Parametro nome maximo 45 caracteres',"\x1b[22m\x1b[0m");
    res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/segmento/{id_segmento}',Parameter:'desc_segmento',Message:'Erro no Parametro',code:'305V1S',ErrorLevel:'Parametro nome maximo 45 caracteres'}]));
  return false;
  }
  else{
    segmento.update(req.params.id_segmento, req.body).then((data) => {
      if(data <= 0){
        console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/segmento/{id_segmento} => Message:Update segmento:'+req.params.id_segmento+', não encontrado => HTTP_Status_Code: 404',"\x1b[22m\x1b[0m");
        res.status(404).send(JSON.stringify([{Route:'UPDATE /v1/segmento/{id_segmento}',Message:'Update segmento:'+req.params.id_segmento+' ,não encontrado',HTTP_Status_Code: 404,Result:data}]));
      return false;
      }
      else{
        console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/segmento/{id_segmento} => Message:Update segmento:'+req.params.id_segmento+', realizado com sucesso => HTTP_Status_Code: 200',"\x1b[22m\x1b[0m");
        res.status(200).send(JSON.stringify([{Route:'UPDATE /v1/segmento/{id_segmento}',Message:'Update segmento:'+req.params.id_segmento+' ,realizado com sucesso',HTTP_Status_Code: 200,Result:data}]));
        const ObjectArrayTblogList = {'data':dateHour,'hora':dthrHour,'descricao':'UPDATE Tb Segmento:'+req.params.id_segmento,'tipo':'UPDATE','tabela':'mtdcontrol.segmento','dt_hr':dthrFormat,'desc_compl':JSON.stringify([{Route:'UPDATE /v1/cliente/{id_segmento}',Message:'Update realizado com sucesso',HTTP_Status_Code: 200,'id_segmento':req.params.id_segmento}]),'usuario_id_usuario':1}
        tblog.add(ObjectArrayTblogList).then((data) => {
            console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/segmento/{id_segmento} => Message:Log inserido com sucesso => Descricao: '+data.descricao+'',"\x1b[22m\x1b[0m");
        }).catch((error) => {
            console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/segmento/{id_segmento} => Message:Erro ao inserir o log => Error:'+error+'',"\x1b[22m\x1b[0m");
        });
      }
    }).catch((error) => {
      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/segmento/{id_segmento} => Message:Update segmento:'+req.params.id_segmento+', não realizado => HTTP_Status_Code: 400',"\x1b[22m\x1b[0m");
      res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/segmento/{id_segmento}',Message:'Update segmento:'+req.params.id_segmento+', não realizado',HTTP_Status_Code: 400,Result:error}]));
    });
  }
});

};