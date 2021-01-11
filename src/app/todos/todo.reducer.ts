import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { crear, editar, toggle, borrar, toggleAll, limpiarTodos } from './todo.actions';

export const estadoInicial: Todo[] = [
    new Todo('Salvar al mundo'),
    new Todo('Vencer a Thanos'),
    new Todo('Comparar traje de Iroman'),
    new Todo('Robar escudo del Capitan América')
];


const _todoReducer = createReducer(estadoInicial,
  on(crear, (state, {texto}) => [...state, new Todo( texto )]),
  on(limpiarTodos, state => state.filter( todo => !todo.completado)),
  on (borrar, (state, {id }) => state.filter(todo => todo.id !== id)),
  on ( toggleAll, (state , {completado}) => state.map(todo => {
    return {
      ...todo,
      completado
    };
  })),
  on(toggle, (state, {id}) => {
      return state.map( todo => {
          if ( todo.id === id ) {
          return {
              ...todo,
              completado: !todo.completado
          };
        }else {
            return todo;
        }
      });
  }),
  on(editar, (state, {id , texto}) => {
    return state.map( todo => {
        if ( todo.id === id ) {
        return {
            ...todo,
            texto
        };
      }else {
          return todo;
      }
    });
}),
/* on(toggleAll, (state, {completado}) => {
  return state.map( todo => {
      if ( completado ) {
      return {
          ...todo,
          completado: true
      };
    }else {
        return {
          ...todo,
          completado: false
      };
    }
  });
}), */
);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}
