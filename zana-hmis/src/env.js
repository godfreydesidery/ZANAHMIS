
var apiUrl = (function () {
  return {
    getApiUrl: function () {
      return "http://44.203.154.93:8082/zana-hmis-api"
    },
    getDevApiUrl: function () {
      return "http://127.0.0.1:8081/zana-hmis-api"
    }
  }
})(apiUrl || {})

var apiUrlDev = (function () {
  return {
    getApiUrl: function () {
      return "http://127.0.0.1:8081/zana-hmis-api"
    }
  }
})(apiUrlDev || {})

