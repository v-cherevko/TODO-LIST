<template>
  <div :class="$style.wrapperInput">
    <Arrow
      :class="$style.arrow"
      v-if="allTodo.length > 0"
      @click="allComplit"
    />
    <input
      :class="$style.input"
      type="text"
      v-model="todo"
      placeholder="Что должно быть сделано?"
      autocomplete="off"
      @keyup.enter="add"
    />
  </div>
</template>

<script>
import Arrow from "~/assets/icons/arrow.svg?inline";
import { mapMutations, mapGetters } from "vuex";
export default {
  components: {
    Arrow,
  },
  data() {
    return {
      todo: "",
      id: 1,
    };
  },
  computed: {
    ...mapGetters({
      allTodo: "todo/allTodo",
    }),
  },
  methods: {
    ...mapMutations({
      createTodo: "todo/createTodo",
      allComplited: "todo/allComplited",
      allNotComplited: "todo/allNotComplited",
    }),

    add() {
      var value = this.todo;
      if (!value) {
        return;
      }
      this.createTodo({
        title: this.todo,
        complited: false,
        id: this.id++,
      });
      this.todo = "";
    },

    allComplit() {
      this.allComplited();
    },
  },
};
</script>

<style lang="scss" module>
.wrapperInput {
  position: relative;
  .arrow {
    fill: lightgray;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    position: absolute;
    top: 1.8rem;
    left: 1.5rem;
  }
  .input {
    width: 100%;
    outline: none;
    border: none;
    padding: 1.5rem 5rem;
    font-size: 2rem;
    box-shadow: 0 -0.5rem 1rem 0.5rem rgba(0, 0, 0, 0.1);
    &::placeholder {
      opacity: 0.4;
    }
  }
}
</style>