import React from "react";
import { Link } from "react-router-dom";

class NewTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      priority: false,
      details: "",
      all_tags: "",
      completed: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
  }

  stripHtmlEntities(str) {
    return String(str)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  onChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
    }

  onSubmit(event) {
      event.preventDefault();
      const url = "/api/v1/todos/create";
      const { content, priority, details, all_tags, completed } = this.state;
      if (content.length == 0 || all_tags.length == 0) {
          return;
      }

      const body = {
          content: content.replace(/\n/g, "<br> <br>"),
          priority,
          details: details.replace(/\n/g, "<br> <br>"),
          all_tags,
          completed
      };

      const token = document.querySelector('meta[name="csrf-token"]').content;
      fetch(url, {
          method: 'POST',
          headers: {
              'X-CSRF-Token': token,
              'Content-Type': "application/json"
          },
          body: JSON.stringify(body)
      })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response cmi');
        })
        .then(response => this.props.history.push(`/todos`))
        .catch(error => console.log(error.message));
  }

  render() {
    return (
      <div className="container mt-2">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-3">
              Add a new todo
            </h1>
            <form onSubmit={this.onSubmit}>

              <div className="form-group">
                <input
                  type="text"
                  name="content"
                  id="todoContent"
                  className="form-control"
                  required
                  onChange={this.onChange}
                  placeholder="Title"
                />
              </div>

              <div className="form-group">
                <textarea
                  type="text"
                  name="details"
                  id="todoDetails"
                  className="form-control"
                  onChange={this.onChange}
                  rows="8"
                  placeholder="Details"
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="all_tags"
                  id="todoAll_Tags"
                  className="form-control"
                  required
                  onChange={this.onChange}
                  placeholder="Tags"
                />
                <small id="ingredientsHelp" className="form-text text-muted">
                  Separate each tag with a comma.
                </small>
              </div>

                <label htmlFor="todoPriority">Important</label>
                <input
                  type="checkbox"
                  name="priority"
                  id="todoPriority"
                  className="form-control"
                  checked={this.state.priority}
                  onChange={this.onChange}
                />
              <button type="submit" className="btn custom-new mt-3">
                Create Todo
              </button>
              <Link to="/todos" className="btn custom-button mt-3">
                Back
              </Link>
            </form>
        </div>
      </div>
    );
  }
}

export default NewTodo;
