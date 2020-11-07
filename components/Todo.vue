<template>
  <div
    :class="[
      $style.todo,
      {
        [$style.complited]: todo.complited,
        [$style.edited]: todo == editedTodo,
      },
    ]"
  >
    <input
      :class="$style.checkbox"
      type="checkbox"
      v-model="checked"
      @change="changeComplit"
    />
    <div :class="$style.castomCheckbox">
      <Ok :class="$style.ok" v-if="this.todo.complited === true" />
    </div>
    <div :class="$style.flex" @dblclick="change">
      <span :class="$style.text"
        >{{ todo.title
        }}<span :class="$style.line" v-if="this.todo.complited === true"></span
      ></span>

      <Close :class="$style.close" @click="delTodo" />
    </div>
    <input
      :class="$style.edit"
      type="text"
      v-todo-focus="todo == editedTodo"
      :value="todo.title"
      @change="changeT"
      @blur="changeT"
    />
  </div>
</template>

<script>
import Close from "~/assets/icons/plus.svg?inline";
import Ok from "~/assets/icons/plus.svg?inline";
import { mapMutations } from "vuex";

export default {
  props: {
    todo: Object,
  },

  components: {
    Close,
    Ok,
  },

  data() {
    return {
      editedTodo: null,
      checked: null,
    };
  },

  methods: {
    ...mapMutations({
      deleteTodo: "todo/deleteTodo",
      changeTitle: "todo/changeValue",
      changeComplited: "todo/changeValue",
    }),

    delTodo() {
      this.deleteTodo(this.todo);
    },

    change() {
      this.editedTodo = this.todo;
    },

    changeT(e) {
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = null;
      if (e.target.value) {
        this.changeTitle({
          id: this.todo.id,
          title: e.target.value,
          complited: this.todo.complited,
        });
      }
    },

    changeComplit() {
      this.changeComplited({
        id: this.todo.id,
        title: this.todo.title,
        complited: this.checked,
      });
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
.todo {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  font-size: 1.5rem;
  color: rgb(39, 36, 36);
  background: white;
  border-top: 1px solid rgb(216, 206, 206);
  .checkbox {
    width: 2rem;
    height: 2rem;
    position: absolute;
    left: 1.5rem;
    z-index: 2;
    opacity: 0;
  }
  .castomCheckbox {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 1.5rem;
    border: 1px solid gray;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    .ok {
      width: 1rem;
      height: 1rem;
    }
  }
  .flex {
    margin: 0rem 3rem 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:hover {
      .close {
        display: block;
      }
    }
    .text {
      position: relative;
      .line {
        position: absolute;
        left: 0;
        top: 1.2rem;
        width: 100%;
        height: 2px;
        background: gray;
      }
    }
    .close {
      display: none;
      cursor: pointer;
      width: 1rem;
      height: 1rem;
      fill: gray;
      transform: rotate(45deg);
    }
  }
  .edit {
    display: none;
  }
}
.complited {
  box-shadow: none;
  .flex {
    opacity: 0.4;
  }
}
.edited {
  .checkbox {
    display: none;
  }
  .castomCheckbox {
    display: none;
  }
  .flex {
    display: none;
  }
  .edit {
    box-shadow: 0 0.15rem 0.5rem 0.15rem rgba(0, 0, 0, 0.1);
    outline: none;
    border: none;
    width: 100%;
    height: 2rem;
    display: block;
  }
}
</style>