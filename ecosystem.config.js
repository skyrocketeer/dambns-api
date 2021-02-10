module.exports = [{
  script: 'node index',
  env: {
    NODE_ENV: "development",
  },
  name: 'app',
  exec_mode: 'cluster',
  instances: 2
}]