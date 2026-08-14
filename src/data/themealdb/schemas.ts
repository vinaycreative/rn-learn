import { z } from "zod"

const optionalNullableString = z.string().nullable().optional()

export const themealdbMealSchema = z
  .object({
    idMeal: z.string().min(1),
    strMeal: z.string().min(1),
    strCategory: optionalNullableString,
    strArea: optionalNullableString,
    strInstructions: optionalNullableString,
    strMealThumb: optionalNullableString,
    strTags: optionalNullableString,
    strYoutube: optionalNullableString,
    strSource: optionalNullableString,
  })
  .catchall(z.unknown())

export const themealdbMealSummarySchema = z.object({
  idMeal: z.string().min(1),
  strMeal: z.string().min(1),
  strMealThumb: optionalNullableString,
})

export const themealdbMealsResponseSchema = z.object({
  meals: z.array(themealdbMealSchema).nullable(),
})

export const themealdbMealSummariesResponseSchema = z.object({
  meals: z.array(themealdbMealSummarySchema).nullable(),
})

export const themealdbCategorySchema = z.object({
  idCategory: z.string().min(1),
  strCategory: z.string().min(1),
  strCategoryThumb: optionalNullableString,
  strCategoryDescription: optionalNullableString,
})

export const themealdbCategoriesResponseSchema = z.object({
  categories: z.array(themealdbCategorySchema),
})

export const themealdbAreaSchema = z.object({
  strArea: z.string().min(1),
})

export const themealdbAreasResponseSchema = z.object({
  meals: z.array(themealdbAreaSchema).nullable(),
})

export type ThemealdbMeal = z.infer<typeof themealdbMealSchema>
export type ThemealdbMealSummary = z.infer<typeof themealdbMealSummarySchema>
export type ThemealdbCategory = z.infer<typeof themealdbCategorySchema>
export type ThemealdbArea = z.infer<typeof themealdbAreaSchema>
