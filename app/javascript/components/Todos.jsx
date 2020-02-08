import React from "react";
import { Link } from "react-router-dom";
import SelectedTodo from "./SelectedTodo";
import Todo from "./Todo";

class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos_impt: [],
      todos_meh: [],
      selected: {   id: -1,
                        content: "Select a Todo to view details",
                        priority: true,
                        all_tags: []},
      searchbar: ""
    };
  }

  componentDidMount() {
      const url = "/api/v1/todos/index";
      fetch(url)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error ("Network response cmi");
        })
        .then(response => this.setState({todos_impt: response.todos_impt,
                                         todos_meh: response.todos_meh,
                                         selected: { id: -1,
                                                     content: "Select a Todo to view details",
                                                     priority: true,
                                                 all_tags: []}
                                         }))
        .catch(() => this.props.history.push("/"));
  }

  selectTodo(todo) {
    this.setState({selected: todo});
  }
  selectTag(tagname) {
    console.log(tagname);
    this.setState({searchbar: tagname});
    console.log(this.state.searchbar);
  }

deleteTodo() {
  const url = `/api/v1/destroy/${this.state.selected.id}`;
  const token = document.querySelector('meta[name="csrf-token"]').content;

  fetch(url, {
    method: "DELETE",
    headers: {
      "X-CSRF-Token": token,
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then(() => this.props.history.push(`/todos`))
    .catch(error => console.log(error.message));
    this.componentDidMount();
}

  handleSearch(e) {
      this.setState({searchbar: e.target.value});
  }
  filterTodos(array) {
      const filter = this.state.searchbar.toLowerCase();
      if (filter == "") {return array};
      const filtered_arr = array.filter((todo) => {
          if (todo.content.toLowerCase().includes(filter)) { return true;}
          const numberTags = todo.all_tags.length;
          for (var i=0; i<numberTags; i++){
              const tagLower = todo.all_tags[i].name.toLowerCase();
              if (tagLower.includes(filter)) { return true;}
          }
          return false;
      });
      return (filtered_arr);
  }


  render() {
      console.log(this.state);
    const impt_filtered = this.filterTodos(this.state.todos_impt);
    const todos_impt = impt_filtered.map((todo, index) => (
        <div key={index} onClick={this.selectTodo.bind(this,todo)}>
        <Todo todo={todo} selected_id={this.state.selected.id} selectTag={this.selectTag.bind(this)}/>
        </div>
    ));

    const meh_filtered = this.filterTodos(this.state.todos_meh);
    const todos_meh = meh_filtered.map((todo, index) => (
        <div key={index} onClick={this.selectTodo.bind(this,todo)}>
        <Todo todo={todo} selected_id={this.state.selected.id} selectTag={this.selectTag.bind(this)}/>
        </div>
    ));

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center p-2 m-0">
          <div className="container">
            <h1 className="display-4 m-0">Todo List</h1>
            <div className="row mx-5">
                <div className="wrapper">
                    <div className="search_box">
                        <input type="text" onClick={this.handleSearch.bind(this)} onChange={this.handleSearch.bind(this)} placeholder="SEARCH"/>
                            <i className="fas fa-search"></i>
                    </div>
                </div>
            </div>
          </div>
        </section>

        <div className="py=1">
          <main className="container">
          <div className="row ">
            <div className="col-md-4 p-2">
                <Link className="btn custom-new mb-1" to="/todo">
                <h4 className="card-title text-center m-0">+ New Todo</h4>
                </Link>

                <SelectedTodo todo={this.state.selected} selectTag={this.selectTag.bind(this)} deleteTodo={this.deleteTodo.bind(this)}/>
            </div>

            <div className="col-md-4 p-2">
                <div className="custom-impt-label mb-1">
                    <h4 className="card-title text-center m-0"> Important</h4>
                </div>
                {(todos_impt) ? todos_impt : noTodo}
            </div>

            <div className="col-md-4 p-2">
                <div className="custom-meh-label mb-1">
                    <h4 className="card-title text-center m-0"> Meh</h4>
                </div>
                {(todos_meh) ? todos_meh : noTodo}
            </div>
            </div>
          </main>
        </div>
      </>
    );
  }
}
export default Todos;
