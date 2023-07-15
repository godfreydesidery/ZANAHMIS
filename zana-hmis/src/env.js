
var apiUrl = (function () {
  return {
    getApiUrl: function () {
      return "http://54.174.35.57:8082/zana-hmis-api"
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

