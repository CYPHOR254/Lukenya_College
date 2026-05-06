import {defineType, defineField} from 'sanity'

export const programOption = defineType({
  name: 'programOption',
  title: 'Program Option',
  type: 'document',
  description: 'Options for the application form program dropdown',
  fields: [
    defineField({
      name: 'name',
      title: 'Program Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})
