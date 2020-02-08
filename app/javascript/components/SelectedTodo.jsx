import React from 'react';
import { Link } from 'react-router-dom';

function SelectedTodo(props) {
    const tags =
      <div className="card-body p-0">
          {props.todo.all_tags.map((tag, index) => (
              <div key={index} className="btn tag-button" onClick={() => props.selectTag(tag.name)}>
                {tag.name}
              </div>
          ))}
      </div>

    return (
        <div key={props.id} className="custom-selectedTag">

          <div className="card-body p-1 pb-0">
            <h5 className="card-title"> {props.todo.content}</h5>
            <hr></hr>
          </div>
          <div className="card-body px-1 py-0">
              {props.todo.details}
          </div>

          <div className="card-body pr-1 py-1 pl-0">
            {tags}
          </div>

          <div className="card-body pr-1 py-1 pl-0">
            {(props.todo.id == -1)
              ? <div></div>

              :<button type="button" className="btn custom-button" onClick={props.deleteTodo}>
                Complete Todo
              </button>}
          </div>
        </div>
  );
}

export default SelectedTodo;
