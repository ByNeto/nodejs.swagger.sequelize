'use strict';

const Rota = require('./lib');
const rota = new Rota();
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
 *   Rota:
 *     type: object
 *     required:
 *       - desc_rota
 *       - desc_completa
 *       - hospedagem
 *       - nome_sever
 *       - ip_server
 *       - tipo_banco
 *       - nome_banco
 *       - user_db
 *       - pass_db
 *     properties:
 *       desc_rota:
 *         type: string
 *       desc_completa:
 *         type: string
 *       hospedagem:
 *         type: string
 *       nome_sever:
 *         type: string
 *       ip_server:
 *         type: string
 *       tipo_banco:
 *         type: string
 *       nome_banco:
 *         type: string
 *       user_db:
 *         type: string
 *       pass_db:
 *         type: string
 */
module.exports = (app) => {
/**
 * @swagger
 * /v1/rota:
 *   post:
 *     summary: Adicionar uma Rota
 *     description: Rota que adiciona uma rota como um objeto array JSON
 *     tags:
 *       - Rota
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: "Adicione uma rota na caixa de texto ao lado como um objeto array JSON"
 *         required: true
 *         schema:
 *           "$ref": "#/definitions/Rota"
 *     responses:
 *       200:
 *         description: "Operacao Realizada com Sucesso"
 *       400:
 *         description: "Operacao não Realizada"
 */
app.post('/v1/rota', (req, res) => {
  const desc_rota = req.body.desc_rota.trim();
	if(!desc_rota){
    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/rota => Parameter:desc_rota => Message:Erro Chave ou Parametro Nulo => code:300V1R => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
    res.status(400).send(JSON.stringify([{Route:'POST /v1/rota',Key:'desc_rota',Message:'Erro Chave ou Parametro Nulo',code:'300V1R',ErrorLevel:'Chave ou Parametro Nulo'}]));
  return false;
  }
	else if(desc_rota.length > 45){
    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/rota => Parameter:desc_rota => Message:Erro no Parametro => code:301V1R => ErrorLevel:Parametro desc_rota maximo 45 caracteres',"\x1b[22m\x1b[0m");
		res.status(400).send(JSON.stringify([{Route:'POST /v1/rota',Parameter:'desc_rota',Message:'Erro no Parametro',code:'301V1R',ErrorLevel:'Parametro desc_rota maximo 45 caracteres'}]));
	return false;
  }
  else {
    const desc_completa = req.body.desc_completa.trim();
    if(!desc_completa){
      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/rota => Parameter:desc_completa => Message:Erro Chave ou Parametro Nulo => code:303V1R => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
      res.status(400).send(JSON.stringify([{Route:'POST /v1/rota',Key:'desc_completa',Message:'Erro Chave ou Parametro Nulo',code:'303V1R',ErrorLevel:'Chave ou Parametro Nulo'}]));
    return false;
    }
    else{
      const hospedagem = req.body.hospedagem.trim();
      if(!hospedagem){
        console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/rota => Parameter:hospedagem => Message:Erro Chave ou Parametro Nulo => code:305V1R => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
        res.status(400).send(JSON.stringify([{Route:'POST /v1/rota',Key:'hospedagem',Message:'Erro Chave ou Parametro Nulo',code:'305V1R',ErrorLevel:'Chave ou Parametro Nulo'}]));
      return false;
      }
      else if(hospedagem.length > 45){
        console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/rota => Parameter:hospedagem => Message:Erro no Parametro => code:306V1R => ErrorLevel:Parametro nome_cli maximo 45 caracteres',"\x1b[22m\x1b[0m");
        res.status(400).send(JSON.stringify([{Route:'POST /v1/rota',Parameter:'hospedagem',Message:'Erro no Parametro',code:'306V1R',ErrorLevel:'Parametro nome_cli maximo 45 caracteres'}]));
      return false;
      }
      else{
        const nome_sever = req.body.nome_sever.trim();
        if(!nome_sever){
          console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/rota => Parameter:nome_sever => Message:Erro Chave ou Parametro Nulo => code:307V1R => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
          res.status(400).send(JSON.stringify([{Route:'POST /v1/rota',Key:'nome_sever',Message:'Erro Chave ou Parametro Nulo',code:'307V1R',ErrorLevel:'Chave ou Parametro Nulo'}]));
        return false;
        }
        else if(nome_sever.length > 45){
          console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/rota => Parameter:nome_sever => Message:Erro no Parametro => code:308V1R => ErrorLevel:Parametro nome_sever maximo 45 caracteres',"\x1b[22m\x1b[0m");
          res.status(400).send(JSON.stringify([{Route:'POST /v1/rota',Parameter:'nome_sever',Message:'Erro no Parametro',code:'308V1R',ErrorLevel:'Parametro nome_sever maximo 45 caracteres'}]));
        return false;
        }
        else{
          const ip_server = req.body.ip_server.trim();
          if(!ip_server){
            console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/rota => Parameter:ip_server => Message:Erro Chave ou Parametro Nulo => code:309V1R => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
            res.status(400).send(JSON.stringify([{Route:'POST /v1/rota',Key:'ip_server',Message:'Erro Chave ou Parametro Nulo',code:'309V1R',ErrorLevel:'Chave ou Parametro Nulo'}]));
          return false;
          }
          else if(ip_server.length > 45){
            console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/rota => Parameter:ip_server => Message:Erro no Parametro => code:310V1R => ErrorLevel:Parametro ip_server maximo 45 caracteres',"\x1b[22m\x1b[0m");
            res.status(400).send(JSON.stringify([{Route:'POST /v1/rota',Parameter:'ip_server',Message:'Erro no Parametro',code:'310V1R',ErrorLevel:'Parametro ip_server maximo 45 caracteres'}]));
          return false;
          }
          else{
            const tipo_banco = req.body.tipo_banco.trim();
            if(!tipo_banco){
              console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/rota => Parameter:tipo_banco => Message:Erro Chave ou Parametro Nulo => code:311V1R => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
              res.status(400).send(JSON.stringify([{Route:'POST /v1/rota',Key:'tipo_banco',Message:'Erro Chave ou Parametro Nulo',code:'311V1R',ErrorLevel:'Chave ou Parametro Nulo'}]));
            return false;
            }
            else if(tipo_banco.length > 45){
              console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/rota => Parameter:tipo_banco => Message:Erro no Parametro => code:312V1R => ErrorLevel:Parametro tipo_banco maximo 45 caracteres',"\x1b[22m\x1b[0m");
              res.status(400).send(JSON.stringify([{Route:'POST /v1/rota',Parameter:'tipo_banco',Message:'Erro no Parametro',code:'312V1R',ErrorLevel:'Parametro tipo_banco maximo 45 caracteres'}]));
            return false;
            }
            else{
              const nome_banco = req.body.nome_banco.trim();
              if(!nome_banco){
                console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/rota => Parameter:nome_banco => Message:Erro Chave ou Parametro Nulo => code:313V1R => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
                res.status(400).send(JSON.stringify([{Route:'POST /v1/rota',Key:'nome_banco',Message:'Erro Chave ou Parametro Nulo',code:'313V1R',ErrorLevel:'Chave ou Parametro Nulo'}]));
              return false;
              }
              else if(nome_banco.length > 45){
                console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/rota => Parameter:nome_banco => Message:Erro no Parametro => code:314V1R => ErrorLevel:Parametro nome_banco maximo 45 caracteres',"\x1b[22m\x1b[0m");
                res.status(400).send(JSON.stringify([{Route:'POST /v1/rota',Parameter:'nome_banco',Message:'Erro no Parametro',code:'314V1R',ErrorLevel:'Parametro nome_banco maximo 45 caracteres'}]));
              return false;
              }
              else{
                const user_db = req.body.user_db.trim();
                if(!user_db){
                  console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/rota => Parameter:user_db => Message:Erro Chave ou Parametro Nulo => code:315V1R => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
                  res.status(400).send(JSON.stringify([{Route:'POST /v1/rota',Key:'user_db',Message:'Erro Chave ou Parametro Nulo',code:'315V1R',ErrorLevel:'Chave ou Parametro Nulo'}]));
                return false;
                }
                else if(user_db.length > 45){
                  console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/rota => Parameter:user_db => Message:Erro no Parametro => code:316V1R => ErrorLevel:Parametro user_db maximo 45 caracteres',"\x1b[22m\x1b[0m");
                  res.status(400).send(JSON.stringify([{Route:'POST /v1/rota',Parameter:'user_db',Message:'Erro no Parametro',code:'316V1R',ErrorLevel:'Parametro user_db maximo 45 caracteres'}]));
                return false;
                }
                else{
                  const pass_db = req.body.pass_db.trim();
                  if(!pass_db){
                    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/rota => Parameter:pass_db => Message:Erro Chave ou Parametro Nulo => code:317V1R => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
                    res.status(400).send(JSON.stringify([{Route:'POST /v1/rota',Key:'pass_db',Message:'Erro Chave ou Parametro Nulo',code:'317V1R',ErrorLevel:'Chave ou Parametro Nulo'}]));
                  return false;
                  }
                  else if(pass_db.length > 45){
                    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/rota => Parameter:pass_db => Message:Erro no Parametro => code:318V1R => ErrorLevel:Parametro pass_db maximo 45 caracteres',"\x1b[22m\x1b[0m");
                    res.status(400).send(JSON.stringify([{Route:'POST /v1/rota',Parameter:'pass_db',Message:'Erro no Parametro',code:'318V1R',ErrorLevel:'Parametro pass_db maximo 45 caracteres'}]));
                  return false;
                  }
                  else{
                    const ObjectArrayRotaList = {'desc_rota':desc_rota,'desc_completa':desc_completa,'hospedagem':hospedagem,'nome_sever':nome_sever,'ip_server':ip_server,'tipo_banco': tipo_banco,'nome_banco':nome_banco,'user_db':user_db,'pass_db':pass_db,'cliente_id_cliente':1};
                    rota.add(ObjectArrayRotaList).then((data) => {
                      console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:POST /v1/rota => Message:Cadastro realizado com sucesso => HTTP_Status_Code: 200',"\x1b[22m\x1b[0m");
                      res.status(200).send(JSON.stringify([{Route:'/v1/rota',Message:'Cadastro realizado com sucesso',HTTP_Status_Code: 200,Result:data}]));
                      const ObjectArrayTblogList = {'data':dateHour,'hora':dthrHour,'descricao':'INSERT Tb Rota:'+data.id_rota,'tipo':'INSERT','tabela':'mtdcontrol.rota','dt_hr':dthrFormat,'desc_compl':JSON.stringify([{Route:'POST /v1/rota',Message:'Cadastro realizado com sucesso',HTTP_Status_Code: 200,'id_rota':data.id_rota}]),'usuario_id_usuario':1}
                      tblog.add(ObjectArrayTblogList).then((data) => {
                        console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:POST /v1/rota => Message:Log inserido com sucesso => Descricao: '+data.descricao+'',"\x1b[22m\x1b[0m");
                      }).catch((error) => {
                        console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/rota => Message:Erro ao inserir o log => Error:'+error+'',"\x1b[22m\x1b[0m");
                      });
                    }).catch((error) => {
                      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/rota => Message:Cadastro não realizado => HTTP_Status_Code: 400 => Result:'+error+'',"\x1b[22m\x1b[0m");
                      res.status(400).send(JSON.stringify([{Route:'POST /v1/rota',Message:'Cadastro não realizado',HTTP_Status_Code: 400,Result:error}]));
                      const ObjectArrayTblogList = {'data':dateHour,'hora':dthrHour,'descricao':'INSERT Tb Rota','tipo':'INSERT','tabela':'mtdcontrol.rota','dt_hr':dthrFormat,'desc_compl':JSON.stringify([{Route:'POST /v1/rota',Message:'Cadastro não realizado',HTTP_Status_Code: 400,'Error':error}]),'usuario_id_usuario':1}
                      tblog.add(ObjectArrayTblogList).then((data) => {
                        console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:POST /v1/rota => Message:Log inserido com sucesso => Descricao: '+data.descricao+'',"\x1b[22m\x1b[0m");
                      }).catch((error) => {
                        console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/rota => Message:Erro ao inserir o log => Error:'+error+'',"\x1b[22m\x1b[0m");
                      });
                    });
                  }//END: else insert desc_rota
                }//END: else desc_completa
              }//END: else hospedagem
            }//END: else nome_sever
          }//END: else ip_server
        }//END: else tipo_banco
      }//END: else nome_banco
    }//END: else user_db
  }//END: else pass_db
});

  /**
   * @swagger
   * /v1/rota:
   *   get:
   *     summary: Listar todas as Rotas
   *     description: Rota que lista todas as rota como um objeto array JSON
   *     tags:
   *       - Rota
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: "Operacao Realizada com Sucesso"
   *         schema:
   *           type: array
   *           items:
   *             "$ref": "#/definitions/Rota"
   */
app.get('/v1/rota', (req, res) => {
  rota.list().then((data) => {
    console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:GET /v1/rota => Message:Select realizado com sucesso => HTTP_Status_Code: 200',"\x1b[22m\x1b[0m");
    res.status(200).send(JSON.stringify([{Route:'GET /v1/rota',Message:'Select realizado com sucesso',HTTP_Status_Code: 200,Result:data}]));
  }).catch((error) => {
    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:GET /v1/rota => Message:Select não realizado => HTTP_Status_Code: 400',"\x1b[22m\x1b[0m");
    res.status(400).send(JSON.stringify([{Route:'GET /v1/rota',Message:'Select não realizado',HTTP_Status_Code: 400,Result:error}]));
  });
});

  /**
   * @swagger
   * /v1/rota/{id_rota}:
   *   get:
   *     summary: Listar Rota especifica
   *     description: Rota que lista dados de uma rota especifica por meio do parametro {id_rota} como um objeto array JSON
   *     tags:
   *       - Rota
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id_rota
   *         in: path
   *         description: "id_rota"
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: "Operacao Realizada com Sucesso"
   *         schema:
   *           "$ref": "#/definitions/Rota"
   *       404:
   *         description: "Select Rota não encontrado"
   *       400:
   *         description: "Select Rota não realizado"
   */
app.get('/v1/rota/:id_rota', (req, res) => {
  rota.get(req.params.id_rota).then((data) => {
    if(data == null) {
      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:GET /v1/rota/{id_rota} => Message:Select rota:'+req.params.id_rota+', não encontrado => HTTP_Status_Code: 404',"\x1b[22m\x1b[0m");
      res.status(404).send(JSON.stringify([{Route:'GET /v1/rota/{id_rota}',Message:'Select rota:'+req.params.id_rota+' ,não encontrado',HTTP_Status_Code: 404,Result:data}]));
    return false;
    }
    else{
      console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:GET /v1/rota/{id_rota} => Message:Select rota:'+data.id_rota+', realizado com sucesso => HTTP_Status_Code: 200',"\x1b[22m\x1b[0m");
      res.status(200).send(JSON.stringify([{Route:'GET /v1/rota/{id_rota}',Message:'Select rota:'+data.id_rota+' ,realizado com sucesso',HTTP_Status_Code: 200,Result:data}]));
    }
    }).catch((error) => {
      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:GET /v1/rota/{id_rota} => Message:Select rota:'+req.params.id_rota+', não realizado => HTTP_Status_Code: 400',"\x1b[22m\x1b[0m");
      res.status(400).send(JSON.stringify([{Route:'GET /v1/rota/{id_rota}',Message:'Select rota:'+req.params.id_rota+', não realizado',HTTP_Status_Code: 400,Result:error}]));
    });
});

  /**
   * @swagger
   * /v1/rota/{id_rota}:
   *   delete:
   *     summary: Remover Rota especifica
   *     description: Rota que remove dados de uma rota especifica por meio do parametro {id_rota} como um objeto array JSON
   *     tags:
   *       - Rota
   *     parameters:
   *       - name: id_rota
   *         in: path
   *         description: "id_rota"
   *         required: true
   *         type: integer
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: "Operacao Realizada com Sucesso"
   *       404:
   *         description: "Delete rota não encontrado"
   *       400:
   *         description: "Delete rota não realizado"
   */
  app.delete('/v1/rota/:id_rota', (req, res) => {
    rota.remove(req.params.id_rota).then((data) => {
      if(data <= 0){
        console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:DELETE /v1/rota/{id_rota} => Message:Delete rota:'+req.params.id_rota+', não encontrado => HTTP_Status_Code: 404',"\x1b[22m\x1b[0m");
        res.status(404).send(JSON.stringify([{Route:'DELETE /v1/rota/{id_rota}',Message:'Delete rota:'+req.params.id_rota+' ,não encontrado',HTTP_Status_Code: 404,Result:data}]));
      return false;
      }
      else{
        console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:DELETE /v1/rota/{id_rota} => Message:Delete rota:'+req.params.id_rota+', realizado com sucesso => HTTP_Status_Code: 200',"\x1b[22m\x1b[0m");
        res.status(200).send(JSON.stringify([{Route:'DELETE /v1/rota/{id_rota}',Message:'Delete rota:'+req.params.id_rota+' ,realizado com sucesso',HTTP_Status_Code: 200,Result:data}]));
        const ObjectArrayTblogList = {'data':dateHour,'hora':dthrHour,'descricao':'DELETE Tb Rota:'+req.params.id_rota,'tipo':'DELETE','tabela':'mtdcontrol.rota','dt_hr':dthrFormat,'desc_compl':JSON.stringify([{Route:'DELETE /v1/rota/{id_rota}',Message:'Delete realizado com sucesso',HTTP_Status_Code: 200,'id_rota':req.params.id_rota}]),'usuario_id_usuario':1}
        tblog.add(ObjectArrayTblogList).then((data) => {
            console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:DELETE /v1/rota/{id_rota} => Message:Log inserido com sucesso => Descricao: '+data.descricao+'',"\x1b[22m\x1b[0m");
        }).catch((error) => {
            console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:DELETE /v1/rota/{id_rota} => Message:Erro ao inserir o log => Error:'+error+'',"\x1b[22m\x1b[0m");
        });
      }
     }).catch((error) => {
      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:GET /v1/rota/{id_rota} => Message:Delete rota:'+req.params.id_rota+', não realizado => HTTP_Status_Code: 400',"\x1b[22m\x1b[0m");
      res.status(400).send(JSON.stringify([{Route:'DELETE /v1/rota/{id_rota}',Message:'Delete rota:'+req.params.id_rota+', não realizado',HTTP_Status_Code: 400,Result:error}]));
      });
  });

  /**
   * @swagger
   * /v1/rota/{id_rota}:
   *   patch:
   *     summary: Atualizar Rota especifica
   *     description: Rota que atualiza dados de uma rota especifica por meio do parametro {id_rota} como um objeto array JSON
   *     tags:
   *       - Rota
   *     parameters:
   *       - name: id_rota
   *         in: path
   *         description: "id_rota"
   *         required: true
   *         type: integer
   *       - in: body
   *         name: body
   *         description: "Adicione uma rota na caixa de texto ao lado como um objeto array JSON"
   *         required: true
   *         schema:
   *           "$ref": "#/definitions/Rota"
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: "Operacao Realizada com Sucesso"
   *       404:
   *         description: "Update rota não encontrado"
   *       400:
   *         description: "Update rota não realizado"
   */
app.patch('/v1/rota/:id_rota', (req, res) => {
  const desc_rota = req.body.desc_rota.trim();
	if(!desc_rota){
    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/rota/{id_rota} => Parameter:desc_rota => Message:Erro Chave ou Parametro Nulo => code:300V1R => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
    res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/rota/{id_rota}',Key:'desc_rota',Message:'Erro Chave ou Parametro Nulo',code:'300V1R',ErrorLevel:'Chave ou Parametro Nulo'}]));
  return false;
  }
	else if(desc_rota.length > 45){
    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/rota/{id_rota} => Parameter:desc_rota => Message:Erro no Parametro => code:301V1R => ErrorLevel:Parametro desc_rota maximo 45 caracteres',"\x1b[22m\x1b[0m");
		res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/rota/{id_rota}',Parameter:'desc_rota',Message:'Erro no Parametro',code:'301V1R',ErrorLevel:'Parametro desc_rota maximo 45 caracteres'}]));
	return false;
  }
  else {
    const desc_completa = req.body.desc_completa.trim();
    if(!desc_completa){
      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/rota/{id_rota} => Parameter:desc_completa => Message:Erro Chave ou Parametro Nulo => code:303V1R => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
      res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/rota/{id_rota}',Key:'desc_completa',Message:'Erro Chave ou Parametro Nulo',code:'303V1R',ErrorLevel:'Chave ou Parametro Nulo'}]));
    return false;
    }
    else{
      const hospedagem = req.body.hospedagem.trim();
      if(!hospedagem){
        console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/rota/{id_rota} => Parameter:hospedagem => Message:Erro Chave ou Parametro Nulo => code:305V1R => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
        res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/rota/{id_rota}',Key:'hospedagem',Message:'Erro Chave ou Parametro Nulo',code:'305V1R',ErrorLevel:'Chave ou Parametro Nulo'}]));
      return false;
      }
      else if(hospedagem.length > 45){
        console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/rota/{id_rota} => Parameter:hospedagem => Message:Erro no Parametro => code:306V1R => ErrorLevel:Parametro nome_cli maximo 45 caracteres',"\x1b[22m\x1b[0m");
        res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/rota/{id_rota}',Parameter:'hospedagem',Message:'Erro no Parametro',code:'306V1R',ErrorLevel:'Parametro nome_cli maximo 45 caracteres'}]));
      return false;
      }
      else{
        const nome_sever = req.body.nome_sever.trim();
        if(!nome_sever){
          console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/rota/{id_rota} => Parameter:nome_sever => Message:Erro Chave ou Parametro Nulo => code:307V1R => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
          res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/rota/{id_rota}',Key:'nome_sever',Message:'Erro Chave ou Parametro Nulo',code:'307V1R',ErrorLevel:'Chave ou Parametro Nulo'}]));
        return false;
        }
        else if(nome_sever.length > 45){
          console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/rota/{id_rota} => Parameter:nome_sever => Message:Erro no Parametro => code:308V1R => ErrorLevel:Parametro nome_sever maximo 45 caracteres',"\x1b[22m\x1b[0m");
          res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/rota/{id_rota}',Parameter:'nome_sever',Message:'Erro no Parametro',code:'308V1R',ErrorLevel:'Parametro nome_sever maximo 45 caracteres'}]));
        return false;
        }
        else{
          const ip_server = req.body.ip_server.trim();
          if(!ip_server){
            console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/rota/{id_rota} => Parameter:ip_server => Message:Erro Chave ou Parametro Nulo => code:309V1R => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
            res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/rota/{id_rota}',Key:'ip_server',Message:'Erro Chave ou Parametro Nulo',code:'309V1R',ErrorLevel:'Chave ou Parametro Nulo'}]));
          return false;
          }
          else if(ip_server.length > 45){
            console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/rota/{id_rota} => Parameter:ip_server => Message:Erro no Parametro => code:310V1R => ErrorLevel:Parametro ip_server maximo 45 caracteres',"\x1b[22m\x1b[0m");
            res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/rota/{id_rota}',Parameter:'ip_server',Message:'Erro no Parametro',code:'310V1R',ErrorLevel:'Parametro ip_server maximo 45 caracteres'}]));
          return false;
          }
          else{
            const tipo_banco = req.body.tipo_banco.trim();
            if(!tipo_banco){
              console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/rota/{id_rota} => Parameter:tipo_banco => Message:Erro Chave ou Parametro Nulo => code:311V1R => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
              res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/rota/{id_rota}',Key:'tipo_banco',Message:'Erro Chave ou Parametro Nulo',code:'311V1R',ErrorLevel:'Chave ou Parametro Nulo'}]));
            return false;
            }
            else if(tipo_banco.length > 45){
              console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/rota/{id_rota} => Parameter:tipo_banco => Message:Erro no Parametro => code:312V1R => ErrorLevel:Parametro tipo_banco maximo 45 caracteres',"\x1b[22m\x1b[0m");
              res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/rota/{id_rota}',Parameter:'tipo_banco',Message:'Erro no Parametro',code:'312V1R',ErrorLevel:'Parametro tipo_banco maximo 45 caracteres'}]));
            return false;
            }
            else{
              const nome_banco = req.body.nome_banco.trim();
              if(!nome_banco){
                console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/rota/{id_rota} => Parameter:nome_banco => Message:Erro Chave ou Parametro Nulo => code:313V1R => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
                res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/rota/{id_rota}',Key:'nome_banco',Message:'Erro Chave ou Parametro Nulo',code:'313V1R',ErrorLevel:'Chave ou Parametro Nulo'}]));
              return false;
              }
              else if(nome_banco.length > 45){
                console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/rota/{id_rota} => Parameter:nome_banco => Message:Erro no Parametro => code:314V1R => ErrorLevel:Parametro nome_banco maximo 45 caracteres',"\x1b[22m\x1b[0m");
                res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/rota/{id_rota}',Parameter:'nome_banco',Message:'Erro no Parametro',code:'314V1R',ErrorLevel:'Parametro nome_banco maximo 45 caracteres'}]));
              return false;
              }
              else{
                const user_db = req.body.user_db.trim();
                if(!user_db){
                  console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/rota/{id_rota} => Parameter:user_db => Message:Erro Chave ou Parametro Nulo => code:315V1R => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
                  res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/rota/{id_rota}',Key:'user_db',Message:'Erro Chave ou Parametro Nulo',code:'315V1R',ErrorLevel:'Chave ou Parametro Nulo'}]));
                return false;
                }
                else if(user_db.length > 45){
                  console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/rota/{id_rota} => Parameter:user_db => Message:Erro no Parametro => code:316V1R => ErrorLevel:Parametro user_db maximo 45 caracteres',"\x1b[22m\x1b[0m");
                  res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/rota/{id_rota}',Parameter:'user_db',Message:'Erro no Parametro',code:'316V1R',ErrorLevel:'Parametro user_db maximo 45 caracteres'}]));
                return false;
                }
                else{
                  const pass_db = req.body.pass_db.trim();
                  if(!pass_db){
                    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/rota/{id_rota} => Parameter:pass_db => Message:Erro Chave ou Parametro Nulo => code:317V1R => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
                    res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/rota/{id_rota}',Key:'pass_db',Message:'Erro Chave ou Parametro Nulo',code:'317V1R',ErrorLevel:'Chave ou Parametro Nulo'}]));
                  return false;
                  }
                  else if(pass_db.length > 45){
                    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/rota/{id_rota} => Parameter:pass_db => Message:Erro no Parametro => code:318V1R => ErrorLevel:Parametro pass_db maximo 45 caracteres',"\x1b[22m\x1b[0m");
                    res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/rota/{id_rota}',Parameter:'pass_db',Message:'Erro no Parametro',code:'318V1R',ErrorLevel:'Parametro pass_db maximo 45 caracteres'}]));
                  return false;
                  }
                  else{
                    rota.update(req.params.id_rota, req.body).then((data) => {
                      if(data <= 0){
                        console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/rota/{id_rota} => Message:Update rota:'+req.params.id_rota+', não encontrado => HTTP_Status_Code: 404',"\x1b[22m\x1b[0m");
                        res.status(404).send(JSON.stringify([{Route:'UPDATE /v1/rota/{id_rota}',Message:'Update rota:'+req.params.id_rota+' ,não encontrado',HTTP_Status_Code: 404,Result:data}]));
                      return false;
                      }
                      else{
                        console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/rota/{id_rota} => Message:Update rota:'+req.params.id_rota+', realizado com sucesso => HTTP_Status_Code: 200',"\x1b[22m\x1b[0m");
                        res.status(200).send(JSON.stringify([{Route:'UPDATE /v1/rota/{id_rota}',Message:'Update rota:'+req.params.id_rota+' ,realizado com sucesso',HTTP_Status_Code: 200,Result:data}]));
                        const ObjectArrayTblogList = {'data':dateHour,'hora':dthrHour,'descricao':'UPDATE Tb Rota:'+req.params.id_rota,'tipo':'UPDATE','tabela':'mtdcontrol.rota','dt_hr':dthrFormat,'desc_compl':JSON.stringify([{Route:'UPDATE /v1/rota/{id_rota}',Message:'Update realizado com sucesso',HTTP_Status_Code: 200,'id_rota':req.params.id_rota}]),'usuario_id_usuario':1}
                        tblog.add(ObjectArrayTblogList).then((data) => {
                            console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/rota/{id_rota} => Message:Log inserido com sucesso => Descricao: '+data.descricao+'',"\x1b[22m\x1b[0m");
                        }).catch((error) => {
                            console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/rota/{id_rota} => Message:Erro ao inserir o log => Error:'+error+'',"\x1b[22m\x1b[0m");
                        });
                      }
                    }).catch((error) => {
                      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/rota/{id_rota} => Message:Update rota:'+req.params.id_rota+', não realizado => HTTP_Status_Code: 400',"\x1b[22m\x1b[0m");
                      res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/rota/{id_rota}',Message:'Update rota:'+req.params.id_rota+', não realizado',HTTP_Status_Code: 400,Result:error}]));
                    });
                  }//END: else insert desc_rota
                }//END: else desc_completa
              }//END: else hospedagem
            }//END: else nome_sever
          }//END: else ip_server
        }//END: else tipo_banco
      }//END: else nome_banco
    }//END: else user_db
  }//END: else pass_db
});

};
