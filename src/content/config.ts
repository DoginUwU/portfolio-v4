import { defineCollection, z } from "astro:content";

const zTags = z.enum([
    "typescript", "astro", "c++", "opengl", "glfw", "vue", "react", "nodejs", 
    "electron", "css", "react-native", "expo", "flutter", "dart", "firebase", 
    "zig", "low level"
])

const projectsCollection = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        subtitle: z.string().optional(),
        cover: image().refine((img) => img.width >= 1080, {
            message: "Cover image must be at least 1080 pixels wide!",
        }),
        link: z.string(),
        createdAt: z.string(),
        tags: z.array(zTags)
    })
})

const blogCollection = defineCollection({
    type: 'content',
    schema: () => z.object({
        title: z.string(),
        createdAt: z.string(),
        tags: z.array(zTags),
        scope: z.string(),
        estimated: z.number().min(1),

        previous: z.string().optional(),
        next: z.string().optional(),
    })
})

export const collections = {
    projects: projectsCollection,
    blog: blogCollection,
}
