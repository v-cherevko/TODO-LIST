<template>
  <div :class="$style.container">
    <div :class="$style.wrapper">
      <h1 :class="$style.title">Задачи</h1>
      <input
        :class="$style.input"
        v-model="todo"
        type="text"
        autocomplete="off"
        placeholder="Что должно быть сделано?"
        @keyup.enter="add"
      />
      <div :class="$style.todoList">
        <div
          :class="[
            $style.todo,
            {
              [$style.complited]: todo.complited,
              [$style.edited]: todo == editedTodo,
            },
          ]"
          v-for="todo in activeTodos"
          :key="todo.id"
        >
          <input
            :class="$style.checkbox"
            type="checkbox"
            v-model="todo.complited"
          />
          <div :class="$style.flex" @dblclick="changeTitle(todo)">
            <label :class="$style.text">{{ todo.title }}</label>
            <Close :class="$style.close" @click="deleteTodo(todo)" />
          </div>
          <input
            :class="$style.edit"
            type="text"
            v-todo-focus="todo == editedTodo"
            v-model="todo.title"
            @blur="doneChange(todo)"
            @keyup.enter="doneChange(todo)"
          />
        </div>
      </div>
      <div :class="$style.footer" v-if="todoList.length > 0">
        <div>
          {{ todoList.filter((item) => (item = !item.complited)).length }}
          активных задач
        </div>
        <div :class="$style.filters">
          <button @click="all">Все</button>
          <button @click="active">Активные</button>
          <button @click="completed">Сделанные</button>
          <button @click="clearComplited">удалить сделанные</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Close from "~/assets/icons/plus.svg?inline";

export default {
  components: {
    Close,
  },
  data() {
    return {
      todo: "",
      beforeEdit: "",
      todoList: [],
      activeTodos: [],
      id: 1,
      editedTodo: null,
    };
  },

  mounted() {
    this.activeTodos = this.todoList;
  },

  methods: {
    add() {
      var value = this.todo;
      if (!value) {
        return;
      }
      this.todoList.push({
        id: this.id++,
        title: value,
        complited: false,
      });
      this.todo = "";
    },

    deleteTodo(todo) {
      this.todoList.splice(this.todoList.indexOf(todo), 1);
      return this.todoList;
    },

    changeTitle(todo) {
      this.beforeEdit = todo.title.id;
      this.editedTodo = todo;
    },

    doneChange(todo) {
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = null;
      if (!todo.title) {
        this.changeTitle(todo);
      }
    },

    all() {
      this.activeTodos = this.todoList;
    },
    active() {
      this.activeTodos = this.todoList.filter(
        (item) => (item = !item.complited)
      );
    },
    completed() {
      this.activeTodos = this.todoList.filter(
        (item) => (item = item.complited)
      );
    },

    async clearComplited() {
      this.todoList = this.todoList.filter((item) => (item = !item.complited));
      this.activeTodos = this.todoList;
    },
  },

  directives: {
    "todo-focus": function (el, binding) {
      if (binding.value) {
        el.focus();
      }
    },
  },
};
</script>

<style lang="scss" module>
.container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .wrapper {
    width: 50%;
    min-height: 50rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgb(238, 238, 238);
    position: relative;
    .title {
      font-size: 5rem;
      margin: 0 0 1rem;
      color: rgba(175, 47, 47, 0.15);
    }
    .input {
      width: 80%;
      outline: none;
      border: none;
      padding: 1.5rem 3rem;
      font-size: 2rem;
      box-shadow: 0 -0.5rem 1rem 0.5rem rgba(0, 0, 0, 0.1);
      &::placeholder {
        opacity: 0.4;
      }
    }
    .todoList {
      width: 80%;
      box-shadow: 0 1rem 1rem 0.5rem rgba(0, 0, 0, 0.1);
      .todo {
        display: flex;
        align-items: center;
        padding: 1rem 3rem;
        color: rgb(187, 127, 127);
        background: white;
        border-top: 1px solid rgb(216, 206, 206);
        &:hover {
          .close {
            display: block;
          }
        }
        .checkbox {
          margin: 0 1rem 0 0;
        }
        .flex {
          width: 100%;
          display: flex;
          justify-content: space-between;
          .text {
            display: flex;
            align-items: center;
          }
        }
        .edit {
          width: 100%;
          display: none;
        }
        .close {
          display: none;
          cursor: pointer;
          width: 1rem;
          height: 1rem;
          fill: grey;
          transform: rotate(45deg);
        }
      }
      .complited {
        opacity: 0.4;
        box-shadow: none;
      }
      .edited {
        .checkbox {
          display: none;
        }
        .flex {
          display: none;
        }
        .edit {
          display: block;
        }
      }
    }
    .footer {
      display: flex;
      justify-content: space-between;
      width: 80%;
      padding: 2rem;
      border-top: 3px solid gray;
      background: white;
      box-shadow: 0 1rem 1rem 0.5rem rgba(0, 0, 0, 0.1);
    }
  }
}
</style>