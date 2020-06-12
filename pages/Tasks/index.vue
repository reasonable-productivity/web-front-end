<template>
  <v-container>
    <v-row>
      <v-col sm="6" offset-sm="3">
        <h1>Tasks</h1>

        <v-text-field
          v-model="newTask.title"
          label="Enter Task (press enter)"
          @keypress.enter="addTask"
        />

        <v-list dense>
          <v-list-item-group color="primary">
            <v-list-item v-for="(task, i) in tasks" :key="i">
              <template v-slot:default="{ active }">
                <v-list-item-action>
                  <v-checkbox
                    :input-value="active"
                  />
                </v-list-item-action>

                <v-list-item-content>
                  <span
                    v-if="editingTask.id === task.id"
                    class="d-flex justify-space-between"
                  >
                    <v-text-field
                      v-model="editingTask.title"
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
                    {{ task.title }}
                    <span>
                      <v-icon @click.stop="editTask(i)">
                        mdi-pencil
                      </v-icon>
                      <v-icon @click.stop="removeTask(task.id)">
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
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  data () {
    return {
      newTask: {
        title: '',
        description: '',
        user: 1
      },
      editingTask: {}
    }
  },
  computed: {
    ...mapState('tasks', ['tasks'])
  },
  created () {
    this.getAllTasks()
  },
  methods: {
    ...mapMutations('tasks', ['edit', 'toggle']),
    ...mapActions('tasks',
      ['getAllTasks', 'postNewTask', 'deleteTask', 'patchTask']
    ),
    addTask () {
      this.postNewTask(this.newTask)
      this.newTask = ''
    },
    editTask (index) {
      this.editingTask = {
        ...this.tasks[index]
      }
    },
    removeTask (taskId) {
      this.deleteTask(taskId)
    },
    cancelEdit () {
      this.editingTask = {}
    },
    saveEdit () {
      const payload = {
        id: this.editingTask.id,
        taskData: this.editingTask
      }
      delete payload.taskData.id
      this.patchTask(payload)
      this.cancelEdit()
    }
  }
}
</script>
