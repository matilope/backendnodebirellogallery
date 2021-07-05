const mongoose = require("mongoose");
const app = require("./app");

mongoose.set("useFindAndModify", false)
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://********", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
console.log("La conexion a la base de datos fue exitosa.");

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log("La conexion fue exitosa."); })
}).catch(() => {
    console.log("Ha ocurrido un error y la conexion ha fallado.");
});
