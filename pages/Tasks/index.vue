<template>
  <v-container>
    <v-row>
      <v-col sm="8" offset-sm="2">
        <v-tabs v-model="tab">
          <v-tab>All</v-tab>
          <v-tab>Next</v-tab>
          <v-tab>Capture</v-tab>
          <v-tab>Projects</v-tab>
          <v-tab>Backlog</v-tab>
        </v-tabs>

        <!-- <v-text-field
          v-model="newTask.title"
          label="Enter Task (press enter)"
          @keypress.enter="addTask"
        /> -->

        <v-text-field
          v-model="searchValue"
          placeholder="Search..."
          append-icon="mdi-magnify"
        />

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-row class="d-flex flex-wrap">
              <v-card class="ma-2" width="240px">
                <v-card-title>
                  Next Actions
                </v-card-title>
                <v-card-text>
                  Item 1
                </v-card-text>
              </v-card>
              <v-card class="ma-2" width="240px">
                <v-card-title>
                  Capture
                </v-card-title>
                <v-card-text>
                  Item 1
                </v-card-text>
              </v-card>
            </v-row>
          </v-tab-item>

          <v-tab-item>
            <v-card v-if="newTask.show">
              <v-card-text>
                <v-text-field
                  ref="newTaskTitle"
                  v-model="newTask.title"
                  label="Title"
                  outlined
                />
                <v-textarea
                  v-model="newTask.description"
                  label="Description"
                  outlined
                />
              </v-card-text>
              <v-card-actions>
                <v-btn
                  @click="addTask"
                  color="success"
                >
                  Save
                </v-btn>
                <v-btn
                  color="secondary"
                  @click="toggleNewTask"
                >
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>

            <v-list dense>
              <v-list-item-group color="primary">
                <v-list-item v-for="(task, i) in tasks" :key="i">
                  <template v-slot:default>
                    <v-list-item-action>
                      <v-checkbox
                        @click.stop="toggleChecked(task)"
                        :input-value="task.completed"
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
                        <span :class="{'text--disabled text-decoration-line-through': task.completed}">
                          {{ task.title }}
                        </span>
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
          </v-tab-item>
        </v-tabs-items>

        <v-btn color="primary" fab @click="toggleNewTask">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
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
        show: false,
        title: '',
        description: '',
        user: 1
      },
      searchValue: '',
      editingTask: {},
      tab: 1
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
    toggleNewTask () {
      this.newTask.show = !this.newTask.show
      if (this.newTask.show) {
        this.$nextTick(function () {
          this.$refs.newTaskTitle.focus()
        })
      }
    },
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
    },
    toggleChecked (task) {
      const payload = {
        id: task.id,
        task: {
          completed: !task.completed
        }
      }
      this.patchTask(payload)
    }
  }
}
</script>
