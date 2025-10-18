 
 
class Livro {
 // Complete o construtor aqui
 constructor(titulo, autor, anoPublicacao) {

 // Inicialize as propriedades aqui
 this.titulo = titulo;
 this.autor = autor;
 this.anoPublicacao = anoPublicacao;
 this.disponivel = true;
 }

 // Implemente os métodos abaixo
 obterInformacoes() {
 // Deve retornar uma string com título, autor e ano
 return `${this.titulo} por ${this.autor} (${this.anoPublicacao})`;
 }

 estaDisponivel() {
 // Deve retornar true se o livro estiver disponível
 return this.disponivel;
 }

 emprestar() {
 // Deve marcar o livro como indisponível
 this.disponivel = false;
 }

 devolver() {
 // Deve marcar o livro como disponível
 this.disponivel = true;
 }
}
 
 const meuLivro = new Livro("Dom Casmurro", "Machado de Assis", 1899);
console.log(meuLivro.obterInformacoes());
console.log("Disponível:", meuLivro.estaDisponivel());
meuLivro.emprestar();
console.log("Disponível após empréstimo:", meuLivro.estaDisponivel());
meuLivro.devolver();
console.log("Disponível após devolução:", meuLivro.estaDisponivel());

const meuLivro2 = new Livro("O Alienista", "Machado de Assis", 1900);
console.log(meuLivro.obterInformacoes());
console.log("Disponível:", meuLivro.estaDisponivel());
meuLivro.emprestar();
console.log("Disponível após empréstimo:", meuLivro.estaDisponivel());
meuLivro.devolver();
console.log("Disponível após devolução:", meuLivro.estaDisponivel());


const meuLivro3 = new Livro("Os Sertões", "Euclides da Cunha", 1938);
console.log(meuLivro.obterInformacoes());
console.log("Disponível:", meuLivro.estaDisponivel());
meuLivro.emprestar();
console.log("Disponível após empréstimo:", meuLivro.estaDisponivel());
meuLivro.devolver();
console.log("Disponível após devolução:", meuLivro.estaDisponivel());


const meuLivro4 = new Livro("iracema", "José de Alencar", 1910);
console.log(meuLivro.obterInformacoes());
console.log("Disponível:", meuLivro.estaDisponivel());
meuLivro.emprestar();
console.log("Disponível após empréstimo:", meuLivro.estaDisponivel());
meuLivro.devolver();
console.log("Disponível após devolução:", meuLivro.estaDisponivel());

const meuLivro5 = new Livro("O Príncipe", "Maquiavel", 1532);
console.log(meuLivro.obterInformacoes());
console.log("Disponível:", meuLivro.estaDisponivel());
meuLivro.emprestar();
console.log("Disponível após empréstimo:", meuLivro.estaDisponivel());
meuLivro.devolver();
console.log("Disponível após devolução:", meuLivro.estaDisponivel());

const meuLivro6 = new Livro("Iliada", "Homero", 750, "d.c." );
console.log(meuLivro.obterInformacoes());
console.log("Disponível:", meuLivro.estaDisponivel());
meuLivro.emprestar();
console.log("Disponível após empréstimo:", meuLivro.estaDisponivel());
meuLivro.devolver();
console.log("Disponível após devolução:", meuLivro.estaDisponivel());

const meuLivro7 = new Livro("O cortiço", "Aluiso de Azevedo", 1890);
console.log(meuLivro.obterInformacoes());
console.log("Disponível:", meuLivro.estaDisponivel());
meuLivro.emprestar();
console.log("Disponível após empréstimo:", meuLivro.estaDisponivel());
meuLivro.devolver();
console.log("Disponível após devolução:", meuLivro.estaDisponivel());

function carregarLivrosTabela(){
    const livros = [
        new Livro("Dom Casmurro", "Machado de Assis", 1899),
        new Livro("O Alienista", "Machado de Assis", 1900),
        new Livro("Os Sertões", "Euclides da Cunha", 1938),
        new Livro("Iracema", "José de Alencar", 1910),
        new Livro("O Príncipe", "Maquiavel", 1532),
        new Livro("Iliada", "Homero", 750, "d.c." ),
        new Livro("O cortiço", "Aluiso de Azevedo", 1890)
    ];
    
    livros[3].emprestar();
     livros[1].emprestar();
      livros[6].emprestar();
    let tableLivros = document.getElementById("livros-tbody");
    for (let livro of livros) {
        let row = document.createElement("tr");
        let titulo = document.createElement("td");
        titulo.textContent = livro.titulo;
        let autor = document.createElement("td");
        autor.textContent = livro.autor;
        let ano = document.createElement("td");
        ano.textContent = livro.anoPublicacao;
        let disponivel = document.createElement("td");
        disponivel.textContent = livro.estaDisponivel() ? "Sim" : "Não";
        let tdEmprestar = document.createElement("td");
    
        let btnEmprestar = document.createElement("button");
        btnEmprestar.textContent = "Emprestar";
        btnEmprestar.disabled = !livro.estaDisponivel();
        btnEmprestar.addEventListener("click", ()=> {
            livro.emprestar();
            disponivel.textContent = "Não";
            btnEmprestar.disabled = true;
        });
        tdEmprestar.appendChild(btnEmprestar);
        row.appendChild(titulo);
        row.appendChild(autor);
        row.appendChild(ano);
        row.appendChild(disponivel);
        row.appendChild(tdEmprestar);
        tableLivros.appendChild(row);   
    }
}
document.addEventListener("DOMContentLoaded", carregarLivrosTabela);

