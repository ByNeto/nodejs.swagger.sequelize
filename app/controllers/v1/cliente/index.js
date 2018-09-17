'use strict';
const jwt = require('jsonwebtoken');
const Cliente = require('./lib');
const cliente = new Cliente();
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
 *   Cliente:
 *     type: object
 *     required:
 *       - cnpj_cli
 *       - razao_cli
 *       - nome_cli
 *       - cep
 *       - endereco
 *       - numero
 *       - bairro
 *       - cod_cidade
 *       - cidade
 *     properties:
 *       cnpj_cli:
 *         type: string
 *       razao_cli:
 *         type: string
 *       nome_cli:
 *         type: string
 *       cep:
 *         type: string
 *       endereco:
 *         type: string
 *       numero:
 *         type: string
 *       bairro:
 *         type: string
 *       cod_cidade:
 *         type: string
 *       cidade:
 *         type: string
 */
module.exports = (app) => {
/**
 * @swagger
 * /v1/cliente:
 *   post:
 *     summary: Adicionar um Cliente
 *     description: Rota que adiciona um cliente como um objeto array JSON
 *     tags:
 *       - Cliente
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: "Adicione um cliente na caixa de texto ao lado como um objeto array JSON"
 *         required: true
 *         schema:
 *           "$ref": "#/definitions/Cliente"
 *     responses:
 *       200:
 *         description: "Operacao Realizada com Sucesso"
 *       400:
 *         description: "Operacao não Realizada"
 */
app.post('/v1/cliente', (req, res) => {
  const cnpj_cli = req.body.cnpj_cli.trim();
	if(!cnpj_cli){
    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/cliente => Parameter:cnpj_cli => Message:Erro Chave ou Parametro Nulo => code:300V1C => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
    res.status(400).send(JSON.stringify([{Route:'POST /v1/cliente',Key:'cnpj_cli',Message:'Erro Chave ou Parametro Nulo',code:'300V1C',ErrorLevel:'Chave ou Parametro Nulo'}]));
  return false;
  }
	else if(cnpj_cli.length > 18){
    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/cliente => Parameter:cnpj_cli => Message:Erro no Parametro => code:301V1C => ErrorLevel:Parametro cnpj_cli maximo 18 caracteres',"\x1b[22m\x1b[0m");
		res.status(400).send(JSON.stringify([{Route:'POST /v1/cliente',Parameter:'cnpj_cli',Message:'Erro no Parametro',code:'301V1C',ErrorLevel:'Parametro cnpj_cli maximo 18 caracteres'}]));
	return false;
  }
  else{
    cliente.getCnpj(cnpj_cli).then((data) => {
      if(data != null) {
        console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/cliente => Parameter:cnpj_cli => Message:Erro no Parametro => code:302V1C => ErrorLevel:Parametro cnpj_cli duplicado',"\x1b[22m\x1b[0m");
        res.status(400).send(JSON.stringify([{Route:'POST /v1/cliente',Parameter:'cnpj_cli',Message:'Erro no Parametro',code:'302V1C',ErrorLevel:'Parametro cnpj_cli duplicado'}]));
       return false;
      }
      else {
        const razao_cli = req.body.razao_cli.trim();
        if(!razao_cli){
          console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/cliente => Parameter:razao_cli => Message:Erro Chave ou Parametro Nulo => code:303V1C => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
          res.status(400).send(JSON.stringify([{Route:'POST /v1/cliente',Key:'razao_cli',Message:'Erro Chave ou Parametro Nulo',code:'303V1C',ErrorLevel:'Chave ou Parametro Nulo'}]));
        return false;
        }
        else if(razao_cli.length > 60){
          console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/cliente => Parameter:razao_cli => Message:Erro no Parametro => code:304V1C => ErrorLevel:Parametro razao_cli maximo 60 caracteres',"\x1b[22m\x1b[0m");
          res.status(400).send(JSON.stringify([{Route:'POST /v1/cliente',Parameter:'razao_cli',Message:'Erro no Parametro',code:'304V1C',ErrorLevel:'Parametro razao_cli maximo 60 caracteres'}]));
        return false;
        }
        else{
          const nome_cli = req.body.nome_cli.trim();
          if(!nome_cli){
            console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/cliente => Parameter:nome_cli => Message:Erro Chave ou Parametro Nulo => code:305V1C => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
            res.status(400).send(JSON.stringify([{Route:'POST /v1/cliente',Key:'nome_cli',Message:'Erro Chave ou Parametro Nulo',code:'305V1C',ErrorLevel:'Chave ou Parametro Nulo'}]));
          return false;
          }
          else if(nome_cli.length > 60){
            console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/cliente => Parameter:nome_cli => Message:Erro no Parametro => code:306V1C => ErrorLevel:Parametro nome_cli maximo 60 caracteres',"\x1b[22m\x1b[0m");
            res.status(400).send(JSON.stringify([{Route:'POST /v1/cliente',Parameter:'nome_cli',Message:'Erro no Parametro',code:'306V1C',ErrorLevel:'Parametro nome_cli maximo 60 caracteres'}]));
          return false;
          }
          else{
            const cep = req.body.cep.replace(/[\.-]|[\)(]|[\'"`´~^}{@#$%&*!?:;°ºª=]|[A-Za-z]|(\s\(.*?\))|<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/g, "").trim();
            if(!cep){
              console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/cliente => Parameter:cep => Message:Erro Chave ou Parametro Nulo => code:307V1C => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
              res.status(400).send(JSON.stringify([{Route:'POST /v1/cliente',Key:'cep',Message:'Erro Chave ou Parametro Nulo',code:'307V1C',ErrorLevel:'Chave ou Parametro Nulo'}]));
            return false;
            }
            else if(cep.length > 10){
              console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/cliente => Parameter:cep => Message:Erro no Parametro => code:308V1C => ErrorLevel:Parametro nome_cli maximo 10 caracteres',"\x1b[22m\x1b[0m");
              res.status(400).send(JSON.stringify([{Route:'POST /v1/cliente',Parameter:'cep',Message:'Erro no Parametro',code:'308V1C',ErrorLevel:'Parametro nome_cli maximo 10 caracteres'}]));
            return false;
            }
            else{
              const endereco = req.body.endereco.trim();
              if(!endereco){
                console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/cliente => Parameter:endereco => Message:Erro Chave ou Parametro Nulo => code:309V1C => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
                res.status(400).send(JSON.stringify([{Route:'POST /v1/cliente',Key:'endereco',Message:'Erro Chave ou Parametro Nulo',code:'309V1C',ErrorLevel:'Chave ou Parametro Nulo'}]));
              return false;
              }
              else if(endereco.length > 60){
                console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/cliente => Parameter:endereco => Message:Erro no Parametro => code:310V1C => ErrorLevel:Parametro endereco maximo 60 caracteres',"\x1b[22m\x1b[0m");
                res.status(400).send(JSON.stringify([{Route:'POST /v1/cliente',Parameter:'endereco',Message:'Erro no Parametro',code:'310V1C',ErrorLevel:'Parametro endereco maximo 60 caracteres'}]));
              return false;
              }
              else{
                const numero = req.body.numero.replace(/[\.-]|[\)(]|[\'"`´~^}{@#$%&*!?:;°ºª=]|[A-Za-z]|(\s\(.*?\))|<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/g, "").trim();
                if(!numero){
                  console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/cliente => Parameter:numero => Message:Erro Chave ou Parametro Nulo => code:311V1C => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
                  res.status(400).send(JSON.stringify([{Route:'POST /v1/cliente',Key:'numero',Message:'Erro Chave ou Parametro Nulo',code:'311V1C',ErrorLevel:'Chave ou Parametro Nulo'}]));
                return false;
                }
                else if(numero.length > 10){
                  console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/cliente => Parameter:numero => Message:Erro no Parametro => code:312V1C => ErrorLevel:Parametro numero maximo 10 caracteres',"\x1b[22m\x1b[0m");
                  res.status(400).send(JSON.stringify([{Route:'POST /v1/cliente',Parameter:'numero',Message:'Erro no Parametro',code:'312V1C',ErrorLevel:'Parametro numero maximo 10 caracteres'}]));
                return false;
                }
                else{
                  const bairro = req.body.bairro.trim();
                  if(!bairro){
                    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/cliente => Parameter:bairro => Message:Erro Chave ou Parametro Nulo => code:313V1C => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
                    res.status(400).send(JSON.stringify([{Route:'POST /v1/cliente',Key:'bairro',Message:'Erro Chave ou Parametro Nulo',code:'313V1C',ErrorLevel:'Chave ou Parametro Nulo'}]));
                  return false;
                  }
                  else if(bairro.length > 45){
                    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/cliente => Parameter:bairro => Message:Erro no Parametro => code:314V1C => ErrorLevel:Parametro bairro maximo 45 caracteres',"\x1b[22m\x1b[0m");
                    res.status(400).send(JSON.stringify([{Route:'POST /v1/cliente',Parameter:'bairro',Message:'Erro no Parametro',code:'314V1C',ErrorLevel:'Parametro bairro maximo 45 caracteres'}]));
                  return false;
                  }
                  else{
                    const cod_cidade = req.body.cod_cidade.trim();
                    if(!cod_cidade){
                      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/cliente => Parameter:cod_cidade => Message:Erro Chave ou Parametro Nulo => code:315V1C => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
                      res.status(400).send(JSON.stringify([{Route:'POST /v1/cliente',Key:'cod_cidade',Message:'Erro Chave ou Parametro Nulo',code:'315V1C',ErrorLevel:'Chave ou Parametro Nulo'}]));
                    return false;
                    }
                    else if(cod_cidade.length > 10){
                      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/cliente => Parameter:cod_cidade => Message:Erro no Parametro => code:316V1C => ErrorLevel:Parametro cod_cidade maximo 10 caracteres',"\x1b[22m\x1b[0m");
                      res.status(400).send(JSON.stringify([{Route:'POST /v1/cliente',Parameter:'cod_cidade',Message:'Erro no Parametro',code:'316V1C',ErrorLevel:'Parametro cod_cidade maximo 10 caracteres'}]));
                    return false;
                    }
                    else{
                      const cidade = req.body.cidade.trim();
                      if(!cidade){
                        console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/cliente => Parameter:cidade => Message:Erro Chave ou Parametro Nulo => code:317V1C => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
                        res.status(400).send(JSON.stringify([{Route:'POST /v1/cliente',Key:'cidade',Message:'Erro Chave ou Parametro Nulo',code:'317V1C',ErrorLevel:'Chave ou Parametro Nulo'}]));
                      return false;
                      }
                      else if(cidade.length > 45){
                        console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/cliente => Parameter:cidade => Message:Erro no Parametro => code:318V1C => ErrorLevel:Parametro cidade maximo 45 caracteres',"\x1b[22m\x1b[0m");
                        res.status(400).send(JSON.stringify([{Route:'POST /v1/cliente',Parameter:'cidade',Message:'Erro no Parametro',code:'318V1C',ErrorLevel:'Parametro cidade maximo 45 caracteres'}]));
                      return false;
                      }
                      else{
                        const tokenCreate=jwt.sign({foo:'Authorization'},dateHour+cnpj_cli);
                        const ObjectArrayClienteList = {'id_hash':tokenCreate,'ativo':'s','cnpj_cli':cnpj_cli,'razao_cli':razao_cli,'nome_cli':nome_cli,'cep': cep,'endereco':endereco,'numero':numero,'bairro':bairro,'cod_cidade':cod_cidade,'cidade':cidade,'layout_personalizado':'s','dt_cadastro':dateHour,'dt_alteracao':dateHour,'segmento_id_segmento':1,'usuario_id_usuario':1};
                        cliente.add(ObjectArrayClienteList).then((data) => {
                          console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:POST /v1/cliente => Message:Cadastro realizado com sucesso => HTTP_Status_Code: 200',"\x1b[22m\x1b[0m");
                          res.status(200).send(JSON.stringify([{Route:'/v1/cliente',Message:'Cadastro realizado com sucesso',HTTP_Status_Code: 200,Result:data}]));
                          const ObjectArrayTblogList = {'data':dateHour,'hora':dthrHour,'descricao':'INSERT Tb Cliente:'+data.id_cliente,'tipo':'INSERT','tabela':'mtdcontrol.cliente','dt_hr':dthrFormat,'desc_compl':JSON.stringify([{Route:'POST /v1/cliente',Message:'Cadastro realizado com sucesso',HTTP_Status_Code: 200,'id_cliente':data.id_cliente}]),'usuario_id_usuario':1}
                          tblog.add(ObjectArrayTblogList).then((data) => {
                            console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:POST /v1/cliente => Message:Log inserido com sucesso => Descricao: '+data.descricao+'',"\x1b[22m\x1b[0m");
                          }).catch((error) => {
                            console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/cliente => Message:Erro ao inserir o log => Error:'+error+'',"\x1b[22m\x1b[0m");
                          });
                        }).catch((error) => {
                          console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/cliente => Message:Cadastro não realizado => HTTP_Status_Code: 400 => Result:'+error+'',"\x1b[22m\x1b[0m");
                          res.status(400).send(JSON.stringify([{Route:'POST /v1/cliente',Message:'Cadastro não realizado',HTTP_Status_Code: 400,Result:error}]));
                          const ObjectArrayTblogList = {'data':dateHour,'hora':dthrHour,'descricao':'INSERT Tb Cliente','tipo':'INSERT','tabela':'mtdcontrol.cliente','dt_hr':dthrFormat,'desc_compl':JSON.stringify([{Route:'POST /v1/cliente',Message:'Cadastro não realizado',HTTP_Status_Code: 400,'Error':error}]),'usuario_id_usuario':1}
                          tblog.add(ObjectArrayTblogList).then((data) => {
                            console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:POST /v1/cliente => Message:Log inserido com sucesso => Descricao: '+data.descricao+'',"\x1b[22m\x1b[0m");
                          }).catch((error) => {
                            console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/cliente => Message:Erro ao inserir o log => Error:'+error+'',"\x1b[22m\x1b[0m");
                          });
                        });
                      }//END: else insert cadastro
                    }//END: else cidade
                  }//END: else cod_cidade
                }//END: else bairro
              }//END: else numero
            }//END: else endereco
          }//END: else cep
        }//END: else nome_cli
      }//END: else razao_cli
    }).catch((error) => {
      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:POST /v1/cliente => Message:Select cnpj_cli não realizado => HTTP_Status_Code: 400 => Result:'+error+'',"\x1b[22m\x1b[0m");
      res.status(400).send(JSON.stringify([{Route:'POST /v1/cliente',Message:'Select cnpj_cli não realizado',HTTP_Status_Code: 400,Result:error}]));
    });
  }//END: else cnpj_cli
});

  /**
   * @swagger
   * /v1/cliente:
   *   get:
   *     summary: Listar todos os Cliente
   *     description: Rota que lista todos os cliente como um objeto array JSON
   *     tags:
   *       - Cliente
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: "Operacao Realizada com Sucesso"
   *         schema:
   *           type: array
   *           items:
   *             "$ref": "#/definitions/Cliente"
   */
app.get('/v1/cliente', (req, res) => {
  cliente.list().then((data) => {
    console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:GET /v1/cliente => Message:Select realizado com sucesso => HTTP_Status_Code: 200',"\x1b[22m\x1b[0m");
    res.status(200).send(JSON.stringify([{Route:'GET /v1/cliente',Message:'Select realizado com sucesso',HTTP_Status_Code: 200,Result:data}]));
  }).catch((error) => {
    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:GET /v1/cliente => Message:Select não realizado => HTTP_Status_Code: 400',"\x1b[22m\x1b[0m");
    res.status(400).send(JSON.stringify([{Route:'GET /v1/cliente',Message:'Select não realizado',HTTP_Status_Code: 400,Result:error}]));
  });
});

  /**
   * @swagger
   * /v1/cliente/{id_cliente}:
   *   get:
   *     summary: Listar Cliente especifico
   *     description: Rota que lista dados de um cliente especifico por meio do parametro {id_cliente} como um objeto array JSON
   *     tags:
   *       - Cliente
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id_cliente
   *         in: path
   *         description: "id_cliente"
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: "Operacao Realizada com Sucesso"
   *         schema:
   *           "$ref": "#/definitions/Cliente"
   *       404:
   *         description: "Select Cliente não encontrado"
   *       400:
   *         description: "Select Cliente não realizado"
   */
app.get('/v1/cliente/:id_cliente', (req, res) => {
  cliente.get(req.params.id_cliente).then((data) => {
    if(data == null) {
      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:GET /v1/cliente/{id_cliente} => Message:Select cliente:'+req.params.id_cliente+', não encontrado => HTTP_Status_Code: 404',"\x1b[22m\x1b[0m");
      res.status(404).send(JSON.stringify([{Route:'GET /v1/cliente/{id_cliente}',Message:'Select cliente:'+req.params.id_cliente+' ,não encontrado',HTTP_Status_Code: 404,Result:data}]));
    return false;
    }
    else{
      console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:GET /v1/cliente/{id_cliente} => Message:Select cliente:'+data.id_cliente+', realizado com sucesso => HTTP_Status_Code: 200',"\x1b[22m\x1b[0m");
      res.status(200).send(JSON.stringify([{Route:'GET /v1/cliente/{id_cliente}',Message:'Select cliente:'+data.id_cliente+' ,realizado com sucesso',HTTP_Status_Code: 200,Result:data}]));
    }
    }).catch((error) => {
      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:GET /v1/cliente/{id_cliente} => Message:Select cliente:'+req.params.id_cliente+', não realizado => HTTP_Status_Code: 400',"\x1b[22m\x1b[0m");
      res.status(400).send(JSON.stringify([{Route:'GET /v1/cliente/{id_cliente}',Message:'Select cliente:'+req.params.id_cliente+', não realizado',HTTP_Status_Code: 400,Result:error}]));
    });
});

  /**
   * @swagger
   * /v1/cliente/{id_cliente}:
   *   delete:
   *     summary: Remover Cliente especifico
   *     description: Rota que remove dados de um cliente especifico por meio do parametro {id_cliente} como um objeto array JSON
   *     tags:
   *       - Cliente
   *     parameters:
   *       - name: id_cliente
   *         in: path
   *         description: "id_cliente"
   *         required: true
   *         type: integer
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: "Operacao Realizada com Sucesso"
   *       404:
   *         description: "Delete cliente não encontrado"
   *       400:
   *         description: "Delete cliente não realizado"
   */
  app.delete('/v1/cliente/:id_cliente', (req, res) => {
    cliente.remove(req.params.id_cliente).then((data) => {
      if(data <= 0){
        console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:DELETE /v1/cliente/{id_cliente} => Message:Delete cliente:'+req.params.id_cliente+', não encontrado => HTTP_Status_Code: 404',"\x1b[22m\x1b[0m");
        res.status(404).send(JSON.stringify([{Route:'DELETE /v1/cliente/{id_cliente}',Message:'Delete cliente:'+req.params.id_cliente+' ,não encontrado',HTTP_Status_Code: 404,Result:data}]));
      return false;
      }
      else{
        console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:DELETE /v1/cliente/{id_cliente} => Message:Delete cliente:'+req.params.id_cliente+', realizado com sucesso => HTTP_Status_Code: 200',"\x1b[22m\x1b[0m");
        res.status(200).send(JSON.stringify([{Route:'DELETE /v1/cliente/{id_cliente}',Message:'Delete cliente:'+req.params.id_cliente+' ,realizado com sucesso',HTTP_Status_Code: 200,Result:data}]));
        const ObjectArrayTblogList = {'data':dateHour,'hora':dthrHour,'descricao':'DELETE Tb Cliente:'+req.params.id_cliente,'tipo':'DELETE','tabela':'mtdcontrol.cliente','dt_hr':dthrFormat,'desc_compl':JSON.stringify([{Route:'DELETE /v1/cliente/{id_cliente}',Message:'Delete realizado com sucesso',HTTP_Status_Code: 200,'id_cliente':req.params.id_cliente}]),'usuario_id_usuario':1}
        tblog.add(ObjectArrayTblogList).then((data) => {
            console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:DELETE /v1/cliente/{id_cliente} => Message:Log inserido com sucesso => Descricao: '+data.descricao+'',"\x1b[22m\x1b[0m");
        }).catch((error) => {
            console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:DELETE /v1/cliente/{id_cliente} => Message:Erro ao inserir o log => Error:'+error+'',"\x1b[22m\x1b[0m");
        });
      }
     }).catch((error) => {
      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:GET /v1/cliente/{id_cliente} => Message:Delete cliente:'+req.params.id_cliente+', não realizado => HTTP_Status_Code: 400',"\x1b[22m\x1b[0m");
      res.status(400).send(JSON.stringify([{Route:'DELETE /v1/cliente/{id_cliente}',Message:'Delete cliente:'+req.params.id_cliente+', não realizado',HTTP_Status_Code: 400,Result:error}]));
      });
  });

  /**
   * @swagger
   * /v1/cliente/{id_cliente}:
   *   patch:
   *     summary: Atualizar Cliente especifico
   *     description: Rota que atualiza dados de um cliente especifico por meio do parametro {id_cliente} como um objeto array JSON
   *     tags:
   *       - Cliente
   *     parameters:
   *       - name: id_cliente
   *         in: path
   *         description: "id_cliente"
   *         required: true
   *         type: integer
   *       - in: body
   *         name: body
   *         description: "Adicione um cliente na caixa de texto ao lado como um objeto array JSON"
   *         required: true
   *         schema:
   *           "$ref": "#/definitions/Cliente"
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: "Operacao Realizada com Sucesso"
   *       404:
   *         description: "Update cliente não encontrado"
   *       400:
   *         description: "Update cliente não realizado"
   */
app.patch('/v1/cliente/:id_cliente', (req, res) => {
  const cnpj_cli = req.body.cnpj_cli.trim();
	if(!cnpj_cli){
    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/cliente/{id_cliente} => Parameter:cnpj_cli => Message:Erro Chave ou Parametro Nulo => code:300V1C => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
    res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/cliente/{id_cliente}',Key:'cnpj_cli',Message:'Erro Chave ou Parametro Nulo',code:'300V1C',ErrorLevel:'Chave ou Parametro Nulo'}]));
  return false;
  }
	else if(cnpj_cli.length > 18){
    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/cliente/{id_cliente} => Parameter:cnpj_cli => Message:Erro no Parametro => code:301V1C => ErrorLevel:Parametro cnpj_cli maximo 18 caracteres',"\x1b[22m\x1b[0m");
		res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/cliente/{id_cliente}',Parameter:'cnpj_cli',Message:'Erro no Parametro',code:'301V1C',ErrorLevel:'Parametro cnpj_cli maximo 18 caracteres'}]));
	return false;
  }
  else{
    cliente.getCnpj(cnpj_cli).then((data) => {
      if(data != null) {
        console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/cliente/{id_cliente} => Parameter:cnpj_cli => Message:Erro no Parametro => code:302V1C => ErrorLevel:Parametro cnpj_cli duplicado',"\x1b[22m\x1b[0m");
        res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/cliente/{id_cliente}',Parameter:'cnpj_cli',Message:'Erro no Parametro',code:'302V1C',ErrorLevel:'Parametro cnpj_cli duplicado'}]));
       return false;
      }
      else {
        const razao_cli = req.body.razao_cli.trim();
        if(!razao_cli){
          console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/cliente/{id_cliente} => Parameter:razao_cli => Message:Erro Chave ou Parametro Nulo => code:303V1C => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
          res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/cliente/{id_cliente}',Key:'razao_cli',Message:'Erro Chave ou Parametro Nulo',code:'303V1C',ErrorLevel:'Chave ou Parametro Nulo'}]));
        return false;
        }
        else if(razao_cli.length > 60){
          console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/cliente/{id_cliente} => Parameter:razao_cli => Message:Erro no Parametro => code:304V1C => ErrorLevel:Parametro razao_cli maximo 60 caracteres',"\x1b[22m\x1b[0m");
          res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/cliente/{id_cliente}',Parameter:'razao_cli',Message:'Erro no Parametro',code:'304V1C',ErrorLevel:'Parametro razao_cli maximo 60 caracteres'}]));
        return false;
        }
        else{
          const nome_cli = req.body.nome_cli.trim();
          if(!nome_cli){
            console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/cliente/{id_cliente} => Parameter:nome_cli => Message:Erro Chave ou Parametro Nulo => code:305V1C => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
            res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/cliente/{id_cliente}',Key:'nome_cli',Message:'Erro Chave ou Parametro Nulo',code:'305V1C',ErrorLevel:'Chave ou Parametro Nulo'}]));
          return false;
          }
          else if(nome_cli.length > 60){
            console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/cliente/{id_cliente} => Parameter:nome_cli => Message:Erro no Parametro => code:306V1C => ErrorLevel:Parametro nome_cli maximo 60 caracteres',"\x1b[22m\x1b[0m");
            res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/cliente/{id_cliente}',Parameter:'nome_cli',Message:'Erro no Parametro',code:'306V1C',ErrorLevel:'Parametro nome_cli maximo 60 caracteres'}]));
          return false;
          }
          else{
            const cep = req.body.cep.replace(/[\.-]|[\)(]|[\'"`´~^}{@#$%&*!?:;°ºª=]|[A-Za-z]|(\s\(.*?\))|<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/g, "").trim();
            if(!cep){
              console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/cliente/{id_cliente} => Parameter:cep => Message:Erro Chave ou Parametro Nulo => code:307V1C => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
              res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/cliente/{id_cliente}',Key:'cep',Message:'Erro Chave ou Parametro Nulo',code:'307V1C',ErrorLevel:'Chave ou Parametro Nulo'}]));
            return false;
            }
            else if(cep.length > 10){
              console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/cliente/{id_cliente} => Parameter:cep => Message:Erro no Parametro => code:308V1C => ErrorLevel:Parametro nome_cli maximo 10 caracteres',"\x1b[22m\x1b[0m");
              res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/cliente/{id_cliente}',Parameter:'cep',Message:'Erro no Parametro',code:'308V1C',ErrorLevel:'Parametro nome_cli maximo 10 caracteres'}]));
            return false;
            }
            else{
              const endereco = req.body.endereco.trim();
              if(!endereco){
                console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/cliente/{id_cliente} => Parameter:endereco => Message:Erro Chave ou Parametro Nulo => code:309V1C => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
                res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/cliente/{id_cliente}',Key:'endereco',Message:'Erro Chave ou Parametro Nulo',code:'309V1C',ErrorLevel:'Chave ou Parametro Nulo'}]));
              return false;
              }
              else if(endereco.length > 60){
                console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/cliente/{id_cliente} => Parameter:endereco => Message:Erro no Parametro => code:310V1C => ErrorLevel:Parametro endereco maximo 60 caracteres',"\x1b[22m\x1b[0m");
                res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/cliente/{id_cliente}',Parameter:'endereco',Message:'Erro no Parametro',code:'310V1C',ErrorLevel:'Parametro endereco maximo 60 caracteres'}]));
              return false;
              }
              else{
                const numero = req.body.numero.replace(/[\.-]|[\)(]|[\'"`´~^}{@#$%&*!?:;°ºª=]|[A-Za-z]|(\s\(.*?\))|<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/g, "").trim();
                if(!numero){
                  console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/cliente/{id_cliente} => Parameter:numero => Message:Erro Chave ou Parametro Nulo => code:311V1C => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
                  res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/cliente/{id_cliente}',Key:'numero',Message:'Erro Chave ou Parametro Nulo',code:'311V1C',ErrorLevel:'Chave ou Parametro Nulo'}]));
                return false;
                }
                else if(numero.length > 10){
                  console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/cliente/{id_cliente} => Parameter:numero => Message:Erro no Parametro => code:312V1C => ErrorLevel:Parametro numero maximo 10 caracteres',"\x1b[22m\x1b[0m");
                  res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/cliente/{id_cliente}',Parameter:'numero',Message:'Erro no Parametro',code:'312V1C',ErrorLevel:'Parametro numero maximo 10 caracteres'}]));
                return false;
                }
                else{
                  const bairro = req.body.bairro.trim();
                  if(!bairro){
                    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/cliente/{id_cliente} => Parameter:bairro => Message:Erro Chave ou Parametro Nulo => code:313V1C => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
                    res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/cliente/{id_cliente}',Key:'bairro',Message:'Erro Chave ou Parametro Nulo',code:'313V1C',ErrorLevel:'Chave ou Parametro Nulo'}]));
                  return false;
                  }
                  else if(bairro.length > 45){
                    console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/cliente/{id_cliente} => Parameter:bairro => Message:Erro no Parametro => code:314V1C => ErrorLevel:Parametro bairro maximo 45 caracteres',"\x1b[22m\x1b[0m");
                    res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/cliente/{id_cliente}',Parameter:'bairro',Message:'Erro no Parametro',code:'314V1C',ErrorLevel:'Parametro bairro maximo 45 caracteres'}]));
                  return false;
                  }
                  else{
                    const cod_cidade = req.body.cod_cidade.trim();
                    if(!cod_cidade){
                      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/cliente/{id_cliente} => Parameter:cod_cidade => Message:Erro Chave ou Parametro Nulo => code:315V1C => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
                      res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/cliente/{id_cliente}',Key:'cod_cidade',Message:'Erro Chave ou Parametro Nulo',code:'315V1C',ErrorLevel:'Chave ou Parametro Nulo'}]));
                    return false;
                    }
                    else if(cod_cidade.length > 10){
                      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/cliente/{id_cliente} => Parameter:cod_cidade => Message:Erro no Parametro => code:316V1C => ErrorLevel:Parametro cod_cidade maximo 10 caracteres',"\x1b[22m\x1b[0m");
                      res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/cliente/{id_cliente}',Parameter:'cod_cidade',Message:'Erro no Parametro',code:'316V1C',ErrorLevel:'Parametro cod_cidade maximo 10 caracteres'}]));
                    return false;
                    }
                    else{
                      const cidade = req.body.cidade.trim();
                      if(!cidade){
                        console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/cliente/{id_cliente} => Parameter:cidade => Message:Erro Chave ou Parametro Nulo => code:317V1C => ErrorLevel:Chave ou Parametro Nulo',"\x1b[22m\x1b[0m");
                        res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/cliente/{id_cliente}',Key:'cidade',Message:'Erro Chave ou Parametro Nulo',code:'317V1C',ErrorLevel:'Chave ou Parametro Nulo'}]));
                      return false;
                      }
                      else if(cidade.length > 45){
                        console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/cliente/{id_cliente}  => Parameter:cidade => Message:Erro no Parametro => code:318V1C => ErrorLevel:Parametro cidade maximo 45 caracteres',"\x1b[22m\x1b[0m");
                        res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/cliente/{id_cliente}',Parameter:'cidade',Message:'Erro no Parametro',code:'318V1C',ErrorLevel:'Parametro cidade maximo 45 caracteres'}]));
                      return false;
                      }
                      else{
                        cliente.update(req.params.id_cliente, req.body).then((data) => {
                          if(data <= 0){
                            console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/cliente/{id_cliente} => Message:Update cliente:'+req.params.id_cliente+', não encontrado => HTTP_Status_Code: 404',"\x1b[22m\x1b[0m");
                            res.status(404).send(JSON.stringify([{Route:'UPDATE /v1/cliente/{id_cliente}',Message:'Update cliente:'+req.params.id_cliente+' ,não encontrado',HTTP_Status_Code: 404,Result:data}]));
                          return false;
                          }
                          else{
                            console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/cliente/{id_cliente} => Message:Update cliente:'+req.params.id_cliente+', realizado com sucesso => HTTP_Status_Code: 200',"\x1b[22m\x1b[0m");
                            res.status(200).send(JSON.stringify([{Route:'UPDATE /v1/cliente/{id_cliente}',Message:'Update cliente:'+req.params.id_cliente+' ,realizado com sucesso',HTTP_Status_Code: 200,Result:data}]));
                            const ObjectArrayTblogList = {'data':dateHour,'hora':dthrHour,'descricao':'UPDATE Tb Cliente:'+req.params.id_cliente,'tipo':'UPDATE','tabela':'mtdcontrol.cliente','dt_hr':dthrFormat,'desc_compl':JSON.stringify([{Route:'UPDATE /v1/cliente/{id_cliente}',Message:'Update realizado com sucesso',HTTP_Status_Code: 200,'id_cliente':req.params.id_cliente}]),'usuario_id_usuario':1}
                            tblog.add(ObjectArrayTblogList).then((data) => {
                                console.log("\x1b[32m\x1b[1m",' *Sucesso!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/cliente/{id_cliente} => Message:Log inserido com sucesso => Descricao: '+data.descricao+'',"\x1b[22m\x1b[0m");
                            }).catch((error) => {
                                console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/cliente/{id_cliente} => Message:Erro ao inserir o log => Error:'+error+'',"\x1b[22m\x1b[0m");
                            });
                          }
                        }).catch((error) => {
                          console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/cliente/{id_cliente} => Message:Update cliente:'+req.params.id_cliente+', não realizado => HTTP_Status_Code: 400',"\x1b[22m\x1b[0m");
                          res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/cliente/{id_cliente}',Message:'Update cliente:'+req.params.id_cliente+', não realizado',HTTP_Status_Code: 400,Result:error}]));
                        });
                      }//END: else insert cadastro
                    }//END: else cidade
                  }//END: else cod_cidade
                }//END: else bairro
              }//END: else numero
            }//END: else endereco
          }//END: else cep
        }//END: else nome_cli
      }//END: else razao_cli
    }).catch((error) => {
      console.log("\x1b[31m\x1b[1m",' *Atenção!\n   DTHR: '+dateHour+'\n   Route:UPDATE /v1/cliente/{id_cliente} => Message:Select cnpj_cli não realizado => HTTP_Status_Code: 400 => Result:'+error+'',"\x1b[22m\x1b[0m");
      res.status(400).send(JSON.stringify([{Route:'UPDATE /v1/cliente/{id_cliente}',Message:'Select cnpj_cli não realizado',HTTP_Status_Code: 400,Result:error}]));
    });
  }//END: else cnpj_cli
});

};
