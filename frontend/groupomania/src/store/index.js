import { createStore } from 'vuex'
const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/'
});
  
let user = localStorage.getItem('user');
if (!user) {
  user = {
    userId: -1,
    token: '',
  }; 
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common['Authorization'] = user.token;
  } catch (ex) {
      user = {
        userId: -1,
        token: '',
      };
  }
}

    
const store = createStore({
  state: {
    status: '',
    user: user,
    userInfos: {
      email: '',
      username:'',
      firstname: '',
      lastname: '',
      profilePhoto: '',
    },
    posts: [],

  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser: function (state, user) {
      instance.defaults.headers.common['Authorization'] = user.token;
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },
    logout: function (state) {
      state.user = {
        userId: -1,
        token: '',
      }
      localStorage.removeItem('user');
    },
    getPosts: function (state, posts) {
      state.posts = posts;
    },
    deletePost: function (state, post){
      let posts = state.posts.filter(p => p.id != post.id)
      state.posts = posts;
    },
  },
  actions: {
    login: ({commit}, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/auth/login', userInfos)
        .then(function (response) {
          commit('setStatus', '');
          commit('logUser', response.data);
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'error_login');
          reject(error);
        });
      });
    },
    createAccount: ({commit}, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        commit;
        instance.post('/auth/signup', userInfos)
        .then(function (response) {
          commit('setStatus', 'created');
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'error_create');
          reject(error);
        });
      });
    },
    getUserInfos: ({commit}) => {
      instance.get('/users/userId')
      .then(function (response) {
        commit('userInfos', response.data);
      })
      .catch(function () {
      });
    }, 
    getPostsInfos: ({commit}) => {
      instance.get('/posts')
      .then(function(response) {
        commit('getPosts', response.data.posts)
        console.log(response.data)
      }).catch(function(){

      })
    },
    deletePost: ({commit}, post) => {
      instance.delete(`/posts/${post.id}`)
      .then(function(response){
        if (response.status == 200 || response.status == 204)
        commit('deletePost', post.id)
      })
      .catch(function() {

      })
    }
  }
})
    
export default store;
    
