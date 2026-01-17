import { useState } from 'react';
import { useDispatch } from "react-redux";
import { createTodo } from './thunks/thunks';


export default function NewTodoForm(){
    const [inputText, setInputText] = useState('');
    const dispatch = useDispatch();
    
    return(
        <div >
            <input type="text"
                className="bg-sky-500/50 border border-default-medium shadow-xs px-3 py-2 mr-3"   
                value={inputText}
                onChange={e => setInputText(e.target.value)} />
            &&&
            <button 
            className="mx-3"
            onClick={() => {
                dispatch(createTodo(inputText))
                setInputText('');
            }}> Create Todo </button>
        </div>
    )
}