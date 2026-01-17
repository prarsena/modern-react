import { useSelector } from "react-redux"
import NewTodoForm from "./NewTodoForm"
import TodoListItem from "./TodoListItem"
import { getCompletedTodos, getIncompleteTodos, getTodosLoading } from "./selectors/selectors";

export default function TodoList() {
    const todosAreLoading = useSelector(getTodosLoading);

    const completedTodos = useSelector(getCompletedTodos);
    const incompleteTodos = useSelector(getIncompleteTodos);

    return(
        <div>
            <h1 className='py-3'>My Todos</h1>
            <NewTodoForm />
            {todosAreLoading
              ? <p>Loading...</p>
              : (
                <>
                <h3 className="flex text-3xl py-3 font-semibold text-green-500">Completed: </h3>
                {completedTodos.map((todo) => (
                    <TodoListItem todo={todo} key={todo.id} />
                ))}

                <h3 className="flex text-3xl py-3 font-semibold text-red-500">Incomplete: </h3>
                {incompleteTodos.map((todo) => (
                    <TodoListItem todo={todo} key={todo.id} />
                ))}
                </>    
            )}    
        </div>
    )
}