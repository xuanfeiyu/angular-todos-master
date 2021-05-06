import { createAction, props } from '@ngrx/store';

//添加
export const addTodo = createAction(
  'addTodo',
  props<{title:string}>()
);
//删除
export const deleteTodo = createAction(
  'deleteTodo',
  props<{id:string}>()
);

export const checkTodo=createAction(
  'checkTodo',
  props<{id:string,checked:boolean}>()
)




