// @flow

import Chat from './Chat';
import socket from './socket';
import state from './state';

const UserList = {
  props: ['users'],
  template: `
    <div class="col-sm-2">
      <div>{{users.length}} users</div>
      <div>
        <div v-for="user in users">
          <span class="nav-link font-weight-bold" v-bind:style="'color: ' + user.hashColor">{{user.name}}</span>
        </div>
      </div>
    </div>
  `
};

const Room = {
  props: ['rooms'],
  components: {
    UserList,
    Chat
  },
  created() {
    this.fetchData();
  },
  watch: {
    '$route': 'fetchData'
  },
  template: `
    <div>
      <UserList v-bind:users="room.users" />
      <Chat v-bind:messageList="room.log" />
    </div>
  `,
  methods: {
    fetchData() {
      socket.emit('user join room', this.$route.name);
    }
  },
  computed: {
    room() {
      return this.rooms[this.$route.params.id || this.$route.name];
    }
  }
};

module.exports = Room;