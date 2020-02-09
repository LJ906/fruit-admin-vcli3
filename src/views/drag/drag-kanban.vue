<template>
  <div class="components-container board">
    <drag-kanban :key="1" :list="list1" :group="group" header-text="'可以拖动的任务栏'" />
    <drag-kanban :key="2" :list="list2" :group="group" header-text="还可以夸任务栏" />
    <!-- <drag-kanban :key="3" :list="list3" :group=" 'other'" header-text="还可以夸任务栏2" /> -->
  </div>
</template>

<script>
// 设置group 相同的值则是一个组可以进行夸组拖拽
import DragKanban from '@/components/DragKanban'
export default {
  components: {
    DragKanban
  },
  data() {
    return {
      group: 'mission',
      list1: [
        { name: 'Mission', id: 1 },
        { name: 'Mission', id: 2 },
        { name: 'Mission', id: 3 },
        { name: 'Mission', id: 4 }
      ],
      list2: [
        { name: 'Mission', id: 5 },
        { name: 'Mission', id: 6 },
        { name: 'Mission', id: 7 }
      ],
      list3: [
        { name: 'Mission', id: 8 },
        { name: 'Mission', id: 9 },
        { name: 'Mission', id: 10 }
      ]
    }
  }
}
</script>

<style lang="scss">
.board {
  width: 1000px;
  margin-left: 20px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
}
.kanban {
  &.todo {
    .board-column-header {
      background: #4a9ff9;
    }
  }
  &.working {
    .board-column-header {
      background: #f9944a;
    }
  }
  &.done {
    .board-column-header {
      background: #2ac06d;
    }
  }
}
</style>
