import mongoose from "mongoose";
import bcrypt from "bcrypt";
import "dotenv/config";
import User from "./Models/User.js";
import Category from "./Models/Category.js";
import Courses from "./Models/Courses.js";
import Orders from "./Models/Orders.js";
import Cart from "./Models/Cart.js";
import WishList from "./Models/WishList.js";
import Reviews from "./Models/Reviews.js";
import Payment from "./Models/Payment.js";

const userData = [
    { name: "Alejandro Ruiz",     email: "alex.ruiz@gmail.com",      password: "password123",    role: "admin" },
    { name: "Sofía Mendoza",      email: "sofia.men@outlook.com",     password: "securePass2026", role: "customer" },
    { name: "Diego Hernández",    email: "d.hernandez@hotmail.com",   password: "diego.admin.99", role: "customer" },
    { name: "Valeria Castorena",  email: "val.cas@gmail.com",         password: "valeria_secret", role: "customer" },
    { name: "Mateo Silva",        email: "m.silva@yahoo.com",         password: "mateo_dev_2026", role: "customer" },
    { name: "Jimena Estrada",     email: "jime.estrada@gmail.com",    password: "pass_jime_88",   role: "customer" },
    { name: "Fernando Soto",      email: "fer.soto@live.com",         password: "soto_password_7",role: "customer" },
    { name: "Lucía Parga",        email: "lucia.parga@gmail.com",     password: "lucia.dev.star", role: "customer" },
    { name: "Andrés Villalobos",  email: "andres.v@protonmail.com",   password: "andres_secure",  role: "customer" },
    { name: "Camila Ortiz",       email: "c.ortiz@gmail.com",         password: "camila.pass.123",role: "customer" },
];

const categoryData = [
    { name: "Construcción y Oficios",   description: "Carpintería, fontanería, electricidad y más." },
    { name: "Mecánica y Automotriz",    description: "Mantenimiento de vehículos y maquinaria." },
    { name: "Cocina y Gastronomía",     description: "Panadería, repostería y cocina artesanal." },
    { name: "Arte y Diseño",            description: "Fotografía, tapicería y expresión creativa." },
    { name: "Hogar y Jardín",           description: "Huertos urbanos, decoración y manualidades." },
];

const coursesData = [
    { title: "Carpintería para principiantes",      description: "En este curso aprenderás a armar muebles sencillos desde cero. Podrás adquirir conocimiento en el buen manejo de las herramientas y el manual del buen carpintero.", price: 299, duration: "6 semanas",  instructor: "Edson Huerta",    categoryName: "Construcción y Oficios" },
    { title: "Electricidad Residencial Básica",     description: "Aprende a realizar instalaciones eléctricas seguras en el hogar, desde el cambio de un interruptor hasta el cableado de una habitación completa siguiendo normas de seguridad.", price: 350, duration: "4 semanas",  instructor: "Roberto Méndez",  categoryName: "Construcción y Oficios" },
    { title: "Huertos Urbanos y Autocultivo",       description: "Transforma espacios pequeños en fuentes de alimento. Aprenderás sobre sustratos, control de plagas orgánico y ciclos de siembra para hortalizas en casa.", price: 199, duration: "5 semanas",  instructor: "Lucía Fernández", categoryName: "Hogar y Jardín" },
    { title: "Mecánica Preventiva para Motos",      description: "Conoce el funcionamiento de tu motor, cómo realizar cambios de aceite, limpieza de carburador y ajuste de cadena para mantener tu vehículo en óptimas condiciones.", price: 450, duration: "8 semanas",  instructor: "Marcos Torres",   categoryName: "Mecánica y Automotriz" },
    { title: "Panadería Artesanal: Masa Madre",     description: "Domina el arte de la fermentación natural. Aprenderás a crear tu propia masa madre y hornear panes con corteza crujiente y miga perfecta.", price: 280, duration: "3 semanas",  instructor: "Adrián Rossi",    categoryName: "Cocina y Gastronomía" },
    { title: "Introducción a la Fontanería",        description: "Resuelve problemas comunes de tuberías, filtraciones y presión de agua. Incluye prácticas con tubería de cobre, PVC y termofusión.", price: 320, duration: "4 semanas",  instructor: "Samuel Esquivel",  categoryName: "Construcción y Oficios" },
    { title: "Tapicería y Restauración de Muebles", description: "Dale una segunda vida a tus sillas y sillones. Aprenderás técnicas de retapizado, elección de telas y reparación de estructuras de madera dañadas.", price: 380, duration: "7 semanas",  instructor: "Valeria Gómez",   categoryName: "Arte y Diseño" },
    { title: "Soldadura de Arco para Aficionados",  description: "Curso práctico sobre el uso de la planta de soldar, tipos de electrodos y técnicas básicas de unión de metales para proyectos decorativos o estructurales.", price: 500, duration: "6 semanas",  instructor: "Jorge Luna",       categoryName: "Construcción y Oficios" },
    { title: "Fotografía Digital con Smartphone",   description: "No necesitas una cámara profesional para capturar momentos increíbles. Aprende composición, iluminación natural y edición rápida desde tu celular.", price: 150, duration: "2 semanas",  instructor: "Karla Rivas",     categoryName: "Arte y Diseño" },
    { title: "Costura Básica y Patronaje",          description: "Aprende a usar la máquina de coser desde cero. Realiza tus propios patrones y confecciona prendas sencillas como faldas, blusas o accesorios.", price: 275, duration: "10 semanas", instructor: "Marta Jiménez",   categoryName: "Arte y Diseño" },
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ecommerce-cursos");
        console.log("✅ MongoDB conectado");

        await Promise.all([
            User.deleteMany({}),
            Category.deleteMany({}),
            Courses.deleteMany({}),
            Orders.deleteMany({}),
            Cart.deleteMany({}),
            WishList.deleteMany({}),
            Reviews.deleteMany({}),
            Payment.deleteMany({}),
        ]);
        console.log("🗑️  Colecciones limpiadas");

        const hashedUsers = await Promise.all(
            userData.map(async (u) => ({ ...u, password: await bcrypt.hash(u.password, 10) }))
        );
        const createdUsers = await User.insertMany(hashedUsers);
        console.log(`👥 ${createdUsers.length} usuarios creados`);

        const createdCategories = await Category.insertMany(categoryData);
        const categoryMap = {};
        createdCategories.forEach((c) => { categoryMap[c.name] = c._id; });
        console.log(`📂 ${createdCategories.length} categorías creadas`);

        const adminUser = createdUsers[0];
        const coursesWithRefs = coursesData.map((course, i) => ({
            title:       course.title,
            description: course.description,
            price:       course.price,
            duration:    course.duration,
            instructor:  course.instructor,
            category:    categoryMap[course.categoryName],
            user_id:     createdUsers[i % createdUsers.length]._id,
        }));
        const createdCourses = await Courses.insertMany(coursesWithRefs);
        console.log(`📚 ${createdCourses.length} cursos creados`);

        const ordersData = createdUsers.map((user, i) => ({
            user: user._id,
            items: [
                { courses: createdCourses[i % createdCourses.length]._id,         quantity: 1 },
                { courses: createdCourses[(i + 1) % createdCourses.length]._id,   quantity: 1 },
            ],
            total_price: createdCourses[i % createdCourses.length].price +
                         createdCourses[(i + 1) % createdCourses.length].price,
            status: ["pending", "processing", "delivered", "cancelled", "shipped"][i % 5],
        }));
        const createdOrders = await Orders.insertMany(ordersData);
        console.log(`🛒 ${createdOrders.length} órdenes creadas`);

        const cartsData = createdUsers.map((user, i) => ({
            user_id: user._id,
            items: [
                { course_id: createdCourses[i % createdCourses.length]._id,       quantity: 1 },
                { course_id: createdCourses[(i + 2) % createdCourses.length]._id, quantity: 2 },
            ],
        }));
        const createdCarts = await Cart.insertMany(cartsData);
        console.log(`🧺 ${createdCarts.length} carritos creados`);

        const reviewsData = createdUsers.map((user, i) => ({
            user_id:   user._id,
            course_id: createdCourses[i % createdCourses.length]._id,
            rating:    (i % 5) + 1,
            comment:   `Excelente curso, aprendí mucho. Lo recomiendo ampliamente. Número de reseña ${i + 1}.`,
        }));
        const createdReviews = await Reviews.insertMany(reviewsData);
        console.log(`⭐ ${createdReviews.length} reseñas creadas`);

        const paymentData = createdUsers.map((user, i) => ({
            user:        user._id,
            method:      ["Credit Card", "Debit Card", "Paypal", "Bank Transfer"][i % 4],
            cardNumber:  `411111111111${String(i).padStart(4, "0")}`,
            cardHolder:  user.name,
            expiryDate:  `0${(i % 9) + 1}/2028`,
            isADefault:  i === 0,
            isActive:    true,
        }));
        const createdPayments = await Payment.insertMany(paymentData);
        console.log(`💳 ${createdPayments.length} métodos de pago creados`);

        console.log("\n🚀 Base de datos poblada exitosamente");
    } catch (error) {
        console.error("❌ Error al poblar la base de datos:", error);
    } finally {
        await mongoose.connection.close();
        console.log("🔌 Conexión cerrada");
        process.exit();
    }
};

seedDatabase();