import axios from "axios";

export default {
  login: function (user) {
    return axios.post('/auth/local', { username: user.username, password: user.userPassword })
  },
  getUsers: function () {
    return axios.get('/api/users/all');
  },
  updateUser: function (userParams) {
    console.log(userParams)
    return axios.put('/api/users/' + userParams.user_id, {
      POS: userParams.POS, advertising: userParams.advertising, balances: userParams.balances,
      cashDrops: userParams.cashDrops, email: userParams.email, firstName: userParams.firstName, itemDesigner: userParams.itemDesigner, keyLayout: userParams.keyLayout,
      lastName: userParams.lastName, membership: userParams.membership, refunds: userParams.refunds, reports: userParams.reports, stocktake: userParams.stocktake,
      userDesigner: userParams.userDesigner, totTime: userParams.totTime, totalTrans: userParams.totalTrans
    });
  },
  updateUserPassword: function (userParams) {
    return axios.put('/api/users/' + userParams.user_id, { password: userParams.password });
  },
  addUser: function (userParams) {
    return axios.post('/api/users', {
      userName: userParams.userName, adminLevel: 1, POS: userParams.POS, advertising: userParams.advertising, balances: userParams.balances,
      cashDrops: userParams.cashDrops, email: userParams.email, firstName: userParams.firstName, itemDesigner: userParams.itemDesigner, keyLayout: userParams.keyLayout,
      lastName: userParams.lastName, membership: userParams.membership, refunds: userParams.refunds, reports: userParams.reports, stocktake: userParams.stocktake,
      userDesigner: userParams.userDesigner, password: userParams.password, totTime: userParams.totTime, totalTrans: userParams.totalTrans
    });
  },
  deleteUser: function (userParams) {
    return axios.delete('/api/users/' + userParams);
  },
  getDepts: function () {
    console.log("getting departments")
    return axios.get('/api/depts/all');
  },
  addDept: function (userParams) {
    return axios.post('/api/depts', { name: userParams });
  },
  deleteDept: function (userParams) {
    return axios.delete('/api/depts/' + userParams);
  },
  getItems: function (userParams) {
    let deptNum = userParams + 1;
    return axios.get('/api/items/' + deptNum);
  },
  getAllItems: function () {
    console.log("getting")
    return axios.get('/api/items/');
  },
  getItem: function (userParams) {
    return axios.get('/api/items/single/' + userParams);
  },
  deleteItem: function (userParams) {
    return axios.delete('/api/items/' + userParams);
  },
  addItem: function (userParams) {
    userParams.cost = userParams.cost * 100;
    userParams.price = userParams.price * 100;
    userParams.departments = userParams.departments + 1;
    console.log(userParams)
    return axios.post('/api/items/', {iconPath: userParams.iconPath, upsell: userParams.upsell, name: userParams.name, cost: userParams.cost, price: userParams.price, department: userParams.departments });
  },
  updateItem: function (userParams) {
    userParams.cost = userParams.cost * 100;
    userParams.price = userParams.price * 100;
    console.log(userParams)
    return axios.put('/api/items/' + userParams.prod_id, {iconPath: userParams.iconPath, upsell: userParams.upsell, stockCount: userParams.stockCount, name: userParams.name, cost: userParams.cost, price: userParams.price, department: userParams.department });
  },
  addTrans: function (userParams) {
    console.log(userParams)
    return axios.post('/api/trans/', { user: userParams.user, transItems: userParams.transItems, transValue: userParams.transValue });
  },
  logOut: function () {
    console.log("logging Out")
    return axios.get('/logout');
  },
  findItem: function (term) {
    return axios.get('/api/items/find/' + term);
  },
  getWeather: function (location) {
    return axios.get('https://api.openweathermap.org/data/2.5/weather?q=adelaide&appid=2a41be6b56e8918bc7efe98c840f4638')
  }
}
