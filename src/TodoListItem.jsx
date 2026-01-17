import { useDispatch } from "react-redux";
import { deleteTodo, markTodoAsCompleted } from "./thunks/thunks"
import { styled } from "styled-components";

const getBackgroundColor = ({ important }) => {
    if (important){
        return 'background-color: yellow;'
    } else {
        return ''
    }
}

const CardContainer = styled.div`
    ${getBackgroundColor}
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.5);
    padding: 16px;
    margin: 5px;
`;

export default function TodoListItem({ todo }){
    // A hook to access the redux dispatch function.
    const dispatch = useDispatch();

    return (
        <CardContainer important={todo.text.endsWith('!')}>
            <h4 className="flex text-blue-500 py-2">{todo.text} -- {todo.isCompleted && <span className="text-green-500 ml-3">Complete!</span>}</h4>
            {todo.isCompleted 
                ? <button onClick={() => dispatch(deleteTodo(todo.id))} >Delete Item</button>
                : <button onClick={() => dispatch(markTodoAsCompleted(todo.id))}>Mark as Completed</button>
                }
        </CardContainer>
    )
}