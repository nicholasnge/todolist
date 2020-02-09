import React from 'react';
import { Link } from 'react-router-dom';

function CompletedTodo(props) {
    const content =
        <div className="card-body p-1">
          <h5 className="card-title m-0"> {props.todo.content}</h5>
        </div>

    const tags =
        <div className="card-body p-0">
            {props.todo.all_tags.map((tag, index) => (
                <div key={index} className="btn tag-button" onClick={() => props.selectTag(tag.name)}>
                  {tag.name}
                </div>
            ))}
        </div>

    return (props.todo.id == props.selected_id)
        ?   <div key={props.id} className="completed-selected-card mb-2">
                {content}
                {tags}
            </div>
        :
            <div key={props.id} className="custom-completed-card mb-2">
                {content}
                {tags}
            </div>;
}

export default CompletedTodo;
