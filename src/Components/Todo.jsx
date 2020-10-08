import React, { Component } from 'react';

class Todo extends Component{

  render(){

    return (
      <React.Fragment>
      {this.renderSelf()}
        {(this.props.data.todos.length > 0 && this.props.data.isExpanded) && 

        <div className="ml-4 mb-3 pb-3 pl-3 ml-3" style={{borderBottom : "1px solid black", borderLeft : "1px solid black"}}>
          {this.renderChildren()} 
        </div>

        }
      </React.Fragment>
    );
  }

  renderSelf(){

    let classes = "btn btn-block btn-"
    const doneClass = this.props.data.todos.length > 0? "outline-success" : "success";
    const inProgressClass = this.props.data.todos.length > 0 ? "outline-dark" : "outline-primary";
    classes += this.props.isCompleted()? doneClass : inProgressClass;

    let text = this.props.data.text;
    let completeText = this.props.data.todos.length > 0? " (Finished)" : " (Done)"
    text += this.props.isCompleted()? completeText : this.getProgressStatus();

    return (
      <div className="m-2 form-inline input-group">

        <div className="input-group-append">
          <button className="btn btn-outline-primary" onClick={this.props.onCreate}>+</button>
        </div>

        <button 
          className={classes + " form-control"} 
          onClick={this.props.onToggle}
        >
          {text}
        </button>
        <div className="input-group-append">
          < button className="btn btn-outline-danger" onClick={this.props.onDelete}>X</button>
        </div>
      </div>
    )
  }

  renderChildren()
  {
    const {todos} = this.props.data;

    return (todos.map(todo => <Todo 
      key={todo.id} 
      data={todo}
      isCompleted={() => this.props.checkIfCompleted(todo)}
      onCreate={() => this.props.onCreateChild(todo)}
      onToggle={() => this.props.onToggleChild(this.props.data, todo)} 
      onDelete={() => this.props.onDeleteChild(this.props.data,todo)}
      onCreateChild={this.props.onCreateChild}
      onToggleChild={this.props.onToggleChild} 
      onDeleteChild={this.props.onDeleteChild}
      checkIfCompleted={this.props.checkIfCompleted}
    />) );

  }

  getProgressStatus(){
    const {todos} = this.props.data;
    
    if(todos.length > 0)
    {
      return " (" + todos.filter(t => this.props.checkIfCompleted(t)).length + "/" + todos.length + ")";
    }

    return "";

  }


}

export default Todo;