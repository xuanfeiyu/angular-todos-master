import { createReducer, on } from "@ngrx/store";
import { addTodo, checkTodo, deleteTodo } from "../actions/todo.actions";
import { v4 as uuidv4 } from "uuid";
import { createEntityAdapter, EntityAdapter, EntityState, Update } from "@ngrx/entity";
export const todoFeatureKey = "todo";
export interface Todo {
  id: string;
  title: string;
  checked:boolean;
}
export interface State extends EntityState<Todo> {}
export const adapter:EntityAdapter<Todo>=createEntityAdapter<Todo>()

export const initialState: State = adapter.getInitialState()
export const reducer = createReducer(
  initialState,
  on(addTodo, (state, action) => adapter.addOne({id:uuidv4(),title:action.title,checked:false},state)),
  on(deleteTodo, (state, action) => adapter.removeOne(action.id,state)),
  on(checkTodo,(state,action)=>adapter.updateOne({id:action.id,changes:{checked:action.checked}},state))
)
