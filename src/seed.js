import mongoose from "mongoose";
import bcrypt from "bcrypt";
import "dotenv/config";
import User from "./Models/User.js";
import Courses from "./Models/Courses.js";
import WishList from "./Models/WishList.js";
import Reviews from "./Models/Reviews.js";
import Payment from "./Models/Payment.js";
import Cart from "./Models/Cart.js";

const userData = [
    { name: "Alejandro Ruiz", email: "alex.ruiz@gmail.com", password: "password123" },
    { name: "Sofía Mendoza", email: "sofia.men@outlook.com", password: "securePass2026" },
    { name: "Diego Hernández", email: "d.hernandez@hotmail.com", password: "diego.admin.99" },
    { name: "Valeria Castorena", email: "val.cas@gmail.com", password: "valeria_secret" },
    { name: "Mateo Silva", email: "m.silva@yahoo.com", password: "mateo_dev_2026" },
    { name: "Jimena Estrada", email: "jime.estrada@gmail.com", password: "pass_jime_88" },
    { name: "Fernando Soto", email: "fer.soto@live.com", password: "soto_password_7" },
    { name: "Lucía Parga", email: "lucia.parga@gmail.com", password: "lucia.dev.star" },
    { name: "Andrés Villalobos", email: "andres.v@protonmail.com", password: "andres_secure" },
    { name: "Camila Ortiz", email: "c.ortiz@gmail.com", password: "camila.pass.123" }
];


const coursesData = [
    {
        title: "Carpintería para principiantes",
        description: "En este curso aprenderás a armar muebles sencillos desde cero. Podrás adquirir conocimiento en el buen manejo de las herramientas y el manual del buen carpintero.",
        price: 299,
        duration: "6 semanas",
        instructor: "Edson Huerta"
    },
    {
        title: "Electricidad Residencial Básica",
        description: "Aprende a realizar instalaciones eléctricas seguras en el hogar, desde el cambio de un interruptor hasta el cableado de una habitación completa siguiendo normas de seguridad.",
        price: 350,
        duration: "4 semanas",
        instructor: "Roberto Méndez"
    },
    {
        title: "Huertos Urbanos y Autocultivo",
        description: "Transforma espacios pequeños en fuentes de alimento. Aprenderás sobre sustratos, control de plagas orgánico y ciclos de siembra para hortalizas en casa.",
        price: 199,
        duration: "5 semanas",
        instructor: "Lucía Fernández"
    },
    {
        title: "Mecánica Preventiva para Motos",
        description: "Conoce el funcionamiento de tu motor, cómo realizar cambios de aceite, limpieza de carburador y ajuste de cadena para mantener tu vehículo en óptimas condiciones.",
        price: 450,
        duration: "8 semanas",
        instructor: "Marcos Torres"
    },
    {
        title: "Panadería Artesanal: Masa Madre",
        description: "Domina el arte de la fermentación natural. Aprenderás a crear tu propia masa madre y hornear panes con corteza crujiente y miga perfecta.",
        price: 280,
        duration: "3 semanas",
        instructor: "Adrián Rossi"
    },
    {
        title: "Introducción a la Fontanería",
        description: "Resuelve problemas comunes de tuberías, filtraciones y presión de agua. Incluye prácticas con tubería de cobre, PVC y termofusión.",
        price: 320,
        duration: "4 semanas",
        instructor: "Samuel Esquivel"
    },
    {
        title: "Tapicería y Restauración de Muebles",
        description: "Dale una segunda vida a tus sillas y sillones. Aprenderás técnicas de retapizado, elección de telas y reparación de estructuras de madera dañadas.",
        price: 380,
        duration: "7 semanas",
        instructor: "Valeria Gómez"
    },
    {
        title: "Soldadura de Arco para Aficionados",
        description: "Curso práctico sobre el uso de la planta de soldar, tipos de electrodos y técnicas básicas de unión de metales para proyectos decorativos o estructurales.",
        price: 500,
        duration: "6 semanas",
        instructor: "Jorge Luna"
    },
    {
        title: "Fotografía Digital con Smartphone",
        description: "No necesitas una cámara profesional para capturar momentos increíbles. Aprende composición, iluminación natural y edición rápida desde tu celular.",
        price: 150,
        duration: "2 semanas",
        instructor: "Karla Rivas"
    },
    {
        title: "Costura Básica y Patronaje",
        description: "Aprende a usar la máquina de coser desde cero. Realiza tus propios patrones y confecciona prendas sencillas como faldas, blusas o accesorios.",
        price: 275,
        duration: "10 semanas",
        instructor: "Marta Jiménez"
    }
];


const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ecommerce-cursos");
        console.log("✅ MongoDB connected for seeding");

        await Promise.all([
            User.deleteMany({}),
            Courses.deleteMany({}),
            Reviews.deleteMany({}),
            Payment.deleteMany({}),
            WishList.deleteMany({}),
            Cart.deleteMany({})
        ]);
        console.log("🗑️ Database cleaned.");


        const saltRounds = 10;

        const usersWithHashedPasswords = await Promise.all(
            userData.map(async (user) => {
                const hash = await bcrypt.hash(user.password, saltRounds);
                return { ...user, password: hash };
            })
        );


        const createdUsers = await User.insertMany(usersWithHashedPasswords);

        const coursesWithUser = coursesData.map((course, index) => ({
            ...course,
            user_id: createdUsers[index % createdUsers.length]._id
        }));

        await Courses.insertMany(coursesWithUser);


        // Si tienes reviewsData y paymentMethodsData definidos, descomenta estas líneas:
        // await Reviews.insertMany(reviewsData);
        // await Payment.insertMany(paymentMethodsData);

        console.log("🚀 Database seeded successfully.");
    } catch (error) {
        console.error("❌ Error seeding database:", error);
    } finally {
        await mongoose.connection.close();
        console.log("🔌 Connection closed.");
        process.exit();
    }
};

seedDatabase();