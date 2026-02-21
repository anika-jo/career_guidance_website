export const MOCK_USER = {
    name: "Anika",
    role: "CS Student",
    targetCareer: "Full Stack Developer",
    matchScore: 85,
    skills: [
        { name: "React", level: 80, required: 90 },
        { name: "Node.js", level: 60, required: 85 },
        { name: "Python", level: 90, required: 50 },
        { name: "PostgreSQL", level: 40, required: 75 },
        { name: "Cloud Basics", level: 20, required: 70 },
    ],
    roadmaps: [
        {
            id: "rd-1",
            title: "Full Stack Developer Path",
            progress: 65,
            phases: [
                { id: "p1", name: "Foundation", status: "completed" },
                { id: "p2", name: "Backend Logic", status: "current" },
                { id: "p3", name: "Frontend Mastery", status: "locked" },
                { id: "p4", name: "Deployment & Scaling", status: "locked" },
            ]
        }
    ]
};
