import React from 'react';
import { Link } from 'react-router-dom';

function Todo(props) {
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

    return ((props.todo.priority)
        ?   (props.todo.id == props.selected_id)
            ?   <div key={props.id} className="custom-impt-singleclick-card mb-2">
                    {content}
                    {tags}
                </div>
            :
                <div key={props.id} className="custom-impt-card mb-2">
                    {content}
                    {tags}
                </div>
        :   (props.todo.id == props.selected_id)
            ?   <div key={props.id} className="custom-meh-singleclick-card mb-2">
                    {content}
                    {tags}
                </div>
            :
                <div key={props.id} className="custom-meh-card mb-2">
                    {content}
                    {tags}
                </div>
  );
}

export default Todo;
