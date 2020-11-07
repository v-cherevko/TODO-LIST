<template>
  <div :class="$style.footer">
    <div :class="$style.counter">{{ activeTodo.length }} активные задачи</div>
    <div>
      <button :class="{ [$style.active]: this.filter === 'all' }" @click="$emit('all')">
        Все
      </button>
      <button :class="{ [$style.active]: this.filter === 'active' }" @click="$emit('active')">
        Активные
      </button>
      <button
        :class="{ [$style.active]: this.filter === 'complited' }"
        @click="$emit('complited')"
      >
        Выполненные
      </button>
      <button @click="deleteComplited" v-if="complitedTodo.length > 0">
        Удалить выполненные
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  props: {
    filter: String
  },
  computed: {
    ...mapGetters({
      allTodo: "todo/allTodo",
      activeTodo: "todo/activeTodo",
      complitedTodo: "todo/complitedTodo",
    }),
  },

  methods: {
    ...mapMutations({
      deleteCom: "todo/deleteComplited",
    }),
    deleteComplited() {
      this.deleteCom(this.todo);
    },
  },
};
</script>

<style lang="scss" module>
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  padding: 0 3rem;
  border-top: 1px solid grey;
  button {
    border: none;
    outline: none;
    background: transparent;
    cursor: pointer;
    font-weight: bold;
    color: lightgray;
  }
  .active {
    color: gray;
    padding: 0.5rem 1rem;
    border-radius: 0.15rem;
    border: 2px solid rgba(128, 98, 98, 0.671);
  }
}
</style>