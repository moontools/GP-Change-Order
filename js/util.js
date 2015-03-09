// Emula o Form Required para Browsers que não suportam o HTML5
function setModernizr(){
	var	retorno = true;

	// Se o browser não tiver suporte para o 'required'
    if (!Modernizr.input.required) {
    	console.log("Modernizr ON");

        var required = [], att, val,
        	form = document.forms[0],
        	inputs = form.elements;

        // Busca todos os elementos do form que tem a tag 'required'
        for (var i = 0; i < inputs.length; i++) {
            att = inputs[i].getAttribute('required');
            // Se 'required', pega o valor e tira os espaços em branco
            if (att != null) {
                val = inputs[i].value;
                // Se o valor estiver vazio, adiciona ao array de 'required'
                if (val.replace(/^\s+|\s+$/g, '') == '') {
                    required.push(inputs[i].name);
                }
            }
        }

        // Mostra um alerta para o usuário, caso o array de required conter algum elemento
        if (required.length > 0) {
            alert('Campos obrigatórios não foram preenchidos: ' + required.join(', '));
            // prevent the form from being submitted
            retorno = false;
        }

    }

    return retorno;
}




var QueryString = function () {

  // Utilizar no Google App Scrip iFrame
  //var loc = document.referrer;
  //var query = decodeURIComponent(loc.split('?')[2]);

  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    	// If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
    	// If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
    	// If third or later entry with this name
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  } 
    return query_string;
} ();




function mascaraMutuario(o,f){
    v_obj = o;
    v_fun = f;
    setTimeout('execmascara()',1);
}

function execmascara(){
    v_obj.value = v_fun(v_obj.value);
}

//Mascara para CEP Ex: 88340-000	
function CEP(v){
 v=v.replace(/\D/g,"");
 v=v.replace(/(\d{5})(\d)/,"$1-$2");
 return v;
}

//Mascara para telefone Ex: (47) 3333-6666
function tel(v){
    v=v.replace(/\D/g,"");
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2");
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");
 return v;
}

//Mascara para inscrição estadual Ex: 255.255.255
function ie(v){
 //v=v.replace(/\D/g,"");
 v=v.replace(/(\d{3})(\d)/,"$1.$2");
 v=v.replace(/(\d{3})(\d)/,"$1.$2");
 return v;
}

//Mascara para data Ex: 10/10/2010
function data(v){
 v=v.replace(/\D/g,"");
 v=v.replace(/(\d{2})(\d)/,"$1/$2");
 v=v.replace(/(\d{2})(\d)/,"$1/$2");
 return v;
}


function cpfCnpj(v){

    // Remove tudo o que não é dígito
    v = v.replace(/\D/g,"");

    if (v.length <= 11) { //CPF

        //Coloca um ponto entre o terceiro e o quarto dígitos
        v = v.replace(/(\d{3})(\d)/,"$1.$2");

        //Coloca um ponto entre o terceiro e o quarto dígitos
        //de novo (para o segundo bloco de números)
        v = v.replace(/(\d{3})(\d)/,"$1.$2");

        //Coloca um hífen entre o terceiro e o quarto dígitos
        v = v.replace(/(\d{3})(\d{1,2})$/,"$1-$2");


    } else { //CNPJ

        //Coloca ponto entre o segundo e o terceiro dígitos
        v = v.replace(/^(\d{2})(\d)/,"$1.$2");

        //Coloca ponto entre o quinto e o sexto dígitos
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3");

        //Coloca uma barra entre o oitavo e o nono dígitos
        v = v.replace(/\.(\d{3})(\d)/,".$1/$2");

        //Coloca um hífen depois do bloco de quatro dígitos
        v = v.replace(/(\d{4})(\d)/,"$1-$2");

    }

    return v;

}




//Valida o CPF
function validaCpf(cpf){
    exp = /\.|-/g;
    cpf = cpf.toString().replace(exp, "");
    var digitoDigitado = eval(cpf.charAt(9)+cpf.charAt(10));
    var digitoGerado = 0;
    var soma1=0, soma2=0;
    var vlr =11;

    for(var i = 0 ;i<9;i++){
        soma1 += eval(cpf.charAt(i)*(vlr-1));
        soma2 += eval(cpf.charAt(i)*vlr);
        vlr--;
    }

    soma1 = (soma1%11) < 2 ? 0 : 11 - (soma1%11);
    aux = soma1 * 2;
    soma2 = soma2 + aux;
    soma2 = (soma2%11) < 2 ? 0 : 11 - (soma2%11);

   if(cpf == "11111111111" || cpf == "22222222222" || cpf ==
			"33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf ==
			"66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf ==
			"99999999999" || cpf == "00000000000" ){
	digitoGerado = null;
    }else{
        digitoGerado = eval(soma1.toString().charAt(0) + soma2.toString().charAt(0));
    }

	if(digitoGerado != digitoDigitado){
       return false;
    }
    return true;
}

// Valida o CNPJ
function validaCnpj(cnpj) {
    var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
	if (cnpj.length == 0) {
		return false;
	}

	cnpj = cnpj.replace(/\D+/g, '');
	digitos_iguais = 1;

	for (i = 0; i < cnpj.length - 1; i++)
		if (cnpj.charAt(i) != cnpj.charAt(i + 1)) {
			digitos_iguais = 0;
			break;
		}
	if (digitos_iguais)
		return false;

	tamanho = cnpj.length - 2;
	numeros = cnpj.substring(0,tamanho);
	digitos = cnpj.substring(tamanho);
	soma = 0;
	pos = tamanho - 7;
	for (i = tamanho; i >= 1; i--) {
		soma += numeros.charAt(tamanho - i) * pos--;
		if (pos < 2)
			pos = 9;
	}
	resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
	if (resultado != digitos.charAt(0)){
		return false;
	}
	tamanho = tamanho + 1;
	numeros = cnpj.substring(0,tamanho);
	soma = 0;
	pos = tamanho - 7;
	for (i = tamanho; i >= 1; i--) {
		soma += numeros.charAt(tamanho - i) * pos--;
		if (pos < 2)
			pos = 9;
	}

	resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

	return (resultado == digitos.charAt(1));
}


/*
 * Converte string para Float. O número recebido nesta função regalmente estrá acompanhado
 * pelo "R$". A função remove todos os caracteres desnecessários e converte o número
 * para Float
 * @param {string} text: Número a ser convertido
 * @return {float} Retorna um float
 */
function convertToFloat(text){
    var val = text.replace("R$ ","").replace('.', '').replace(',', '.');
    if (!val){
        return 0.00;
    } else {
        return parseFloat(val);
    }
}



/*
* Calcula o próximo dia útil, caso a data seja no sábado ou domingo
* @param {date} data
*/
function proximoDiaUtil(data){
  
  var dataVencimento = data;
  
  switch ( dataVencimento.getDay() ){
    case 6:
      dataVencimento.addDays(+2);
      break;
    case 0:
      dataVencimento.addDays(+1);
      break;
  }
    
  return dataVencimento;
}


Number.prototype.padLeft = function(n,str){
    return Array(n-String(this).length+1).join(str||'0')+this;
}; 

/*
 * Formata a data para mm/dd/aaa.
 */
Date.prototype.parseString = function(toHtml5){
    if(toHtml5==="html5"){
        return(this.getFullYear()+"-"+(this.getMonth()+1).padLeft(2)+"-"+(this.getDate()).padLeft(2));
    }else{
        return (this.getDate()).padLeft(2) + "/" + (this.getMonth()+1).padLeft(2) + "/" + this.getFullYear(); 
    }
};

/**
 * Subtitui todos as cobinações encontradas por outra combinação
 * @param {string} de Combinação a ser subtituida
 * @param {string} para Combinação substituta
 * 
 * @returns {String.prototype.replaceAll|String.prototype.replaceAll.str}
 */
String.prototype.replaceAll = function(de, para){
    var str = this;
    var pos = str.indexOf(de);
    while (pos > -1){
		str = str.replace(de, para);
		pos = str.indexOf(de);
	}
    return (str);
};


/*
 * Formata um numero para moeda do tipo R$
 */
Number.prototype.formatMoney = function(c, d, t){
    var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

/*
 * Calcula o Total dos balões
 */
function calculaTotalBalao(){
   
    var intId = $("#div_balao div").length;
    var somaBalao = 0.00;
    
    for (var x = 1; x <= intId; x++){
        var valor = convertToFloat($('input[id=valorDoBalao' + x + ']').val()),
        	balaoSpan = $('#balaoSpan' + x);
        
        // Mostra ou Esconde mensagem que valor máximo do balão foi excedido
        if ( valor > 10000 ){ balaoSpan.show(); } else { balaoSpan.hide(); }
        
        somaBalao = somaBalao + valor;
    }
    
    somaBalao = parseFloat(somaBalao).toFixed(2);
    
    var bal = $("input[id=valorTotalDosBaloes]");
    bal.val(somaBalao);
    bal.maskMoney('mask'); 
}

// Apenas chama o objeto balões e faz as verificações de datas para o Aditivo
function verificaDataDosBaloesAditivo(){ return baloes().verificaAditivo(); };



/**
 * Converte String para Data
 * 
 * @returns {date} Retorna a data no formato date
 */
String.prototype.toDate = function() {
	var data = this.substr(0,10).replace(/(\d{2})\/(\d{2})\/(\d{4})/,'$3-$2-$1');
	return Date.parse(data);
};



/**
 * Converte data para string
 */
Date.prototype.parseString = function(){
	return (this.getDate()).padLeft(2) + "/" + (this.getMonth()+1).padLeft(2) + "/" + this.getFullYear(); 
};


Number.prototype.padLeft = function(n,str){
    return Array(n-String(this).length+1).join(str||'0')+this;
};



/**
 * Não deixa o usuário errar a máscara da data
 * @param {object} campoData
 * @param {type} event
 * @returns {Boolean} Retorna true se tudo estiver OK
 */
function mascaraData(campoData, event){
    var data = campoData.value;
    if(event.keyCode == 47){	
        event.returnValue = false;							 
        return true; 
    }

    if (data.length == 2){
        data = data + '/';
        campoData.value = data;
        return true;              
    }
    
    if (data.length == 5){
        data = data + '/';
        campoData.value = data;
        return true;
    }
}

/**
 * Valida se um campo de data esta no formato correto, se não estiver, mostra a mensagem
 * de Span do campo em questão.
 * 
 * @param {date} idCampoData : Campo de Data
 * @returns {void}
 */
function isValidDate(IdCampoData){    
    var dataStr = $(IdCampoData).val();
    var data = dataStr.toDate(); 
    var spanErr = $(IdCampoData+"Span");    
    if (dataStr && data == null){
        spanErr.show();
    }
    else{
        spanErr.hide();
    }
}