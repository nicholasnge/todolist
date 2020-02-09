import React from "react";
import { Link } from "react-router-dom";
import SelectedTodo from "./SelectedTodo";
import CompletedTodo from "./CompletedTodo";

class CompletedTodos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos_completed: [],
      selected: {   id: -1,
                    content: "Select a Todo to view details",
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
        .then(response => this.setState({todos_completed: response.todos_completed,
                                         selected: { id: -1,
                                                     content: "Select a Todo to view details",
                                                     all_tags: []}
                                                    }))
        .catch(() => this.props.history.push("/"));
  }

  selectTodo(todo) {
    this.setState({selected: todo});
  }
  selectTag(tagname) {
    this.setState({searchbar: tagname});
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
      .then(() => this.props.history.push(`/completed`))
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
    const completed_filtered = this.filterTodos(this.state.todos_completed);
    const todos_completed = completed_filtered.map((todo, index) => (
        <div key={index} onClick={this.selectTodo.bind(this,todo)}>
        <CompletedTodo todo={todo} selected_id={this.state.selected.id} selectTag={this.selectTag.bind(this)}/>
        </div>
    ));
    const todos_completed_split_odd = todos_completed.filter((x, i) => i % 2);
    const todos_completed_split_even = todos_completed.filter((x, i) => !(i % 2));

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center p-2 m-0">
          <div className="container">
            <h1 className="display-4 m-0">Hall of Fame</h1>
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
                <SelectedTodo todo={this.state.selected} selectTag={this.selectTag.bind(this)} toggleState={this.deleteTodo.bind(this)} halloffame={true}/>

                <Link className="btn custom-completed my-1" to="/todos">
                    <h5 className="card-title text-center m-0">Back to Reality</h5>
                </Link>
            </div>

            <div className="col-md-4 p-2">
                {(todos_completed_split_even) ? todos_completed_split_even : {}}
            </div>

            <div className="col-md-4 p-2">
                {(todos_completed_split_odd) ? todos_completed_split_odd : {}}
            </div>
            </div>
          </main>
        </div>
      </>
    );
  }
}
export default CompletedTodos;
