<template>
  <div class="container">
    <h3>Mis paneles</h3>
    <div class="form-panels">
      <input
        type="text"
        placeholder="Añade un nuevo panel"
        v-model="boardName"
        @keyup.enter="add"
      >
    </div>
    <div class="boards-collection">
      <span v-if="fetchingData">Cargando...</span>
      <board-card
        v-for="(board, index) in boards"
        :name="board.name"
        :id="board.id"
        :key="index"
      ></board-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BoardCard from '@/components/BoardCard.vue'

export default {
  name: 'Home',
  components: {
    BoardCard
  },
  data () {
    return {
      boardName: ''
    }
  },
  methods: {
    ...mapActions([
      'fetchBoards',
      'addBoard'
    ]),
    add () {
      this.addBoard({ name: this.boardName })
      this.boardName = ''
    }
  },
  computed: {
    ...mapState([
      'boards',
      'fetchingData'
    ])
  },
  created () {
    this.fetchBoards({ user: 1 })
  }
}
</script>

<style lang="scss" scoped>
  .form-panels {
    width: 100%;
    text-align: left;
  }
  .container {
    padding: 0px 20px;
  }
  h3 {
    text-align: left;
    margin: 1.5rem 0rem;
  }
  .boards-collection {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-top: 1rem;
  }
  input {
    box-sizing: border-box;
    background-color: #546E7A;
    border: 2px solid #546E7A;
    border-radius: 3px;
    font-size: 1.1rem;
    outline: 0;
    padding: 0.5rem;
    transition: all 300ms ease;
    &:focus,
    &:active {
      background-color: white;
      color: #546E7A;
    }
    &::placeholder {
      color: white;
    }
  }
</style>
