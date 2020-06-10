<template>
  <v-container>
    <v-row>
      <v-col sm="6" offset-sm="3">
        <h1>Tasks</h1>

        <v-text-field
          v-model="newTask"
          label="Enter Task (press enter)"
          @keypress.enter="addTask"
        />

        <v-list dense>
          <v-list-item-group color="primary">
            <v-list-item v-for="(todo, i) in list" :key="i">
              <template v-slot:default="{ active }">
                <v-list-item-action>
                  <v-checkbox
                    :input-value="active"
                  />
                </v-list-item-action>

                <v-list-item-content>
                  <span
                    v-if="editingTask.index === i"
                    class="d-flex justify-space-between"
                  >
                    <v-text-field
                      v-model="editingTask.text"
                      append-outer-icon="mdi-check"
                      @click:append-outer="saveEdit"
                      @keypress.enter="saveEdit"
                    />
                    <v-icon @click.stop="cancelEdit">
                      mdi-close-circle
                    </v-icon>
                  </span>
                  <span
                    v-else
                    class="d-flex justify-space-between"
                  >
                    {{ todo.text }}
                    <span>
                      <v-icon @click.stop="editTask(i)">
                        mdi-pencil
                      </v-icon>
                      <v-icon @click.stop="remove(i)">
                        mdi-delete-outline
                      </v-icon>
                    </span>
                  </span>
                </v-list-item-content>
              </template>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      newTask: '',
      editingTask: {
        index: -1,
        text: ''
      }
    }
  },
  computed: {
    ...mapState('tasks', ['list'])
  },
  methods: {
    ...mapMutations('tasks', ['add', 'edit', 'remove', 'toggle']),
    addTask () {
      this.add(this.newTask)
      this.newTask = ''
    },
    editTask (index) {
      this.editingTask.index = index
      this.editingTask.text = this.list[index].text
    },
    cancelEdit () {
      this.editingTask.index = -1
      this.editingTask.text = ''
    },
    saveEdit () {
      this.edit(this.editingTask)
      this.cancelEdit()
    }
  }
}
</script>
