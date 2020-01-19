var bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://test:test@cluster0-867kw.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true });
var todoSchema = new mongoose.Schema({
  item: String
});
var Todo = mongoose.model('Todo', todoSchema);

//var data =[{item: 'Get Milk'}, {item: 'Walk Dog'}, {item: 'Finish Hacking John'}];
var urlencodedParser = bodyParser.urlencoded({extended:false});
module.exports = function(app) {
  app.get("/todo", (req, res) => {
    Todo.find({}, function(err, data) {
      if (err) throw err;
      res.render('todo', {todos: data});
    });
  });
  app.post("/todo", urlencodedParser, (req, res) => {
    var newTodo = Todo(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
  app.delete("/todo/:item", (req, res) => {
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
};
