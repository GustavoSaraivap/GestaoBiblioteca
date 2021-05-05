
export default class Validacao{
    static validarCPF(cpf: string){
        cpf = cpf.replace(".", "");
        cpf = cpf.replace(".", "");
        cpf = cpf.replace("-", "");
        if(cpf.length != 11){
            return false;
        }
        switch (cpf)
        {
            case "11111111111":
                return false;
            case "22222222222":
                return false;
            case "33333333333":
                return false;
            case "44444444444":
                return false;
            case "55555555555":
                return false;
            case "66666666666":
                return false;
            case "77777777777":
                return false;
            case "88888888888":
                return false;
            case "99999999999":
                return false;
            case "00000000000":
                return false;
        }
        let peso = 10;
        let soma = 0;
        let aux1;
        let aux2;
        for (let i = 0; i < 9; i++) {
            soma = soma + (+cpf[i]*peso);
            peso--;
        }
        let teste = soma;
        let resto = soma % 11;
        if(resto<2){
            aux1 = 0;
        }else{
            aux1 = 11-resto;
        }
        peso = 11;
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma = soma + (+cpf[i]*peso);
            peso--;
        }
        resto = soma % 11;
        if(resto<2){
            aux2 = 0;
        }else{
            aux2 = 11-resto;
        }
        if(aux1 == +cpf[9] && aux2 == +cpf[10]){
            return true;
        }
        return false;
    }

    
}
