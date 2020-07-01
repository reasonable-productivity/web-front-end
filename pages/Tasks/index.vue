<template>
  <v-container>
    <v-row>
      <v-col sm="8" offset-sm="2">
        <v-tabs v-model="tab">
          <v-tab>All</v-tab>
          <v-tab>Next</v-tab>
          <v-tab>Inbox</v-tab>
          <v-tab>Maybe</v-tab>
          <v-tab>Projects</v-tab>
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

        <v-card v-if="newTask.show" outlined>
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
            <v-select
              :items="categories"
              item-text="label"
              item-value="value"
              label="Category"
              v-model="newTask.category"
              dense
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

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-row class="d-flex flex-wrap">
              <v-card class="ma-2" width="240px">
                <v-card-title>
                  <v-btn @click="tab = 1" text>
                    Actions
                  </v-btn>
                </v-card-title>
                <v-card-text>
                  <TaskList
                    :tasks="filteredTasks(2)"
                    :editingTask="editingTask"
                    :saveEdit="saveEdit"
                    :cancelEdit="cancelEdit"
                    :toggleChecked="toggleChecked"
                  />
                </v-card-text>
              </v-card>
              <v-card class="ma-2" width="240px">
                <v-card-title>
                  <v-btn @click="tab = 2" text>
                    Inbox
                  </v-btn>
                </v-card-title>
                <v-card-text>
                  <TaskList
                    :tasks="filteredTasks(1)"
                    :editingTask="editingTask"
                    :saveEdit="saveEdit"
                    :cancelEdit="cancelEdit"
                    :toggleChecked="toggleChecked"
                  />
                </v-card-text>
              </v-card>
              <v-card class="ma-2" width="240px">
                <v-card-title>
                  <v-btn @click="tab = 3" text>
                    Maybe
                  </v-btn>
                </v-card-title>
                <v-card-text>
                  <TaskList
                    :tasks="filteredTasks(3)"
                    :editingTask="editingTask"
                    :saveEdit="saveEdit"
                    :cancelEdit="cancelEdit"
                    :toggleChecked="toggleChecked"
                  />
                </v-card-text>
              </v-card>
            </v-row>
          </v-tab-item>

          <v-tab-item
            v-for="n in regularTabs"
            :key="`task${n}`"
          >
            <TaskList
              :tasks="filteredTasks()"
              :editingTask="editingTask"
              :saveEdit="saveEdit"
              :cancelEdit="cancelEdit"
              :toggleChecked="toggleChecked"
              :crud="true"
            />
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
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import TaskList from '../../components/tasks/TaskList.vue'

export default {
  components: {
    TaskList
  },
  data () {
    return {
      newTask: {
        show: false,
        title: '',
        description: '',
        category: 1,
        user: 1
      },
      searchValue: '',
      editingTask: {},
      tab: 1,
      regularTabs: [...Array(3).keys()],
      categories: [
        {
          value: 1,
          label: 'inbox'
        },
        {
          value: 2,
          label: 'next'
        },
        {
          value: 3,
          label: 'maybe'
        }
      ]
    }
  },
  computed: {
    ...mapState('tasks', ['tasks']),
    ...mapGetters('tasks', ['sortedTasks'])
  },
  created () {
    this.getAllTasks()
  },
  methods: {
    ...mapMutations('tasks', ['edit', 'toggle']),
    ...mapActions('tasks',
      ['getAllTasks', 'postNewTask', 'deleteTask', 'patchTask']
    ),
    filteredTasks (cat) {
      let category = cat || 1
      if (this.tab === 1) {
        category = 2
      } else if (this.tab === 3) {
        category = 3
      }
      return this.sortedTasks.filter((task) => {
        return task.category === category
      })
    },
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
