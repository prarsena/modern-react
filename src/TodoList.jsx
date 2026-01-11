import NewTodoForm from "./NewTodoForm"
import TodoListItem from "./TodoListItem"

export default function TodoList({ completedTodos, incompleteTodos, onCompletedClicked, onDeleteClicked, onCreateClicked }) {
    return(
        <div>
            <h1>My Todos</h1>
            <NewTodoForm onCreateClicked={onCreateClicked}/>
        
            <h3>Completed: </h3>
            {completedTodos.map((todo, index) => (
                <TodoListItem todo={todo} key={index} onDeleteClicked={onDeleteClicked} />
            ))}

            <h3>Incomplete: </h3>
            {incompleteTodos.map((todo, index) => (
                <TodoListItem todo={todo} key={index}  onCompletedClicked={onCompletedClicked} />
            ))}
        </div>
    )
}