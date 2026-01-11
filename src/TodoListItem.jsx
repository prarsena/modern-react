export default function TodoListItem({ todo, onCompletedClicked, onDeleteClicked }){
    return (
        <div>
            <h4 className="flex text-blue-500 font-light">{todo.text} - {todo.isCompleted && <span>Complete!</span>}</h4>
            {todo.isCompleted 
                ? <button onClick={() => onDeleteClicked(todo.text)} >Delete Item</button>
                : <button onClick={() => onCompletedClicked(todo.text)}>Mark as Completed</button>
                }
        </div>
    )
}