<template>
  <div :class="$style.container">
    <h1 :class="$style.title">Задачи</h1>
    <div :class="$style.wrapper">
      <Input />
      <div :class="$style.todoList">
        <Todo v-for="todo in filterTodo" :key="todo.id" :todo="todo" />
        <Footer
          :filter="filter"
          @all="all"
          @active="active"
          @complited="complited"
          v-if="allTodo.length"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Input from "~/components/Input";
import Todo from "~/components/Todo";
import Footer from "~/components/Footer";

import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    Input,
    Todo,
    Footer,
  },

  data() {
    return {
      filter: "all",
    };
  },

  computed: {
    ...mapGetters({
      allTodo: "todo/allTodo",
      activeTodo: "todo/activeTodo",
      complitedTodo: "todo/complitedTodo",
    }),
    filterTodo() {
      if (this.filter === "all") {
        return this.allTodo;
      } else if (this.filter === "active") {
        return this.activeTodo;
      } else if (this.filter === "complited") {
        return this.complitedTodo;
      }
    },
  },

  methods: {
    ...mapMutations({
      deleteCom: "todo/deleteComplited",
    }),
    all() {
      this.filter = "all";
    },
    active() {
      this.filter = "active";
    },
    complited() {
      this.filter = "complited";
    },
    deleteComplited() {
      this.deleteCom(this.todo);
    },
  },
};
</script>

<style lang="scss" module>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    font-size: 5rem;
    margin: 0 0 1rem;
    color: rgba(175, 47, 47, 0.15);
  }
  .wrapper {
    width: 50%;
    .todoList {
      width: 100%;
      height: 100%;
      box-shadow: 0 1rem 1rem 0.5rem rgba(0, 0, 0, 0.1);
    }
  }
}
</style>