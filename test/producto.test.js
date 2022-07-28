import chai from "chai";
import chaiHttp from "chai-http";
import config from "../config.js"

chai.use(chaiHttp);
const expect = chai.expect;
const url = `http://localhost:${config.PORT}/api`;


describe('Todos los productos: ', () => {

	it('Se deberían obtener todos los productos', (done) => {
		chai.request(url)
			.get('/producto')
			.end(function (err, res) {
				console.log(res.body)
				expect(res).to.have.status(200);
				done();
			});
	});

});

describe('Se obtiene el producto por id:', () => {

	it('Se debería obtener el producto con id: 62c60717905ec01eaf881b3a', (done) => {
		chai.request(url)
			.get('/producto/62c60717905ec01eaf881b3a')
			.end(function (err, res) {
				console.log(res.body)
				expect(res.body).to.have.property('_id').to.be.equal('62c60717905ec01eaf881b3a');
				expect(res).to.have.status(200);
				done();
			});
	});

	it('El producto con id: 1 no debería existir', (done) => {
		chai.request(url)
			.get('/producto/1')
			.end(function (err, res) {
				console.log(res.body)
				expect(res.body).to.have.property('error').to.be.equal(-4);
				expect(res).to.have.status(404);
				done();
			});
	});

});

describe('Se intenta guardar un producto con error: ', () => {

	it('Al no ser admin no puede guardar el producto', (done) => {
		chai.request(url)
			.post('/producto')
			.send({
				nombre: "Test product",
				descripcion: "Motherboard Mother Asus Prime A320m-k ////////////",
				codigo: "123151648",
				url: "https://http2.mlstatic.com/D_NQ_NP_2X_814476-MLA47101074241_082021-F.webp",
				precio: 3860,
				stock: 25,
			})
			.end(function (err, res) {
				console.log(res.body)
				expect(res.body).to.have.property('error').to.be.equal(-1);
				expect(res).to.have.status(403);
				done();
			});
	});

	it('Al no tener el campo stock no puede guardar el producto', (done) => {
		chai.request(url)
			.post('/producto')
			.send({
				nombre: "Test product",
				descripcion: "Motherboard Mother Asus Prime A320m-k ////////////",
				codigo: "123151648",
				url: "https://http2.mlstatic.com/D_NQ_NP_2X_814476-MLA47101074241_082021-F.webp",
				precio: 3860,
				admin: true
			})
			.end(function (err, res) {
				console.log(res.body)
				expect(res.body).to.have.property('error').to.be.equal(-3);
				expect(res).to.have.status(400);
				done();
			});
	});

	it('Se guarda el producto exitosamente', (done) => {
		chai.request(url)
			.post('/producto')
			.send({
				nombre: "Test product",
				descripcion: "Motherboard Mother Asus Prime A320m-k ////////////",
				codigo: "123151648",
				url: "https://http2.mlstatic.com/D_NQ_NP_2X_814476-MLA47101074241_082021-F.webp",
				precio: 3860,
				stock: 25,
				admin: true
			})
			.end(function (err, res) {
				console.log(res.body)
				expect(res.body).to.have.property('idProductoGuardado');
				expect(res).to.have.status(200);
				done();
			});
	});

});

