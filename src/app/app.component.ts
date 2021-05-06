import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Todo } from "./store/reducers/todo.reducer";
import { fromEvent, Observable } from "rxjs";
import { filter,map } from "rxjs/operators";
import { addTodo,checkTodo,deleteTodo } from "./store/actions/todo.actions";
import { selectCount, selectTodos } from "./store/selectors/todo.selectors";
import { AppState } from "./store";
import { animate, style, transition, trigger } from "@angular/animations";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styles: [],
  animations:[
    trigger('slide',[
      transition("void=>*",[
        style({
          opacity:0,
          transform:"translateY(40px)"
        }),
        animate(250,style({
          opacity:1,transform:"translateY(0)"
        }))
      ]),
      transition("*=>void",[
        animate(250,style({
          opacity:0,transform:"translateY(-100%)"
        }))
      ])
    ])
  ]
})
export class AppComponent implements AfterViewInit {
  @ViewChild("AddTodoInput") AddTodoInput!: ElementRef;
  todos:Observable<Todo[]>
  total:number=0
  identify(index:number,item:Todo){
    return item.id
  }
  constructor(private store: Store<AppState>) {
    this.todos=this.store.pipe(select(selectTodos))
    this.store.pipe(select(selectCount)).subscribe((value)=>{
      this.total=value
    })
  }
  ngAfterViewInit() {
    fromEvent<KeyboardEvent>(
      this.AddTodoInput.nativeElement,
      "keyup"
    ).pipe(
      //绑定enter
      filter(event=>event.key==="Enter"),
      map(event=>(<HTMLInputElement>event.target).value),
      map(title=>title.trim()),
      filter(title=>title!=="")
    ).subscribe(title=>{
      this.store.dispatch(addTodo({title}))
      this.AddTodoInput.nativeElement.value=""
    });
  }
  deleteTodo(id:string){
    this.store.dispatch(deleteTodo({id}))
  }
  addTodo(title:string){
    title=title.trim();
    title!==""&&this.store.dispatch(addTodo({title}))
    this.AddTodoInput.nativeElement.value=""
  }
  checkTodo(id:string,checked:boolean){
    this.store.dispatch(checkTodo({id,checked:!checked}))
  }
}
