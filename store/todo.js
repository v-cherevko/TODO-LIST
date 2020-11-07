export const state = () => ({
  todoList: []
});

export const getters = {
  allTodo(state) {
    return state.todoList;
  },
  activeTodo(state) {
    return state.todoList.filter(item => (item = !item.complited));
  },
  complitedTodo(state) {
    return state.todoList.filter(item => (item = item.complited));
  }
};

export const mutations = {
  createTodo(state, newTodo) {
    state.todoList.unshift(newTodo);
  },

  deleteTodo(state, todo) {
    state.todoList.splice(state.todoList.indexOf(todo), 1);
  },

  changeValue(state, todo) {
    state.todoList = state.todoList.map(t => {
      if (t.id === todo.id) {
        return todo;
      }
      return t;
    });
  },

  deleteComplited(state, todo) {
    state.todoList = state.todoList.filter(item => (todo = !item.complited));
  },

  allComplited(state) {
    state.todoList.map(item => {
      if (item.complited === false) {
        item.complited = true;
      } else {
        item.complited = false;
      }
    });
  }
};

export const actions = {};
