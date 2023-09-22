// we need useState and useEffect hooks
import React,{useState,useEffect} from 'react'


// icons from react icons kit
// main Icon component
import { Icon } from 'react-icons-kit'

// icons themselves
import {plus} from 'react-icons-kit/feather/plus'
import {edit2} from 'react-icons-kit/feather/edit2'
import {trash} from 'react-icons-kit/feather/trash'


//get Todos from Local Storage :
const getTodosFromLS=()=>
{
    const data = localStorage.getItem('Todos');

    if(data){
        return JSON.parse(data)
    }
    else
    {
        return []
    }
}


function Form()
 {
    
    //Create a State for Input Fields:
    const [todoValue,setTodoValue]=useState('')

    //Create a UseState Array for Todo Items :
    const [todos,setTodos]=useState(getTodosFromLS());

    // console.log(todos);


    //---handle Submit button :-
    const handleSubmit = (e)=>
    {
        e.preventDefault();

         //Creating a ID for every todo :
        const date = new Date();
        const time = date.getTime();

        //Creating a todo Object :
        let todoObject = {
                        ID : time,
                        TodoValue : todoValue,
                        completed : false
                         }
     
    //Updating todos State :
    setTodos([...todos,todoObject]);
    
    //clearing input field:
    setTodoValue('');
    }

   
    
    //useEffect : to store our todos to Local Storage :
    useEffect(()=>
    {
        localStorage.setItem('Todos',JSON.stringify(todos))
    },[todos])  // useEffect will run whenever our todos state Changes :

    //to Delete the todo :
    const handleDelete=(id)=>
    {
        // console.log(id);
        const filtered = todos.filter((todo)=>{
            return todo.ID !== id;
        })
        setTodos(filtered);
    }

    // To Edit the Form : UseState:
    const [editForm,setEditForm]=useState(false);
    //id State :
    const [id,setId]=useState();
    // "Edit Icon": when user click on Edit Icon Button :
    const handleEdit = (todo,index)=>
    {
        setEditForm(true);
        setId(index);
        setTodoValue(todo.TodoValue);
    }
    // "EDIT FORM" : Update Button :
    // const handleEditSubmit = (e)=>
    // {
    //     e.preventDefault()
    //     let items=[...todos];
    //     let item = items[id];
    //     console.log(item);
    //     item.TodoValue = todoValue;
    //     item.completed = false;
    //     item[id]=item;
    //     setTodos(items);
    //     setTodoValue('');
    //     setEditForm(false);
    // }
    const handleEditSubmit = (e) => {
        e.preventDefault();
        
        // Create a copy of the todos array
        let updatedTodos = [...todos];
      
        // Update the specific todo item by ID
        updatedTodos[id] = {
          ...updatedTodos[id],
          TodoValue: todoValue,
          completed: false,
        };
      
        // Set the updated todos array as the new state
        setTodos(updatedTodos);
      
        // Clear the input field and exit the edit form
        setTodoValue('');
        setEditForm(false);
      };

      //handleCheckbox : onCHange on Checkbox:
      const handleCheckbox=(id)=>
      {
        let todoArray = []
        //we use for Each loop to todos State :
        todos.forEach((todo) => {
            if(todo.ID===id)
            {
                if(todo.completed===false)
                {
                    todo.completed=true;
                }
                else if(todo.completed===true)
                {
                    todo.completed=false;
                }
            }
            todoArray.push(todo);
            setTodos(todoArray);
        });
      } 


    return (
        <>
          {/* INITIAL :  form component */}

          {editForm===false && (

            <div className="form">
              <form autoComplete="off" onSubmit={handleSubmit}>
                <div className="input-and-button">
                
                  <input onChange={(e)=>setTodoValue(e.target.value)} value={todoValue}
                   type='text' placeholder="Add an Item" required/>
               
                  <div className='button'>

                    <button type="submit">
                      <Icon icon={plus} size={20}/>  
                    </button>

                  </div>
                </div>
              </form>

              </div>
          )}   

            {/* When Click on Edit ICON :  form component */}

          {editForm===true && (

            <div className="form">
            <form autoComplete="off" onSubmit={handleEditSubmit}>
                <div className="input-and-button">
                
                <input onChange={(e)=>setTodoValue(e.target.value)} value={todoValue}
                type='text' placeholder="Add an Item" required/>
            
                <div className='button edit'>

                    <button type="submit">
                        Update
                    </button>

                </div>
                </div>
            </form>

            </div>
            )} 
          {/* end of Edit-form component */}

            {/* ------------------------------------------------------------------------------------ */}
            {/* ------------------------------------------------------------------------------------ */}
            {/* ------------------------------------------------------------------------------------ */}
            
            {/* start to Render and Display Todos Data if "todo.length > 0" :- */}
            {
                todos.length>0 && (
                    <>
                    {todos.map((individualTodo,index)=>(
                        <div className='todo' key={individualTodo.ID}>

                            {/* CheckBox and VALUE */}
                            <div>
                                {editForm===false&&(
                                <input type='checkbox' 
                                checked={individualTodo.completed}
                                onChange={()=>handleCheckbox(individualTodo.ID)}/>)}
                                
                                <span style={individualTodo.completed===true ? {textDecoration:'line-through'}: {textDecoration:'none'}}>
                                    {individualTodo.TodoValue}
                                </span>
                            </div>

                            {/* Edit and Delete ICON Div */}
                                
                                {editForm===false&&(

                                <div className='edit-and-delete'>

                                        <div style={{marginRight:7+'px'}}
                                            onClick={()=>handleEdit(individualTodo,index)}>
                                            <Icon icon={edit2} size={18}/>
                                        </div>
                                    
                                        <div onClick={()=>handleDelete(individualTodo.ID)}>
                                            <Icon icon={trash} size={18}/>
                                        </div>

                                </div>
                                )}
                        </div>
                    ))}

                    {/* // Button To Delete All the TODO's : */}
                    
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                        
                        <button onClick={()=>setTodos([])} className='delete-all'>
                            DELETE ALL
                        </button>

                    </div>

                    </>
                )
            }

          
        </>
    )
}

export default Form;

