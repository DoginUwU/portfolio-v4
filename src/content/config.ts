import { defineCollection, z } from "astro:content";

const projectsCollection = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        subtitle: z.string().optional(),
        cover: image().refine((img) => img.width >= 1080, {
            message: "Cover image must be at least 1080 pixels wide!",
        }),
        createdAt: z.string(),
        tags: z.array(z.enum(["typescript", "astro", "c++", "opengl", "glfw", "vue"]))
    })
})

export const collections = {
    projects: projectsCollection,
}
