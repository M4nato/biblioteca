
class ItemBiblioteca {
    constructor(titulo, autor, anoPublicacao) {
        this.titulo = titulo;
        this.autor = autor;
        this.anoPublicacao = anoPublicacao;
        this.disponivel = true;
    }

    obterInformacoes() {
        return `${this.titulo} por ${this.autor} (${this.anoPublicacao})`;
    }

    emprestar() {
        if (this.disponivel) {
            this.disponivel = false;
            return true;
        }
        return false;
    }

    devolver() {
        this.disponivel = true;
    }

    estaDisponivel() {
        return this.disponivel;
    }
}

// CLASSE LIVRO (FALTANDO)
class Livro extends ItemBiblioteca {
    constructor(titulo, autor, anoPublicacao, isbn, genero) {
        super(titulo, autor, anoPublicacao);
        this.isbn = isbn;
        this.genero = genero;
    }

    obterInformacoes() {
        return `Livro: ${this.titulo} - ${this.autor} (${this.anoPublicacao}) - ISBN: ${this.isbn}`;
    }
}
class Emprestimo {
 // Use propriedades privadas para dados sensíveis
 #dataEmprestimo;
 #dataDevolucaoPrevista;
#dataDevolucao;

 constructor(usuario, item) {
 // Implemente o construtor
 this.usuario = usuario;
 this.item = item;
 this.#dataEmprestimo = new Date();
 this.#dataDevolucaoPrevista = new Date();
 this.#dataDevolucaoPrevista.setDate(this.#dataEmprestimo.getDate() + 14); // 14 dias
 this.#dataDevolucao = null;
 }

 // Implemente getters para acesso controlado
 get informacoes() {
 // Retorne informações do empréstimo
 return `Empréstimo: ${this.item.titulo} para ${this.usuario.nome}`;
 }

 get foiDevolvido() {
        return this.#dataDevolucao !== null;
 }

get dataDevolucao() {
        return this.#dataDevolucao;
}
 calcularMulta() {
 // Calcule multa por atraso (ex: R$ 2 por dia)
 const hoje = new Date();
 if (hoje > this.#dataDevolucaoPrevista && !this.#dataDevolucao) {
 const diasAtraso = Math.ceil((hoje - this.#dataDevolucaoPrevista) / (1000 * 60 * 60 * 24))
 return diasAtraso * 2;
 }
 return 0;
 }

 devolver() {
 this.#dataDevolucao = new Date();
 const multa = this.calcularMulta();
 if (multa > 0) {
 this.usuario.adicionarMulta(multa);
 }
 this.item.devolver();
 }
}
class Biblioteca {
 // Implemente o padrão Singleton
 static #instancia;

 constructor() {
 // Garanta que só existe uma instância
 if (Biblioteca.#instancia) {
 return Biblioteca.#instancia;
 }
 this.itens = [];
 this.usuarios = [];
 this.emprestimos = [];
 Biblioteca.#instancia = this;
 }

 static getInstancia() {
 // Retorne a instância única
 if (!Biblioteca.#instancia) {
 Biblioteca.#instancia = new Biblioteca();
 }
 return Biblioteca.#instancia;
 }

 // Métodos estáticos para funcionalidades utilitárias
 static validarISBN(isbn) {
 // Valide o formato do ISBN (simplificado)
 return /^[0-9-]+$/.test(isbn) && isbn.length >= 10;
 }

 // Métodos de instância
 adicionarItem(item) {
 // Adicione um item à biblioteca
 this.itens.push(item);
 }

 realizarEmprestimo(usuario, item) {
 // Implemente a lógica de empréstimo
 if (usuario.podePegarEmprestimo() && item.estaDisponivel()) {
 const emprestimo = new Emprestimo(usuario, item);
 this.emprestimos.push(emprestimo);
 usuario.adicionarEmprestimo(emprestimo);
 item.emprestar();
 return emprestimo;
 }
 return null;
 }

 // Getters para estatísticas
 get estatisticas() {
 // Retorne estatísticas da biblioteca
 return {
 totalItens: this.itens.length,
 totalUsuarios: this.usuarios.length,
 emprestimosAtivos: this.emprestimos.filter(e => !e.foiDevolvido).length
 };
 }
 
}
// Classe Usuario com encapsulamento
class Usuario {
 #multa = 0;
 #historicoEmprestimos = [];

 constructor(nome, id) {
 // Implemente o construtor
 this.nome = nome;
 this.id = id;
 }

 // Getters e setters
 get multa() {
 return this.#multa;
 }

 adicionarMulta(valor) {
 // Adicione multa ao usuário
 this.#multa += valor;
 }

 pagarMulta(valor) {
 // Permita pagar multa
 this.#multa = Math.max(0, this.#multa - valor);
 }

 // Método para verificar se pode pegar empréstimo
 podePegarEmprestimo() {
 // Verifique se não tem multas e limite de empréstimos
 return this.#multa === 0 && this.#historicoEmprestimos.length < 5;
 }

 adicionarEmprestimo(emprestimo) {
 this.#historicoEmprestimos.push(emprestimo);
 }
}
// Teste o sistema completo
const biblioteca = Biblioteca.getInstancia();
const usuario = new Usuario("Maria Santos", "USR002");
const livro = new Livro("Dom Casmurro", "Machado de Assis", 1899, "978-85-7232-144-9", "Romance");

biblioteca.adicionarItem(livro);
const emprestimo = biblioteca.realizarEmprestimo(usuario, livro);
console.log(emprestimo.informacoes);
console.log("Multa atual:", usuario.multa);
console.log("Estatísticas:", biblioteca.estatisticas);
