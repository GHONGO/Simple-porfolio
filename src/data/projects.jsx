import jobhunt from '../assets/jobhunt.webp';
import portfolio from '../assets/portfolio.webp';
import Cinemaplus from '../assets/Cinemaplus.webp';
import heavenly from '../assets/heavenly.webp';

const projects = [
    {
        id: 1,
        title: 'Waste Map',
        summary: 'WasteMap is a full-stack web application that empowers communities and municipalities to manage waste efficiently. Citizens can report waste issues with photos and GPS locations, while municipal authorities can assign cleanup teams, optimize routes, and monitor cleanup performance in real time.',
        tech: ['React', 'Express', 'MongoDB'],
        link: 'https://wastemap.netlify.app/',
        image: Wastemap
    },
    {
        id: 2,
        title: 'Dr.Kennedy Hongo Foundation',
        summary: 'This is a non-profit organization aimed at Providing African Solutions to African Challenges (PASTAC), through Leadership, Education & Legislation. And Promoting STARNORMICS and the Making of STARNORMS and, the promotion of fairness and justice.',
        tech: ['Wordpress'],
        link: 'https://drkennedyhongofoundation.org/',
        image: Dr.kennedyfoundation
    },
    {
        id: 3,
        title: 'Chat App',
        summary: 'A fully featured real time chat application with bidirectional communication between clients with advanced chat features.',
        tech: ['React','Tailwind/CSS', 'Express', 'Socket.io','MongoDb'],
        link: 'https://realtimesocketiochat.netlify.app/',
        image: Chatapp
    },
    {
        id: 4,
        title: 'GOLDEN FITNESS',
        // login: 'username:demo password:demo',
        summary: ' A modern full-stack fitness platform built with the MERN stack. Designed to help users create personalized workout routines, plan budget-friendly diets, and interact within a growing fitness community.',
        tech: ['React', 'Tailwind/CSS', 'Express.js', 'MongoDb','Node.js', 'Socket.io'],
        link: '#',
        image: Gymplanner
    },
]

export default projects
