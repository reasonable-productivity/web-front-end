<template>
  <v-container>
    <v-row>
      <v-col sm="6" offset-sm="3">
        <v-text-field v-model="newListName">
          <template v-slot:append-outer>
            <v-btn color="primary" @click="addItem">Add List Item</v-btn>
          </template>
        </v-text-field>
        <v-treeview :items="lists">
          <template v-slot:append="{ item }">
            <v-icon @click.stop="editList(item)">
              mdi-pencil
            </v-icon>
            <v-icon @click.stop="removeList(item)">
              mdi-delete-outline
            </v-icon>
          </template>
        </v-treeview>
      </v-col>
    </v-row>
    <!-- <v-btn
      color="primary"
      dark
      @click.stop="dialog = true"
    >
      Open Dialog
    </v-btn> -->

    <v-dialog
      v-model="editDialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          Edit Item
        </v-card-title>

        <v-card-text>
          <v-text-field v-model="selectedList.name" />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="editDialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click.stop="saveEdit"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      newListName: '',
      selectedList: {},
      editDialog: false
    }
  },
  created () {
    this.getAllLists()
  },
  computed: {
    ...mapState('lists', ['lists'])
  },
  methods: {
    ...mapActions('lists', [
      'getAllLists',
      'postNewList',
      'patchList'
    ]),
    addItem () {
      const payload = {
        user: 1,
        name: this.newListName
      }
      this.postNewList(payload)
    },
    editList (item) {
      this.selectedList = { ...item }
      this.editDialog = true
    },
    removeList (item) {

    },
    saveEdit () {
      const payload = {
        listId: this.selectedList.id,
        data: {
          user: 1,
          name: this.selectedList.name
        }
      }
      this.patchList(payload)
      this.editDialog = false
      this.selectedList = {}
    }
  }
}
</script>
