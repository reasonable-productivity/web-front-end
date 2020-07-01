<template>
  <v-list dense>
    <v-list-item-group color="primary">
      <v-list-item v-for="(task, i) in tasks" :key="i">
        <template v-slot:default>
          <v-list-item-action>
            <v-checkbox
              @click.stop="toggleChecked(task)"
              :input-value="task.completed"
              :disabled="!crud"
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
              <span v-if="crud">
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
</template>

<script>
export default {
  props: {
    tasks: {
      required: true,
      type: Function
    },
    editingTask: {
      required: true,
      type: Object
    },
    saveEdit: {
      required: true,
      type: Function
    },
    cancelEdit: {
      required: true,
      type: Function
    },
    toggleChecked: {
      required: true,
      type: Function
    },
    crud: {
      type: Boolean,
      default: false
    }
  }
}
</script>
