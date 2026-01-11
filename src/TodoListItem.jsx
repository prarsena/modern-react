export default function TodoListItem({ todo, onCompletedClicked, onDeleteClicked }){
    return (
        <div>
            <h3>{todo.text} - {todo.isCompleted && <span>Complete!</span>}</h3>
            {todo.isCompleted 
                ? <button onClick={() => onDeleteClicked(todo.text)} >Delete Item</button>
                : <button onClick={() => onCompletedClicked(todo.text)}>Mark as Completed</button>
                }
        </div>
    )
}