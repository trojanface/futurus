require("dotenv").config();
//Contains the login detail for various environements. Also contains environment variables to protect sensitive info.
module.exports = {
  "development": {
    "username": process.env.DBUSERNAME,
      "password": process.env.DBPASSWORD,
        "database": process.env.DBNAME,
          "host": process.env.DBHOST,
            "port": 3306,
              "dialect": "mysql"
  },
  "test": {
    "username": process.env.DBUSERNAME,
      "password": process.env.DBPASSWORD,
        "database": process.env.DBNAME,
          "host": process.env.DBHOST,
            "port": 3306,
              "dialect": "mysql"
  },
  "production": {
    "username": process.env.DBUSERNAME,
      "password": process.env.DBPASSWORD,
        "database": process.env.DBNAME,
          "host": process.env.DBHOST,
            "port": 3306,
              "dialect": "mysql"
  },

}
