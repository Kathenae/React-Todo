import React, { Component } from 'react';
import Todo from './Todo.jsx'

class TodoList extends Component{

  state = {
    input : "",
    failedCreate : false,
    todos : []
  }

  render(){

    const placeHolder = "Ex: Watch Black Clover";
    const errorClass = this.state.failedCreate? "is-invalid" : "";

    return (
      <div className="card">
        <div className="card-header">

          <div className="input-group">
            <input type="text" name="" onChange={ (e) => { this.setState({input : e.target.value}) } } value={this.state.input} className={"form-control " + errorClass } placeholder={placeHolder}/>
            <div className="input-group-append">
              <button className="btn btn-outline-primary" onClick={this.createTodo}>Add</button>
            </div>
          </div>
          {this.state.failedCreate && <small><p className="ml-4 text-muted">Write the name of the task in the field above.</p></small>}

        </div>
        <div className="card-body">
          {this.state.todos.map( todo => <Todo 
              key={todo.id} 
              data={todo} 
              isCompleted={() => this.checkIfCompleted(todo)}
              onCreate={() => this.createChildren(todo)}
              onToggle={() => this.toggleTodo(todo)} 
              onDelete={() => this.deleteTodo(todo)}
              onToggleChild={this.toggleChildren}
              onCreateChild={this.createChildren}
              onDeleteChild={this.deleteChildren}
              checkIfCompleted={this.checkIfCompleted}
            /> 
          )}
        </div>
      </div>
    );
  }

  componentDidMount(){
    const savedTodos = localStorage.getItem("todos");
    if(savedTodos){
      this.setState({todos:JSON.parse(savedTodos) })
    }
  }

  createTodo = () => {
    
    if(this.state.input === ""){
      this.setState({failedCreate : true});
      return;
    }

    const todos = [...this.state.todos];
    const newTodo = {
      id : todos.length,
      text : this.state.input,
      isDone : false,
      isExpanded : true,
      todos : [],
    }

    todos.push(newTodo);
    this.setState({todos});
    this.setState({input : ""})
    this.setState({failedCreate : false});
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  }
  
  toggleTodo = (todo) => {
    let todos = [...this.state.todos];
    const index = todos.indexOf(todo);

    if(todos[index].todos.length > 0)
    {
      todos[index].isExpanded = !todos[index].isExpanded;
    }
    else{
      todos[index].isDone = !todos[index].isDone;
    }

    this.setState({todos});
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  }

  deleteTodo = (todo) =>{
    let newTodos = [...this.state.todos];
    newTodos = newTodos.filter(t => t !== todo);
    this.setState({todos : newTodos});
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  createChildren = (parentTodo) =>{

    if(this.state.input === ""){
      this.setState({failedCreate : true});
      return;
    }

    const todos = [...parentTodo.todos];

    const newTodo = {
      id : todos.length,
      text : this.state.input,
      isDone : false,
      isExpanded : true,
      todos : [],
      isCompleted : this.checkIfCompleted
    }

    todos.push(newTodo);
    parentTodo.todos = todos;

    this.setState({todos : this.state.todos});
    this.setState({input : ""})
    this.setState({failedCreate : false});
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
    // console.log("Create on children");

  }

  toggleChildren = (parentTodo, childTodo) =>{
    const todos = [...parentTodo.todos];
    const index = todos.indexOf(childTodo);

    if(todos[index].todos.length > 0)
    {
      todos[index].isExpanded = !todos[index].isExpanded;
    }
    else{
      todos[index].isDone = !todos[index].isDone;
    }

    this.setState({todos : this.state.todos});
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
    // console.log("Toggle on children");

  }

  deleteChildren = (parentTodo, childTodo) =>{
    let todos = [...parentTodo.todos];
    parentTodo.todos = todos.filter(t => t !== childTodo);
    this.setState({todos : this.state.todos});
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
    // console.log("Delete on children");
  }

  checkIfCompleted = (todo) => {

    if(todo.todos.length > 0){
      return todo.todos.filter(t => this.checkIfCompleted(t)).length === todo.todos.length;
    }

    return todo.isDone;
  }

}

export default TodoList;