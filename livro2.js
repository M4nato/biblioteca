// Classe base para todos os itens da biblioteca
class ItemBiblioteca {
 constructor(titulo, autor, anoPublicacao,) {
 // Implemente o construtor
 this.titulo = titulo;
 this.autor = autor;
 this.anoPublicacao = anoPublicacao;
 this.disponivel = true;
 }

 // Método para obter informações (será sobrescrito) modificar

 obterInformacoes() {
 return `${this.titulo} por ${this.autor} (${this.anoPublicacao})`;
 }

 emprestar() {
 // Implemente a lógica de empréstimo
 if (this.disponivel) {
 this.disponivel = false;
 return true;
 }
 return false;
 }

 devolver() {
 // Implemente a lógica de devolução
 this.disponivel = true;
 }

 estaDisponivel() {
 return this.disponivel;
 }
}
// Classe Livro que herda de ItemBiblioteca
class Livro extends ItemBiblioteca {
 constructor(titulo, autor, anoPublicacao, isbn, genero) {
 // Chame o construtor da classe pai
 super(titulo, autor, anoPublicacao);
 // Adicione propriedades específicas
 this.isbn = isbn;
 this.genero = genero;
 }
  
 // Sobrescreva o método obterInformacoes
 obterInformacoes() {
 // Retorne informações específicas do livro
 return `Livro: ${this.titulo} - ${this.autor} (${this.anoPublicacao}) - ISBN: ${this.isbn}`;
}
}
// Classe Revista que herda de ItemBiblioteca

class Revista extends ItemBiblioteca {
 constructor(titulo, editora, anoPublicacao, numeroEdicao) {
 // Implemente o construtor
 super(titulo, editora, anoPublicacao);
 this.numeroEdicao = numeroEdicao;
 }

 // Sobrescreva o método obterInformacoes
 obterInformacoes() {
 // Retorne informações específicas da revista
 return `Revista: ${this.titulo} - Edição ${this.numeroEdicao} (${this.anoPublicacao})`;
 }
}

// Classe Usuario
class Usuario {
 constructor(nome, id) {
 // Implemente o construtor
 this.nome = nome;
 this.id = id;
 this.itensEmprestados = [];
 }

 emprestarItem(item) {
 // Implemente a lógica de empréstimo
 if (item.emprestar()) {
 this.itensEmprestados.push(item);
 return true;
 }
 return false;
 }

 devolverItem(item) {
 // Implemente a lógica de devolução
 const index = this.itensEmprestados.indexOf(item);
 if (index > -1) {
 this.itensEmprestados.splice(index, 1);
 item.devolver();
 return true;
 }
 return false;
 }
}
// Teste seu código
const livro = new Livro("Revolução dos Bichos", "George Orwell", 1945, "978-85-359-0277-8", "Ficção");
const revista = new Revista("National Geographic", "National Geographic Society", 2023, 245);
const usuario = new Usuario("Rafael", "USR001");
console.log(livro.obterInformacoes());
console.log(revista.obterInformacoes());
usuario.emprestarItem(livro);
console.log("Livro disponível após empréstimo:", livro.estaDisponivel());