import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import cors from "cors";
import productsRoutes from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import viewsRouter from "./routes/views.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log("DIRNAME: ", __dirname);
const app = express();

const port = process.env.PORT || 8080;
// Start the HTTP server
const httpServer = app.listen( port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
} );

// Initialize Socket.IO server
const socketServer = new Server( httpServer );

app.use( cors() );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
console.log("express.static: ", path.join(__dirname, '/public'));

//mi middleware a nivel de endpoint
app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
  });

app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// Config Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + "/views");
app.set("view engine", "handlebars");

socketServer.on('connection', (socket) => {
    console.log('Cliente conectado');
  
    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  
    // Escuchar eventos de agregar, eliminar y modificar productos
    socket.on('agregar-producto', (producto) => {
      console.log('socket.on: agregar-producto', JSON.stringify(producto));
      socketServer.emit('update-products', producto);
    });
  
    socket.on('eliminar-producto', (id) => {
      socketServer.emit('eliminar-producto', id);
    });
  
    socket.on('modificar-producto', (producto) => {
      socketServer.emit('modificar-producto', producto);
    });
  });