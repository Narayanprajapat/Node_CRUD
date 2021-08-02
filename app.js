const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

const crudSchema = new mongoose.Schema({
	name: String,
	age: Number,
	qualification: String,
});

const crudModel = new mongoose.model('crud-operation', crudSchema);

mongoose
	.connect('mongodb+srv://narayan:z1bAXHYhT1cbGOui@cluster0.jyvgk.mongodb.net/LetsUpgrade?authSource=admin&replicaSet=atlas-hxl6ie-shard-0&w=majority', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('MongoDB Connected');
	});

app.get('/api/v1', (req, res) => {
	crudModel.find({}).then((data) => {
		res.status(200).json({ data: data });
	});
	console.log('READ ALL DATA');
});

app.get('/api/v1/:id', (req, res) => {
	crudModel.find({ _id: req.params.id }).then((data) => {
		res.status(200).json({ data: data });
	});
	console.log('READ DATA BY ID');
});

app.post('/api/v1', (req, res) => {
	new crudModel(req.body).save().then((data) => {
		console.log(data);
		res.status(200).json({ message: 'Created' });
	});
	console.log('POST DATA');
});

app.put('/api/v1/:id', (req, res) => {
	crudModel.updateOne({ _id: req.params.id }, req.body).then(() => {
		res.status(200).json({ message: 'Update' });
	});
	console.log('UPDATE DATA BY ID');
});

app.delete('/api/v1/:id', (req, res) => {
	crudModel.deleteOne({ _id: req.params.id }).then(() => {
		res.status(200).json({ message: 'Delete' });
	});

	console.log('DELETE DATA BY ID');
});

app.listen(port, () => {
	console.log(`Server Has Started On \n http://localhost:${port}/`);
});
