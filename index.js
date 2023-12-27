const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;

let peopleHTMLList = [];

const databaseConfig = {
	host: "database",
	user: "root",
	password: "root",
	database: "node",
};
const connection = mysql.createConnection(databaseConfig);

const preparationSql = `CREATE TABLE IF NOT EXISTS people(id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY(id));`;
connection.query(preparationSql);

const insertSql = `INSERT INTO people(name) VALUES ("Rodrigo");`;
connection.query(insertSql);

const listSql = `SELECT * FROM people;`;
connection.query(listSql, (err, results) => {
	if (err) {
		throw err;
	}

	if (results?.length > 0) {
		results.map(result => peopleHTMLList.push(`<p>${result.name}</p>`));
	}
});

connection.end();

app.get("/", async (request, response) => {
	response.send(`
		<h1>Full Cycle Rocks!</h1>
		${peopleHTMLList.join(" ")}
	`);
});

app.listen(port, () => {
	console.log("Server running on " + port);
});